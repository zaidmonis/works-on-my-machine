import type { LessonContent } from "./javascript-mastery-types";

export const reactFundamentalsHooks: Record<string, LessonContent> = {
  "usestate": {
    title: "useState",
    estimatedMinutes: 60,
    contentMarkdown: `# useState

## What you will learn
- How to add state to function components
- How the setter works and why updates can be asynchronous
- How to model UI state for real products

## Big picture
useState is the most common hook in React. It gives a component memory. When that memory changes, React re-renders the component. This is the basis for interactivity in React applications.

## Beginner glossary
- Hook: a React function that adds features like state or effects to a function component.
- Component: a function that returns UI output.
- Re-render: React runs the component again to update the UI.
- State setter: the function that schedules a state update.

## How it works
useState returns a pair: the current state value and a setter function. The setter schedules an update. React may batch updates for performance, so state changes are not guaranteed to be immediate in the same event loop tick.

A key rule: hooks must be called at the top level of the component. Do not call them inside loops or conditions.

## Updating based on previous state
When the new state depends on the previous value, use the updater function form. This avoids stale values when multiple updates are queued.

    const [count, setCount] = useState(0);
    setCount((prev) => prev + 1);

## Modeling state
A good rule: store only what cannot be derived. If a value can be calculated from props or other state, calculate it during render instead of storing it separately.

## Real world usage
- Toggle UI elements like modals, drawers, and tooltips
- Form inputs and validation flags
- Filters and sorting options in a list

## Example walkthrough
A toggle button uses a boolean state:

    function LikeButton() {
      const [liked, setLiked] = useState(false);
      return (
        <button onClick={() => setLiked((prev) => !prev)}>
          {liked ? "Liked" : "Like"}
        </button>
      );
    }

The UI always reflects the current state.

## Common mistakes
- Mutating objects or arrays in state
- Storing derived values and forgetting to update them
- Using the current state value directly in multiple rapid updates

## Practice checklist
- Can you explain why setState is asynchronous?
- Can you update arrays and objects immutably?
- Can you decide when to store versus derive?

## Mini project idea
Build a shopping list where users can add items, mark them as completed, and filter by status. Use useState for the list, the new item input, and the filter state.

## Further reading
- https://react.dev/reference/react/useState
`,
    quizQuestions: [
      {
        question: "What does useState return?",
        options: [
          "A single value",
          "A state value and a setter function",
          "A reducer",
          "A DOM node"
        ],
        correctIndex: 1,
        explanation: "useState returns a value and a function to update it."
      },
      {
        question: "Where should you call useState?",
        options: [
          "Inside loops",
          "Inside conditions",
          "At the top level of a component",
          "Inside event handlers only"
        ],
        correctIndex: 2,
        explanation: "Hooks must be called at the top level."
      },
      {
        question: "When should you use the updater function form?",
        options: [
          "When the next state depends on the previous state",
          "Only for strings",
          "Only in class components",
          "Never"
        ],
        correctIndex: 0,
        explanation: "Updater functions avoid stale state."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a LikeButton that toggles between Liked and Like.",
        starterCode: "function LikeButton() {\n  // add state\n  return <button>Like</button>;\n}\n",
        solutionHintMarkdown: "Store a boolean and flip it on click."
      },
      {
        promptMarkdown: "Add a number input and store its value in state.",
        starterCode: "function NumberInput() {\n  return (\n    <input type=\"number\" />\n  );\n}\n",
        solutionHintMarkdown: "Use value and onChange to keep state in sync."
      }
    ]
  },
  "useeffect": {
    title: "useEffect",
    estimatedMinutes: 60,
    contentMarkdown: `# useEffect

## What you will learn
- Why effects exist and when to use them
- How dependency arrays control effect execution
- How to write safe cleanup logic

## Big picture
React renders UI from state and props. Side effects, such as data fetching, subscriptions, and DOM updates, must run after render. useEffect lets you perform those operations and keep them in sync with the component lifecycle.

## Beginner glossary
- Side effect: work that touches something outside React, like network requests or event listeners.
- Dependency array: the list that tells React when an effect should run again.
- Cleanup: a function that stops or undoes the effect when it is no longer needed.

## The dependency array
The dependency array controls when an effect runs:
- No array: runs after every render
- Empty array: runs once after the initial render
- Values array: runs when any listed value changes

Getting dependencies right is critical. Missing dependencies can lead to stale data. Unstable dependencies can lead to repeated effects or loops.

## Cleanup logic
If an effect sets up subscriptions, event listeners, or timers, return a cleanup function. This prevents memory leaks and duplicate listeners when the component unmounts or dependencies change.

    useEffect(() => {
      const id = setInterval(() => {
        console.log("tick");
      }, 1000);
      return () => clearInterval(id);
    }, []);

## Real world usage
- Fetching data when a page loads
- Subscribing to window resize or scroll events
- Synchronizing document title with component state

## Example walkthrough
A document title that updates with a name:

    function TitleUpdater({ name }) {
      useEffect(() => {
        document.title = "Hello " + name;
        return () => {
          document.title = "React App";
        };
      }, [name]);
      return <h1>Hello, {name}</h1>;
    }

## Common mistakes
- Forgetting dependencies and using stale values
- Creating infinite loops by updating state that is in the dependency list
- Forgetting cleanup for event listeners

## Practice checklist
- Can you explain when an effect runs with each dependency setup?
- Can you write cleanup logic for a listener or timer?
- Can you identify when to split effects into multiple pieces?

## Mini project idea
Build a window size tracker that updates on resize and cleans up its event listener. Add a toggle that enables or disables the tracking effect.

## Further reading
- https://react.dev/reference/react/useEffect
`,
    quizQuestions: [
      {
        question: "Why does React provide useEffect?",
        options: [
          "To write CSS",
          "To run side effects after render",
          "To declare HTML",
          "To replace state"
        ],
        correctIndex: 1,
        explanation: "Effects are for side effects like data fetching or subscriptions."
      },
      {
        question: "What does an empty dependency array mean?",
        options: [
          "Run on every render",
          "Run only on initial mount",
          "Run before render",
          "Never run"
        ],
        correctIndex: 1,
        explanation: "An empty array means run once after the first render."
      },
      {
        question: "Why is cleanup important?",
        options: [
          "It speeds up JSX",
          "It prevents memory leaks and duplicate listeners",
          "It avoids errors in TypeScript",
          "It updates state faster"
        ],
        correctIndex: 1,
        explanation: "Cleanups stop timers and listeners when a component unmounts."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Fetch data on mount and log it to the console.",
        starterCode: "import { useEffect } from \"react\";\n\nfunction DataLogger() {\n  useEffect(() => {\n    // fetch data here\n  }, []);\n  return null;\n}\n",
        solutionHintMarkdown: "Use fetch and console.log the JSON."
      },
      {
        promptMarkdown: "Create an interval that increments a counter every second and clean it up.",
        starterCode: "import { useEffect, useState } from \"react\";\n\nfunction Timer() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    // set up interval\n  }, []);\n  return <p>{count}</p>;\n}\n",
        solutionHintMarkdown: "Use setInterval and clearInterval in cleanup."
      }
    ]
  },
  "useref": {
    title: "useRef",
    estimatedMinutes: 60,
    contentMarkdown: `# useRef

## What you will learn
- How refs store mutable values without re-rendering
- How to access DOM nodes safely
- When to use refs instead of state

## Big picture
useRef gives you a mutable container whose current property persists across renders. Updating it does not cause a re-render. This makes it ideal for storing values that should not trigger UI updates, such as timers, previous values, or DOM references.

## Beginner glossary
- Ref: a stable object that holds a value across renders.
- DOM node: a real element in the browser, like an input or button.
- Mutable: can be changed without creating a new value.

## Two main use cases
1. DOM access: focus an input, measure element size, or integrate with third-party libraries.
2. Mutable instance values: track previous props or store interval IDs.

## Example walkthrough
Focusing an input when a component mounts:

    function FocusInput() {
      const inputRef = useRef(null);
      useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, []);
      return <input ref={inputRef} placeholder="Type here" />;
    }

## Real world usage
- Managing focus in forms
- Measuring element dimensions for layout
- Storing interval or timeout IDs

## Common mistakes
- Using refs for values that should render in the UI
- Reading a ref before it is set
- Mutating DOM in ways that conflict with React rendering

## Practice checklist
- Can you explain why refs do not trigger re-renders?
- Can you use a ref to focus an input?
- Can you store previous props with a ref?

## Mini project idea
Create a search input that automatically focuses on page load. Track the previous search term and display it below the input without causing extra re-renders.

## Further reading
- https://react.dev/reference/react/useRef
`,
    quizQuestions: [
      {
        question: "What happens when you update ref.current?",
        options: [
          "The component re-renders",
          "Nothing re-renders automatically",
          "State resets",
          "Hooks stop working"
        ],
        correctIndex: 1,
        explanation: "Refs are mutable without triggering re-renders."
      },
      {
        question: "Which is a good use case for useRef?",
        options: [
          "Storing a counter for display",
          "Accessing an input DOM element",
          "Replacing state entirely",
          "Triggering renders"
        ],
        correctIndex: 1,
        explanation: "Refs are great for DOM access and mutable values."
      },
      {
        question: "Why should you avoid using refs for UI data?",
        options: [
          "Refs are slower",
          "React will not re-render the UI",
          "Refs cannot store numbers",
          "Refs are deprecated"
        ],
        correctIndex: 1,
        explanation: "UI data should live in state to trigger updates."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a button that focuses an input when clicked.",
        starterCode: "import { useRef } from \"react\";\n\nfunction FocusDemo() {\n  const inputRef = useRef(null);\n  return (\n    <div>\n      <input ref={inputRef} />\n      <button>Focus</button>\n    </div>\n  );\n}\n",
        solutionHintMarkdown: "Call inputRef.current.focus in the click handler."
      },
      {
        promptMarkdown: "Store the previous value of a prop using a ref.",
        starterCode: "import { useEffect, useRef } from \"react\";\n\nfunction PrevValue({ value }) {\n  const prevRef = useRef();\n  useEffect(() => {\n    // update prevRef.current\n  }, [value]);\n  return <p>Current: {value}</p>;\n}\n",
        solutionHintMarkdown: "Assign prevRef.current = value in the effect."
      }
    ]
  },
  "usememo": {
    title: "useMemo",
    estimatedMinutes: 60,
    contentMarkdown: `# useMemo

## What you will learn
- What memoization means in React
- When to use useMemo for expensive computations
- How to avoid overusing it

## Big picture
useMemo caches the result of a computation between renders. If the dependencies do not change, React reuses the cached value instead of recomputing it. This can improve performance for expensive calculations.

## Beginner glossary
- Memoization: saving a computed result so it can be reused.
- Dependency: a value that, when changed, forces a recalculation.
- Expensive computation: a calculation that is slow or runs on large data.

## When to use it
Use useMemo when:
- A computation is expensive and runs on every render
- The computed value is passed to child components and should be stable
- You have measured and confirmed a performance issue

Do not use it for everything. It adds complexity and memory usage.

## Example walkthrough
Filtering a list based on a search term:

    function FilteredList({ items, filter }) {
      const filtered = useMemo(() => {
        return items.filter((item) => item.includes(filter));
      }, [items, filter]);

      return (
        <ul>
          {filtered.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }

## Real world usage
- Sorting large lists
- Computing derived data for charts
- Preparing expensive transformations for display

## Common mistakes
- Using useMemo by default without evidence
- Forgetting dependencies, resulting in stale values
- Assuming useMemo prevents re-renders (it does not)

## Practice checklist
- Can you explain what useMemo caches?
- Can you identify a scenario where it is unnecessary?
- Can you measure performance before and after?

## Mini project idea
Build a sortable table with hundreds of rows. Use useMemo to compute the sorted data when sort settings change.

## Further reading
- https://react.dev/reference/react/useMemo
`,
    quizQuestions: [
      {
        question: "What does useMemo do?",
        options: [
          "Memoizes a function",
          "Memoizes a computed value",
          "Prevents all re-renders",
          "Fetches data"
        ],
        correctIndex: 1,
        explanation: "useMemo memoizes a computed value."
      },
      {
        question: "When should you use useMemo?",
        options: [
          "Whenever possible",
          "Only when a computation is expensive",
          "Only for strings",
          "Only in class components"
        ],
        correctIndex: 1,
        explanation: "Use it for expensive or repeated calculations."
      },
      {
        question: "Does useMemo prevent re-renders?",
        options: ["Yes", "No", "Only in production", "Only with TypeScript"],
        correctIndex: 1,
        explanation: "It only memoizes values, not component renders."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Memoize a sorted list of numbers based on the input array.",
        starterCode: "import { useMemo } from \"react\";\n\nfunction SortedNumbers({ numbers }) {\n  const sorted = useMemo(() => {\n    // return sorted copy\n  }, [numbers]);\n  return <pre>{JSON.stringify(sorted)}</pre>;\n}\n",
        solutionHintMarkdown: "Use numbers.slice and sort to avoid mutation."
      },
      {
        promptMarkdown: "Explain when useMemo would be unnecessary in a small component.",
        starterCode: "// Write your answer here",
        solutionHintMarkdown: "Mention readability and that simple calculations are cheap."
      }
    ]
  },
  "usecallback": {
    title: "useCallback",
    estimatedMinutes: 60,
    contentMarkdown: `# useCallback

## What you will learn
- How useCallback memoizes function references
- When memoized callbacks reduce re-renders
- How to avoid unnecessary complexity

## Big picture
In JavaScript, functions are objects. A new function is created on every render. When you pass a new function as a prop, memoized child components may re-render. useCallback keeps the same function reference between renders when dependencies do not change.

## Beginner glossary
- Callback: a function passed to another component to be called later.
- Reference: the identity of a function or object in memory.
- Memoized component: a component that avoids re-rendering when props do not change.

## When it helps
useCallback is useful when:
- You pass callbacks to memoized children
- The callback is a dependency for other hooks
- You need stable references for performance-sensitive components

## Example walkthrough
A memoized list item that avoids re-rendering when the callback is stable:

    const ListItem = React.memo(function ListItem({ onSelect, label }) {
      return <button onClick={onSelect}>{label}</button>;
    });

    function Toolbar({ items }) {
      const handleSelect = useCallback((label) => {
        console.log("Selected", label);
      }, []);

      return items.map((label) => (
        <ListItem key={label} label={label} onSelect={() => handleSelect(label)} />
      ));
    }

## Real world usage
- Optimizing large lists of interactive items
- Passing callbacks to memoized components in design systems
- Stabilizing dependencies in effects and memoization

## Common mistakes
- Using useCallback everywhere without measuring
- Forgetting dependencies and closing over stale values
- Assuming useCallback caches return values (it does not)

## Practice checklist
- Can you explain the difference between useCallback and useMemo?
- Can you identify when a stable callback matters?
- Can you avoid stale values by tracking dependencies?

## Mini project idea
Build a list of 100 items with memoized list items. Use useCallback to pass a stable handler and compare rendering behavior with and without it.

## Further reading
- https://react.dev/reference/react/useCallback
`,
    quizQuestions: [
      {
        question: "What does useCallback memoize?",
        options: [
          "A value",
          "A function reference",
          "A component",
          "A CSS rule"
        ],
        correctIndex: 1,
        explanation: "It memoizes function references."
      },
      {
        question: "When is useCallback most useful?",
        options: [
          "When passing callbacks to memoized children",
          "When rendering plain text",
          "When styling components",
          "When using class components"
        ],
        correctIndex: 0,
        explanation: "Stable callback references help memoized children avoid re-rendering."
      },
      {
        question: "Does useCallback cache the result of a function?",
        options: ["Yes", "No", "Only with TypeScript", "Only in production"],
        correctIndex: 1,
        explanation: "It only memoizes the function reference."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Memoize a callback that adds an item to a list in state.",
        starterCode: "import { useCallback, useState } from \"react\";\n\nfunction ListManager() {\n  const [items, setItems] = useState([]);\n  const addItem = () => {};\n  return <button onClick={addItem}>Add</button>;\n}\n",
        solutionHintMarkdown: "Use useCallback and the updater form for setItems."
      },
      {
        promptMarkdown: "Explain in a sentence why useCallback may not be needed in simple components.",
        starterCode: "// Write your answer here",
        solutionHintMarkdown: "Mention added complexity and small render cost."
      }
    ]
  }
};
