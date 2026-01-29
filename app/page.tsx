'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Code, Zap, Rocket, CheckCircle2, Copy, AlertCircle, Wand2 } from 'lucide-react'

const EXAMPLE_PROMPTS = [
  "Create a modern SaaS landing page with hero section, features grid, pricing table, and testimonials",
  "Build a portfolio website for a photographer with a gallery, about section, and contact form",
  "Design a blog homepage with featured posts, categories, and a newsletter signup",
  "Create an e-commerce product landing page with product showcase, reviews, and purchase section",
]

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message?: string; code?: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style: 'modern',
        }),
      })

      const data = await response.json()

      if (data.success) {
        setResult({
          success: true,
          message: 'Website generated successfully!',
          code: data.pages?.[0]?.code || '',
        })
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to generate website',
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'An error occurred. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopyCode = async () => {
    if (result?.code) {
      await navigator.clipboard.writeText(result.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example)
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Web Builder
            </h1>
          </div>
          <nav className="flex gap-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Docs</Button>
            <Button>Sign In</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Powered by GPT-4 & Claude 3.5 Sonnet
          </div>

          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Build Stunning Websites
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              With Just Words
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Describe your vision in natural language and watch as AI creates a complete,
            production-ready website in seconds. No coding required.
          </p>

          {/* AI Generation Demo */}
          <Card className="max-w-3xl mx-auto text-left shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-indigo-600" />
                Try It Now
              </CardTitle>
              <CardDescription>
                Describe the website you want to build
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Example Prompts */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Need inspiration? Try these examples:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {EXAMPLE_PROMPTS.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(example)}
                      className="text-left text-xs p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all"
                      disabled={loading}
                    >
                      <div className="flex items-start gap-2">
                        <Sparkles className="h-3 w-3 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 line-clamp-2">{example}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Example: Create a modern landing page for a SaaS startup with a hero section, features grid, pricing table, and contact form. Use a blue and purple gradient theme."
                  className="w-full h-32 p-4 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
                  disabled={loading}
                />
                <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                  {prompt.length} characters
                </div>
              </div>

              {/* Validation Feedback */}
              {prompt.length > 0 && prompt.length < 10 && (
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  Please provide a more detailed description (at least 10 characters)
                </div>
              )}

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={loading || prompt.trim().length < 10}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                size="lg"
              >
                {loading ? (
                  <>
                    <Sparkles className="animate-spin" />
                    Generating Your Website...
                  </>
                ) : (
                  <>
                    <Rocket />
                    Generate Website
                  </>
                )}
              </Button>

              {/* Result Display */}
              {result && (
                <div
                  className={`p-4 rounded-lg ${
                    result.success
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {result.success ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p
                        className={`font-medium mb-2 ${
                          result.success ? 'text-green-800' : 'text-red-800'
                        }`}
                      >
                        {result.message}
                      </p>
                      {result.code && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-green-700">
                              Generated Code Preview
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCopyCode}
                              className="h-7 text-xs"
                            >
                              {copied ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  Copy Code
                                </>
                              )}
                            </Button>
                          </div>
                          <pre className="text-xs bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto max-h-60 font-mono">
                            {result.code.substring(0, 1000)}
                            {result.code.length > 1000 && '\n\n... (truncated)'}
                          </pre>
                          <p className="text-xs text-green-700">
                            Total code length: {result.code.length} characters
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Build Amazing Websites
          </h3>
          <p className="text-xl text-slate-600">
            Powerful AI-driven features that transform your ideas into reality
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>AI-Powered Generation</CardTitle>
              <CardDescription>
                Advanced AI models understand your vision and create custom websites tailored to your needs
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Clean, Production Code</CardTitle>
              <CardDescription>
                Generate Next.js, React, and TypeScript code that follows best practices and is ready to deploy
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-pink-100 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-pink-600" />
              </div>
              <CardTitle>Instant Preview</CardTitle>
              <CardDescription>
                See your website come to life in real-time with WebContainer-based live previews
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50 rounded-3xl my-20">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            How It Works
          </h3>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Describe Your Vision</h4>
                <p className="text-slate-600">
                  Tell us what kind of website you want in plain English. Be as detailed or as brief as you like.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">AI Generates Code</h4>
                <p className="text-slate-600">
                  Our AI analyzes your description and creates production-ready React components with TypeScript and Tailwind CSS.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Preview & Deploy</h4>
                <p className="text-slate-600">
                  See your website instantly, make adjustments with AI chat, and deploy with one click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">10k+</div>
            <div className="text-slate-600">Websites Generated</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">99%</div>
            <div className="text-slate-600">Code Quality Score</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-pink-600 mb-2">&lt;30s</div>
            <div className="text-slate-600">Average Generation Time</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
            <div className="text-slate-600">AI Availability</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-2xl">
          <CardContent className="py-16 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your Dream Website?
            </h3>
            <p className="text-xl mb-8 text-indigo-100">
              Join thousands of creators using AI to bring their ideas to life
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" variant="secondary" className="shadow-lg">
                <Rocket className="h-5 w-5" />
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Code className="h-5 w-5" />
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <span className="font-semibold text-slate-900">AI Web Builder</span>
              <span className="text-slate-400">·</span>
              <span className="text-sm text-slate-500">Made with ❤️ and AI</span>
            </div>
            <p className="text-sm text-slate-500">
              Built with Next.js, TypeScript, and AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
