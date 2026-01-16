import type { LessonContent } from "./javascript-mastery-types";

export const reactFundamentalsBasics: Record<string, LessonContent> = {
  "why-react-exists": {
    title: "Why React exists",
    estimatedMinutes: 60,
    contentMarkdown: `# Why React exists

## What you will learn
- The problems React was created to solve in real products
- The component model and why it scales better than manual DOM updates
- How React fits into the modern frontend stack and team workflows

## Big picture
Before React, building interactive interfaces meant writing a lot of manual DOM code. As apps grew, developers had to track which pieces of the UI needed updating, when to update them, and how to keep state and DOM in sync. That approach worked for small pages but became fragile when multiple engineers touched the same UI over months.

React was built to make UI updates predictable and to make large interfaces easier to reason about. Its core idea is simple: the UI is a function of state. You describe what the UI should look like for a given state, and React takes care of updating the DOM when that state changes. This replaces a tangle of imperative DOM calls with a declarative model that is easier to test and maintain.

## Beginner glossary
- UI (user interface): what the user sees and interacts with on a screen.
- DOM (Document Object Model): the browser's in-memory tree that represents the page. JavaScript can read and change it.
- Render: the process of producing UI output. In React, render means calculating what the UI should look like.
- Component: a reusable piece of UI code that returns UI output.
- State: data that can change over time and affects what the UI shows.
- Props: inputs passed into a component by its parent.

## Mental model
Think of your UI as a tree of components. Each component receives inputs, called props, and may keep local state. When props or state change, the component re-renders, producing a new description of the UI. React compares the new description with the previous one and updates only what changed.

This model has important consequences:
- You can build complex interfaces out of small, reusable building blocks.
- You can isolate change: when a component updates, it does not require manual DOM manipulation in other parts of the tree.
- You can test components by providing inputs and verifying outputs.

## Deep dive: the real problems React addresses
1. State synchronization: In old-style code, you had to update the DOM in multiple places when data changed. React centralizes the logic so a state change leads to a predictable UI change.
2. Complexity and team size: Large teams need boundaries. Components create boundaries with clear inputs and outputs.
3. Reuse: React encourages composition. You can build a design system of shared components across teams.
4. Performance with clarity: React updates only what changes, but you still write clear, straightforward code rather than micro-optimizing manual DOM updates.

## Real world usage
- Product dashboards: Dozens of widgets, charts, and tables that update independently.
- E-commerce: Catalogs, carts, and checkout flows with complex state.
- Internal tools: Forms, filters, and CRUD screens built by small teams with tight deadlines.

React is also widely used with frameworks like Next.js or Remix for server rendering and routing, which improves performance and SEO for content-heavy pages.

## Example walkthrough
Imagine a task app with a list and a counter showing how many tasks remain. In a manual DOM approach, you would update the list and the counter separately and hope they stay consistent. In React, both are computed from the same state, so they cannot drift apart.

    function TaskApp() {
      const [tasks, setTasks] = useState(["Write", "Review", "Ship"]);
      const remaining = tasks.length;
      return (
        <div>
          <h2>Remaining: {remaining}</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </div>
      );
    }

The counter is always correct because it is derived from the same state used for the list.

## Common mistakes
- Treating React as a template engine and stuffing too much logic into render
- Putting every piece of state at the top level instead of keeping it near the component that owns it
- Mutating state directly and expecting React to update the UI

## Practice checklist
- Can you describe a UI as a function of state?
- Can you explain why component boundaries make large codebases easier?
- Can you identify where state should live in a small app?

## Mini project idea
Build a small inventory tracker with a list of items and a summary count. Add an input to add items and a button to remove them. Notice how the list and summary update automatically when state changes.

## Further reading
- https://react.dev/learn
- https://react.dev/learn/thinking-in-react
`,
    quizQuestions: [
      {
        question: "What is one of React's main goals?",
        options: [
          "Directly manipulate the DOM for speed",
          "Make UI updates predictable using state",
          "Replace JavaScript with templates",
          "Handle database queries"
        ],
        correctIndex: 1,
        explanation: "React focuses on state-driven, predictable UI updates."
      },
      {
        question: "What does a declarative UI mean?",
        options: [
          "You describe how to update the DOM step by step",
          "You describe what the UI should look like for a given state",
          "You avoid writing JavaScript",
          "You only use HTML"
        ],
        correctIndex: 1,
        explanation: "Declarative means you describe the desired output."
      },
      {
        question: "Which pattern is strongly associated with React?",
        options: [
          "Bidirectional data flow",
          "Unidirectional data flow",
          "Global mutable state only",
          "No state at all"
        ],
        correctIndex: 1,
        explanation: "React encourages data to flow down through props."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a ProfileCard component that renders a name and role passed via props.",
        starterCode: "function ProfileCard({ name, role }) {\n  return (\n    <div>\n      {/* render name and role */}\n    </div>\n  );\n}\n",
        solutionHintMarkdown: "Use JSX elements like h2 and p with the name and role."
      },
      {
        promptMarkdown: "Explain in 3-4 sentences why React's component model helps teams build large UIs.",
        starterCode: "// Write your answer here",
        solutionHintMarkdown: "Mention reuse, isolation of concerns, and easier maintenance."
      }
    ]
  },
  "spa-vs-mpa": {
    title: "SPA vs MPA",
    estimatedMinutes: 60,
    contentMarkdown: `# SPA vs MPA

## What you will learn
- The architectural differences between single-page and multi-page apps
- How routing, navigation, and data loading work in each
- Real world tradeoffs around performance, SEO, and complexity

## Big picture
A single-page application (SPA) loads one HTML document and updates the UI in the browser as users navigate. A multi-page application (MPA) loads a new HTML document for each route. React can power both, but the user experience and infrastructure needs are different.

## Beginner glossary
- Browser: the app that loads and displays web pages (Chrome, Firefox).
- Server: the computer that sends HTML, CSS, and data to the browser.
- URL: the address of a page, such as /about or /products.
- Route: a path in your app that maps to a specific screen.
- SEO (search engine optimization): making pages easier for search engines to find and understand.
- CSR (client-side rendering): rendering UI in the browser with JavaScript.
- SSR (server-side rendering): rendering HTML on the server before sending it to the browser.

## How SPAs work
In an SPA, the browser loads the app shell once. Navigation happens on the client using a router. When the route changes, React renders a new component tree for that route. Data fetching often happens on the client and can be cached. This creates an app-like experience with fast transitions once the initial bundle is loaded.

Key characteristics:
- Fast navigation after the initial load
- More JavaScript delivered up front
- Routing handled by client-side libraries
- Need to handle deep links by configuring the server

## How MPAs work
In an MPA, each route is a full page request. The server generates and serves the HTML for each page. This is traditional web architecture and still common for content-heavy sites. It provides good SEO out of the box and faster first contentful paint for large pages.

Key characteristics:
- Each navigation reloads the document
- Server handles routing and rendering
- SEO is straightforward for content pages
- More server complexity if you need app-like interactivity

## Hybrid and modern frameworks
Frameworks such as Next.js and Remix combine both approaches. They can render pages on the server for fast first load and SEO, then hydrate on the client for SPA-like interactions. This hybrid approach is common in production apps today.

## Real world tradeoffs
- SEO: MPAs or server rendering are better for content-heavy pages.
- First load: MPAs can be faster because they deliver minimal JS upfront.
- Navigation speed: SPAs feel fast after the initial load.
- Complexity: SPAs require routing, state management, and build tooling.
- Caching: SPAs often benefit from client-side caching strategies.

## Example scenario
A blog might start as an MPA for SEO and simplicity. A dashboard used by authenticated users may be better as an SPA to provide faster in-app navigation and more interactive UI.

## Common mistakes
- Assuming SPAs are always faster, ignoring bundle size
- Ignoring SEO requirements for marketing pages
- Not configuring the server to handle SPA routes

## Practice checklist
- Can you explain how routing works in each model?
- Can you list SEO and performance tradeoffs?
- Can you identify which model fits a given product?

## Mini project idea
Sketch two versions of a simple website: one as an MPA and one as an SPA. List the routes, how data loads, and how navigation works. Decide which one you would ship for a marketing site versus an internal dashboard.

## Further reading
- https://react.dev/learn/start-a-new-react-project
- https://reactrouter.com/en/main/start/overview
`,
    quizQuestions: [
      {
        question: "Which statement best describes an SPA?",
        options: [
          "Each navigation reloads the HTML document",
          "The UI is updated without a full page reload",
          "It does not use JavaScript",
          "It cannot use routing"
        ],
        correctIndex: 1,
        explanation: "SPAs update the UI client-side without full reloads."
      },
      {
        question: "What is a typical tradeoff of SPAs?",
        options: [
          "No need for JavaScript",
          "More complex initial load and SEO handling",
          "Cannot create reusable components",
          "Always slower navigation"
        ],
        correctIndex: 1,
        explanation: "SPAs often need extra work for initial load and SEO."
      },
      {
        question: "Which tool is commonly used to add routing to a React SPA?",
        options: ["React Router", "Redux", "Tailwind", "Jest"],
        correctIndex: 0,
        explanation: "React Router handles client-side routing for SPAs."
      }
    ],
    exercises: [
      {
        promptMarkdown: "List two pros and two cons of SPAs in your own words.",
        starterCode: "// Pros:\n// Cons:",
        solutionHintMarkdown: "Think about navigation speed, bundle size, and SEO."
      },
      {
        promptMarkdown: "Sketch a simple routing flow for an SPA with /, /about, and /contact.",
        starterCode: "// Example: / -> Home, /about -> About, /contact -> Contact",
        solutionHintMarkdown: "Describe how navigation swaps components instead of reloading."
      }
    ]
  },
  "jsx": {
    title: "JSX",
    estimatedMinutes: 60,
    contentMarkdown: `# JSX

## What you will learn
- What JSX is and how it maps to JavaScript
- How JSX expressions work inside components
- Practical rules and patterns for real projects

## Big picture
JSX is a syntax extension that lets you write HTML-like markup inside JavaScript. It is not HTML. It is compiled into JavaScript function calls that create React elements. JSX improves readability by keeping UI markup close to the logic that drives it.

## Beginner glossary
- Element: a lightweight description of UI (what to render).
- Attribute: a name and value pair on an element, such as className or onClick.
- Expression: a piece of JavaScript that produces a value, such as user.name or count + 1.
- Compile: transforming code from one form to another (JSX to JavaScript).

## How JSX actually works
When you write JSX, a compiler transforms it into function calls. For example, a simple element becomes a call that describes the element type, props, and children. React uses that description to build the UI.

This means:
- JSX is just JavaScript, so you can use variables and expressions.
- You cannot write statements inside JSX. Use expressions or move logic outside.
- JSX must return a single parent element. Use fragments when needed.

## Expressions in JSX
You can place any JavaScript expression inside braces. That includes variables, ternaries, and short-circuit logic. This is powerful for conditionally rendering content.

## Attributes and differences from HTML
JSX uses JavaScript naming conventions:
- Use className instead of class
- Use htmlFor instead of for
- Use camelCase for event handlers, such as onClick

## Example walkthrough
Consider a badge component that shows a label and a status. The status is derived from a boolean in state. JSX lets you express this clearly:

    const user = { name: "Sam", online: true };

    function StatusBadge() {
      return (
        <div className="badge">
          <strong>{user.name}</strong>
          <span>{user.online ? "Online" : "Offline"}</span>
        </div>
      );
    }

The code reads like markup but remains fully dynamic.

## Real world usage
- Building reusable components with slots and conditional UI
- Rendering lists and tables from data
- Composing layout with small components

## Common mistakes
- Returning multiple siblings without a wrapper
- Writing if statements directly inside JSX
- Forgetting to close tags, especially for self-closing elements

## Practice checklist
- Can you explain how JSX is compiled?
- Can you use expressions to conditionally render content?
- Can you explain why JSX uses className instead of class?

## Mini project idea
Create a ProfileCard component that renders a user name, title, and online status. Add a button that toggles the status and updates the text.

## Further reading
- https://react.dev/learn/writing-markup-with-jsx
`,
    quizQuestions: [
      {
        question: "JSX is best described as:",
        options: [
          "A template language that replaces JavaScript",
          "A syntax extension that compiles to JavaScript",
          "A new browser language",
          "Pure HTML"
        ],
        correctIndex: 1,
        explanation: "JSX compiles to JavaScript function calls."
      },
      {
        question: "Which attribute should you use instead of class in JSX?",
        options: ["className", "cssClass", "styleClass", "classAttr"],
        correctIndex: 0,
        explanation: "JSX uses className because class is reserved in JS."
      },
      {
        question: "Which is valid inside JSX braces?",
        options: ["if (x) { ... }", "for (...) { ... }", "x && y", "while (...) { ... }"],
        correctIndex: 2,
        explanation: "Only expressions can go inside braces."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a component that renders a user's name and age using JSX expressions.",
        starterCode: "const user = { name: \"Lee\", age: 29 };\n\nfunction Profile() {\n  return (\n    <div>\n      {/* render name and age */}\n    </div>\n  );\n}\n",
        solutionHintMarkdown: "Use the user object inside JSX expressions."
      },
      {
        promptMarkdown: "Rewrite the JSX snippet into plain JavaScript using React.createElement.",
        starterCode: "// JSX\nconst element = <h1>Hello</h1>;",
        solutionHintMarkdown: "Use React.createElement with the tag name and text."
      }
    ]
  },
  "components": {
    title: "Components",
    estimatedMinutes: 60,
    contentMarkdown: `# Components

## What you will learn
- What React components are and why they matter
- How to design components for clarity and reuse
- How to compose components into larger systems

## Big picture
Components are the building blocks of React. They encapsulate UI, behavior, and state. A component can be as small as a button or as large as a page. The power comes from composition: you build complex UIs by nesting smaller pieces.

## Beginner glossary
- Component tree: the hierarchy of components that make up the UI.
- Composition: building larger components by combining smaller ones.
- Re-render: running a component again when its inputs change.

## Component types
Modern React uses function components. A function component takes props as input and returns a description of the UI. Older class components still exist but are less common in new code. The mental model is simple: a component is a function from input to UI.

## Designing good components
A good component has:
- A single clear responsibility
- A small, well-defined API (props)
- Minimal internal state
- A predictable output

Avoid creating huge components that handle too many responsibilities. Break them into smaller pieces.

## Composition patterns
- Containment: parent renders children inside layout
- Specialization: a generic component is customized through props
- Slots: pass elements or render props to customize sections

## Example walkthrough
Consider a toolbar that uses a reusable Button component:

    function Button({ label, onClick }) {
      return <button onClick={onClick}>{label}</button>;
    }

    function Toolbar() {
      return (
        <div>
          <Button label="Save" onClick={() => alert("Saved")} />
          <Button label="Cancel" onClick={() => alert("Cancelled")} />
        </div>
      );
    }

Notice how the UI is built by composing smaller pieces.

## Real world usage
- Design systems: shared Button, Input, Modal components
- Feature teams: each team builds components for their feature area
- Code reuse: avoid duplicating layout or logic across pages

## Common mistakes
- Using one giant component for an entire page
- Duplicating markup instead of extracting a reusable component
- Over-abstracting components with too many props

## Practice checklist
- Can you identify the boundaries of a component?
- Can you refactor duplicated UI into a shared component?
- Can you explain the difference between container and presentational components?

## Mini project idea
Build a small card library with components like Card, CardHeader, CardBody, and CardFooter. Compose them to create a profile card and a product card.

## Further reading
- https://react.dev/learn/your-first-component
`,
    quizQuestions: [
      {
        question: "A React component is typically:",
        options: [
          "A JSON file",
          "A function that returns JSX",
          "A CSS rule",
          "A database table"
        ],
        correctIndex: 1,
        explanation: "Components are functions that return React elements."
      },
      {
        question: "What is component composition?",
        options: [
          "Styling with inline CSS",
          "Combining small components into larger ones",
          "Fetching data",
          "Using class components"
        ],
        correctIndex: 1,
        explanation: "Composition is building UI by nesting components."
      },
      {
        question: "Which statement is true about function components?",
        options: [
          "They cannot use state",
          "They can use hooks like useState",
          "They must return strings",
          "They require a constructor"
        ],
        correctIndex: 1,
        explanation: "Hooks enable state and effects in function components."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Extract a UserAvatar component that renders an image and name.",
        starterCode: "function Profile() {\n  const user = { name: \"Kai\", avatar: \"/avatar.png\" };\n  return (\n    <div>\n      <img src={user.avatar} alt=\"\" />\n      <p>{user.name}</p>\n    </div>\n  );\n}\n",
        solutionHintMarkdown: "Move the image and name into a UserAvatar component that takes props."
      },
      {
        promptMarkdown: "Build a Card component that renders children inside a container.",
        starterCode: "function Card({ children }) {\n  return (\n    <div className=\"card\">\n      {/* render children */}\n    </div>\n  );\n}\n",
        solutionHintMarkdown: "Render children inside the div."
      }
    ]
  },
  "props": {
    title: "Props",
    estimatedMinutes: 60,
    contentMarkdown: `# Props

## What you will learn
- What props are and why they are central to React
- How data flows from parent to child
- How to design a clear and stable props API

## Big picture
Props are inputs passed into a component. They allow a parent to configure a child. Props are read-only inside the child, which encourages predictable data flow and makes components easier to reason about.

## Beginner glossary
- Parent component: the component that renders another component.
- Child component: the component being rendered by a parent.
- Callback: a function passed as a prop so the child can notify the parent.
- Immutable: not changed directly. Props should not be modified inside a child.

## How props work
A parent renders a child and passes values. The child receives them as arguments. Props can be strings, numbers, booleans, objects, arrays, functions, or even other components. When props change, the child re-renders with the new values.

## Designing props
Good props are:
- Specific: a prop should represent one idea
- Predictable: avoid props that do multiple things
- Minimal: fewer props make a component easier to use

Prefer passing functions as props to handle user interactions. This keeps data changes in the parent and avoids hidden side effects.

## Example walkthrough
A ProductCard component receives data and a callback:

    function ProductCard({ name, price, onAdd }) {
      return (
        <div>
          <h3>{name}</h3>
          <p>Price: {price}</p>
          <button onClick={onAdd}>Add to cart</button>
        </div>
      );
    }

    function App() {
      return (
        <ProductCard
          name="Notebook"
          price={12}
          onAdd={() => console.log("Added")}
        />
      );
    }

The child does not mutate the data. It calls the callback and lets the parent decide what to do.

## Real world usage
- Form components that receive labels, values, and onChange handlers
- Layout components that receive children and styling props
- Feature components that accept data from API results

## Common mistakes
- Mutating props inside a child
- Passing too many unrelated props
- Overusing props when state should live in the child

## Practice checklist
- Can you explain the difference between props and state?
- Can you design a component API with a small number of props?
- Can you identify when to pass a callback?

## Mini project idea
Create a reusable Alert component that accepts a type (success, warning, error), a title, and a message. Add a close button that calls a callback passed in as a prop.

## Further reading
- https://react.dev/learn/passing-props-to-a-component
`,
    quizQuestions: [
      {
        question: "Props are:",
        options: [
          "Mutable state inside a component",
          "Read-only inputs passed from a parent",
          "Global variables",
          "CSS classes"
        ],
        correctIndex: 1,
        explanation: "Props are inputs passed into a component and are read-only."
      },
      {
        question: "Which is a good use of props?",
        options: [
          "Passing a label and onClick handler",
          "Storing form input values inside a parent only",
          "Replacing state entirely",
          "Accessing DOM directly"
        ],
        correctIndex: 0,
        explanation: "Props are great for data and callback functions."
      },
      {
        question: "If a child needs to update data, it should:",
        options: [
          "Mutate props directly",
          "Call a callback prop",
          "Use global variables",
          "Refresh the page"
        ],
        correctIndex: 1,
        explanation: "Children request changes via callbacks passed from parents."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Add a variant prop to a Button component and apply a class based on it.",
        starterCode: "function Button({ label, variant }) {\n  return <button className=\"btn\">{label}</button>;\n}\n",
        solutionHintMarkdown: "Use conditional class names like btn and btn-primary."
      },
      {
        promptMarkdown: "Pass a click handler from a parent to a child and log a message on click.",
        starterCode: "function Child({ onPing }) {\n  return <button onClick={onPing}>Ping</button>;\n}\n\nfunction Parent() {\n  return <Child onPing={() => {}} />;\n}\n",
        solutionHintMarkdown: "Inside onPing, log a message."
      }
    ]
  },
  "state": {
    title: "State",
    estimatedMinutes: 60,
    contentMarkdown: `# State

## What you will learn
- What state is and why it exists in React
- How state updates trigger re-renders
- How to manage state safely with immutable updates

## Big picture
State is a component's memory. It holds values that can change over time, like form input, toggles, or data fetched from a server. When state changes, React re-renders the component so the UI reflects the new data.

## Beginner glossary
- Re-render: React runs the component again to produce updated UI.
- Immutable update: creating a new object or array instead of changing the old one.
- Derived state: a value that can be calculated from other state or props.

## How state works
In React, state is updated through a setter function. This allows React to schedule updates and re-render the component. State updates are asynchronous and may be batched, so you should not assume state updates are immediate.

## Immutable updates
React detects changes by comparing references. If you mutate an object or array in place, React may not detect the change. Instead, create a new object or array when updating state.

Example with arrays:

    const [items, setItems] = useState(["a", "b"]);
    setItems((prev) => [...prev, "c"]);

## Derived state
Avoid storing values that can be computed from existing state. If you can calculate it during render, do so. This reduces bugs and keeps state minimal.

## Real world usage
- Form inputs and validation state
- UI toggles like modals and menus
- Data and loading states from API requests

## Example walkthrough
A counter shows how state drives UI:

    function Counter() {
      const [count, setCount] = useState(0);
      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount((prev) => prev + 1)}>Add</button>
        </div>
      );
    }

Each click updates state, which triggers a re-render.

## Common mistakes
- Mutating arrays or objects in state
- Expecting state to change immediately
- Storing derived values instead of computing them

## Practice checklist
- Can you update state without mutating the original value?
- Can you explain when to use the updater function?
- Can you identify state that should be derived instead?

## Mini project idea
Build a shopping cart list. Allow adding and removing items, and compute the total price based on the items array. Keep the total derived from state, not stored separately.

## Further reading
- https://react.dev/learn/state-a-components-memory
`,
    quizQuestions: [
      {
        question: "What happens when state is updated?",
        options: [
          "The page reloads",
          "The component re-renders",
          "The browser cache clears",
          "Nothing until you refresh"
        ],
        correctIndex: 1,
        explanation: "State updates trigger a re-render."
      },
      {
        question: "Why should you avoid mutating state directly?",
        options: [
          "React cannot detect changes reliably",
          "It is slower",
          "It disables hooks",
          "It breaks JSX"
        ],
        correctIndex: 0,
        explanation: "React relies on new references to detect changes."
      },
      {
        question: "When should you use the updater function form of setState?",
        options: [
          "When the new state depends on the previous state",
          "Only in class components",
          "Only for strings",
          "Never"
        ],
        correctIndex: 0,
        explanation: "Use the updater form to avoid stale state."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Build a Toggle component with state that flips between on and off.",
        starterCode: "function Toggle() {\n  // add state\n  return (\n    <button>Toggle</button>\n  );\n}\n",
        solutionHintMarkdown: "Use useState with a boolean and update on click."
      },
      {
        promptMarkdown: "Update an array in state by adding a new item without mutation.",
        starterCode: "const [items, setItems] = useState([\"a\", \"b\"]);\n// add \"c\" to items\n",
        solutionHintMarkdown: "Use setItems with a new array."
      }
    ]
  }
};
