import { NextRequest, NextResponse } from 'next/server'
import { aiOrchestrator } from '@/lib/ai/orchestrator'
import { z } from 'zod'

const GenerateRequestSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters'),
  template: z.string().optional(),
  style: z.enum(['minimal', 'modern', 'corporate', 'creative']).optional(),
  pages: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request
    const validatedData = GenerateRequestSchema.parse(body)
    
    // Generate website using AI orchestrator
    const result = await aiOrchestrator.generateWebsite(validatedData)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Generation failed' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('[API] Generate error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to generate website' },
      { status: 500 }
    )
  }
}
