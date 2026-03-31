import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'
import { generateSlug } from '@/lib/utils'

const CreateProjectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  userId: z.string(),
})

// GET /api/projects - List all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }
    
    const projects = await prisma.project.findMany({
      where: { userId },
      include: {
        pages: true,
        components: true,
        _count: {
          select: {
            versions: true,
            deployments: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    })
    
    return NextResponse.json({ projects })
  } catch (error) {
    console.error('[API] List projects error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = CreateProjectSchema.parse(body)
    
    // Generate unique slug
    let slug = generateSlug(validatedData.name)
    let slugExists = await prisma.project.findUnique({ where: { slug } })
    let counter = 1
    
    while (slugExists) {
      slug = `${generateSlug(validatedData.name)}-${counter}`
      slugExists = await prisma.project.findUnique({ where: { slug } })
      counter++
    }
    
    // Create project
    const project = await prisma.project.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        slug,
        userId: validatedData.userId,
      },
    })
    
    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error('[API] Create project error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
