import type { LessonContent } from "./javascript-mastery-types";

export const reactFundamentalsDataFetching: Record<string, LessonContent> = {
  "fetching-data-in-react": {
    title: "Fetching data in React",
    estimatedMinutes: 60,
    contentMarkdown: `# Fetching data in React

## What you will learn
- Where and how to fetch data in a React component
- How to store results and errors in state
- How to avoid common data fetching pitfalls

## Big picture
Most React apps rely on data from APIs. Data fetching is a side effect, so it is typically done in useEffect. You fetch data after the component renders, then store the result in state so the UI can update.

## Beginner glossary
- API: a service that provides data over the network.
- HTTP: the protocol used to request data on the web.
- JSON: a common data format used in APIs.
- Promise: a JavaScript object that represents a future result.

## A practical fetching pattern
A standard pattern includes three pieces of state:
- data: the results
- loading: whether the request is in progress
- error: any error message

This pattern keeps UI logic clear and makes it easy to render different states.

## Example walkthrough
Fetching a list of users on mount:

    function Users() {
      const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        let active = true;
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((res) => res.json())
          .then((data) => {
            if (active) {
              setUsers(data);
              setLoading(false);
            }
          })
          .catch((err) => {
            if (active) {
              setError(err.message);
              setLoading(false);
            }
          });
        return () => {
          active = false;
        };
      }, []);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;

      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      );
    }

## Real world usage
- Loading product lists, dashboards, and reports
- Fetching user profiles after login
- Searching and filtering data on demand

## Common mistakes
- Fetching during render instead of inside useEffect
- Forgetting to handle loading and error states
- Updating state after the component unmounts

## Practice checklist
- Can you build the data, loading, error pattern?
- Can you cancel or ignore results on unmount?
- Can you keep API logic separate from UI logic?

## Mini project idea
Build a simple user directory that fetches users on mount, supports search, and shows loading, error, and empty states.

## Further reading
- https://react.dev/learn/synchronizing-with-effects
`,
    quizQuestions: [
      {
        question: "Where should data fetching usually occur?",
        options: ["During render", "Inside useEffect", "Inside JSX", "Inside CSS"],
        correctIndex: 1,
        explanation: "Effects run after render and are the right place for side effects."
      },
      {
        question: "Which states are commonly used for fetching?",
        options: [
          "data, loading, error",
          "style, layout, theme",
          "props, keys, refs",
          "count, toggle, memo"
        ],
        correctIndex: 0,
        explanation: "Data, loading, and error cover the typical UI needs."
      },
      {
        question: "Why avoid setting state after unmount?",
        options: [
          "It causes memory leaks and warnings",
          "It increases bundle size",
          "It breaks JSX",
          "It resets props"
        ],
        correctIndex: 0,
        explanation: "Setting state after unmount can cause warnings and leaks."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Fetch a list of posts and render titles in a list.",
        starterCode: "function Posts() {\n  // add state and useEffect\n  return <div />;\n}\n",
        solutionHintMarkdown: "Use fetch to get JSON and map over the results."
      },
      {
        promptMarkdown: "Add an AbortController to cancel a fetch request on unmount.",
        starterCode: "useEffect(() => {\n  // create AbortController and pass signal to fetch\n  return () => {\n    // abort here\n  };\n}, []);",
        solutionHintMarkdown: "Create controller and call controller.abort in cleanup."
      }
    ]
  },
  "loading-error-states": {
    title: "Loading & error states",
    estimatedMinutes: 60,
    contentMarkdown: `# Loading and error states

## What you will learn
- Why loading and error states improve UX
- How to model these states in React
- How to design empty and retry states

## Big picture
Users need feedback while data loads or fails. A robust UI accounts for all states: loading, error, empty, and success. Without these, users see blank screens or confusing behavior.

## Beginner glossary
- Loading state: the UI shown while waiting for data.
- Error state: the UI shown when something fails.
- Empty state: the UI shown when no data is available.

## Typical states
1. Loading: show a spinner or skeleton
2. Error: show a message and retry action
3. Empty: show a friendly message when no data exists
4. Success: show the actual data

## Example walkthrough
A list component that handles all states:

    function UserList({ users, loading, error, onRetry }) {
      if (loading) return <p>Loading...</p>;
      if (error) return (
        <div>
          <p>Error: {error}</p>
          <button onClick={onRetry}>Retry</button>
        </div>
      );
      if (users.length === 0) return <p>No users yet.</p>;
      return (
        <ul>
          {users.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      );
    }

## Real world usage
- Dashboards showing data from APIs
- Search results pages
- Reports and analytics screens

## Common mistakes
- Rendering nothing during load
- Hiding errors without recovery options
- Skipping empty states

## Practice checklist
- Can you design UI for all four states?
- Can you provide a retry option?
- Can you keep state handling readable?

## Mini project idea
Build a list component that supports retry on error and a friendly empty state. Test it with fake delays and failures.

## Further reading
- https://react.dev/learn/synchronizing-with-effects
`,
    quizQuestions: [
      {
        question: "Why show a loading state?",
        options: [
          "To slow down the app",
          "To indicate that work is happening",
          "To avoid writing CSS",
          "To prevent state updates"
        ],
        correctIndex: 1,
        explanation: "Users need feedback while data is loading."
      },
      {
        question: "What is an empty state?",
        options: [
          "A state with no errors",
          "A message when the data list is empty",
          "A blank page",
          "A loading spinner"
        ],
        correctIndex: 1,
        explanation: "Empty state messages guide users when there is no data."
      },
      {
        question: "Why include a retry button?",
        options: [
          "It increases bundle size",
          "It helps users recover from temporary errors",
          "It replaces state",
          "It is required by React"
        ],
        correctIndex: 1,
        explanation: "Retry allows users to recover from temporary failures."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Add loading, error, and empty state rendering to a list component.",
        starterCode: "function UserList({ users, loading, error }) {\n  return <div />;\n}\n",
        solutionHintMarkdown: "Return early for each state before rendering the list."
      },
      {
        promptMarkdown: "Add a Retry button that triggers an onRetry callback.",
        starterCode: "function ErrorPanel({ message, onRetry }) {\n  return (\n    <div>\n      <p>{message}</p>\n      {/* add button */}\n    </div>\n  );\n}\n",
        solutionHintMarkdown: "Render a button that calls onRetry."
      }
    ]
  },
  "useeffect-patterns": {
    title: "useEffect patterns",
    estimatedMinutes: 60,
    contentMarkdown: `# useEffect patterns

## What you will learn
- Common useEffect patterns in real apps
- How to avoid infinite loops
- How to structure effects for clarity

## Big picture
useEffect is powerful but easy to misuse. Good patterns help keep code stable and readable, especially as components grow.

## Beginner glossary
- Effect: code that runs after rendering.
- Dependency array: the list of values that control when the effect runs.
- Cleanup: code that runs to remove listeners or cancel work.

## Common patterns
- Fetch on mount: use an empty dependency array
- Subscribe and cleanup: add a listener and remove it in cleanup
- React to prop changes: include the prop in the dependency array

## Avoiding effect loops
If an effect updates state that is also in the dependency array, it can run repeatedly. Solve this by:
- Moving state updates into event handlers
- Using refs for mutable values that should not trigger re-renders
- Splitting effects into smaller, focused ones

## Example walkthrough
Tracking window size with cleanup:

    function WindowWidth() {
      const [width, setWidth] = useState(window.innerWidth);

      useEffect(() => {
        function handleResize() {
          setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

      return <p>{width}px</p>;
    }

## Real world usage
- Websocket subscriptions
- Document title updates
- Syncing external libraries with React

## Common mistakes
- Missing dependencies and using stale values
- Using effects to compute derived state
- Forgetting cleanup for intervals or listeners

## Practice checklist
- Can you explain when an effect runs?
- Can you clean up event listeners correctly?
- Can you split effects when they do different things?

## Mini project idea
Create a component that listens to online or offline events and updates UI. Add cleanup to remove the listeners.

## Further reading
- https://react.dev/learn/synchronizing-with-effects
`,
    quizQuestions: [
      {
        question: "The dependency array controls:",
        options: [
          "How many components render",
          "When the effect runs",
          "Which CSS applies",
          "How React builds"
        ],
        correctIndex: 1,
        explanation: "Dependencies determine when effects run."
      },
      {
        question: "What is a common cause of effect loops?",
        options: [
          "Using useMemo",
          "Updating state that is also a dependency",
          "Using JSX",
          "Using props"
        ],
        correctIndex: 1,
        explanation: "State updates can retrigger the effect if included in deps."
      },
      {
        question: "When should you split effects?",
        options: [
          "When they do unrelated tasks",
          "Always",
          "Never",
          "Only for styling"
        ],
        correctIndex: 0,
        explanation: "Split effects for clarity and to manage dependencies."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create an effect that logs when a userId prop changes.",
        starterCode: "function UserWatcher({ userId }) {\n  // add useEffect\n  return null;\n}\n",
        solutionHintMarkdown: "Add userId to the dependency array and log inside the effect."
      },
      {
        promptMarkdown: "Fix an effect loop where state updates are triggering the effect.",
        starterCode: "useEffect(() => {\n  setValue(value + 1);\n}, [value]);",
        solutionHintMarkdown: "Avoid updating state based on itself inside the effect."
      }
    ]
  }
};
