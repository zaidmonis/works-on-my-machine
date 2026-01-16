import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const phases = [
  {
    title: "JavaScript Mastery",
    order: 1,
    description: "Build strong JavaScript foundations, from variables to the event loop.",
    milestoneChecklist: [
      "Explain core JavaScript data types",
      "Write functions with parameters and return values",
      "Manipulate arrays and objects with common methods",
      "Use async/await with error handling"
    ]
  },
  {
    title: "React Fundamentals",
    order: 2,
    description: "Learn the core React mental model and build practical components.",
    milestoneChecklist: [
      "Build reusable React components",
      "Manage state and side effects with hooks",
      "Handle forms and validation",
      "Fetch data with loading and error states"
    ]
  },
  {
    title: "Advanced React Patterns",
    order: 3,
    description: "Level up with hooks, routing, performance, and testing basics.",
    milestoneChecklist: [
      "Create custom hooks for shared logic",
      "Add routing and protected routes",
      "Optimize rendering performance",
      "Write basic component tests"
    ]
  },
  {
    title: "Production-Ready React",
    order: 4,
    description: "Ship real apps with TypeScript, structure, and deployment skills.",
    milestoneChecklist: [
      "Type components with TypeScript",
      "Organize a feature-based project structure",
      "Configure production builds",
      "Apply accessibility best practices"
    ]
  }
];

const phaseTopics: Record<string, { section: string; topics: string[] }[]> = {
  "JavaScript Mastery": [
    {
      section: "Core JavaScript",
      topics: [
        "What is JavaScript?",
        "How JavaScript runs (JS Engine, Runtime, Call Stack)",
        "Variables: var, let, const",
        "Data Types: string, number, boolean",
        "Data Types: null vs undefined",
        "Data Types: symbol, bigint",
        "Type coercion",
        "Operators (arithmetic, comparison, logical)"
      ]
    },
    {
      section: "Control Flow",
      topics: [
        "if / else",
        "switch",
        "loops: for",
        "loops: while",
        "loops: do-while",
        "loops: for...of",
        "loops: for...in",
        "break & continue"
      ]
    },
    {
      section: "Functions",
      topics: [
        "Function declarations vs expressions",
        "Arrow functions",
        "Parameters & return values",
        "Default parameters",
        "Rest parameters",
        "Pure vs impure functions"
      ]
    },
    {
      section: "Objects & Arrays",
      topics: [
        "Creating objects",
        "Accessing properties",
        "Object methods",
        "Arrays and array methods: map",
        "Arrays and array methods: filter",
        "Arrays and array methods: reduce",
        "Arrays and array methods: find",
        "Arrays and array methods: some / every",
        "Destructuring",
        "Spread operator"
      ]
    },
    {
      section: "Scope & Closures",
      topics: [
        "Global vs local scope",
        "Block scope",
        "Lexical scoping",
        "Closures (with real-world examples)"
      ]
    },
    {
      section: "Asynchronous JavaScript",
      topics: [
        "Synchronous vs asynchronous",
        "Callbacks",
        "Promises",
        "async / await",
        "Error handling with try/catch",
        "Event loop (visual explanation)"
      ]
    },
    {
      section: "Browser APIs",
      topics: [
        "DOM manipulation",
        "Events",
        "Fetch API",
        "localStorage & sessionStorage"
      ]
    }
  ],
  "React Fundamentals": [
    {
      section: "React Basics",
      topics: [
        "Why React exists",
        "SPA vs MPA",
        "JSX",
        "Components",
        "Props",
        "State"
      ]
    },
    {
      section: "Hooks",
      topics: [
        "useState",
        "useEffect",
        "useRef",
        "useMemo",
        "useCallback"
      ]
    },
    {
      section: "Component Patterns",
      topics: [
        "Controlled vs uncontrolled components",
        "Lifting state up",
        "Conditional rendering",
        "Lists & keys"
      ]
    },
    {
      section: "Styling in React",
      topics: [
        "CSS Modules",
        "Inline styles",
        "Tailwind CSS basics"
      ]
    },
    {
      section: "Forms",
      topics: [
        "Handling inputs",
        "Validation",
        "Form submission"
      ]
    },
    {
      section: "Data Fetching",
      topics: [
        "Fetching data in React",
        "Loading & error states",
        "useEffect patterns"
      ]
    }
  ],
  "Advanced React Patterns": [
    {
      section: "Advanced Hooks",
      topics: ["Custom hooks", "Hook composition"]
    },
    {
      section: "State Management",
      topics: ["Context API", "When NOT to use context", "Basic Redux concepts (conceptual)"]
    },
    {
      section: "Performance",
      topics: ["React rendering behavior", "Memoization", "Avoiding unnecessary re-renders"]
    },
    {
      section: "Routing",
      topics: ["React Router", "Nested routes", "Dynamic routes", "Protected routes"]
    },
    {
      section: "Testing",
      topics: ["Why testing matters", "Unit vs integration tests", "Intro to React Testing Library"]
    }
  ],
  "Production-Ready React": [
    {
      section: "TypeScript with React",
      topics: [
        "Typing props",
        "Typing state",
        "Typing hooks",
        "Common TS patterns in React"
      ]
    },
    {
      section: "Project Structure",
      topics: ["Feature-based folders", "Separation of concerns"]
    },
    {
      section: "Build & Deployment",
      topics: ["Vite build process", "Environment variables", "Production builds"]
    },
    {
      section: "Next.js Basics",
      topics: ["Why Next.js", "Pages & routing", "SSR vs CSR"]
    },
    {
      section: "Best Practices",
      topics: [
        "Code readability",
        "Error boundaries",
        "Accessibility basics",
        "Performance monitoring"
      ]
    }
  ]
};

const resources = {
  "JavaScript Mastery": [
    {
      title: "JavaScript Guide (MDN)",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
      type: "docs"
    },
    {
      title: "JavaScript Reference (MDN)",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference",
      type: "docs"
    },
    {
      title: "You Don't Know JS (book series)",
      url: "https://github.com/getify/You-Dont-Know-JS",
      type: "tutorial"
    },
    {
      title: "JavaScript.info",
      url: "https://javascript.info/",
      type: "tutorial"
    },
    {
      title: "Event Loop Visualizer",
      url: "https://www.jsv9000.app/",
      type: "tool"
    }
  ],
  "React Fundamentals": [
    {
      title: "Official React Docs",
      url: "https://react.dev/",
      type: "docs"
    },
    {
      title: "React Hooks Reference",
      url: "https://react.dev/reference/react",
      type: "docs"
    },
    {
      title: "React Patterns",
      url: "https://reactpatterns.com/",
      type: "tutorial"
    },
    {
      title: "Tailwind CSS Docs",
      url: "https://tailwindcss.com/docs",
      type: "docs"
    },
    {
      title: "Public APIs for practice",
      url: "https://github.com/public-apis/public-apis",
      type: "practice"
    }
  ],
  "Advanced React Patterns": [
    {
      title: "React Router Docs",
      url: "https://reactrouter.com/en/main",
      type: "docs"
    },
    {
      title: "Redux Essentials",
      url: "https://redux.js.org/tutorials/essentials/part-1-overview-concepts",
      type: "tutorial"
    },
    {
      title: "React Performance Guide",
      url: "https://react.dev/learn/render-and-commit",
      type: "docs"
    },
    {
      title: "React Testing Library",
      url: "https://testing-library.com/docs/react-testing-library/intro/",
      type: "docs"
    },
    {
      title: "WebSockets Overview",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
      type: "docs"
    }
  ],
  "Production-Ready React": [
    {
      title: "TypeScript Handbook",
      url: "https://www.typescriptlang.org/docs/handbook/intro.html",
      type: "docs"
    },
    {
      title: "React + TypeScript Cheatsheet",
      url: "https://react-typescript-cheatsheet.netlify.app/",
      type: "tutorial"
    },
    {
      title: "Vite Documentation",
      url: "https://vitejs.dev/guide/",
      type: "docs"
    },
    {
      title: "Next.js Documentation",
      url: "https://nextjs.org/docs",
      type: "docs"
    },
    {
      title: "Web Accessibility Basics",
      url: "https://developer.mozilla.org/en-US/docs/Learn/Accessibility",
      type: "docs"
    }
  ]
};

const projects = {
  "JavaScript Mastery": [
    {
      title: "Interactive Quiz App",
      description: `## Overview
Build a multi-question quiz with scoring and localStorage persistence.

## Step-by-step build plan
1. Design the data model for questions and answers.
2. Render one question at a time with Next/Previous buttons.
3. Calculate score and show results.
4. Save high score to localStorage.

## Suggested folder structure
\`\`\`
/src
  /components
  /data
  /utils
\`\`\`

## Stretch goals
- Add a timer per question.
- Randomize question order.
- Add difficulty tags.`,
      checklist: [
        "Render questions from data",
        "Track answers and score",
        "Show results summary",
        "Persist high score in localStorage"
      ]
    },
    {
      title: "GitHub Profile Finder",
      description: `## Overview
Search the GitHub API and render a profile card with repositories.

## Step-by-step build plan
1. Build a search form with input + button.
2. Call the GitHub Users API.
3. Render the profile details and recent repos.
4. Handle loading and error states.

## Suggested folder structure
\`\`\`
/src
  /components
  /hooks
  /services
\`\`\`

## Stretch goals
- Add pagination for repos.
- Show starred repositories.
- Add dark mode toggle.`,
      checklist: [
        "Input with submit button",
        "Fetch GitHub user profile",
        "Render avatar, bio, followers",
        "Handle loading and error states"
      ]
    }
  ],
  "React Fundamentals": [
    {
      title: "Task Manager App",
      description: `## Overview
Build a task manager with CRUD, filters, and persistent storage.

## Step-by-step build plan
1. Create a task form and list UI.
2. Add edit and delete capabilities.
3. Filter tasks by status.
4. Persist tasks in localStorage.

## Suggested folder structure
\`\`\`
/src
  /components
  /hooks
  /utils
\`\`\`

## Stretch goals
- Add due dates.
- Add drag-and-drop reordering.
- Add bulk actions.`,
      checklist: [
        "Add and remove tasks",
        "Mark tasks complete",
        "Filter by status",
        "Save tasks to localStorage"
      ]
    },
    {
      title: "Weather Dashboard",
      description: `## Overview
Fetch weather data and render a dashboard with current conditions.

## Step-by-step build plan
1. Build a search bar for city names.
2. Fetch current weather from a public API.
3. Render temperature, humidity, and conditions.
4. Save recent searches.

## Suggested folder structure
\`\`\`
/src
  /components
  /services
  /styles
\`\`\`

## Stretch goals
- Add 5-day forecast.
- Add geolocation support.
- Display weather icons.`,
      checklist: [
        "Search by city",
        "Display temperature and conditions",
        "Show loading and errors",
        "Store recent searches"
      ]
    }
  ],
  "Advanced React Patterns": [
    {
      title: "E-Commerce Store",
      description: `## Overview
Build a product listing, cart, and checkout summary.

## Step-by-step build plan
1. Render a grid of products from data.
2. Add filters and sorting.
3. Build a cart drawer or page.
4. Add a checkout summary.

## Suggested folder structure
\`\`\`
/src
  /components
  /contexts
  /data
\`\`\`

## Stretch goals
- Add product details page.
- Add coupon code handling.
- Persist cart to localStorage.`,
      checklist: [
        "Product grid with filters",
        "Add/remove items from cart",
        "Cart total calculation",
        "Persist cart in localStorage"
      ]
    },
    {
      title: "Real-Time Chat Application",
      description: `## Overview
Mock real-time updates with WebSockets or polling.

## Step-by-step build plan
1. Build chat UI layout.
2. Send messages and render message list.
3. Simulate receiving messages with polling or WebSocket mock.
4. Show connection status.

## Suggested folder structure
\`\`\`
/src
  /components
  /hooks
  /services
\`\`\`

## Stretch goals
- Add read receipts.
- Add typing indicators.
- Add emoji support.`,
      checklist: [
        "Chat layout with message list",
        "Send and receive messages",
        "Show connection status",
        "Add typing indicators"
      ]
    }
  ],
  "Production-Ready React": [
    {
      title: "Portfolio Website (Next.js)",
      description: `## Overview
Plan and build a personal portfolio with Next.js routing.

## Step-by-step build plan
1. Create page layout and navigation.
2. Add About and Projects pages.
3. Add SEO metadata.
4. Deploy to Vercel.

## Suggested folder structure
\`\`\`
/app
  /about
  /projects
  /components
\`\`\`

## Stretch goals
- Add a blog section.
- Add CMS integration.
- Add analytics.`,
      checklist: [
        "Home, About, Projects pages",
        "Responsive layout",
        "SEO metadata",
        "Deploy to Vercel"
      ]
    },
    {
      title: "Full-Stack Dashboard",
      description: `## Overview
Design a dashboard with authentication, charts, and data tables.

## Step-by-step build plan
1. Build login screen and route guards.
2. Create dashboard layout with navigation.
3. Fetch and render data in tables.
4. Add settings page.

## Suggested folder structure
\`\`\`
/src
  /components
  /pages
  /services
\`\`\`

## Stretch goals
- Add charts and exports.
- Add role-based access.
- Add notifications.`,
      checklist: [
        "Login screen and protected routes",
        "Dashboard layout with navigation",
        "Fetch data from API",
        "Add settings page"
      ]
    }
  ]
};

const exampleCode = (topic: string) => `// ${topic}\nconst message = "Learning ${topic}";\nconsole.log(message);`;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const lessonTemplate = (topic: string, section: string) => `# ${topic}\n\n## What you\'ll learn\n- The core idea behind ${topic}\n- Where ${topic} fits inside ${section}\n- How to explain ${topic} in plain language\n\n## Concept explanation\n${topic} is a building block of modern JavaScript and React apps. Think of it as a tool you can combine with other tools to solve real problems. We\'ll start with the smallest example, then scale it up to something you\'d use in a real project.\n\n## Examples\n\n\`\`\`js\n${exampleCode(topic)}\n\`\`\`\n\n\`\`\`js\nconst sample = () => ({ topic: "${topic}", ready: true });\nconsole.log(sample());\n\`\`\`\n\n\`\`\`ts\ntype Lesson = { topic: string; ready: boolean };\nconst lesson: Lesson = { topic: "${topic}", ready: true };\nconsole.log(lesson);\n\`\`\`\n\n## Common mistakes + debugging tips\n- Skipping small tests. Always log intermediate values.\n- Mixing ${topic} with unrelated concepts before you\'re ready.\n- Forgetting to read error messages carefully.\n\n## Real-world uses\n- Building UI interactions\n- Data transformations\n- API integrations\n\n## Quick checks\n1. Can you explain ${topic} to a friend?\n2. Where would you use ${topic} in a small app?\n3. What happens if you remove it entirely?\n\n## Try it\n\`\`\`playground\n${exampleCode(topic)}\n\`\`\`\n`;

async function main() {
  await prisma.userProjectProgress.deleteMany();
  await prisma.userExerciseAttempt.deleteMany();
  await prisma.userQuizAttempt.deleteMany();
  await prisma.userLessonProgress.deleteMany();
  await prisma.userPlan.deleteMany();
  await prisma.project.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.week.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.phase.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("password123", 10);
  await prisma.user.create({
    data: {
      username: "demo",
      passwordHash
    }
  });

  const phaseRecords = await Promise.all(
    phases.map((phase) => prisma.phase.create({ data: phase }))
  );

  for (const phase of phaseRecords) {
    const resourcesForPhase = resources[phase.title] ?? [];
    for (const resource of resourcesForPhase) {
      await prisma.resource.create({
        data: {
          phaseId: phase.id,
          ...resource
        }
      });
    }

    const projectsForPhase = projects[phase.title] ?? [];
    for (const project of projectsForPhase) {
      await prisma.project.create({
        data: {
          phaseId: phase.id,
          title: project.title,
          descriptionMarkdown: project.description,
          checklist: project.checklist
        }
      });
    }

    const sections = phaseTopics[phase.title] ?? [];
    let order = 1;
    for (const section of sections) {
      for (const topic of section.topics) {
        const lesson = await prisma.lesson.create({
          data: {
            phaseId: phase.id,
            title: topic,
            slug: slugify(topic),
            order: order++,
            contentMarkdown: lessonTemplate(topic, section.section),
            estimatedMinutes: 30
          }
        });

        await prisma.quizQuestion.createMany({
          data: [
            {
              lessonId: lesson.id,
              question: `Which statement best describes ${topic}?`,
              options: [
                "A syntax rule",
                "A core concept you use to build logic",
                "A browser-only API",
                "A styling technique"
              ],
              correctIndex: 1,
              explanation: `${topic} is a concept you use to build logic and behavior.`
            },
            {
              lessonId: lesson.id,
              question: `Where would ${topic} be most useful?`,
              options: ["Debugging only", "UI behavior", "Database indexing", "Image editing"],
              correctIndex: 1,
              explanation: `${topic} helps you structure UI behavior and logic.`
            },
            {
              lessonId: lesson.id,
              question: `What is the first step when learning ${topic}?`,
              options: ["Memorize everything", "Practice with a tiny example", "Skip basics", "Avoid errors"],
              correctIndex: 1,
              explanation: "Start small and iterate with quick feedback."
            }
          ]
        });

        await prisma.exercise.createMany({
          data: [
            {
              lessonId: lesson.id,
              promptMarkdown: `Explain ${topic} in your own words in 2-3 sentences.`,
              starterCode: exampleCode(topic),
              solutionHintMarkdown: "Keep it simple and focus on the big idea."
            },
            {
              lessonId: lesson.id,
              promptMarkdown: `Modify the starter code to log a custom message about ${topic}.`,
              starterCode: exampleCode(topic),
              solutionHintMarkdown: "Change the string and log it again."
            },
            {
              lessonId: lesson.id,
              promptMarkdown: `Create a tiny example that uses ${topic} inside a function.`,
              starterCode: `function demo() {\n  // TODO: add ${topic} here\n}\n\ndemo();`,
              solutionHintMarkdown: "Return a value or log something from inside the function."
            }
          ]
        });
      }
    }
  }

  const plans = [
    { name: "W4" },
    { name: "W8" },
    { name: "W12" }
  ];

  const planRecords = await Promise.all(plans.map((plan) => prisma.plan.create({ data: plan })));

  const phaseByOrder = [...phaseRecords].sort((a, b) => a.order - b.order);

  const planWeekDistribution: Record<string, number[]> = {
    W4: [1, 1, 1, 1],
    W8: [2, 2, 2, 2],
    W12: [3, 3, 3, 3]
  };

  for (const plan of planRecords) {
    const distribution = planWeekDistribution[plan.name] ?? [1, 1, 1, 1];
    let weekIndex = 1;
    for (let i = 0; i < phaseByOrder.length; i++) {
      const phase = phaseByOrder[i];
      const weeksForPhase = distribution[i];
      for (let w = 0; w < weeksForPhase; w++) {
        await prisma.week.create({
          data: {
            planId: plan.id,
            index: weekIndex,
            title: `Week ${weekIndex}: ${phase.title}`,
            phaseId: phase.id
          }
        });
        weekIndex += 1;
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
