# CLAUDE.md — AI Web Builder

## Project Overview

AI Web Builder is an AI-powered platform that generates complete, production-ready React/Next.js applications from natural language descriptions. It uses a multi-model AI architecture: **Claude 3.5 Sonnet** for intent parsing and **GPT-4 Turbo** for code generation.

**Status**: MVP / Phase 1 — core generation pipeline, basic project management, and landing page are functional. Many features (editor, preview, chat, dashboard, templates) are scaffolded but not yet implemented.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with CSS custom properties for theming
- **Database**: PostgreSQL with Prisma ORM v5
- **AI**: Anthropic SDK (`@anthropic-ai/sdk`) + OpenAI SDK (`openai`)
- **UI Components**: Radix UI primitives + custom components (shadcn/ui pattern)
- **Validation**: Zod
- **Auth**: NextAuth.js v4 (configured but not fully integrated)
- **Editor**: Monaco Editor (dependency installed, not yet used)
- **Animations**: Framer Motion

## Repository Structure

```
ai-web-builder/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (Geist fonts, global CSS)
│   ├── page.tsx                  # Landing page with AI generation demo (client component)
│   ├── globals.css               # Design system CSS variables (light/dark themes)
│   ├── projects/
│   │   └── page.tsx              # Project dashboard (client component, uses mock data)
│   └── api/
│       ├── ai/
│       │   └── generate/
│       │       └── route.ts      # POST /api/ai/generate — main AI generation endpoint
│       └── projects/
│           └── route.ts          # GET/POST /api/projects — project CRUD
├── components/
│   └── ui/                       # UI primitives (shadcn/ui pattern)
│       ├── button.tsx            # Button with CVA variants (6 types, 4 sizes)
│       ├── card.tsx              # Compound Card component (Card, CardHeader, CardTitle, etc.)
│       └── input.tsx             # Text input primitive
├── lib/
│   ├── types.ts                  # All TypeScript interfaces and types
│   ├── utils.ts                  # Utility functions (cn, debounce, truncate, formatDate, generateSlug)
│   ├── ai/
│   │   └── orchestrator.ts       # AI orchestration: intent parsing + code generation + validation
│   └── db/
│       └── prisma.ts             # Prisma client singleton (dev-safe with globalThis)
├── prisma/
│   └── schema.prisma             # Database schema (11 models)
├── public/                       # Static assets (SVG icons)
├── tailwind.config.ts            # Tailwind config with semantic color tokens (HSL CSS vars)
├── eslint.config.mjs             # ESLint with next/core-web-vitals + typescript
├── postcss.config.mjs            # PostCSS with @tailwindcss/postcss
├── tsconfig.json                 # TypeScript config (strict, bundler resolution)
├── next.config.ts                # Next.js config (minimal)
└── package.json                  # Dependencies and scripts
```

## Key Commands

```bash
npm run dev      # Start dev server (next dev)
npm run build    # Production build (next build)
npm run start    # Start production server (next start)
npm run lint     # Run ESLint
```

Database commands:
```bash
npx prisma migrate dev --name <migration_name>   # Create and apply migration
npx prisma generate                               # Regenerate Prisma client
npx prisma studio                                 # Open database GUI
```

## Architecture Details

### AI Orchestration Pipeline (`lib/ai/orchestrator.ts`)

The `aiOrchestrator` singleton coordinates a multi-step generation workflow:

1. **Intent Parsing** — Claude 3.5 Sonnet (`claude-3-5-sonnet-20241022`) analyzes the user prompt and extracts structured intent (pages, features, style, components) validated with a Zod schema.
2. **Code Generation** — GPT-4 Turbo (`gpt-4-turbo-preview`) generates complete Next.js 14+ App Router code with TypeScript and Tailwind CSS based on the parsed intent.
3. **Validation** — Checks for default exports, security issues (`dangerouslySetInnerHTML`), and style warnings (inline styles). Attempts auto-fix via GPT-4 if errors are found.
4. **Response Structuring** — Assembles pages with SEO metadata and components.

Both AI clients use lazy initialization to avoid build-time errors when API keys are not set.

### API Endpoints

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/ai/generate` | Generate website from prompt (Zod-validated request) |
| GET | `/api/projects?userId={id}` | List user's projects with counts |
| POST | `/api/projects` | Create new project (auto-generates unique slug) |

### Database Schema (Prisma)

11 models with PostgreSQL:

- **User** — accounts with optional password auth
- **Project** — user-owned projects (visibility: private/public/unlisted)
- **ProjectVersion** — version snapshots with JSON code storage
- **Component** — reusable components within projects
- **Page** — pages with routes, code, and SEO fields (unique projectId+path)
- **Asset** — media files with type and size tracking
- **Deployment** — deployment tracking (status: pending/building/deployed/failed, provider: vercel/netlify/spaceship)
- **Template** — pre-built templates with categories and tags
- **Subscription** — user plans (free/pro/enterprise) with status tracking
- **Collaborator** — project sharing with roles (owner/editor/viewer), unique per projectId+userId
- **ApiKey** — programmatic access keys with expiration

All project-related models cascade on delete. No migrations have been created yet.

### UI Component System

Components follow the **shadcn/ui pattern**:
- Built with Radix UI primitives for accessibility
- Styled with Tailwind CSS utility classes
- Use `class-variance-authority` (CVA) for variants
- All use `React.forwardRef` with proper `displayName`
- Class merging via `cn()` utility (`clsx` + `tailwind-merge`)

### Theming

Colors use HSL CSS custom properties defined in `app/globals.css`:
- Light and dark themes via `prefers-color-scheme` media query
- Tailwind config maps semantic tokens (primary, secondary, muted, accent, etc.) to CSS variables
- Dark mode enabled via `class` strategy in Tailwind config

## Coding Conventions

### TypeScript
- Strict mode enabled
- Path alias: `@/*` maps to project root (e.g., `@/lib/utils`, `@/components/ui/button`)
- All types defined centrally in `lib/types.ts`
- Use Zod for runtime validation at API boundaries

### React / Next.js
- Pages that need interactivity use `'use client'` directive
- Server components are the default (layout.tsx)
- App Router file conventions: `page.tsx`, `layout.tsx`, `route.ts`
- API routes use `NextRequest`/`NextResponse` from `next/server`
- State management via React hooks (`useState`, `useEffect`)

### Styling
- Tailwind CSS utility classes exclusively (avoid inline styles)
- Semantic color tokens (e.g., `bg-primary`, `text-muted-foreground`) rather than literal colors
- Component variants managed with CVA
- Responsive design with Tailwind breakpoints (`md:`, `lg:`)

### File Organization
- UI primitives go in `components/ui/`
- Feature components would go in `components/<feature>/` (editor, preview, chat, dashboard — directories planned)
- API routes follow Next.js App Router conventions: `app/api/<resource>/route.ts`
- Shared types in `lib/types.ts`, utilities in `lib/utils.ts`
- Database access through `lib/db/prisma.ts` singleton

### Naming
- Files: kebab-case for components (`button.tsx`), camelCase for utilities (`utils.ts`)
- Components: PascalCase (`Button`, `CardHeader`)
- Functions/variables: camelCase
- Types/interfaces: PascalCase (`GenerationRequest`, `ValidationResult`)
- CSS variables: kebab-case with `--` prefix (`--primary`, `--muted-foreground`)
- Database slugs: auto-generated from names, kebab-case with collision handling

## Environment Variables

Required (stored in `.env`, gitignored):
```
DATABASE_URL          # PostgreSQL connection string
OPENAI_API_KEY        # OpenAI API key for code generation
ANTHROPIC_API_KEY     # Anthropic API key for intent parsing
NEXTAUTH_SECRET       # NextAuth.js secret for session management
```

## Important Notes for AI Assistants

1. **No test suite exists yet** — there are no test files or testing dependencies. If adding tests, consider `jest` + `@testing-library/react` or `vitest`.
2. **No migrations exist** — the Prisma schema has not been migrated. Run `npx prisma migrate dev` before database operations.
3. **Mock data in use** — the projects page (`app/projects/page.tsx`) currently uses mock data (empty array) instead of fetching from the API.
4. **API keys are lazy-loaded** — the AI orchestrator initializes clients on first use, so the app can build without API keys present.
5. **Many features are planned but not built** — the README references editor, preview, chat, and dashboard components that don't exist yet. Only the generation pipeline and basic project CRUD are implemented.
6. **Dependencies installed but unused** — `monaco-editor`, `@monaco-editor/react`, `framer-motion`, `axios`, `bcryptjs`, and `next-auth` are in `package.json` but have minimal or no usage in the current codebase.
7. **Node.js 18+** is required.
8. **All `.env*` files are gitignored** — never commit secrets.
