import type { LessonContent } from "./javascript-mastery-types";

export const productionReadyReactLessons: Record<string, LessonContent> = {
  "typing-props": {
    title: "Typing props",
    estimatedMinutes: 90,
    contentMarkdown: `# Typing props

## What you will learn
- Why typed props prevent bugs and improve developer experience
- The most common ways to type React props
- How to type children, optional props, and default values

## Beginner glossary
- Type: a description of what shape a value should have.
- Props: inputs passed into a component.
- Optional prop: a prop that is not required.
- Interface: a TypeScript way to describe object shape.

## Big picture
Typing props makes components safer and easier to use. It ensures that a component receives the right values and that mistakes are caught at build time. In real teams, typed props act as self-documentation and make code reviews faster.

## Mental model
Think of props types as a contract. The component promises to behave correctly if the caller follows the contract, and the compiler enforces that contract.

## Common patterns
### Interface pattern
~~~ts
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}
~~~

### Type alias pattern
~~~ts
type CardProps = {
  title: string;
  description?: string;
};
~~~

## Typing children
Children can be typed with ReactNode to allow strings, numbers, elements, and fragments.

## Optional props and defaults
Use the optional marker and set defaults in the function signature. This keeps the type accurate and the runtime behavior predictable.

## Real-world usage
- Preventing undefined values in UI.
- Guaranteeing required callbacks exist.
- Communicating component API to other teams.

## Common mistakes
- Using any for convenience.
- Forgetting to type children.
- Overly strict types that prevent valid usage.

## Practice checklist
- Are required props marked as required?
- Are optional props clear and documented by type?
- Do you provide sensible defaults?

## Quick check questions
1. Why are typed props useful in teams?
2. What does the optional marker mean?
3. What type is commonly used for children?
`,
    quizQuestions: [
      {
        question: "Why are typed props valuable?",
        options: [
          "They remove the need for components",
          "They catch mistakes at build time",
          "They make CSS faster",
          "They remove hooks"
        ],
        correctIndex: 1,
        explanation: "Typed props catch mistakes early and document component APIs."
      },
      {
        question: "What does a question mark on a prop type mean?",
        options: ["The prop is optional", "The prop is required", "The prop is private", "The prop is an array"],
        correctIndex: 0,
        explanation: "The question mark marks a prop as optional."
      },
      {
        question: "Which type is commonly used for children?",
        options: ["ReactNode", "HTMLElement", "Element", "string only"],
        correctIndex: 0,
        explanation: "ReactNode covers all valid React children types."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Type the props for a Badge component that accepts label, color, and an optional icon.",
        starterCode: "function Badge(props) {\n  return null;\n}\n",
        solutionHintMarkdown: "Use an interface or type alias and mark icon optional."
      }
    ]
  },
  "typing-state": {
    title: "Typing state",
    estimatedMinutes: 90,
    contentMarkdown: `# Typing state

## What you will learn
- How to type useState for simple and complex values
- How to handle nullable and union state
- How to avoid common TypeScript state pitfalls

## Beginner glossary
- State: data that changes over time and affects UI.
- Union type: a type that can be one of several options.
- Nullable: a value that can be null.

## Big picture
TypeScript helps you make state predictable. Properly typed state prevents undefined access, clarifies initial values, and makes it easier to refactor components later.

## Mental model
Think of state as a box with a label. The label tells you exactly what can go in the box. TypeScript enforces that rule.

## Basic state typing
If the initial value is clear, TypeScript can infer the type.

## Example: inferred type
~~~ts
const [count, setCount] = useState(0);
~~~

## Example: union type
~~~ts
type Status = "idle" | "loading" | "success" | "error";
const [status, setStatus] = useState<Status>("idle");
~~~

## Example: nullable state
~~~ts
type User = { id: string; name: string };
const [user, setUser] = useState<User | null>(null);
~~~

## Real-world usage
- Tracking async status with union types.
- Representing optional data with null.
- Preventing invalid state transitions.

## Common mistakes
- Using any as a shortcut.
- Setting initial state to null without typing union.
- Storing unrelated data in one state object.

## Practice checklist
- Is the initial state value clear and accurate?
- Do unions reflect actual states?
- Are null values handled in rendering logic?

## Quick check questions
1. When should you use a union type in state?
2. Why is null often better than undefined for empty state?
3. What happens if you rely on any?
`,
    quizQuestions: [
      {
        question: "Why use union types in state?",
        options: [
          "To allow only valid states",
          "To avoid TypeScript",
          "To remove state",
          "To speed up rendering"
        ],
        correctIndex: 0,
        explanation: "Union types ensure state stays within valid values."
      },
      {
        question: "Why type nullable state explicitly?",
        options: [
          "To avoid runtime errors",
          "To speed up the network",
          "To avoid using hooks",
          "To hide values"
        ],
        correctIndex: 0,
        explanation: "Explicit null types prevent undefined access mistakes."
      },
      {
        question: "What is a common pitfall with useState typing?",
        options: [
          "Letting TypeScript infer from the initial value",
          "Using any for convenience",
          "Using unions for async status",
          "Using null unions"
        ],
        correctIndex: 1,
        explanation: "Using any removes type safety."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create state for a user profile that can be null initially and later store a user object.",
        starterCode: "// TODO: type User and useState\n",
        solutionHintMarkdown: "Use a union type like User | null."
      }
    ]
  },
  "typing-hooks": {
    title: "Typing hooks",
    estimatedMinutes: 90,
    contentMarkdown: `# Typing hooks

## What you will learn
- How to type custom hooks return values
- How to type functions passed into hooks
- How to define hook options and config types

## Beginner glossary
- Generic: a type that can adapt to different input types.
- Return type: the type of value a function gives back.
- Options object: configuration passed to a hook.

## Big picture
Typed hooks make shared logic safer and easier to adopt. When a hook has a clear type signature, other developers can use it with confidence and IDE autocomplete becomes more accurate.

## Mental model
A hook is an API. Types describe how to call that API and what you will get back, just like documentation but enforced by the compiler.

## Typing a hook return
~~~ts
type UseToggleResult = {
  value: boolean;
  toggle: () => void;
};

function useToggle(initial = false): UseToggleResult {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return { value, toggle };
}
~~~

## Typing hook arguments
Use interfaces or type aliases for options objects.

## Example: options
~~~ts
type FetchOptions = {
  skip?: boolean;
  retryCount?: number;
};

function useFetch(url: string, options: FetchOptions) {
  // ...
}
~~~

## Real-world usage
- Data fetching hooks with typed response shapes.
- Form hooks with typed fields and errors.
- Auth hooks returning user and auth actions.

## Common mistakes
- Returning arrays without clear typing (hard to read).
- Using any in hook return values.
- Overusing generics when simple types suffice.

## Practice checklist
- Does the hook return type make usage clear?
- Are options typed and optional where appropriate?
- Can the hook be used safely without extra casting?

## Quick check questions
1. Why type a hook return value explicitly?
2. What is a good use of generics in a hook?
3. What makes hook types easy to read?
`,
    quizQuestions: [
      {
        question: "Why type a custom hook return value?",
        options: [
          "To avoid state updates",
          "To make the hook API clear and safe",
          "To remove JSX",
          "To avoid imports"
        ],
        correctIndex: 1,
        explanation: "Types describe the API and prevent incorrect usage."
      },
      {
        question: "When are generics useful in hooks?",
        options: [
          "When the hook should work with different data types",
          "When you want to avoid types",
          "When the hook only returns a boolean",
          "When the hook never returns"
        ],
        correctIndex: 0,
        explanation: "Generics allow hooks to adapt to multiple data shapes."
      },
      {
        question: "What makes hook types easy to read?",
        options: [
          "Short, descriptive return type names",
          "Using any everywhere",
          "Nested generics with no defaults",
          "No types at all"
        ],
        correctIndex: 0,
        explanation: "Clear naming and minimal complexity improve readability."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Type a custom useCounter hook that returns count, increment, and decrement.",
        starterCode: "function useCounter(initial = 0) {\n  // TODO\n}\n",
        solutionHintMarkdown: "Return an object with count and two functions, and type the return."
      }
    ]
  },
  "common-ts-patterns-in-react": {
    title: "Common TS patterns in React",
    estimatedMinutes: 90,
    contentMarkdown: `# Common TS patterns in React

## What you will learn
- The most common TypeScript patterns used in React projects
- When to use union types, discriminated unions, and utility types
- How to type event handlers and refs

## Beginner glossary
- Utility type: TypeScript helpers like Partial and Pick.
- Discriminated union: a union type with a shared tag property.
- Ref: a reference to a DOM node or mutable value.

## Big picture
TypeScript patterns help you express UI logic safely. In React, common patterns include typing events, managing component variants, and handling optional values without runtime errors.

## Pattern: event typing
~~~ts
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  setValue(event.target.value);
}
~~~

## Pattern: discriminated union for component variants
~~~ts
type AlertProps =
  | { variant: "success"; message: string }
  | { variant: "error"; message: string; retry: () => void };
~~~

## Pattern: utility types
Use Partial for partial updates and Pick to select specific fields.

## Typing refs
~~~ts
const inputRef = useRef<HTMLInputElement | null>(null);
~~~

## Real-world usage
- Form validation with typed events.
- Component variants with strict prop requirements.
- Sharing data types between client and server.

## Common mistakes
- Using any for event types.
- Ignoring nullable refs.
- Overusing utility types and making code unclear.

## Practice checklist
- Are event handlers typed correctly?
- Are unions used for component variants?
- Are refs typed as nullable when needed?

## Quick check questions
1. Why use discriminated unions in React props?
2. What is a safe type for input change events?
3. When should you use Partial?
`,
    quizQuestions: [
      {
        question: "Why use discriminated unions in props?",
        options: [
          "To allow any prop combination",
          "To enforce valid prop combinations",
          "To avoid TypeScript",
          "To remove variants"
        ],
        correctIndex: 1,
        explanation: "Discriminated unions enforce valid variants."
      },
      {
        question: "Which type is correct for an input change event?",
        options: [
          "React.ChangeEvent<HTMLInputElement>",
          "MouseEvent",
          "KeyboardEvent",
          "any"
        ],
        correctIndex: 0,
        explanation: "ChangeEvent with HTMLInputElement is standard for inputs."
      },
      {
        question: "When is Partial useful?",
        options: [
          "When you need to update only some fields",
          "When you want to avoid types",
          "When you always have all fields",
          "When you use JSX"
        ],
        correctIndex: 0,
        explanation: "Partial allows optional fields in update objects."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a discriminated union for a Banner component with success and error variants.",
        starterCode: "type BannerProps = // TODO\n",
        solutionHintMarkdown: "Use a shared variant field and variant-specific properties."
      }
    ]
  },
  "feature-based-folders": {
    title: "Feature-based folders",
    estimatedMinutes: 75,
    contentMarkdown: `# Feature-based folders

## What you will learn
- Why feature-based structure scales better than type-based structure
- How to organize files around user features
- How to keep shared code clean and discoverable

## Beginner glossary
- Feature-based structure: files grouped by product feature.
- Type-based structure: files grouped by type (components, hooks, utils).
- Cohesion: related code kept together.

## Big picture
As projects grow, type-based folders become crowded and hard to navigate. Feature-based structure groups code by the area of the product it belongs to. This improves clarity, reduces cross-feature coupling, and makes ownership clearer for teams.

## Mental model
Think of your codebase like a neighborhood. Each feature is a building with everything it needs inside. Shared utilities are like city services used by multiple buildings.

## Example structure
~~~
/src
  /features
    /billing
      BillingPage.tsx
      billingApi.ts
      billingHooks.ts
    /profile
      ProfilePage.tsx
      profileApi.ts
      profileHooks.ts
  /shared
    /components
    /hooks
    /utils
~~~

## Why this helps
- Easier to find related files.
- Clear boundaries between features.
- Simpler to delete or refactor a feature.

## Real-world usage
- Teams own features rather than file types.
- Features can be migrated or removed with less risk.
- Code reviews become more focused.

## Common mistakes
- Duplicating shared utilities across features.
- Over-nesting folders without need.
- Mixing feature code into shared folders.

## Practice checklist
- Can you find all files for a feature quickly?
- Are shared utilities actually shared across features?
- Are feature boundaries clear?

## Quick check questions
1. Why is feature-based structure more scalable?
2. What belongs in shared folders?
3. How does feature structure help teams?
`,
    quizQuestions: [
      {
        question: "Why use feature-based folders?",
        options: [
          "To group code by related functionality",
          "To hide code from other teams",
          "To avoid imports",
          "To remove shared code"
        ],
        correctIndex: 0,
        explanation: "Feature-based structure keeps related code together."
      },
      {
        question: "What should go in shared folders?",
        options: [
          "Feature-specific pages",
          "Utilities used across multiple features",
          "Random files",
          "Only CSS"
        ],
        correctIndex: 1,
        explanation: "Shared folders contain reusable code across features."
      },
      {
        question: "How does feature structure help teams?",
        options: [
          "It reduces ownership clarity",
          "It makes feature ownership clearer",
          "It removes the need for tests",
          "It blocks collaboration"
        ],
        correctIndex: 1,
        explanation: "Teams can own features and their related code."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Propose a feature-based folder structure for a task management app with Projects, Tasks, and Settings.",
        starterCode: "// Sketch the folder tree in comments\n",
        solutionHintMarkdown: "Group by feature and keep shared components in a shared folder."
      }
    ]
  },
  "separation-of-concerns": {
    title: "Separation of concerns",
    estimatedMinutes: 75,
    contentMarkdown: `# Separation of concerns

## What you will learn
- The idea of separating UI, logic, and data access
- How to avoid mixing concerns in React components
- Practical patterns for cleaner code

## Beginner glossary
- Concern: a distinct responsibility, like UI or data fetching.
- Coupling: how strongly two parts of code depend on each other.
- Cohesion: how well related responsibilities stay together.

## Big picture
Separation of concerns keeps code understandable and easy to maintain. In React, it often means separating presentation from data and separating logic from rendering. This helps with testing and reuse.

## Mental model
Imagine a restaurant. The chef cooks, the server serves, and the manager handles logistics. Each role is different but connected. Code should be similar.

## Practical patterns
- Container and presentational components.
- Custom hooks for reusable logic.
- Service modules for API calls.

## Example approach
- UI component receives data as props.
- Hook manages data fetching and state.
- API module handles HTTP logic.

## Real-world usage
- Easier testing (UI vs data logic).
- Reuse hooks in multiple components.
- Replace API logic without changing UI.

## Common mistakes
- Fetching data directly in deeply nested UI components.
- Large components with too many responsibilities.
- Duplicated logic in multiple places.

## Practice checklist
- Can you describe each component responsibility?
- Is data fetching isolated from UI rendering?
- Are hooks reusable across components?

## Quick check questions
1. Why is separation of concerns helpful?
2. What should a UI component focus on?
3. How do custom hooks support separation?
`,
    quizQuestions: [
      {
        question: "Why separate concerns in React code?",
        options: [
          "To make files larger",
          "To improve maintainability and testability",
          "To avoid hooks",
          "To remove state"
        ],
        correctIndex: 1,
        explanation: "Separation improves clarity, reuse, and testing."
      },
      {
        question: "What should a presentational component focus on?",
        options: [
          "Rendering UI",
          "Fetching data",
          "Managing routes",
          "Updating localStorage"
        ],
        correctIndex: 0,
        explanation: "Presentational components focus on UI."
      },
      {
        question: "How do custom hooks help separation?",
        options: [
          "They mix concerns",
          "They isolate logic from UI",
          "They remove state",
          "They stop rendering"
        ],
        correctIndex: 1,
        explanation: "Hooks can encapsulate logic separate from UI components."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Refactor a component that fetches data and renders UI into a hook plus a presentational component.",
        starterCode: "function UserCard() {\n  // fetch and render in one place\n}\n",
        solutionHintMarkdown: "Create a useUser hook and pass data into a simple UI component."
      }
    ]
  },
  "vite-build-process": {
    title: "Vite build process",
    estimatedMinutes: 75,
    contentMarkdown: `# Vite build process

## What you will learn
- How Vite serves code in development
- What happens during a production build
- How bundling and optimization work

## Beginner glossary
- Bundler: tool that combines modules into optimized files.
- HMR: hot module replacement, updates code without full reload.
- Build: the process of preparing production assets.

## Big picture
Vite uses modern browser support in development, serving modules directly for fast startup. For production, it bundles and optimizes assets with Rollup. This gives you fast dev and efficient production builds.

## Mental model
Development is like editing a live document with instant changes. Production is like printing the final version, optimized and compressed for delivery.

## Dev server behavior
- Uses native ES modules.
- Starts quickly because it does not bundle everything upfront.
- HMR updates only changed modules.

## Production build behavior
- Bundles JavaScript and CSS.
- Tree-shakes unused code.
- Minifies for smaller file size.

## Real-world usage
- Faster development feedback cycles.
- Smaller production bundles.
- Easier code splitting and lazy loading.

## Common mistakes
- Confusing dev behavior with production performance.
- Forgetting to test the production build.
- Relying on dev-only environment variables.

## Practice checklist
- Do you understand the difference between dev and build?
- Are you testing production builds locally?
- Are assets optimized correctly?

## Quick check questions
1. Why is Vite fast in development?
2. What tool does Vite use for production builds?
3. Why should you test production builds?
`,
    quizQuestions: [
      {
        question: "Why is Vite fast in development?",
        options: [
          "It pre-bundles everything",
          "It serves native ES modules and uses HMR",
          "It disables JavaScript",
          "It avoids the browser"
        ],
        correctIndex: 1,
        explanation: "Vite uses native modules and fast HMR."
      },
      {
        question: "What tool does Vite use for production builds?",
        options: ["Rollup", "Webpack", "Parcel", "Babel"],
        correctIndex: 0,
        explanation: "Vite uses Rollup for production bundling."
      },
      {
        question: "Why test production builds?",
        options: [
          "Dev and prod can behave differently",
          "To remove TypeScript",
          "To slow down deployments",
          "To disable caching"
        ],
        correctIndex: 0,
        explanation: "Production builds can have different behavior and errors."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Describe the steps Vite takes during dev and during production build.",
        starterCode: "// List dev and build steps\n",
        solutionHintMarkdown: "Mention native modules, HMR, Rollup bundling, and minification."
      }
    ]
  },
  "environment-variables": {
    title: "Environment variables",
    estimatedMinutes: 75,
    contentMarkdown: `# Environment variables

## What you will learn
- What environment variables are and why they matter
- How Vite exposes environment variables to the client
- How to keep secrets out of the frontend

## Beginner glossary
- Environment variable: a value provided outside your code at runtime.
- Build-time variable: values replaced during the build.
- Secret: data that should not be exposed publicly.

## Big picture
Environment variables let you configure apps for different environments: development, staging, production. In frontend apps, only variables prefixed with VITE_ are exposed. Secrets should never be shipped to the browser.

## Mental model
Environment variables are like settings in a control panel. You can change them without editing the code, but only the safe ones should be visible in the UI.

## Example usage
~~~ts
const apiUrl = import.meta.env.VITE_API_URL;
~~~

## Security rule
Never put secrets (API keys with write access, private tokens) in frontend variables. Assume everything shipped to the browser is public.

## Real-world usage
- Switching API endpoints per environment.
- Enabling or disabling features.
- Changing analytics IDs.

## Common mistakes
- Forgetting the VITE_ prefix in Vite.
- Storing secrets in frontend variables.
- Mixing environment variables with runtime config.

## Practice checklist
- Are variables prefixed correctly?
- Are sensitive values kept on the server?
- Are defaults defined for missing values?

## Quick check questions
1. Why must frontend secrets never be in environment variables?
2. What prefix does Vite use to expose variables?
3. When are environment variables replaced in Vite builds?
`,
    quizQuestions: [
      {
        question: "Why should secrets not be in frontend environment variables?",
        options: [
          "Because the browser can view them",
          "Because they make builds faster",
          "Because they are always encrypted",
          "Because they are ignored"
        ],
        correctIndex: 0,
        explanation: "Anything in the frontend bundle is public."
      },
      {
        question: "What prefix exposes env vars in Vite?",
        options: ["VITE_", "REACT_", "PUBLIC_", "NODE_"],
        correctIndex: 0,
        explanation: "Vite exposes variables prefixed with VITE_."
      },
      {
        question: "When are env variables injected?",
        options: [
          "At build time",
          "At runtime in the browser",
          "Only on the server",
          "After deployment"
        ],
        correctIndex: 0,
        explanation: "Vite replaces env vars at build time."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create two environment variables for API and analytics and show how you would read them in code.",
        starterCode: "// Example: VITE_API_URL, VITE_ANALYTICS_ID\n",
        solutionHintMarkdown: "Use import.meta.env and document which are safe for the client."
      }
    ]
  },
  "production-builds": {
    title: "Production builds",
    estimatedMinutes: 75,
    contentMarkdown: `# Production builds

## What you will learn
- What changes between development and production
- How to validate production output
- Common production-only issues and how to avoid them

## Beginner glossary
- Minification: removing whitespace and shortening names.
- Source maps: files that map minified code back to source.
- Dead code elimination: removing unused code.

## Big picture
Production builds focus on performance and reliability. Code is minified, assets are optimized, and tree-shaking removes unused code. This can introduce differences from development, so testing production builds is critical.

## Mental model
Development is a workshop; production is the final product shipped to customers. The final product is optimized, but changes in the process can reveal issues not seen in the workshop.

## Common differences
- Strict tree-shaking and minification.
- Different environment variables.
- Performance-sensitive behavior (timeouts, caching).

## Validation steps
- Run the production build locally.
- Verify loading speed and functionality.
- Check source maps if errors occur.

## Common mistakes
- Relying on dev-only warnings.
- Using non-deterministic code that behaves differently when minified.
- Missing runtime configuration.

## Practice checklist
- Do you test the production build before deploy?
- Are source maps configured for debugging?
- Are environment variables correct?

## Quick check questions
1. Why can production builds behave differently?
2. What is tree-shaking?
3. Why are source maps useful?
`,
    quizQuestions: [
      {
        question: "Why can production builds behave differently?",
        options: [
          "They are minified and optimized",
          "They run without JavaScript",
          "They never use CSS",
          "They are slower"
        ],
        correctIndex: 0,
        explanation: "Minification and optimization can change behavior."
      },
      {
        question: "What is tree-shaking?",
        options: [
          "Removing unused code",
          "Adding more code",
          "Updating CSS",
          "Running tests"
        ],
        correctIndex: 0,
        explanation: "Tree-shaking removes unused code."
      },
      {
        question: "Why use source maps?",
        options: [
          "To debug minified code",
          "To improve CSS",
          "To remove errors",
          "To speed up builds"
        ],
        correctIndex: 0,
        explanation: "Source maps map minified code to original source."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a checklist for validating a production build before deployment.",
        starterCode: "// List at least 5 items\n",
        solutionHintMarkdown: "Include tests, environment variables, and performance checks."
      }
    ]
  },
  "why-next-js": {
    title: "Why Next.js",
    estimatedMinutes: 75,
    contentMarkdown: `# Why Next.js

## What you will learn
- The problems Next.js solves for React apps
- The benefits of server rendering and routing
- When Next.js is a good fit

## Beginner glossary
- Framework: a tool that provides structure and defaults.
- SSR: server-side rendering, HTML generated on the server.
- SSG: static site generation, HTML generated at build time.

## Big picture
Next.js is a React framework that adds routing, server rendering, and production best practices out of the box. It reduces setup work and gives teams a standard way to build full-stack React apps.

## Mental model
Next.js is like a fully equipped workshop. React is the toolbox, but Next.js provides the workbench, instructions, and safety rules.

## Core benefits
- File-based routing.
- Server rendering for faster first load.
- Built-in API routes.
- Automatic code splitting.

## Real-world usage
- Marketing pages with SEO needs.
- E-commerce sites with fast initial load.
- Hybrid apps that mix static and dynamic content.

## When Next.js is not necessary
- Small internal tools with no SEO requirements.
- Apps already using a stable custom server setup.

## Practice checklist
- Do you need SEO or fast first render?
- Do you want built-in routing and API routes?
- Is your team ready for a framework?

## Quick check questions
1. What problem does Next.js solve beyond React?
2. Why is SSR useful for SEO?
3. When might Next.js be overkill?
`,
    quizQuestions: [
      {
        question: "Why do teams choose Next.js?",
        options: [
          "It removes the need for React",
          "It adds routing and server rendering",
          "It disables TypeScript",
          "It only builds static HTML"
        ],
        correctIndex: 1,
        explanation: "Next.js provides routing, SSR, and more structure."
      },
      {
        question: "Why is SSR helpful?",
        options: [
          "It improves SEO and first load",
          "It removes JavaScript",
          "It hides UI",
          "It makes CSS slower"
        ],
        correctIndex: 0,
        explanation: "SSR delivers HTML quickly and helps search engines index content."
      },
      {
        question: "When is Next.js not necessary?",
        options: [
          "For a small internal tool with no SEO needs",
          "For a large e-commerce site",
          "For a marketing site",
          "For a blog"
        ],
        correctIndex: 0,
        explanation: "Small internal tools may not need framework features."
      }
    ],
    exercises: [
      {
        promptMarkdown: "List three reasons a team might choose Next.js over a plain React SPA.",
        starterCode: "// Write three reasons\n",
        solutionHintMarkdown: "Mention routing, SSR/SSG, and built-in tooling."
      }
    ]
  },
  "pages-routing": {
    title: "Pages and routing",
    estimatedMinutes: 75,
    contentMarkdown: `# Pages and routing

## What you will learn
- How file-based routing works in Next.js
- How nested routes and dynamic routes are created
- How layout and shared UI fit into routing

## Beginner glossary
- File-based routing: routing defined by the file system.
- Dynamic route: route with a variable segment.
- Layout: shared UI that wraps pages.

## Big picture
Next.js uses the file system to define routes. This makes routing explicit and easy to discover. In modern Next.js, layouts allow shared UI across pages, and dynamic routes handle data-driven pages.

## Mental model
Your routes are your folder structure. Creating a new page is like creating a new file in the right folder.

## Example
A file at pages/about.tsx becomes /about. A file at pages/products/[id].tsx becomes /products/123.

## Real-world usage
- Product detail pages.
- Blog posts by slug.
- Account settings sections.

## Common mistakes
- Misnaming dynamic route files.
- Duplicating layout logic in each page.
- Forgetting to handle not found routes.

## Practice checklist
- Can you map routes to files quickly?
- Are dynamic route params handled safely?
- Is shared UI placed in layouts?

## Quick check questions
1. What is file-based routing?
2. How do you create a dynamic route?
3. Why are layouts useful?
`,
    quizQuestions: [
      {
        question: "What defines routes in Next.js?",
        options: ["The file system", "A routes.json file", "A router config only", "A database"],
        correctIndex: 0,
        explanation: "Next.js uses the file system to map routes."
      },
      {
        question: "How do you define a dynamic route?",
        options: ["Use brackets like [id]", "Use query only", "Use hash links", "Use context"],
        correctIndex: 0,
        explanation: "Dynamic routes use bracket syntax in file names."
      },
      {
        question: "Why use layouts?",
        options: ["To avoid shared UI", "To share UI across pages", "To disable routing", "To remove CSS"],
        correctIndex: 1,
        explanation: "Layouts reuse shared UI across multiple pages."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Sketch a file structure for a blog with /, /posts, and /posts/[slug].",
        starterCode: "// Example: pages/index.tsx\n",
        solutionHintMarkdown: "Use a posts folder and a [slug] file for dynamic routes."
      }
    ]
  },
  "ssr-vs-csr": {
    title: "SSR vs CSR",
    estimatedMinutes: 90,
    contentMarkdown: `# SSR vs CSR

## What you will learn
- The difference between server-side and client-side rendering
- The tradeoffs for performance, SEO, and complexity
- How to choose the right rendering strategy

## Beginner glossary
- SSR: server-side rendering, HTML produced on the server.
- CSR: client-side rendering, HTML built in the browser.
- Hydration: attaching React behavior to server-rendered HTML.

## Big picture
SSR provides faster first content and better SEO, but adds server complexity. CSR is simpler and can be great for apps behind login, but initial load can be slower. Many modern apps use a hybrid approach.

## Mental model
SSR is like delivering a finished meal to the table. CSR is like bringing ingredients and cooking at the table. Each has tradeoffs.

## Pros of SSR
- Faster first paint.
- Better SEO.
- Works better on slow devices.

## Pros of CSR
- Simpler server setup.
- Rich client-side interactions.
- Often easier caching on the client.

## Hybrid approaches
Frameworks like Next.js combine SSR, SSG, and CSR for different pages.

## Practice checklist
- Does this page need SEO?
- Is first load speed critical?
- Can you handle server complexity?

## Quick check questions
1. What is hydration?
2. When is CSR a good fit?
3. Why might SSR improve SEO?
`,
    quizQuestions: [
      {
        question: "What is hydration?",
        options: [
          "Attaching React behavior to server-rendered HTML",
          "Removing JavaScript",
          "Caching images",
          "Compiling TypeScript"
        ],
        correctIndex: 0,
        explanation: "Hydration connects React to SSR HTML."
      },
      {
        question: "When is CSR a good fit?",
        options: [
          "Public marketing site",
          "App behind login with rich interactivity",
          "Static blog",
          "SEO-heavy landing page"
        ],
        correctIndex: 1,
        explanation: "CSR works well for interactive apps behind login."
      },
      {
        question: "Why might SSR improve SEO?",
        options: [
          "It delivers HTML content to crawlers",
          "It hides content",
          "It disables scripts",
          "It blocks indexing"
        ],
        correctIndex: 0,
        explanation: "Search engines can index SSR HTML."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Choose three pages in a hypothetical app and decide whether each should be SSR, SSG, or CSR.",
        starterCode: "// Example: marketing page, dashboard, blog post\n",
        solutionHintMarkdown: "Consider SEO and interactivity for each page."
      }
    ]
  },
  "code-readability": {
    title: "Code readability",
    estimatedMinutes: 75,
    contentMarkdown: `# Code readability

## What you will learn
- Why readable code saves time and prevents bugs
- Practical techniques for clear components
- How naming and structure affect long-term maintainability

## Beginner glossary
- Readability: how easily a human can understand code.
- Maintainability: how easy it is to change code safely.
- Refactor: restructure code without changing behavior.

## Big picture
Readable code is a major productivity multiplier. It reduces onboarding time, speeds up reviews, and lowers the cost of bugs. A readable component is often more important than a clever one.

## Mental model
Code is read far more than it is written. Your future self is your most important user.

## Practical techniques
- Use descriptive names for components and variables.
- Keep components small and focused.
- Extract complex logic into hooks or helpers.
- Avoid deeply nested JSX.

## Real-world usage
- Faster code reviews.
- Fewer bugs caused by misunderstandings.
- Easier collaboration across teams.

## Common mistakes
- Overly generic names like data or item.
- Large components with multiple responsibilities.
- Hidden side effects inside render logic.

## Practice checklist
- Can a new developer understand this file quickly?
- Are complex sections documented or extracted?
- Are names consistent and meaningful?

## Quick check questions
1. Why is readability important in production code?
2. What is a sign a component is too large?
3. How do names impact readability?
`,
    quizQuestions: [
      {
        question: "Why does readability matter?",
        options: [
          "It improves maintenance and reduces bugs",
          "It reduces CSS size",
          "It removes TypeScript",
          "It avoids tests"
        ],
        correctIndex: 0,
        explanation: "Readable code is easier to maintain and safer to change."
      },
      {
        question: "Which is a sign a component is too large?",
        options: [
          "Multiple unrelated responsibilities",
          "Simple render with few props",
          "Short function body",
          "Clear naming"
        ],
        correctIndex: 0,
        explanation: "Multiple responsibilities are a sign of an oversized component."
      },
      {
        question: "How do names impact readability?",
        options: [
          "They communicate intent and reduce confusion",
          "They slow down builds",
          "They change runtime behavior",
          "They remove errors"
        ],
        correctIndex: 0,
        explanation: "Good names clarify the purpose of code."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Refactor a complex component into smaller pieces and rename variables for clarity.",
        starterCode: "function BigComponent() {\n  // too much logic here\n}\n",
        solutionHintMarkdown: "Extract helper functions and child components with clear names."
      }
    ]
  },
  "error-boundaries": {
    title: "Error boundaries",
    estimatedMinutes: 75,
    contentMarkdown: `# Error boundaries

## What you will learn
- What error boundaries are and why they exist
- How to implement an error boundary
- What errors they do and do not catch

## Beginner glossary
- Error boundary: a React component that catches render errors.
- Fallback UI: UI shown when an error occurs.
- Render error: an error thrown during rendering.

## Big picture
Error boundaries prevent the entire app from crashing when a component throws during render. They allow you to show a friendly fallback and log the error for debugging.

## Mental model
Think of an error boundary as a safety net under a trapeze. If something falls, the rest of the show continues.

## What they catch
- Errors during render.
- Errors in lifecycle methods.
- Errors in constructors.

## What they do not catch
- Errors inside event handlers.
- Errors in async code.
- Errors in server rendering.

## Example structure
Create a class component with componentDidCatch and getDerivedStateFromError to render fallback UI.

## Real-world usage
- Protecting the main layout from crashes.
- Isolating unstable widgets.
- Logging errors to monitoring services.

## Common mistakes
- Using error boundaries for every small component.
- Forgetting to log errors.
- Expecting them to catch async errors.

## Practice checklist
- Do you have boundaries around risky UI sections?
- Do you show a helpful fallback?
- Are errors logged with context?

## Quick check questions
1. What kind of errors do boundaries catch?
2. What errors do they not catch?
3. Why are error boundaries useful in production?
`,
    quizQuestions: [
      {
        question: "What do error boundaries catch?",
        options: [
          "Errors during render and lifecycle",
          "Errors in event handlers only",
          "Network errors only",
          "Build-time errors"
        ],
        correctIndex: 0,
        explanation: "Error boundaries catch render and lifecycle errors."
      },
      {
        question: "Which error is NOT caught by error boundaries?",
        options: [
          "Errors in event handlers",
          "Errors during render",
          "Errors in lifecycle methods",
          "Errors in constructors"
        ],
        correctIndex: 0,
        explanation: "Event handler errors are not caught by boundaries."
      },
      {
        question: "Why use error boundaries?",
        options: [
          "To prevent the whole app from crashing",
          "To improve CSS",
          "To remove state",
          "To avoid routing"
        ],
        correctIndex: 0,
        explanation: "They isolate failures and keep the app usable."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create an error boundary component that renders a fallback message and logs errors.",
        starterCode: "class ErrorBoundary extends React.Component {\n  // TODO\n}\n",
        solutionHintMarkdown: "Use getDerivedStateFromError and componentDidCatch to set error state and log."
      }
    ]
  },
  "accessibility-basics": {
    title: "Accessibility basics",
    estimatedMinutes: 90,
    contentMarkdown: `# Accessibility basics

## What you will learn
- What accessibility means in web apps
- Core practices for accessible React components
- How to test accessibility quickly

## Beginner glossary
- Accessibility: making products usable by everyone, including people with disabilities.
- ARIA: attributes that improve accessibility when native elements are not enough.
- Keyboard navigation: using the app without a mouse.

## Big picture
Accessibility is not optional. It improves usability for everyone and is often required by law. In React, you must build components with proper semantics, focus handling, and readable labels.

## Mental model
Accessibility is like adding ramps to a building. It helps some users directly, and makes the entire building easier for everyone to navigate.

## Core practices
- Use semantic HTML elements first.
- Provide labels for inputs.
- Ensure focus styles are visible.
- Support keyboard navigation.

## Quick testing methods
- Navigate using only the keyboard.
- Run a basic audit with browser tools.
- Check color contrast.

## Real-world usage
- Accessible forms for sign-up.
- Proper button roles for clickable elements.
- Modals that trap focus and close with Escape.

## Common mistakes
- Using divs for buttons without role and keyboard handling.
- Missing labels on inputs.
- Inaccessible color contrast.

## Practice checklist
- Are interactive elements reachable by keyboard?
- Do labels describe inputs clearly?
- Is focus visible?

## Quick check questions
1. Why is semantic HTML important?
2. What is a common accessibility mistake in React?
3. How can you quickly test keyboard access?
`,
    quizQuestions: [
      {
        question: "Why use semantic HTML?",
        options: [
          "It provides built-in accessibility",
          "It reduces JavaScript",
          "It changes styling automatically",
          "It blocks screen readers"
        ],
        correctIndex: 0,
        explanation: "Semantic elements have built-in accessibility behavior."
      },
      {
        question: "What is a common accessibility mistake?",
        options: [
          "Missing labels on inputs",
          "Using button elements",
          "Using headings",
          "Using lists"
        ],
        correctIndex: 0,
        explanation: "Inputs without labels are hard to use with screen readers."
      },
      {
        question: "How can you test accessibility quickly?",
        options: [
          "Use keyboard-only navigation",
          "Disable CSS",
          "Disable JavaScript",
          "Avoid focus"
        ],
        correctIndex: 0,
        explanation: "Keyboard navigation reveals many accessibility issues."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Audit a simple form and list three accessibility improvements you would make.",
        starterCode: "// Example: add labels, fix button roles, improve contrast\n",
        solutionHintMarkdown: "Focus on labels, focus order, and semantic elements."
      }
    ]
  },
  "performance-monitoring": {
    title: "Performance monitoring",
    estimatedMinutes: 75,
    contentMarkdown: `# Performance monitoring

## What you will learn
- Why monitoring matters in production
- Key metrics for frontend performance
- How to set up basic monitoring and alerts

## Beginner glossary
- Metric: a measurable value like load time or error rate.
- RUM: real user monitoring, data from actual users.
- Lighthouse: a tool for performance audits.

## Big picture
You cannot improve what you do not measure. Performance monitoring gives visibility into how the app behaves for real users. It helps you find slow pages, regressions, and user-impacting issues.

## Mental model
Monitoring is like a dashboard in a car. Without it, you cannot tell if something is going wrong until it is too late.

## Core metrics
- First Contentful Paint (FCP).
- Largest Contentful Paint (LCP).
- Time to Interactive (TTI).
- Error rate and slow API responses.

## Real-world usage
- Detecting regressions after deployments.
- Measuring the impact of new features.
- Setting budgets for performance.

## Common mistakes
- Monitoring only in development.
- Ignoring real user data.
- Not setting alerts for regressions.

## Practice checklist
- Do you track at least a few core metrics?
- Are alerts set for major regressions?
- Do you review performance data regularly?

## Quick check questions
1. Why is monitoring necessary in production?
2. Name two core performance metrics.
3. What is the difference between lab tests and real user data?
`,
    quizQuestions: [
      {
        question: "Why monitor performance in production?",
        options: [
          "To understand real user experience",
          "To avoid testing",
          "To remove logs",
          "To avoid fixing bugs"
        ],
        correctIndex: 0,
        explanation: "Production monitoring reflects real user conditions."
      },
      {
        question: "Which is a core web performance metric?",
        options: ["LCP", "RGB", "FPS", "DOM size"],
        correctIndex: 0,
        explanation: "LCP is a core web vital."
      },
      {
        question: "What is RUM?",
        options: [
          "Real user monitoring",
          "Random user metrics",
          "Runtime UI model",
          "Reactive UI module"
        ],
        correctIndex: 0,
        explanation: "RUM collects performance data from real users."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a simple monitoring plan listing metrics, tools, and alert thresholds.",
        starterCode: "// Example: LCP < 2.5s, error rate < 1%\n",
        solutionHintMarkdown: "Include at least three metrics and how you would track them."
      }
    ]
  }
};
