'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Code, Zap, Rocket, CheckCircle2 } from 'lucide-react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message?: string; code?: string } | null>(null)

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
              <CardTitle>Try It Now</CardTitle>
              <CardDescription>
                Describe the website you want to build
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Create a modern landing page for a SaaS startup with a hero section, features grid, pricing table, and contact form. Use a blue and purple gradient theme."
                className="w-full h-32 p-4 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
                disabled={loading}
              />

              <Button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
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
                      <Code className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p
                        className={
                          result.success ? 'text-green-800' : 'text-red-800'
                        }
                      >
                        {result.message}
                      </p>
                      {result.code && (
                        <pre className="mt-2 text-xs bg-white p-3 rounded overflow-x-auto max-h-40">
                          {result.code.substring(0, 500)}...
                        </pre>
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
          <Card>
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

          <Card>
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

          <Card>
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

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
          <CardContent className="py-16 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your Dream Website?
            </h3>
            <p className="text-xl mb-8 text-indigo-100">
              Join thousands of creators using AI to bring their ideas to life
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <span className="font-semibold text-slate-900">AI Web Builder</span>
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
