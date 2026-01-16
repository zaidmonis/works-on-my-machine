This is the prompt that I used:


You are an autonomous coding agent. Build a production-grade **learning web app** named- "Works on my Machine" that turns the given course content into a complete beginner-friendly JavaScript + React course with **3 selectable learning paths (4-week / 8-week / 12-week)**, progress tracking, embedded exercises, and an in-app JS/TS playground. 

You must implement end-to-end: UI, backend, database, seed content, and instructions to run locally.

## 0) Source of truth (roadmap content)
Convert the **course content provided at the end of app-requirements section** under the section: `Course content` into structured course content: 
- 4 phases:
  1) JavaScript Mastery
  2) React Fundamentals
  3) Advanced React Patterns
  4) Production-Ready React
- Each phase includes:
  - learning objectives
  - topics (grouped sections)
  - hands-on projects
  - resources (links)
  - milestone checklist

Use the content topics verbatim where possible, and augment with additional resources and explanations **only where it improves beginner understanding**. Keep content accurate and practical.

## 1) Tech constraints for the app (choose these exact defaults) 
### Frontend
- React 18 + Vite
- TypeScript
- React Router
- State: React Context + local state (no Redux required for the app itself)
- UI kit: Tailwind CSS (include)
- Code formatting: Shiki or Prism (must support TS/JS, JSX/TSX)
- Editor/playground: Monaco Editor (preferred) OR CodeMirror 6 if Monaco is too heavy
- Charts not required

### Backend
- Node.js + Express (TypeScript)
- DB: SQLite (local file) with Prisma ORM
- Auth: simple username + password (hash with bcrypt). No OAuth. No email. No “security hardening” beyond hashing.
- Sessions: JWT stored in localStorage OR httpOnly cookie (pick one and implement cleanly). Keep it simple and functional.

### Repo layout (monorepo)
- /apps/web (Vite React app)
- /apps/api (Express API)
- /packages/shared (shared types + zod schemas)
- Use pnpm workspaces

## 2) Core product requirements
### A) Learning paths + schedules
User must be able to choose:
- **4-week (intensive)**
- **8-week (balanced)**
- **12-week (standard)**

All plans cover the SAME content, only the weekly scheduling differs.

Implement schedule rules:
- Phases are always sequential: Phase 1 → 2 → 3 → 4
- Recommended distribution:
  - 4-week: 1 week per phase
  - 8-week: 2 weeks per phase
  - 12-week: 3 weeks Phase 1, 3 weeks Phase 2, 3 weeks Phase 3, 3 weeks Phase 4
- Each “week” has:
  - a list of topics (lessons)
  - suggested project work
  - a checklist

### B) Course content pages (extremely beginner-friendly)
For EVERY topic listed in the roadmap:
- Create a **Lesson page** with:
  - “What you’ll learn”
  - Concept explanation in simple language
  - 2–5 code examples (well-formatted, copyable)
  - Common mistakes + debugging tips
  - Real world uses

  - Mini-quiz (3–5 questions) OR quick checks
  - Exercises:
    - at least 3 per lesson
    - at least 1 “write code” exercise runnable in the embedded playground
- Provide “Next lesson” and “Previous lesson”
- Add estimated time per lesson (reasonable defaults, e.g., 20–45 min)

### C) Progress tracking
Track at minimum:
- chosen plan
- current week
- lesson completion (boolean + completedAt)
- quiz results (score, attempts)
- exercise attempts (saved code + status)
- project completion statuses per phase

Persist progress to SQLite per user.

### D) Simple authentication
- Signup: username + password
- Login: username + password
- One user role: “user”
- No admin panel required
- Seed demo user optional

### E) JavaScript/TypeScript playground (in-app compiler + runner)
Must support:
- JS + TS input (toggle)
- For TS: transpile to JS (use TypeScript compiler API in browser OR on server; choose simplest robust approach)
- Run code safely:
  - Execute in an isolated iframe sandbox
  - Capture console.log, console.error
  - Show output panel + error panel
- Include “Run”, “Reset”, and “Copy code” buttons
- Allow lessons/exercises to preload starter code into the playground

### F) Code snippet UX
All code blocks in lessons must:
- render with syntax highlighting
- show a “Copy” button
- preserve indentation
- support long lines (horizontal scroll)

### G) Projects section
For each roadmap project (from the course content), create: 
- Project overview page
- Step-by-step build plan
- Suggested folder structure
- “Stretch goals”
- Checklist and completion toggle
Projects required (minimum):
- Phase 1: Interactive Quiz App, GitHub Profile Finder
- Phase 2: Task Manager App, Weather Dashboard
- Phase 3: E-Commerce Store, Real-Time Chat Application
- Phase 4: Portfolio Website (Next.js), Full-Stack Dashboard

For projects that would be too large to fully implement inside this app, provide detailed instructions and milestones, not full generated codebases.

### H) Resources section
For each phase, show:
- official docs links
- 2–5 high-quality tutorials
- 1–2 practice platforms (Codewars/LeetCode etc)
No link dumping: keep short and curated.

## 3) Information architecture (pages + routes)
### Public routes
- / (Landing)
  - What the app is
  - CTA: Sign up / Login
- /login
- /signup

### Authenticated routes
- /dashboard
  - chosen plan summary
  - current week
  - progress bar overall + per phase
  - quick resume button
- /plan/select
  - choose 4/8/12 weeks
- /roadmap
  - phases overview, milestones
- /phase/:phaseId
  - phase overview + weeks breakdown + projects + resources
- /week/:weekId
  - week overview + checklist + lessons list
- /lesson/:lessonId
- /projects
- /project/:projectId
- /playground
  - standalone playground + examples gallery
- /profile
  - reset progress, export progress JSON

## 4) Data model (Prisma for SQLite)
Implement these tables (minimum viable; you may add fields):
- User(id, username UNIQUE, passwordHash, createdAt)
- Plan(id, name ENUM[W4,W8,W12], createdAt)
- UserPlan(id, userId, planId, startedAt, currentWeekIndex INT)
- Phase(id, title, order, description)
- Week(id, planId, index, title, phaseId)
- Lesson(id, phaseId, title, slug, order, contentMarkdown TEXT, estimatedMinutes INT)
- QuizQuestion(id, lessonId, question, options JSON, correctIndex INT, explanation)
- Exercise(id, lessonId, promptMarkdown TEXT, starterCode TEXT, solutionHintMarkdown TEXT)
- UserLessonProgress(id, userId, lessonId, completed BOOLEAN, completedAt)
- UserQuizAttempt(id, userId, lessonId, score INT, total INT, createdAt)
- UserExerciseAttempt(id, userId, exerciseId, code TEXT, status ENUM[STARTED,COMPLETED], updatedAt)
- Project(id, phaseId, title, descriptionMarkdown, checklist JSON)
- UserProjectProgress(id, userId, projectId, status ENUM[NOT_STARTED,IN_PROGRESS,DONE], updatedAt)

Also create a seed script that:
- inserts phases, lessons, quizzes, exercises, projects, resources
- generates weeks for each plan according to schedule rules

## 5) API design (Express)
Base URL: /api

Auth:
- POST /auth/signup {username,password} -> token/session
- POST /auth/login {username,password} -> token/session
- POST /auth/logout
- GET /me

Content:
- GET /roadmap (phases + counts)
- GET /phases
- GET /phases/:phaseId (phase + lessons + projects + resources + weeks for chosen plan)
- GET /weeks/:weekId (week + lessons list)
- GET /lessons/:lessonId (lesson content + quizzes + exercises)
- GET /projects
- GET /projects/:projectId

Progress:
- POST /plan/select {plan: W4|W8|W12}
- GET /progress/summary
- POST /lessons/:lessonId/complete
- POST /lessons/:lessonId/uncomplete
- POST /quizzes/:lessonId/attempt {answers:[...]}
- POST /exercises/:exerciseId/attempt {code,status}
- POST /projects/:projectId/status {status}

Export/reset:
- GET /progress/export (JSON)
- POST /progress/reset

Validation:
- Use zod schemas from /packages/shared
- Return consistent error payloads: {error:{code,message,details?}}

## 6) Lesson content format (Markdown + components)
Store lesson bodies as Markdown (in DB seed).
Support these embedded components in Markdown via MDX-like syntax OR a simple custom renderer:
- Callout boxes (tip/warn/note)
- Code blocks with language tags
- “Try it” blocks that link/preload playground code
If MDX is too heavy, implement a constrained markdown + custom tokens approach.

## 7) UX requirements (make it pleasant, not “default template”)
- Clean layout with sidebar navigation:
  - phases
  - current week
  - lessons list
- Progress indicators everywhere:
  - phase progress %
  - week checklist
  - lesson completed toggle
- Search:
  - client-side search over lesson titles + short excerpts
- Keyboard friendly:
  - focus states
  - skip-to-content link
- Responsive:
  - mobile sidebar collapses

## 8) Quality bar (acceptance criteria)
Your implementation is done only if:
- Fresh install works with 3 commands:
  1) pnpm install
  2) pnpm db:setup (migrate + seed)
  3) pnpm dev (runs web + api concurrently)
- User can signup, login, select plan, start week 1, complete lessons, see progress persist after refresh
- Lessons show formatted code with copy buttons
- Playground runs JS and TS examples and shows console output/errors
- At least:
  - 4 phases exist
  - every roadmap topic has a lesson page (can be grouped into lessons if needed, but NO roadmap topic should be missing)
  - each lesson has exercises and at least one runnable snippet
  - all listed projects exist with checklists

## 9) Implementation notes (don’t skip these)
- Avoid overengineering. This is a learning tracker, not a bank.
- Keep backend strictly as content + progress API.
- Frontend should cache content responses lightly (React Query optional, but not required).
- Add basic unit tests only if it’s quick; prioritize functionality.
- Provide a well-written README with screenshots placeholders and “how to extend lessons”.

## 10) Deliverables
- Full monorepo code
- Prisma schema + migrations
- Seed script that fully populates course content from the roadmap plus your beginner-friendly expansions
- README with:
  - prerequisites
  - setup
  - dev scripts
  - how to add a new lesson/exercise/project
  - troubleshooting

Build it now. No placeholders like “TODO: later”. If something is too big (example: full chat app implementation), provide detailed instructional content in the course rather than shipping a separate app.

---

#### Here's the course content:
# Course content 
  _A Complete Beginner-to-Job-Ready Learning Path_ 

---

## PHASE 1: JavaScript Mastery (Foundations)

### Core JavaScript
- What is JavaScript?
- How JavaScript runs (JS Engine, Runtime, Call Stack)
- Variables: var, let, const
- Data Types:
  - string, number, boolean
  - null vs undefined
  - symbol, bigint
- Type coercion
- Operators (arithmetic, comparison, logical)

### Control Flow
- if / else
- switch
- loops:
  - for
  - while
  - do-while
  - for...of
  - for...in
- break & continue

### Functions
- Function declarations vs expressions
- Arrow functions
- Parameters & return values
- Default parameters
- Rest parameters
- Pure vs impure functions

### Objects & Arrays
- Creating objects
- Accessing properties
- Object methods
- Arrays and array methods:
  - map
  - filter
  - reduce
  - find
  - some / every
- Destructuring
- Spread operator

### Scope & Closures
- Global vs local scope
- Block scope
- Lexical scoping
- Closures (with real-world examples)

### Asynchronous JavaScript
- Synchronous vs asynchronous
- Callbacks
- Promises
- async / await
- Error handling with try/catch
- Event loop (visual explanation)

### Browser APIs
- DOM manipulation
- Events
- Fetch API
- localStorage & sessionStorage

### Mini Projects
- Interactive Quiz App
- GitHub Profile Finder

### Resources
- JavaScript Guide (MDN):  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- JavaScript Reference (MDN):  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
- You Don’t Know JS (free book series):  
  https://github.com/getify/You-Dont-Know-JS
- JavaScript.info (beginner-friendly explanations):  
  https://javascript.info/
- Event Loop visualizer:  
  https://www.jsv9000.app/

---

## PHASE 2: React Fundamentals

### React Basics
- Why React exists
- SPA vs MPA
- JSX
- Components
- Props
- State

### Hooks
- useState
- useEffect
- useRef
- useMemo
- useCallback

### Component Patterns
- Controlled vs uncontrolled components
- Lifting state up
- Conditional rendering
- Lists & keys

### Styling in React
- CSS Modules
- Inline styles
- Tailwind CSS basics

### Forms
- Handling inputs
- Validation
- Form submission

### Data Fetching
- Fetching data in React
- Loading & error states
- useEffect patterns

### Mini Projects
- Task Manager App
- Weather Dashboard

### Resources
- Official React Docs (new):  
  https://react.dev/
- React Hooks Reference:  
  https://react.dev/reference/react
- React Patterns (conceptual):  
  https://reactpatterns.com/
- Tailwind CSS Docs:  
  https://tailwindcss.com/docs
- Free public APIs for practice:  
  https://github.com/public-apis/public-apis

---

## PHASE 3: Advanced React

### Advanced Hooks
- Custom hooks
- Hook composition

### State Management
- Context API
- When NOT to use context
- Basic Redux concepts (conceptual)

### Performance
- React rendering behavior
- Memoization
- Avoiding unnecessary re-renders

### Routing
- React Router
- Nested routes
- Dynamic routes
- Protected routes

### Testing
- Why testing matters
- Unit vs integration tests
- Intro to React Testing Library

### Mini Projects
- E-Commerce Store
- Real-Time Chat Application

### Resources
- React Router Docs:  
  https://reactrouter.com/en/main
- Redux Essentials (conceptual learning):  
  https://redux.js.org/tutorials/essentials/part-1-overview-concepts
- React Performance Guide:  
  https://react.dev/learn/render-and-commit
- React Testing Library Docs:  
  https://testing-library.com/docs/react-testing-library/intro/
- WebSockets overview (MDN):  
  https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API

---

## PHASE 4: Production-Ready React

### TypeScript with React
- Typing props
- Typing state
- Typing hooks
- Common TS patterns in React

### Project Structure
- Feature-based folders
- Separation of concerns

### Build & Deployment
- Vite build process
- Environment variables
- Production builds

### Next.js Basics
- Why Next.js
- Pages & routing
- SSR vs CSR

### Best Practices
- Code readability
- Error boundaries
- Accessibility basics
- Performance monitoring

### Final Projects
- Portfolio Website (Next.js)
- Full-Stack Dashboard Application

### Resources
- TypeScript Handbook:  
  https://www.typescriptlang.org/docs/handbook/intro.html
- React + TypeScript Cheatsheet:  
  https://react-typescript-cheatsheet.netlify.app/
- Vite Documentation:  
  https://vitejs.dev/guide/
- Next.js Documentation:  
  https://nextjs.org/docs
- Web Accessibility Basics (MDN):  
  https://developer.mozilla.org/en-US/docs/Learn/Accessibility

---

## Learning Plans

### 4-Week Plan (Intensive)
- Week 1: JavaScript Mastery
- Week 2: React Fundamentals
- Week 3: Advanced React
- Week 4: Production-Ready React

### 8-Week Plan (Balanced)
- Weeks 1–2: JavaScript
- Weeks 3–4: React Fundamentals
- Weeks 5–6: Advanced React
- Weeks 7–8: Production-Ready React

### 12-Week Plan (Beginner Friendly)
- Weeks 1–3: JavaScript
- Weeks 4–6: React Fundamentals
- Weeks 7–9: Advanced React
- Weeks 10–12: Production-Ready React
