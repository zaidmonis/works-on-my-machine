import type { LessonContent } from "./javascript-mastery-types";

export const reactFundamentalsPatterns: Record<string, LessonContent> = {
  "controlled-vs-uncontrolled-components": {
    title: "Controlled vs uncontrolled components",
    estimatedMinutes: 60,
    contentMarkdown: `# Controlled vs uncontrolled components

## What you will learn
- The difference between controlled and uncontrolled inputs
- How each pattern affects validation and UX
- How to choose the right approach in real projects

## Big picture
Forms can be managed by React state (controlled) or by the DOM (uncontrolled). Controlled inputs keep the value in React state and update it via onChange. Uncontrolled inputs let the DOM manage the value and use refs to read it when needed.

## Beginner glossary
- Form input: a field where users type or select values.
- Controlled input: React state is the single source of truth.
- Uncontrolled input: the browser keeps the value until you read it.
- Ref: a way to access a DOM node directly.

## Controlled inputs
A controlled input uses state as the single source of truth. This enables live validation, formatting, and consistent UI updates. It requires more code but gives more control.

Benefits:
- Immediate access to values
- Easy validation and formatting
- UI can react to changes in real time

Tradeoffs:
- More boilerplate
- Frequent re-renders on input changes

## Uncontrolled inputs
An uncontrolled input keeps its own internal value in the DOM. You read it when needed, often on submit. This is simpler for small forms or when integrating with non-React libraries.

Benefits:
- Less code and fewer re-renders
- Useful for quick forms

Tradeoffs:
- Harder to validate live
- Less predictable data flow

## Example walkthrough
Controlled input with live count:

    function NameInput() {
      const [value, setValue] = useState("");
      return (
        <div>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <p>Chars: {value.length}</p>
        </div>
      );
    }

Uncontrolled input with ref:

    function QuickInput() {
      const inputRef = useRef(null);
      function handleSubmit() {
        console.log(inputRef.current ? inputRef.current.value : "");
      }
      return (
        <div>
          <input ref={inputRef} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      );
    }

## Real world usage
- Controlled: checkout forms, settings panels, live validation
- Uncontrolled: simple newsletter signup, file inputs, quick filters

## Common mistakes
- Mixing controlled and uncontrolled patterns in the same input
- Forgetting to initialize state for controlled inputs
- Reading ref values before the element is mounted

## Practice checklist
- Can you describe when each pattern is best?
- Can you implement validation with controlled inputs?
- Can you read values from refs safely?

## Mini project idea
Build a login form with controlled inputs and live validation. Then create a simple newsletter form using uncontrolled inputs and compare the code.

## Further reading
- https://react.dev/learn/sharing-state-between-components
`,
    quizQuestions: [
      {
        question: "A controlled input means:",
        options: [
          "The DOM stores the value",
          "React state stores the value",
          "The browser blocks edits",
          "Only refs are used"
        ],
        correctIndex: 1,
        explanation: "Controlled inputs store their value in React state."
      },
      {
        question: "Which is a benefit of controlled components?",
        options: [
          "Less code",
          "Easier validation and UI sync",
          "No React state needed",
          "Faster initial load"
        ],
        correctIndex: 1,
        explanation: "Controlled inputs make validation and UI sync easier."
      },
      {
        question: "When is an uncontrolled input reasonable?",
        options: [
          "When you need live validation",
          "When you only need the value on submit",
          "When values update other UI parts",
          "When you need formatting constraints"
        ],
        correctIndex: 1,
        explanation: "Uncontrolled inputs are fine if you only need a value on submit."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a controlled input that shows a live character count.",
        starterCode: "import { useState } from \"react\";\n\nfunction NameInput() {\n  const [value, setValue] = useState(\"\");\n  return (\n    <div>\n      <input value={value} onChange={(e) => setValue(e.target.value)} />\n      {/* show count */}\n    </div>\n  );\n}\n",
        solutionHintMarkdown: "Render value.length under the input."
      },
      {
        promptMarkdown: "Create an uncontrolled input and log the value when a button is clicked.",
        starterCode: "import { useRef } from \"react\";\n\nfunction QuickInput() {\n  const inputRef = useRef(null);\n  return (\n    <div>\n      <input ref={inputRef} />\n      <button>Log</button>\n    </div>\n  );\n}\n",
        solutionHintMarkdown: "Use inputRef.current.value in the click handler."
      }
    ]
  },
  "lifting-state-up": {
    title: "Lifting state up",
    estimatedMinutes: 60,
    contentMarkdown: `# Lifting state up

## What you will learn
- Why shared state causes bugs when duplicated
- How to identify the closest common parent
- How to design callback props for updates

## Big picture
When two or more components need the same data, keep the state in their closest common parent and pass it down via props. This is known as lifting state up. It avoids duplicated sources of truth and keeps the UI consistent.

## Beginner glossary
- Closest common parent: the nearest component that renders both children.
- Single source of truth: one place where the data lives.
- Props: data passed from parent to child.

## Why it matters
If each component stores its own copy of the same data, they can drift out of sync. Lifting state up centralizes the data and makes updates predictable.

## How to do it
1. Identify the shared data.
2. Move that state to the closest parent that uses it.
3. Pass the data down via props.
4. Pass callbacks down so children can request updates.

## Example walkthrough
Two inputs share the same value:

    function InputA({ value, onChange }) {
      return <input value={value} onChange={(e) => onChange(e.target.value)} />;
    }

    function InputB({ value, onChange }) {
      return <input value={value} onChange={(e) => onChange(e.target.value)} />;
    }

    function Parent() {
      const [value, setValue] = useState("");
      return (
        <div>
          <InputA value={value} onChange={setValue} />
          <InputB value={value} onChange={setValue} />
        </div>
      );
    }

Both inputs stay in sync because they share one state.

## Real world usage
- Filter panels and results lists
- Multi-step forms
- Coordinated UI like sliders and numeric inputs

## Common mistakes
- Lifting state too high and creating prop drilling
- Duplicating state and trying to sync manually
- Passing too many callbacks without a clear API

## Practice checklist
- Can you identify duplicated state in a component tree?
- Can you move that state to a common parent?
- Can you pass data and callbacks cleanly?

## Mini project idea
Build a temperature converter with two inputs, one for Celsius and one for Fahrenheit, that always stay in sync.

## Further reading
- https://react.dev/learn/sharing-state-between-components
`,
    quizQuestions: [
      {
        question: "Lifting state up means:",
        options: [
          "Moving state to a parent component",
          "Using refs instead of state",
          "Storing state in a global variable",
          "Avoiding state completely"
        ],
        correctIndex: 0,
        explanation: "You move shared state to the closest common parent."
      },
      {
        question: "Why lift state up?",
        options: [
          "To hide data",
          "To avoid duplicated state and keep consistency",
          "To make components smaller",
          "To prevent re-renders"
        ],
        correctIndex: 1,
        explanation: "It prevents duplicate sources of truth."
      },
      {
        question: "How do children update lifted state?",
        options: [
          "Mutate props directly",
          "Call a callback prop",
          "Reload the page",
          "Use localStorage"
        ],
        correctIndex: 1,
        explanation: "Children request changes via callbacks."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Refactor two inputs that share the same value into a parent with lifted state.",
        starterCode: "function InputA() {\n  return <input />;\n}\n\nfunction InputB() {\n  return <input />;\n}\n",
        solutionHintMarkdown: "Create a parent that stores the value and passes it to both inputs."
      },
      {
        promptMarkdown: "Explain in a few sentences why duplicate state can cause bugs.",
        starterCode: "// Write your answer here",
        solutionHintMarkdown: "Mention synchronization and inconsistent UI."
      }
    ]
  },
  "conditional-rendering": {
    title: "Conditional rendering",
    estimatedMinutes: 60,
    contentMarkdown: `# Conditional rendering

## What you will learn
- How to show or hide UI based on state
- Patterns for handling loading, error, and empty states
- How to keep conditional UI readable

## Big picture
Conditional rendering means choosing what to render based on data. In React, you typically use if statements, ternaries, and logical AND to render different UI branches.

## Beginner glossary
- Condition: a true or false test that decides what to show.
- Ternary: a short inline if/else expression.
- Logical AND: a pattern that renders something only when a condition is true.

## Patterns
- Use early returns for loading and error states
- Use ternaries for simple inline choices
- Use logical AND for optional content

## Example walkthrough
A component that handles loading, error, and success:

    function Status({ loading, error, data }) {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
      if (!data) return <p>No data</p>;
      return <p>Data: {data}</p>;
    }

## Real world usage
- Data fetching screens
- Feature flags and permissions
- Progressive disclosure in forms

## Common mistakes
- Deeply nested ternaries that are hard to read
- Forgetting to handle empty states
- Using if statements directly inside JSX

## Practice checklist
- Can you choose the right conditional pattern?
- Can you handle loading, error, and empty states?
- Can you refactor complex conditions into helpers?

## Mini project idea
Build a product list that shows a skeleton while loading, an error message if the request fails, and a friendly empty state when there are no products.

## Further reading
- https://react.dev/learn/conditional-rendering
`,
    quizQuestions: [
      {
        question: "Which pattern is valid for conditional rendering?",
        options: [
          "if (x) return <A /> inside JSX braces",
          "x ? <A /> : <B />",
          "for (x) <A />",
          "switch inside JSX without returning"
        ],
        correctIndex: 1,
        explanation: "Ternaries are valid inline conditions in JSX."
      },
      {
        question: "When is condition AND Component useful?",
        options: [
          "When you want to render either of two components",
          "When you only render something if the condition is true",
          "When you need a loop",
          "When you need styling"
        ],
        correctIndex: 1,
        explanation: "AND renders the right side only when the left side is true."
      },
      {
        question: "What is a good way to manage complex conditions?",
        options: [
          "Nest multiple ternaries",
          "Extract helper variables or components",
          "Avoid state",
          "Use refs"
        ],
        correctIndex: 1,
        explanation: "Extracting logic improves readability."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Render a message if a list is empty, otherwise render the list.",
        starterCode: "function Items({ items }) {\n  return (\n    <div>\n      {/* render items or empty state */}\n    </div>\n  );\n}\n",
        solutionHintMarkdown: "Use a ternary or items.length check."
      },
      {
        promptMarkdown: "Create a component that shows a login button only when isLoggedIn is false.",
        starterCode: "function LoginPrompt({ isLoggedIn }) {\n  return <div>{/* render button */}</div>;\n}\n",
        solutionHintMarkdown: "Use !isLoggedIn and logical AND."
      }
    ]
  },
  "lists-keys": {
    title: "Lists & keys",
    estimatedMinutes: 60,
    contentMarkdown: `# Lists and keys

## What you will learn
- How to render lists from data
- Why keys are required for stable list rendering
- How to choose good keys in real apps

## Big picture
Lists are everywhere in UI: products, messages, tasks. React uses keys to track which items changed between renders. A good key should be unique and stable.

## Beginner glossary
- Key: a unique identifier React uses to track items in a list.
- Stable: the value stays the same for the same item over time.
- Reconciliation: how React compares old and new UI to update the DOM.

## Why keys matter
When a list changes, React compares the old and new lists. Keys tell React which items are the same, which were added, and which were removed. Bad keys can cause incorrect UI updates and performance issues.

## Best practices
- Use stable IDs from your data
- Avoid array index keys if the list can reorder
- Never generate random keys on each render

## Example walkthrough
Rendering a list with stable keys:

    function TodoList({ items }) {
      return (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      );
    }

## Real world usage
- Rendering paginated results
- Rendering filtered lists
- Updating lists in response to user actions

## Common mistakes
- Using index as key when items can be re-ordered
- Using random keys that change on every render
- Forgetting to add keys entirely

## Practice checklist
- Can you explain why keys are necessary?
- Can you pick a stable key for a list item?
- Can you explain when index keys are safe?

## Mini project idea
Build a reorderable task list. Observe what happens when using index keys versus stable IDs.

## Further reading
- https://react.dev/learn/rendering-lists
`,
    quizQuestions: [
      {
        question: "Why are keys important in list rendering?",
        options: [
          "They style the list",
          "They help React track items between renders",
          "They fetch data",
          "They prevent re-renders"
        ],
        correctIndex: 1,
        explanation: "Keys help React match elements to data items."
      },
      {
        question: "Which is the best key for a list item?",
        options: ["Random number", "Array index", "Stable unique ID", "Timestamp"],
        correctIndex: 2,
        explanation: "Use stable unique IDs whenever possible."
      },
      {
        question: "When might an index key be acceptable?",
        options: [
          "When the list never changes order or length",
          "When items can be added or removed",
          "When items are sorted by user",
          "When items are draggable"
        ],
        correctIndex: 0,
        explanation: "Index keys are only safe for static lists."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Render a list of products with a stable key.",
        starterCode: "const products = [\n  { id: \"p1\", name: \"Pen\" },\n  { id: \"p2\", name: \"Notebook\" }\n];\n\nfunction ProductList() {\n  return (\n    <ul>\n      {/* map products */}\n    </ul>\n  );\n}\n",
        solutionHintMarkdown: "Use products.map and product.id as the key."
      },
      {
        promptMarkdown: "Explain why using Math.random for keys is a bad idea.",
        starterCode: "// Write your answer here",
        solutionHintMarkdown: "Keys must be stable across renders."
      }
    ]
  }
};
