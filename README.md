# AI Website Builder

AI-assisted website builder repo with project storage, generation routes, and a partially implemented web app shell. The checked-in code currently mixes a Next.js App Router app with older Vite-oriented documentation.

## Current Status

- UI shell exists under `app/` with project pages and API routes.
- Prisma schema and project CRUD route are present.
- AI orchestration code exists in `lib/ai/orchestrator.ts`.
- The repo is not in a clean runnable state yet.

## What Is Working

- `app/api/ai/generate/route.ts`
- `app/api/projects/route.ts`
- Prisma schema in `prisma/schema.prisma`
- Shared UI primitives in `components/ui/`

## What Needs To Be Done To Finish

1. Fix `package.json`, which currently contains conflicting Vite and Next.js metadata.
2. Choose one runtime path and remove the dead split between `src/` and `app/`.
3. Either restore the backend described in the old README or rewrite the docs to match the current route-handler architecture.
4. Verify auth, database, and env setup end to end with a real `DATABASE_URL`.
5. Add a reproducible local setup path and a smoke test for project creation and AI generation.

## Local Development

Current scripts cannot be trusted until `package.json` is repaired. After that, document the single supported dev flow here.
