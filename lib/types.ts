// AI Generation Types
export interface GenerationRequest {
  prompt: string
  template?: string
  style?: 'minimal' | 'modern' | 'corporate' | 'creative'
  pages?: string[]
  features?: string[]
}

export interface GenerationResponse {
  success: boolean
  projectId?: string
  pages?: GeneratedPage[]
  components?: GeneratedComponent[]
  error?: string
}

export interface GeneratedPage {
  name: string
  path: string
  code: string
  seoTitle?: string
  seoDescription?: string
}

export interface GeneratedComponent {
  name: string
  type: string
  code: string
  props?: Record<string, unknown>
}

// AI Models
export type AIModel = 'gpt-4' | 'gpt-4-turbo' | 'claude-3-opus' | 'claude-3-sonnet'

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface CodeGenerationContext {
  intent: string
  pages: string[]
  features: string[]
  style: string
  components: string[]
}

// Project Types
export interface ProjectMetadata {
  name: string
  description?: string
  framework: 'next' | 'react' | 'vue'
  styling: 'tailwind' | 'css' | 'styled-components'
  features: string[]
}

// Code Validation
export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
  fixed?: string
}

export interface ValidationError {
  line?: number
  column?: number
  message: string
  severity: 'error' | 'critical'
}

export interface ValidationWarning {
  line?: number
  column?: number
  message: string
  type: string
}

// Deployment Types
export interface DeploymentConfig {
  provider: 'vercel' | 'netlify' | 'spaceship'
  projectId: string
  environment: 'development' | 'staging' | 'production'
  envVars?: Record<string, string>
}

export interface DeploymentStatus {
  id: string
  status: 'pending' | 'building' | 'deployed' | 'failed'
  url?: string
  logs?: string[]
  error?: string
}
