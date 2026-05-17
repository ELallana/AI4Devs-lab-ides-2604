# LTI - AI Agent Guide

## Structure

Two independent npm packages: `backend/` and `frontend/`. Install and run separately.

## Commands

| Package | Command | Action |
|---------|---------|--------|
| backend | `npm run dev` | Dev server with ts-node-dev (hot reload), port 3010 |
| backend | `npm run build` | `tsc` → `dist/` |
| backend | `npm test` | Jest (tests in `src/tests/`) |
| backend | `npm run prisma:generate` | Generate Prisma client after schema changes |
| backend | `npm run db:create-candidate-table` | Apply raw SQL table via Prisma |
| frontend | `npm start` | CRA dev server, port 3000 |
| frontend | `npm test` | Jest (tests must be in `src/tests/` — no colocation) |
| root | `docker-compose up -d` | Start PostgreSQL (`db`) on port 5432 |

## Quirks

- **Known test failure**: Backend route returns `"Hola LTI!"` but `app.test.ts` expects `"Hello World!"`. Fix either the route or the test.
- **DB setup**: Requires Docker PostgreSQL running. The `.env` in `backend/` is pre-configured (`DATABASE_URL=postgresql://Edu:afladlsl4536@localhost:5432/LTIdb`).
- **Prisma schema** maps model `Candidate` to table `candidate` (`@@map("candidate")`). The raw SQL script creates the same table — they are redundant; prefer Prisma migrations.
- **CI/lint/typecheck**: No CI pipeline, no typecheck script, no pre-commit hooks. Backend ESLint config extends `plugin:prettier/recommended`.

## OpenSpec workflow

Repository uses OpenSpec (spec-driven development). Custom commands available:
- `opsx-explore` — investigate problems and explore ideas
- `opsx-propose` — propose a new change
- `opsx-apply` — implement proposed changes
- `opsx-archive` — archive completed changes

Related files: `openspec/`, `.opencode/`, `.cursor/`.
