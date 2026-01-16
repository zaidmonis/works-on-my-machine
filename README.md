# Works on my Machine

A production-grade learning web app that turns the JavaScript + React roadmap into structured lessons, projects, and a JS/TS playground.

## ✨ Features
- 3 selectable learning paths (4 / 8 / 12 weeks)
- 4-phase roadmap with lessons, quizzes, exercises, and projects
- Progress tracking and export
- In-app JavaScript/TypeScript playground with sandboxed execution
- Tailwind CSS UI with sidebar navigation

## Prerequisites
- Node.js 18+
- pnpm 9+

## Local setup
```bash
pnpm install
pnpm db:setup
pnpm dev
```

### Scripts
- `pnpm dev`: runs the API and web app concurrently
- `pnpm db:setup`: runs Prisma migrations + seeds the database

## App URLs
- Web: http://localhost:5173
- API: http://localhost:4000

## Demo user
- Username: `demo`
- Password: `password123`

## Adding lessons, exercises, or projects
1. Open `apps/api/prisma/seed.ts`.
2. Add topics inside the `phaseTopics` map to create new lessons.
3. Update the `projects` list to create new projects with checklists.
4. Rerun `pnpm db:setup` to migrate + seed.

## Extending lesson content
- Lessons are stored as Markdown in the database.
- Use fenced code blocks with language tags (`js`, `ts`, `jsx`, `tsx`).
- Add playground-ready snippets using a `playground` fence.

## Troubleshooting
- If Prisma migrations fail, delete `apps/api/prisma/dev.db` and rerun `pnpm db:setup`.
- Ensure `JWT_SECRET` is set in `apps/api/.env` if you want to override the dev default.

## Screenshots
- Landing page (placeholder)
- Dashboard (placeholder)
- Lesson page (placeholder)
- Playground (placeholder)
