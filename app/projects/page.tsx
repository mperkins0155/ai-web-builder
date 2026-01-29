'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Plus, FolderOpen, Clock, Code, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: string
  name: string
  description: string | null
  slug: string
  createdAt: string
  updatedAt: string
  _count: {
    versions: number
    deployments: number
  }
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for demonstration
    // In production, fetch from API: /api/projects?userId={userId}
    setTimeout(() => {
      setProjects([])
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Web Builder
            </h1>
          </Link>
          <nav className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Docs</Button>
            <Button>Sign In</Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">My Projects</h2>
              <p className="text-slate-600">
                Manage your AI-generated websites
              </p>
            </div>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-100 rounded w-full"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <FolderOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
                <p className="text-slate-600 mb-6">
                  Start building your first AI-powered website
                </p>
                <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Link href="/">
                    <Sparkles className="h-4 w-4" />
                    Generate Your First Website
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span className="group-hover:text-indigo-600 transition-colors">
                        {project.name}
                      </span>
                      <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-indigo-600" />
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description || 'No description'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Code className="h-4 w-4" />
                        <span>{project._count.versions} versions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Deploy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
