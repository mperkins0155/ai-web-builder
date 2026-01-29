import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import type {
  GenerationRequest,
  GenerationResponse,
  CodeGenerationContext,
  ValidationResult,
  AIMessage,
} from '@/lib/types'

// Initialize AI clients lazily to avoid build-time errors
let openaiInstance: OpenAI | null = null
let anthropicInstance: Anthropic | null = null

function getOpenAI(): OpenAI {
  if (!openaiInstance) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured')
    }
    openaiInstance = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return openaiInstance
}

function getAnthropic(): Anthropic {
  if (!anthropicInstance) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not configured')
    }
    anthropicInstance = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  }
  return anthropicInstance
}

// Validation schema for code generation
const IntentSchema = z.object({
  intent: z.string(),
  pages: z.array(z.string()),
  features: z.array(z.string()),
  style: z.string(),
  components: z.array(z.string()),
})

/**
 * AI Orchestrator - Coordinates AI models for code generation
 */
export class AIOrchestrator {
  /**
   * Generate a complete website from a natural language prompt
   */
  async generateWebsite(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      console.log('[AI Orchestrator] Starting generation:', request.prompt)

      // Step 1: Parse intent using Claude (better at understanding context)
      const context = await this.parseIntent(request.prompt)
      console.log('[AI Orchestrator] Intent parsed:', context)

      // Step 2: Generate code using GPT-4 (better at code generation)
      const code = await this.generateCode(context, request.style || 'modern')
      console.log('[AI Orchestrator] Code generated')

      // Step 3: Validate and fix code
      const validated = await this.validateCode(code)
      console.log('[AI Orchestrator] Code validated:', validated.valid)

      const finalCode = validated.fixed || code

      // Step 4: Structure the response
      return {
        success: true,
        pages: [
          {
            name: 'Home',
            path: '/',
            code: finalCode,
            seoTitle: context.intent,
            seoDescription: `${context.intent} - Built with AI Web Builder`,
          },
        ],
        components: [],
      }
    } catch (error) {
      console.error('[AI Orchestrator] Error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  /**
   * Parse user intent using Claude 3.5 Sonnet
   */
  private async parseIntent(prompt: string): Promise<CodeGenerationContext> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: `You are an expert at understanding website requirements. Parse the user's request and extract:
- The main intent/purpose of the website
- List of pages needed (e.g., Home, About, Contact)
- Key features required
- Design style preference (minimal, modern, corporate, creative)
- Main components needed

Respond in JSON format matching this structure:
{
  "intent": "string describing the purpose",
  "pages": ["Home", "About", ...],
  "features": ["contact form", "blog", ...],
  "style": "modern",
  "components": ["header", "footer", ...]
}`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ]

    const response = await getAnthropic().messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: messages.map((msg) => ({
        role: msg.role === 'system' ? 'user' : msg.role,
        content: msg.content,
      })),
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Extract JSON from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse intent from Claude response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    return IntentSchema.parse(parsed)
  }

  /**
   * Generate React/Next.js code using GPT-4
   */
  private async generateCode(context: CodeGenerationContext, style: string): Promise<string> {
    const systemPrompt = `You are an expert React/Next.js developer. Generate a complete, production-ready Next.js page component based on the provided context.

Requirements:
- Use Next.js 14+ App Router syntax
- Use TypeScript
- Use Tailwind CSS for styling
- Follow the ${style} design style
- Include proper SEO meta tags
- Make it responsive
- Use modern React patterns (hooks, functional components)
- Include accessibility features
- Add smooth animations where appropriate

Generate ONLY the page component code, nothing else. Start with "export default function" and make it a complete, working component.`

    const userPrompt = `Create a ${context.intent} website with the following specifications:

Pages: ${context.pages.join(', ')}
Features: ${context.features.join(', ')}
Style: ${context.style}
Components: ${context.components.join(', ')}

Generate the main page component with all these elements integrated.`

    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    })

    const code = completion.choices[0]?.message?.content
    if (!code) {
      throw new Error('Failed to generate code from GPT-4')
    }

    return code
  }

  /**
   * Validate generated code and attempt to fix issues
   */
  private async validateCode(code: string): Promise<ValidationResult> {
    const errors: ValidationResult['errors'] = []
    const warnings: ValidationResult['warnings'] = []

    // Basic validation checks
    if (!code.includes('export default')) {
      errors.push({
        message: 'Missing default export',
        severity: 'error',
      })
    }

    // Check for common security issues
    if (code.includes('dangerouslySetInnerHTML')) {
      warnings.push({
        message: 'Found dangerouslySetInnerHTML - review for XSS vulnerabilities',
        type: 'security',
      })
    }

    // Check for inline styles (should use Tailwind)
    if (code.match(/style=\{\{/)) {
      warnings.push({
        message: 'Found inline styles - consider using Tailwind classes',
        type: 'style',
      })
    }

    const valid = errors.length === 0

    // If there are errors, attempt to fix them
    let fixed: string | undefined
    if (!valid) {
      fixed = await this.fixCode(code, errors)
    }

    return {
      valid,
      errors,
      warnings,
      fixed,
    }
  }

  /**
   * Attempt to fix code issues using AI
   */
  private async fixCode(
    code: string,
    errors: ValidationResult['errors']
  ): Promise<string> {
    const errorMessages = errors.map((e) => e.message).join('\n')

    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a code fixing expert. Fix the provided code to resolve all errors. Return ONLY the fixed code, no explanations.',
        },
        {
          role: 'user',
          content: `Fix these errors in the code:\n\n${errorMessages}\n\nCode:\n${code}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 4000,
    })

    return completion.choices[0]?.message?.content || code
  }

  /**
   * Generate a specific component
   */
  async generateComponent(
    name: string,
    description: string,
    style: string = 'modern'
  ): Promise<string> {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an expert React component developer. Generate a reusable React component with TypeScript and Tailwind CSS. Follow ${style} design style. Return ONLY the component code.`,
        },
        {
          role: 'user',
          content: `Create a ${name} component: ${description}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    return completion.choices[0]?.message?.content || ''
  }

  /**
   * Refine existing code based on feedback
   */
  async refineCode(code: string, feedback: string): Promise<string> {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a code refinement expert. Modify the code based on user feedback while maintaining its structure and functionality. Return ONLY the modified code.',
        },
        {
          role: 'user',
          content: `Current code:\n${code}\n\nFeedback: ${feedback}\n\nProvide the refined code.`,
        },
      ],
      temperature: 0.5,
      max_tokens: 4000,
    })

    return completion.choices[0]?.message?.content || code
  }
}

// Export singleton instance
export const aiOrchestrator = new AIOrchestrator()
