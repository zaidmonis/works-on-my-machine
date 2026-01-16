import type { LessonContent } from "./javascript-mastery-types";

export const advancedReactPatternsLessons: Record<string, LessonContent> = {
  "custom-hooks": {
    title: "Custom hooks",
    estimatedMinutes: 90,
    contentMarkdown: `# Custom hooks

## What you will learn
- Why custom hooks exist and the problems they solve
- How to design and name a hook so it is reusable and safe
- How to manage side effects, cleanup, and dependencies inside a hook

## Beginner glossary
- Hook: a React function that starts with "use" and can call other hooks.
- Custom hook: your own hook that bundles reusable logic.
- Encapsulation: hiding details so a consumer only sees a clean API.
- Dependency array: the list of values that control when an effect runs.
- Cleanup: logic that runs when a component unmounts or a dependency changes.

## Big picture
Custom hooks are the way React encourages code reuse for stateful logic. Before hooks, React developers reused logic by sharing components or mixins. That often produced awkward component trees or hidden behavior. Custom hooks let you share logic without sharing UI. You can keep a component tree clean while still reusing state, effects, and subscriptions.

## Mental model
Think of a custom hook as a small, focused service. It has an API that returns values and actions. Internally, it can keep state, run effects, and clean up resources. The component using the hook stays simple and only deals with the return values.

## When to create a custom hook
- You have logic repeated in multiple components (fetching data, syncing localStorage, tracking window size).
- You need to package a complicated sequence (form validation, debounced input, caching).
- You want to isolate complexity and make components more readable.

## Core design principles
1. Keep the API small. Return only what a component needs.
2. Make the hook predictable. Use clear naming for returned values.
3. Separate concerns. A hook should do one job well.
4. Handle cleanup. Any subscriptions or timers should be cleaned up.

## Example: useWindowSize
~~~js
import { useEffect, useState } from "react";

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
~~~

## Why this design works
- The hook hides all DOM event logic.
- It returns a simple object.
- It cleans up the event listener.

## Real-world usage
- Responsive layouts that react to viewport size.
- Collapsible navigation that changes based on screen width.
- Visualizations that need to recalc on resize.

## Common mistakes and fixes
- Missing cleanup: leads to memory leaks or duplicate listeners.
- Returning unstable functions: causes unnecessary re-renders in consumers.
- Overloading a hook: one hook doing many unrelated jobs.

## Testing mindset
Treat a hook like an API. Verify it returns expected values and cleans up correctly. In React Testing Library, you can test hooks with a small wrapper component.

## Practice checklist
- Can you name a repeated pattern and extract it?
- Does the hook return a small, clear API?
- Does the hook avoid direct DOM manipulation unless necessary?

## Quick check questions
1. What is the primary benefit of a custom hook over a shared component?
2. Why do custom hooks always start with "use"?
3. What happens if a hook sets up a subscription but never cleans it up?
`,
    quizQuestions: [
      {
        question: "What is the main benefit of a custom hook?",
        options: [
          "It makes JSX shorter",
          "It shares stateful logic without sharing UI",
          "It guarantees performance improvements",
          "It replaces components"
        ],
        correctIndex: 1,
        explanation: "Custom hooks package reusable logic without changing UI structure."
      },
      {
        question: "Why must a custom hook start with the word use?",
        options: [
          "To enable React hook rules and linting",
          "To make it faster",
          "To allow class components",
          "To avoid imports"
        ],
        correctIndex: 0,
        explanation: "React and tooling rely on the use prefix to apply hook rules."
      },
      {
        question: "What should a hook do when it registers an event listener?",
        options: [
          "Nothing",
          "Return cleanup to remove the listener",
          "Create another listener",
          "Mutate global state"
        ],
        correctIndex: 1,
        explanation: "Cleanup prevents leaks and duplicate listeners."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a custom hook named useLocalStorage that reads a value from localStorage and keeps it in state.",
        starterCode: "import { useEffect, useState } from \"react\";\n\nfunction useLocalStorage(key, initialValue) {\n  // TODO\n}\n\nexport default useLocalStorage;\n",
        solutionHintMarkdown: "Read from localStorage once, then update localStorage whenever state changes."
      }
    ]
  },
  "hook-composition": {
    title: "Hook composition",
    estimatedMinutes: 90,
    contentMarkdown: `# Hook composition

## What you will learn
- What hook composition means and why it matters
- How to combine small hooks into larger behaviors
- How to avoid tight coupling between hooks

## Beginner glossary
- Composition: building complex behavior by combining smaller parts.
- Abstraction: hiding details behind a simpler interface.
- Dependency: something a hook relies on to function.
- Orchestration: coordinating multiple hooks to work together.

## Big picture
Hook composition is how you build larger features from smaller, reusable hooks. Instead of a single massive hook, you create a few small ones that each focus on one job, then build a higher-level hook that composes them. This keeps code flexible and testable.

## Mental model
Imagine a meal. You have ingredients (small hooks), a recipe (composed hook), and the final dish (component behavior). Each ingredient should be useful on its own, but when combined they create something more valuable.

## Simple composition example
~~~js
function useOnlineStatus() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    function handleOnline() { setOnline(true); }
    function handleOffline() { setOnline(false); }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return online;
}

function useStatusLabel() {
  const online = useOnlineStatus();
  return online ? "Online" : "Offline";
}
~~~

## Why composition helps
- Smaller hooks are easier to test.
- You can replace or extend a single hook without rewriting everything.
- Higher-level hooks can orchestrate complex flows.

## Strategies for good composition
1. Keep base hooks focused: one responsibility each.
2. Make composed hooks return the same shape each time.
3. Avoid hidden side effects that surprise consumers.
4. Expose options through parameters rather than global state.

## Real-world usage
- useAuth can combine useUser, useTokenRefresh, and usePermissions.
- useSearch can combine useDebounce, useQueryParams, and useFetch.
- useForm can compose validation, dirty tracking, and submit handling.

## Common mistakes
- Circular dependencies between hooks.
- Over-composition where a hook just passes values through without adding value.
- Too many optional parameters that make the API confusing.

## Practice checklist
- Can you list the responsibilities and split them into hooks?
- Does each hook have a clear name and single purpose?
- Does the composed hook hide complexity from the component?

## Quick check questions
1. What is the primary goal of hook composition?
2. Why should base hooks be small and focused?
3. What makes an API for a composed hook easy to use?
`,
    quizQuestions: [
      {
        question: "What is hook composition?",
        options: [
          "Calling hooks conditionally",
          "Combining small hooks to create bigger behavior",
          "Replacing hooks with classes",
          "Only using built-in hooks"
        ],
        correctIndex: 1,
        explanation: "Composition combines smaller hooks into higher-level behavior."
      },
      {
        question: "Why should base hooks be focused on a single responsibility?",
        options: [
          "It makes them harder to reuse",
          "It makes them easier to test and recombine",
          "It prevents effects from running",
          "It removes the need for cleanup"
        ],
        correctIndex: 1,
        explanation: "Small, focused hooks are easier to reuse and test."
      },
      {
        question: "Which is a sign of poor composition?",
        options: [
          "Hooks with clear names",
          "Hooks that return stable APIs",
          "Hooks that depend on each other in a loop",
          "Hooks that document their behavior"
        ],
        correctIndex: 2,
        explanation: "Circular dependencies indicate poor design."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a useSearch hook that composes a useDebounce hook and a fetch helper. It should return results and a loading flag.",
        starterCode: "function useDebounce(value, delay) {\n  // TODO\n}\n\nfunction useSearch(query) {\n  // TODO\n}\n",
        solutionHintMarkdown: "Debounce the query first, then fetch results when the debounced value changes."
      }
    ]
  },
  "context-api": {
    title: "Context API",
    estimatedMinutes: 90,
    contentMarkdown: `# Context API

## What you will learn
- What context is and when it is the right tool
- How providers and consumers work together
- How to avoid common context performance traps

## Beginner glossary
- Context: a way to pass data through the component tree without props at every level.
- Provider: a component that supplies a context value.
- Consumer: a component that reads a context value.
- Global state: data shared across many parts of an app.

## Big picture
React Context is designed for data that many components need, such as theme, locale, current user, or feature flags. It avoids prop drilling, where you pass props through many layers just to reach a deep child. Context makes the data available to any descendant.

## Mental model
Think of context like a radio broadcast. The provider is the station, and any component tuned to that station can hear the message. When the station changes its message, all listeners update.

## How context works
1. Create a context with a default value.
2. Wrap a section of the component tree with a provider.
3. Read the value from any descendant with useContext.

## Example: theme context
~~~js
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({ theme: "light", setTheme: () => {} });

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme}
    </button>
  );
}
~~~

## Real-world usage
- Theme and layout preferences.
- User authentication and roles.
- Current language and translations.
- Feature flags and A/B tests.

## Performance considerations
Context updates re-render all consumers. If you store large or frequently changing data in context, it can cause wide re-renders. Split context by concern, and use memoization for context values when needed.

## Common mistakes
- Putting all state in one giant context.
- Using context for data that only a few components need.
- Forgetting to memoize the provider value when it is an object.

## Practice checklist
- Is this data truly shared across many components?
- Can the provider value be stable between renders?
- Should you split into multiple smaller contexts?

## Quick check questions
1. What problem does context solve that props alone struggle with?
2. Why can context cause extra re-renders?
3. Name two real-world values that fit well in context.
`,
    quizQuestions: [
      {
        question: "What is the primary purpose of React Context?",
        options: [
          "To replace state",
          "To avoid prop drilling for shared data",
          "To make fetch requests",
          "To optimize rendering automatically"
        ],
        correctIndex: 1,
        explanation: "Context is for shared data across many components without prop drilling."
      },
      {
        question: "What happens when a context value changes?",
        options: [
          "Only the provider rerenders",
          "All consumers of that context rerender",
          "Nothing changes",
          "Only class components update"
        ],
        correctIndex: 1,
        explanation: "All consumers re-render when the context value changes."
      },
      {
        question: "Which data is a good fit for context?",
        options: [
          "Local input value used in one component",
          "Theme preference used across the app",
          "Temporary animation state",
          "A derived value used once"
        ],
        correctIndex: 1,
        explanation: "Shared values like theme are good candidates for context."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create an AuthContext that exposes a user object and a signOut function. Use it in a ProfileMenu component.",
        starterCode: "import { createContext, useContext } from \"react\";\n\nconst AuthContext = createContext(null);\n\nfunction AuthProvider({ children }) {\n  // TODO\n}\n\nfunction ProfileMenu() {\n  // TODO\n}\n",
        solutionHintMarkdown: "Provide a value with user and signOut, then use useContext inside ProfileMenu."
      }
    ]
  },
  "when-not-to-use-context": {
    title: "When NOT to use context",
    estimatedMinutes: 75,
    contentMarkdown: `# When NOT to use context

## What you will learn
- The downsides of using context for everything
- How to decide between props, context, and other state solutions
- Practical alternatives to context

## Beginner glossary
- Prop drilling: passing props through many levels to reach a child.
- Local state: state kept within a single component.
- Global state: state shared widely across the app.

## Big picture
Context is powerful, but it is not a replacement for all state. When misused, it creates performance problems, makes components harder to test, and blurs boundaries. The best React apps use context sparingly and intentionally.

## Mental model
Context is like a public announcement system. Use it only for information that everyone really needs. For smaller groups, a direct conversation (props) is clearer and less noisy.

## Signs you should avoid context
- Only one or two components need the data.
- The data changes frequently (like typing into an input).
- The context value is a large object that changes a lot.
- The tree is small and prop drilling is not a real problem.

## Better alternatives
1. Props: simplest and most explicit.
2. Lifting state: move state to the nearest common parent.
3. Composition: pass children with render props or children-as-function.
4. Custom hooks: share logic without global state.

## Example: input value
If only an input and its parent need a value, context is unnecessary. A local state in the parent and props down is the simplest approach.

## Performance impact
Every time the provider value changes, all consumers re-render. If you store fast-changing values, many parts of the app update needlessly.

## Testing impact
Components that rely on context require providers in tests. Overuse increases test setup complexity and hides dependencies.

## Practice checklist
- Is the data needed in many places or just a few?
- Can you keep the data closer to where it is used?
- Does this context change frequently?

## Quick check questions
1. Why is context a poor fit for rapidly changing values?
2. Name two alternatives to context for sharing data.
3. How does context affect testing complexity?
`,
    quizQuestions: [
      {
        question: "When is context NOT a good fit?",
        options: [
          "Theme preferences",
          "User locale",
          "Input state used by one component",
          "Feature flags"
        ],
        correctIndex: 2,
        explanation: "Local input state is better kept close to the component."
      },
      {
        question: "Why can context hurt performance?",
        options: [
          "It prevents re-renders",
          "It causes every consumer to re-render on change",
          "It blocks effects",
          "It requires class components"
        ],
        correctIndex: 1,
        explanation: "Any context change triggers re-renders for all consumers."
      },
      {
        question: "Which is a simpler alternative to context for a small subtree?",
        options: ["Props", "WebSockets", "Redux", "Service workers"],
        correctIndex: 0,
        explanation: "Props are explicit and simple for small trees."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Refactor a component tree that uses context for a single form field into a prop-based solution.",
        starterCode: "function Form() {\n  // currently uses context for input value\n  return null;\n}\n",
        solutionHintMarkdown: "Move state to the parent component and pass value and onChange as props."
      }
    ]
  },
  "basic-redux-concepts-conceptual": {
    title: "Basic Redux concepts (conceptual)",
    estimatedMinutes: 90,
    contentMarkdown: `# Basic Redux concepts (conceptual)

## What you will learn
- The core Redux ideas: store, actions, reducers
- Why Redux exists and when it helps
- How data flows in a Redux-style architecture

## Beginner glossary
- Store: a single object that holds app state.
- Action: a plain object describing a state change.
- Reducer: a pure function that creates the next state.
- Dispatch: sending an action to the store.

## Big picture
Redux is a predictable state container. It is built around the idea that state changes should be explicit, traceable, and consistent. It is most useful when many parts of a large app need to read or update shared state.

## Mental model
Think of Redux like a cashier system. You submit a request (action). The rules of the store (reducer) decide what the new state is. The store updates and the UI reads the new state.

## Core data flow
1. A component dispatches an action.
2. Reducers calculate a new state.
3. The store updates.
4. The UI re-renders based on the new state.

## Why Redux can help
- Clear history of actions for debugging.
- Centralized state for large apps.
- Easier coordination between distant components.

## When Redux is overkill
- Small apps with limited shared state.
- Apps where server state is the primary concern (use data fetching tools).
- Cases where context and hooks are enough.

## Example of an action and reducer
~~~js
const addItem = { type: "cart/add", payload: { id: "p1", qty: 1 } };

function cartReducer(state = { items: [] }, action) {
  if (action.type === "cart/add") {
    return { ...state, items: [...state.items, action.payload] };
  }
  return state;
}
~~~

## Real-world usage
- Shopping carts and checkout flows.
- Complex dashboards with multiple synchronized widgets.
- Apps with offline support and queued actions.

## Common misconceptions
- Redux is not required for React.
- Redux does not replace server data fetching.
- Redux is not faster by default; it is about predictability.

## Practice checklist
- Can you describe the action in plain language?
- Is the reducer pure and free of side effects?
- Does the state shape reflect real app needs?

## Quick check questions
1. What is the job of a reducer?
2. Why are actions plain objects?
3. When is Redux a good fit?
`,
    quizQuestions: [
      {
        question: "What does a reducer do in Redux?",
        options: [
          "Fetches data from the server",
          "Creates the next state based on current state and action",
          "Renders UI components",
          "Stores components"
        ],
        correctIndex: 1,
        explanation: "Reducers are pure functions that compute the next state."
      },
      {
        question: "Why are actions plain objects?",
        options: [
          "They are easy to serialize and log",
          "They are faster than functions",
          "They run hooks",
          "They prevent errors"
        ],
        correctIndex: 0,
        explanation: "Plain objects make actions easy to log and debug."
      },
      {
        question: "Which scenario is best suited for Redux?",
        options: [
          "A small static marketing site",
          "A large app with many shared UI states",
          "A single form input",
          "A simple landing page"
        ],
        correctIndex: 1,
        explanation: "Redux shines in large apps with shared state."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Write a reducer for a todo list that can add and remove items.",
        starterCode: "function todosReducer(state = { items: [] }, action) {\n  // TODO\n}\n",
        solutionHintMarkdown: "Use action.type to handle add and remove, and return a new state object."
      }
    ]
  },
  "react-rendering-behavior": {
    title: "React rendering behavior",
    estimatedMinutes: 90,
    contentMarkdown: `# React rendering behavior

## What you will learn
- What it means for a component to render
- How state and props changes trigger re-renders
- How React compares old and new UI descriptions

## Beginner glossary
- Render: calculating UI output for a component.
- Re-render: running a component function again due to changes.
- Virtual DOM: Reacts in-memory representation of UI.
- Reconciliation: the process of comparing old and new UI output.

## Big picture
React renders by calling your component functions. Every render creates a new description of UI. React compares that description to the previous one and updates the real DOM as needed. Understanding rendering behavior helps you avoid accidental performance problems and confusing bugs.

## Mental model
Think of React as a planner. On each render, it creates a plan of what the UI should be. It then compares that plan with the previous plan and applies only the necessary changes to the DOM.

## When renders happen
- State changes inside a component.
- Parent re-renders and passes new props.
- Context value changes.

## What does not necessarily re-render
- Updating a ref value.
- Changing variables outside React state.

## Reconciliation basics
React uses keys to match items in lists. If keys change or are unstable, React may recreate DOM nodes, causing lost input or animations.

## Example: state change triggers render
~~~js
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
~~~

## Real-world implications
- Re-renders are normal and expected.
- Expensive calculations should be memoized.
- Avoid unnecessary re-renders by stabilizing props and callbacks.

## Common mistakes
- Assuming a render equals a DOM update. React may skip DOM changes.
- Using unstable keys in list rendering.
- Putting heavy computations directly in render.

## Practice checklist
- Can you explain why a component re-rendered?
- Are list keys stable and unique?
- Are expensive computations memoized?

## Quick check questions
1. What triggers a component render?
2. Why do keys matter for list rendering?
3. Is a render always a DOM update?
`,
    quizQuestions: [
      {
        question: "What causes a component to re-render?",
        options: [
          "A state or prop change",
          "A CSS change only",
          "A console log",
          "A browser resize"
        ],
        correctIndex: 0,
        explanation: "State or props changes trigger re-renders."
      },
      {
        question: "What does React compare during reconciliation?",
        options: [
          "The DOM directly",
          "The previous and next UI descriptions",
          "Network responses",
          "CSS files"
        ],
        correctIndex: 1,
        explanation: "React compares old and new virtual UI output."
      },
      {
        question: "Why are stable keys important?",
        options: [
          "They prevent all re-renders",
          "They help React match items between renders",
          "They are required by HTML",
          "They enable hooks"
        ],
        correctIndex: 1,
        explanation: "Keys help React match list items across renders."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a list component and observe how changing keys affects rerender behavior.",
        starterCode: "function TodoList({ items }) {\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item.id}>{item.label}</li>\n      ))}\n    </ul>\n  );\n}\n",
        solutionHintMarkdown: "Try using index as key, then switch to a stable id and compare behavior."
      }
    ]
  },
  "memoization": {
    title: "Memoization",
    estimatedMinutes: 90,
    contentMarkdown: `# Memoization

## What you will learn
- What memoization means in React
- How useMemo and React.memo work
- When memoization helps and when it hurts

## Beginner glossary
- Memoization: caching a computed value to avoid recalculating.
- Pure component: a component that renders the same output for the same props.
- Dependency array: values that determine when to recompute.

## Big picture
Memoization is about avoiding unnecessary work. In React, you can memoize expensive calculations or components that receive the same props often. But memoization itself has a cost, so you use it when there is a real performance issue.

## Mental model
Think of memoization like saving results in a notebook. If you have seen the same input before, you do not redo the work; you reuse the stored result.

## useMemo basics
useMemo takes a function and a dependency array. It recomputes the value only when dependencies change.

## Example: expensive calculation
~~~js
const sorted = useMemo(() => {
  return [...items].sort((a, b) => a.score - b.score);
}, [items]);
~~~

## React.memo basics
React.memo wraps a component and prevents re-render if props are unchanged.

## Example: memoized component
~~~js
const Row = React.memo(function Row({ item }) {
  return <div>{item.label}</div>;
});
~~~

## When memoization helps
- Large lists with stable props.
- Expensive calculations on each render.
- Child components that render often without changes.

## When memoization hurts
- Fast renders where memoization adds overhead.
- Props that change every render anyway.
- Complex dependency arrays that are hard to keep correct.

## Practice checklist
- Have you measured or observed a performance issue?
- Are the dependencies correct and stable?
- Does memoization simplify or complicate your code?

## Quick check questions
1. What does useMemo cache?
2. When does React.memo prevent re-render?
3. Why can memoization sometimes slow apps down?
`,
    quizQuestions: [
      {
        question: "What does useMemo do?",
        options: [
          "Caches a computed value between renders",
          "Stops all re-renders",
          "Caches network responses",
          "Creates global state"
        ],
        correctIndex: 0,
        explanation: "useMemo caches computed values until dependencies change."
      },
      {
        question: "React.memo prevents re-render when:",
        options: [
          "State changes",
          "Props are the same",
          "Effects run",
          "Refs change"
        ],
        correctIndex: 1,
        explanation: "React.memo skips re-render if props are unchanged."
      },
      {
        question: "Why can memoization hurt performance?",
        options: [
          "It always doubles renders",
          "It adds comparison overhead",
          "It deletes DOM nodes",
          "It turns off effects"
        ],
        correctIndex: 1,
        explanation: "Comparing dependencies and memoized props adds overhead."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Memoize a sorted list and compare performance with and without useMemo.",
        starterCode: "function Scores({ items }) {\n  const sorted = items.sort((a, b) => a.score - b.score);\n  return <pre>{JSON.stringify(sorted)}</pre>;\n}\n",
        solutionHintMarkdown: "Create a copy before sorting and wrap in useMemo with items as dependency."
      }
    ]
  },
  "avoiding-unnecessary-re-renders": {
    title: "Avoiding unnecessary re-renders",
    estimatedMinutes: 90,
    contentMarkdown: `# Avoiding unnecessary re-renders

## What you will learn
- Why re-renders happen and when they are problematic
- Practical techniques to reduce wasted renders
- How to spot and fix re-render issues

## Beginner glossary
- Re-render: running a component function again.
- Memoization: caching results to avoid work.
- Referential equality: whether two references point to the same object.

## Big picture
Re-renders are normal in React. The goal is not to eliminate them, but to avoid expensive or unnecessary ones. Many performance issues come from unstable props, anonymous functions, and large context updates.

## Mental model
Imagine each render as a recalculation bill. A few bills are fine. When you are paying too much, you optimize by reducing the number of expensive bills.

## Common causes
- Creating new objects or arrays in props on every render.
- Inline functions passed as props to memoized children.
- Single large context storing multiple unrelated values.

## Practical techniques
1. Use useMemo for stable derived values.
2. Use useCallback for stable functions passed as props.
3. Split context by concern.
4. Move state down to the smallest possible component.
5. Use React.memo for heavy child components.

## Example: stable callback
~~~js
const handleClick = useCallback(() => {
  setCount((c) => c + 1);
}, []);
~~~

## Example: stable object prop
~~~js
const filters = useMemo(() => ({ sort: "asc" }), []);
<List filters={filters} />
~~~

## Measuring and confirming
Use React DevTools Profiler to see which components render often. Only optimize if it matters.

## Practice checklist
- Can you identify the source of a re-render?
- Are props and callbacks stable when needed?
- Did you measure before optimizing?

## Quick check questions
1. What is a common cause of unnecessary re-renders?
2. When should you use React.memo?
3. Why is measuring important before optimizing?
`,
    quizQuestions: [
      {
        question: "What is a common cause of unnecessary re-renders?",
        options: [
          "Stable props",
          "Inline object and function props",
          "Using useMemo",
          "Using useCallback"
        ],
        correctIndex: 1,
        explanation: "Inline objects and functions create new references every render."
      },
      {
        question: "When does React.memo help?",
        options: [
          "When props frequently change",
          "When props are stable and renders are expensive",
          "When you want to skip effects",
          "When using class components"
        ],
        correctIndex: 1,
        explanation: "React.memo helps when props are stable and re-renders are expensive."
      },
      {
        question: "Why should you measure before optimizing?",
        options: [
          "To avoid unnecessary complexity",
          "To increase bundle size",
          "To slow down development",
          "To remove state"
        ],
        correctIndex: 0,
        explanation: "Optimization adds complexity and should be justified."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Identify an unstable prop in a component and refactor it to be stable with useMemo or useCallback.",
        starterCode: "function Parent() {\n  const filters = { sort: \"asc\" };\n  return <List filters={filters} />;\n}\n",
        solutionHintMarkdown: "Use useMemo to create a stable filters object."
      }
    ]
  },
  "react-router": {
    title: "React Router",
    estimatedMinutes: 90,
    contentMarkdown: `# React Router

## What you will learn
- How client-side routing works in React
- The main React Router concepts and components
- How to structure routes for real apps

## Beginner glossary
- Route: mapping between a URL path and a component.
- Router: a component that manages URL changes.
- Link: a component that navigates without a full page reload.
- SPA: single-page application.

## Big picture
React Router allows your React app to behave like a multi-page site while staying a single page. It updates the UI based on the URL without reloading the page. This provides fast navigation and preserves state between views.

## Mental model
Think of the router as a map. The URL is the location, and the router decides which components to display at that location.

## Core pieces
- BrowserRouter: keeps UI in sync with the URL.
- Routes and Route: define which components match which paths.
- Link and NavLink: navigate without full reloads.
- Outlet: renders nested child routes.

## Example: basic routing
~~~js
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
~~~

## Real-world usage
- Dashboard layouts with multiple sections.
- Marketing sites with smooth navigation.
- Apps that need a shareable URL for each view.

## Common mistakes
- Forgetting to wrap the app in a router.
- Using anchor tags instead of Link.
- Defining overlapping paths without proper order or structure.

## Practice checklist
- Do your routes match your navigation structure?
- Are links using Link or NavLink?
- Are you keeping state when navigating?

## Quick check questions
1. Why is client-side routing faster than full page reloads?
2. What does BrowserRouter do?
3. When should you use NavLink instead of Link?
`,
    quizQuestions: [
      {
        question: "What is the purpose of React Router?",
        options: [
          "To fetch data",
          "To manage client-side navigation",
          "To manage state",
          "To style components"
        ],
        correctIndex: 1,
        explanation: "React Router manages navigation without full page reloads."
      },
      {
        question: "Which component keeps the UI in sync with the URL?",
        options: ["Route", "BrowserRouter", "Link", "Outlet"],
        correctIndex: 1,
        explanation: "BrowserRouter manages URL history and sync."
      },
      {
        question: "Why use Link instead of an anchor tag?",
        options: [
          "To prevent full page reloads",
          "To add CSS styles automatically",
          "To handle form submissions",
          "To run effects"
        ],
        correctIndex: 0,
        explanation: "Link enables client-side navigation without reload."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Set up a simple router with Home, About, and Contact pages.",
        starterCode: "import { BrowserRouter, Routes, Route } from \"react-router-dom\";\n\nfunction App() {\n  // TODO\n}\n",
        solutionHintMarkdown: "Add a BrowserRouter and define three routes with Routes and Route."
      }
    ]
  },
  "nested-routes": {
    title: "Nested routes",
    estimatedMinutes: 90,
    contentMarkdown: `# Nested routes

## What you will learn
- How nested routes map to nested UI layouts
- How Outlet works for rendering children
- How to structure dashboards and multi-section layouts

## Beginner glossary
- Parent route: a route that has child routes.
- Child route: a route rendered inside a parent.
- Outlet: a placeholder where child routes render.

## Big picture
Nested routes mirror nested UI. For example, a dashboard has shared navigation and content areas. The parent route renders the layout, and child routes fill the content area. This keeps your app organized and avoids repeating layout code.

## Mental model
Think of nested routes like folders inside folders. The parent route is the folder, and each child route is a file within it. The Outlet is where the file content shows up.

## Example: dashboard layout
~~~js
<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route path="overview" element={<Overview />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
~~~

## Real-world usage
- Admin panels with shared navigation.
- User profiles with tabs (profile, billing, security).
- Product pages with nested details.

## Common mistakes
- Forgetting to include Outlet in the parent layout.
- Using absolute paths for child routes when relative paths are expected.
- Duplicating layout components in each route.

## Practice checklist
- Does the parent component include an Outlet?
- Are child routes defined relative to the parent?
- Is shared UI in the parent route?

## Quick check questions
1. What does Outlet do in a parent route?
2. Why are nested routes good for layouts?
3. What happens if the parent does not render Outlet?
`,
    quizQuestions: [
      {
        question: "What does the Outlet component do?",
        options: [
          "Fetches data for routes",
          "Renders child routes inside a parent",
          "Creates a new router",
          "Changes the URL"
        ],
        correctIndex: 1,
        explanation: "Outlet is the placeholder for child route UI."
      },
      {
        question: "Why use nested routes?",
        options: [
          "To avoid any layout components",
          "To share layouts and avoid duplication",
          "To prevent URL changes",
          "To force full reloads"
        ],
        correctIndex: 1,
        explanation: "Nested routes help reuse shared layouts."
      },
      {
        question: "If a parent route has no Outlet, what happens?",
        options: [
          "Child routes still render",
          "Child routes are not displayed",
          "Routes error at build time",
          "The URL stops changing"
        ],
        correctIndex: 1,
        explanation: "Without Outlet, child routes have nowhere to render."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a dashboard layout with nested routes for Overview and Settings.",
        starterCode: "function DashboardLayout() {\n  return (\n    <div>\n      <nav>...</nav>\n      {/* TODO: render child route */}\n    </div>\n  );\n}\n",
        solutionHintMarkdown: "Place an Outlet where the child pages should render."
      }
    ]
  },
  "dynamic-routes": {
    title: "Dynamic routes",
    estimatedMinutes: 90,
    contentMarkdown: `# Dynamic routes

## What you will learn
- How to define routes with parameters
- How to read route params in components
- How to handle missing or invalid params

## Beginner glossary
- Dynamic route: a route that includes a variable segment.
- Param: a named value in the URL.
- useParams: hook for reading route parameters.

## Big picture
Dynamic routes let you show different content at the same path pattern. For example, /products/123 and /products/999 use the same route but show different product data. This is essential for detail pages in real apps.

## Mental model
A dynamic route is like a template. The URL fills in the blank, and the component uses that value to load data.

## Example: product route
~~~js
<Route path="/products/:productId" element={<Product />} />
~~~

~~~js
import { useParams } from "react-router-dom";

function Product() {
  const { productId } = useParams();
  return <div>Product {productId}</div>;
}
~~~

## Real-world usage
- Product detail pages.
- Blog posts by slug.
- User profiles by username or id.

## Handling errors
If the param is invalid, show a not found state or redirect. Validate params before using them in API calls.

## Common mistakes
- Forgetting to parse numeric params.
- Assuming params are always present.
- Using params without fallback UI.

## Practice checklist
- Are you validating params before using them?
- Do you show a loading or not found state?
- Are links built with the correct param values?

## Quick check questions
1. What is a dynamic route segment?
2. How do you access route params in a component?
3. Why is validation important for params?
`,
    quizQuestions: [
      {
        question: "What is a dynamic route?",
        options: [
          "A route that never changes",
          "A route with a variable segment",
          "A route that reloads the page",
          "A route that uses context"
        ],
        correctIndex: 1,
        explanation: "Dynamic routes include variable segments like :id."
      },
      {
        question: "Which hook reads route parameters?",
        options: ["useParams", "useRoute", "useQuery", "useLocation"],
        correctIndex: 0,
        explanation: "useParams returns route parameters."
      },
      {
        question: "Why validate params?",
        options: [
          "To avoid errors and handle invalid URLs",
          "To speed up rendering",
          "To avoid useEffect",
          "To avoid hooks"
        ],
        correctIndex: 0,
        explanation: "Validation prevents invalid API requests and errors."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a UserProfile route with a :userId parameter and render a placeholder profile based on that id.",
        starterCode: "<Route path=\"/users/:userId\" element={<UserProfile />} />\n\nfunction UserProfile() {\n  // TODO\n}\n",
        solutionHintMarkdown: "Use useParams to read userId and display it in the UI."
      }
    ]
  },
  "protected-routes": {
    title: "Protected routes",
    estimatedMinutes: 90,
    contentMarkdown: `# Protected routes

## What you will learn
- Why some routes need authentication
- How to implement simple route protection
- How to handle redirect and loading states

## Beginner glossary
- Protected route: a route that requires authentication.
- Auth state: information about whether a user is logged in.
- Redirect: sending the user to a different route.

## Big picture
Many apps require login to access certain areas. Protected routes ensure users are redirected if they are not authenticated. This is important for security and user experience.

## Mental model
Think of a protected route like a gated building. If you have a badge, you get in. If not, you are sent to the front desk.

## Example: simple guard
~~~js
function RequireAuth({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
~~~

## Real-world usage
- Admin dashboards.
- User settings pages.
- Paid content behind a subscription.

## Handling loading states
Auth status is often loaded asynchronously. Show a loading indicator while checking, to avoid flicker.

## Common mistakes
- Redirecting before auth status is known.
- Hardcoding user checks without a centralized auth hook.
- Forgetting to preserve the intended destination for after login.

## Practice checklist
- Do you show a loading state while checking auth?
- Do you redirect unauthenticated users?
- Do you preserve the original destination?

## Quick check questions
1. Why should a protected route handle loading state?
2. What should happen when a user is unauthenticated?
3. How can you improve user experience during redirects?
`,
    quizQuestions: [
      {
        question: "What is a protected route?",
        options: [
          "A route that uses CSS modules",
          "A route that requires authentication",
          "A route that loads slower",
          "A route that has nested routes"
        ],
        correctIndex: 1,
        explanation: "Protected routes require authentication."
      },
      {
        question: "What should happen when a user is not authenticated?",
        options: [
          "Show the private content",
          "Redirect to login or show access denied",
          "Crash the app",
          "Disable routing"
        ],
        correctIndex: 1,
        explanation: "Unauthenticated users should be redirected or blocked."
      },
      {
        question: "Why handle loading state during auth checks?",
        options: [
          "To avoid flickering and incorrect redirects",
          "To slow down the app",
          "To skip login",
          "To avoid using context"
        ],
        correctIndex: 0,
        explanation: "Auth checks are async and need a loading state."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Implement a RequireAuth component that redirects unauthenticated users to /login and preserves the original path.",
        starterCode: "import { Navigate, useLocation } from \"react-router-dom\";\n\nfunction RequireAuth({ user, children }) {\n  // TODO\n}\n",
        solutionHintMarkdown: "Use useLocation and pass state to Navigate so you can redirect back after login."
      }
    ]
  },
  "why-testing-matters": {
    title: "Why testing matters",
    estimatedMinutes: 75,
    contentMarkdown: `# Why testing matters

## What you will learn
- The role of testing in real software teams
- How testing reduces bugs and improves confidence
- The practical tradeoffs of testing

## Beginner glossary
- Test: automated check that verifies behavior.
- Regression: a bug introduced by a change.
- Confidence: ability to change code without fear.

## Big picture
Tests help you move faster with less risk. As apps grow, manual checks become unreliable. Tests give you a safety net so you can refactor, add features, and fix bugs without breaking existing behavior.

## Mental model
Think of tests as a safety harness. You can climb higher and move faster because you know you are protected if something slips.

## Benefits of testing
- Prevent regressions in critical flows.
- Document expected behavior.
- Enable refactoring and code cleanup.
- Improve collaboration across teams.

## Costs and tradeoffs
- Writing tests takes time.
- Poorly written tests can be brittle.
- You must balance test coverage with speed.

## What to test first
- Critical business flows (checkout, login).
- Complex logic that is easy to break.
- Components with frequent changes.

## Practice checklist
- Do you know the most critical user paths?
- Do tests run quickly and reliably?
- Do tests verify outcomes instead of implementation details?

## Quick check questions
1. What is the main benefit of tests in a growing codebase?
2. What is a regression?
3. Why can tests sometimes slow development?
`,
    quizQuestions: [
      {
        question: "What is a primary benefit of testing?",
        options: [
          "It removes all bugs",
          "It prevents regressions and increases confidence",
          "It replaces code reviews",
          "It speeds up builds"
        ],
        correctIndex: 1,
        explanation: "Testing reduces regressions and builds confidence."
      },
      {
        question: "What is a regression?",
        options: [
          "A feature improvement",
          "A bug introduced by a change",
          "A dependency update",
          "A performance optimization"
        ],
        correctIndex: 1,
        explanation: "A regression is a bug caused by changes."
      },
      {
        question: "Why can tests be costly?",
        options: [
          "They take time to write and maintain",
          "They delete code",
          "They stop builds",
          "They remove UI"
        ],
        correctIndex: 0,
        explanation: "Tests require time and ongoing maintenance."
      }
    ],
    exercises: [
      {
        promptMarkdown: "List three critical user flows in a typical app and explain why each should be tested.",
        starterCode: "// Example: Login, checkout, settings update\n",
        solutionHintMarkdown: "Pick flows that have business impact or frequent change."
      }
    ]
  },
  "unit-vs-integration-tests": {
    title: "Unit vs integration tests",
    estimatedMinutes: 90,
    contentMarkdown: `# Unit vs integration tests

## What you will learn
- The difference between unit and integration tests
- What each test type is best for
- How to balance speed and confidence

## Beginner glossary
- Unit test: tests a small piece of logic in isolation.
- Integration test: tests multiple parts working together.
- Mock: a replacement for a dependency in tests.

## Big picture
Unit tests are fast and focused, but can miss issues that appear when components work together. Integration tests are slower but more realistic. Most apps need a mix of both.

## Mental model
Unit tests are like testing a single instrument. Integration tests are like testing the whole band playing together.

## Unit test characteristics
- Fast and isolated.
- Often use mocks.
- Great for pure logic or utilities.

## Integration test characteristics
- Exercise multiple components.
- Closer to real behavior.
- Slower but more confidence.

## Example: unit test
~~~js
function sum(a, b) { return a + b; }
// test sum with different inputs
~~~

## Example: integration test
Test a form component that updates state and submits a request.

## Choosing the balance
- Use unit tests for pure functions and complex logic.
- Use integration tests for components and user flows.
- Avoid over-mocking UI behavior.

## Practice checklist
- Do you know which tests are fast and slow?
- Are mocks hiding important behavior?
- Are you testing real user flows?

## Quick check questions
1. What is the key difference between unit and integration tests?
2. Why do integration tests provide more confidence?
3. When are unit tests most valuable?
`,
    quizQuestions: [
      {
        question: "What is the key difference between unit and integration tests?",
        options: [
          "Unit tests are always slower",
          "Integration tests cover multiple pieces working together",
          "Unit tests require browsers",
          "Integration tests ignore UI"
        ],
        correctIndex: 1,
        explanation: "Integration tests check multiple parts interacting."
      },
      {
        question: "Why do integration tests provide more confidence?",
        options: [
          "They are always faster",
          "They test more realistic scenarios",
          "They never fail",
          "They do not require setup"
        ],
        correctIndex: 1,
        explanation: "They test components working together like users see."
      },
      {
        question: "When are unit tests most valuable?",
        options: [
          "For pure functions and isolated logic",
          "For full user journeys only",
          "For styling checks",
          "For manual testing"
        ],
        correctIndex: 0,
        explanation: "Unit tests are best for isolated logic."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Pick a feature and list one unit test and one integration test you would write for it.",
        starterCode: "// Example feature: login form\n",
        solutionHintMarkdown: "Unit test a validation function; integration test the form submit flow."
      }
    ]
  },
  "intro-to-react-testing-library": {
    title: "Intro to React Testing Library",
    estimatedMinutes: 90,
    contentMarkdown: `# Intro to React Testing Library

## What you will learn
- The philosophy of React Testing Library
- How to query elements the way a user would
- How to test user interactions and async behavior

## Beginner glossary
- Query: a method to find elements in the rendered output.
- Role: an accessibility label that describes an element.
- Assertion: a statement that checks an expectation.

## Big picture
React Testing Library encourages you to test the app as the user sees it. Instead of testing implementation details, you render components and interact with them. This produces tests that are more resilient to refactors.

## Mental model
You are a user in a browser. You look for text, buttons, and labels, and you click or type. Your tests should do the same.

## Core ideas
- Prefer queries by role, label, and text.
- Avoid testing internal component state.
- Use userEvent to simulate real interactions.

## Example: basic test
~~~js
render(<Counter />);
const button = screen.getByRole("button", { name: /increment/i });
await userEvent.click(button);
expect(screen.getByText("1")).toBeInTheDocument();
~~~

## Async behavior
Use findBy queries or waitFor when UI updates after async work.

## Real-world usage
- Testing a login form.
- Testing a fetch flow with loading and error states.
- Verifying accessibility labels.

## Common mistakes
- Using querySelector instead of screen queries.
- Testing component internals.
- Forgetting to await userEvent for async updates.

## Practice checklist
- Are you testing what the user sees?
- Are queries accessible and semantic?
- Are async updates handled with findBy or waitFor?

## Quick check questions
1. What is the main philosophy of React Testing Library?
2. Which query is most preferred for buttons?
3. Why avoid testing internal state directly?
`,
    quizQuestions: [
      {
        question: "What is the core philosophy of React Testing Library?",
        options: [
          "Test implementation details",
          "Test behavior from the user perspective",
          "Test only reducers",
          "Avoid rendering components"
        ],
        correctIndex: 1,
        explanation: "RTL focuses on user-visible behavior."
      },
      {
        question: "Which query is preferred for a button?",
        options: ["getByRole", "getById", "querySelector", "getByClassName"],
        correctIndex: 0,
        explanation: "getByRole is semantic and accessible."
      },
      {
        question: "Why avoid testing internal state directly?",
        options: [
          "State is private implementation",
          "State is always correct",
          "State is impossible to test",
          "State is only for classes"
        ],
        correctIndex: 0,
        explanation: "Testing state couples tests to implementation details."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Write a test for a login form that checks validation error appears when the password is empty.",
        starterCode: "render(<LoginForm />);\n// TODO: find fields and click submit\n",
        solutionHintMarkdown: "Use getByLabelText to fill inputs and getByRole to click the submit button."
      }
    ]
  }
};
