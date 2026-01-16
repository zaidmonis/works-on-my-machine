import type { LessonContent } from "./javascript-mastery-types";

export const javascriptMasteryAsync: Record<string, LessonContent> = {
  "synchronous-vs-asynchronous": {
    title: "Synchronous vs asynchronous",
    estimatedMinutes: 60,
    contentMarkdown: `# Synchronous vs asynchronous

## What you will learn
- The difference between sync and async code
- Why async is needed for real apps
- How async affects control flow

## Beginner glossary
- Synchronous: tasks run one after another.
- Asynchronous: tasks can start now and finish later.
- Blocking: preventing other code from running.

## Big picture
Synchronous code runs in order, one task at a time. Asynchronous code lets the program start a task and continue with other work while waiting for it to finish. This is essential for network requests and timers.

## Mental model
Think of sync as a single-file line. Async is like placing an order at a cafe and doing something else while you wait.

## Example
\`\`\`js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// Output: A, C, B
\`\`\`

## Real world usage
- Fetching data from APIs
- Waiting for user input
- Loading images or files

## Common mistakes
- Assuming async code runs immediately
- Writing code that depends on async results without waiting

## Quick check
1. What does synchronous mean?
2. Why do we need asynchronous code?

## Try it
Use setTimeout to log a message after 1 second.

## Further reading
- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous
`,
    quizQuestions: [
      {
        question: "Synchronous code runs:",
        options: ["In parallel", "One task at a time", "Only on servers", "Only with promises"],
        correctIndex: 1,
        explanation: "Synchronous code runs one task at a time."
      },
      {
        question: "Asynchronous code is useful for:",
        options: ["Math only", "Network requests", "Sorting arrays", "Formatting strings"],
        correctIndex: 1,
        explanation: "Async code lets you wait for network requests without blocking."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Use setTimeout to log 'done' after 500ms.",
        starterCode: "// add setTimeout here",
        solutionHintMarkdown: "Use setTimeout(() => console.log('done'), 500)."
      }
    ]
  },
  "callbacks": {
    title: "Callbacks",
    estimatedMinutes: 60,
    contentMarkdown: `# Callbacks

## What you will learn
- What callbacks are
- How callbacks handle async results
- The downsides of callback-heavy code

## Beginner glossary
- Callback: a function passed to another function to run later.
- Higher-order function: a function that accepts another function.

## Big picture
Callbacks are one of the original ways to handle async code. You pass a function that runs after a task completes. This works but can become hard to read when nested.

## Example
\`\`\`js
function fetchData(callback) {
  setTimeout(() => {
    callback("data");
  }, 500);
}

fetchData((result) => {
  console.log(result);
});
\`\`\`

## Real world usage
- Event handlers in the browser
- Timer callbacks
- Legacy APIs that use callbacks

## Common mistakes
- Deep nesting (callback hell)
- Forgetting to handle errors

## Quick check
1. What is a callback?
2. Why can callbacks become hard to read?

## Try it
Write a function that accepts a callback and calls it with a result.

## Further reading
- https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
`,
    quizQuestions: [
      {
        question: "A callback is:",
        options: ["A loop", "A function passed to another function", "A variable", "A class"],
        correctIndex: 1,
        explanation: "Callbacks are functions passed to other functions."
      },
      {
        question: "A common downside of callbacks is:",
        options: ["They are slow", "They can create nested code", "They cannot access variables", "They stop the event loop"],
        correctIndex: 1,
        explanation: "Nested callbacks can make code hard to read."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a function that accepts a callback and calls it with 'ok'.",
        starterCode: "function runTask(cb) {\n  // call cb\n}\nrunTask((value) => console.log(value));",
        solutionHintMarkdown: "Call cb('ok')."
      }
    ]
  },
  "promises": {
    title: "Promises",
    estimatedMinutes: 70,
    contentMarkdown: `# Promises

## What you will learn
- What promises represent
- How to handle async results with then and catch
- Why promises avoid callback nesting

## Beginner glossary
- Promise: an object that represents a future result.
- Resolve: complete a promise successfully.
- Reject: complete a promise with an error.

## Big picture
Promises provide a cleaner way to handle async code. They represent a value that may be available in the future and allow chaining with then and catch.

## Example
\`\`\`js
const task = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 500);
});

task.then((result) => console.log(result)).catch((err) => console.error(err));
\`\`\`

## Real world usage
- Fetching API data
- Sequencing async operations
- Handling errors consistently

## Common mistakes
- Forgetting to return a promise in a chain
- Not handling rejections

## Quick check
1. What does a promise represent?
2. How do you handle errors in a promise?

## Try it
Create a promise that resolves after 1 second.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
`,
    quizQuestions: [
      {
        question: "A promise represents:",
        options: ["A loop", "A future result", "A variable", "A class"],
        correctIndex: 1,
        explanation: "Promises represent future results."
      },
      {
        question: "Promise errors are handled with:",
        options: ["then", "catch", "await", "setTimeout"],
        correctIndex: 1,
        explanation: "catch handles rejections."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a promise that resolves with 'success'.",
        starterCode: "const p = new Promise((resolve, reject) => {\n  // resolve here\n});\n",
        solutionHintMarkdown: "Call resolve('success')."
      }
    ]
  },
  "async-await": {
    title: "async / await",
    estimatedMinutes: 70,
    contentMarkdown: `# async / await

## What you will learn
- How async and await simplify promises
- How to write async code that reads like sync
- How to handle errors with try/catch

## Beginner glossary
- async: marks a function that returns a promise.
- await: pauses inside an async function until a promise resolves.

## Big picture
async and await are syntax built on promises. They make asynchronous code look sequential, which improves readability.

## Example
\`\`\`js
async function loadData() {
  try {
    const res = await fetch("/api/data");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

## Real world usage
- Fetching data from APIs
- Handling multi-step async flows
- Coordinating async operations

## Common mistakes
- Using await outside async functions
- Forgetting to handle errors

## Quick check
1. What does async do to a function?
2. What does await wait for?

## Try it
Write an async function that waits for a promise and logs the result.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
`,
    quizQuestions: [
      {
        question: "An async function returns:",
        options: ["A number", "A promise", "A string", "Nothing"],
        correctIndex: 1,
        explanation: "Async functions always return a promise."
      },
      {
        question: "await can be used:",
        options: ["Anywhere", "Only inside async functions", "Only in loops", "Only in promises"],
        correctIndex: 1,
        explanation: "await must be inside an async function."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Wrap a promise with async/await and log the result.",
        starterCode: "const task = Promise.resolve(42);\nasync function run() {\n  // await task and log\n}\nrun();",
        solutionHintMarkdown: "Use const result = await task."
      }
    ]
  },
  "error-handling-try-catch": {
    title: "Error handling with try/catch",
    estimatedMinutes: 60,
    contentMarkdown: `# Error handling with try/catch

## What you will learn
- How try/catch works in JavaScript
- How to handle errors in async code
- How to throw your own errors

## Beginner glossary
- Error: a problem that stops normal execution.
- throw: create an error manually.
- catch: handle an error safely.

## Big picture
try/catch lets you handle errors without crashing your program. In async code, use try/catch with await to catch promise rejections.

## Example
\`\`\`js
try {
  JSON.parse("invalid");
} catch (err) {
  console.error("Parsing failed", err);
}
\`\`\`

## Real world usage
- Validating user input
- Handling API errors
- Defensive programming

## Common mistakes
- Catching errors but ignoring them
- Throwing strings instead of Error objects

## Quick check
1. What does try do?
2. When should you throw an error?

## Try it
Wrap a JSON.parse in try/catch and handle invalid JSON.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
`,
    quizQuestions: [
      {
        question: "try/catch is used to:",
        options: ["Loop data", "Handle errors", "Create arrays", "Sort objects"],
        correctIndex: 1,
        explanation: "try/catch handles errors safely."
      },
      {
        question: "throw is used to:",
        options: ["Log", "Create an error", "Return a value", "End a loop"],
        correctIndex: 1,
        explanation: "throw creates an error."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Use try/catch to handle JSON.parse on invalid input.",
        starterCode: "try {\n  JSON.parse(\"not json\");\n} catch (err) {\n  // handle error\n}\n",
        solutionHintMarkdown: "Log a friendly error message."
      }
    ]
  },
  "event-loop-visual-explanation": {
    title: "Event loop (visual explanation)",
    estimatedMinutes: 70,
    contentMarkdown: `# Event loop (visual explanation)

## What you will learn
- What the event loop is
- How the call stack and task queue interact
- Why async code runs later

## Beginner glossary
- Call stack: where functions run.
- Task queue: where async callbacks wait.
- Event loop: the system that moves tasks to the stack.

## Big picture
JavaScript runs code on a single call stack. When the stack is empty, the event loop moves queued async callbacks onto the stack. This is how setTimeout, promises, and DOM events work without blocking the UI.

## Mental model
Imagine a line of tasks waiting at the door. The event loop only lets the next task in when the room (call stack) is empty.

## Example
\`\`\`js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// Output: A, D, C, B
\`\`\`

## Real world usage
- Debugging async behavior
- Understanding why UI stays responsive
- Avoiding long tasks that block the stack

## Common mistakes
- Assuming setTimeout runs immediately
- Ignoring microtasks vs macrotasks

## Quick check
1. When does the event loop run callbacks?
2. Why does async code run later?

## Try it
Log messages with setTimeout and a promise and observe the order.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
`,
    quizQuestions: [
      {
        question: "The event loop runs callbacks when:",
        options: ["The stack is empty", "The stack is full", "The page loads", "A loop ends"],
        correctIndex: 0,
        explanation: "Callbacks run when the call stack is empty."
      },
      {
        question: "Promise callbacks are queued in:",
        options: ["Microtask queue", "Call stack", "Global scope", "Heap"],
        correctIndex: 0,
        explanation: "Promises use the microtask queue."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create logs with a promise and setTimeout and predict the order.",
        starterCode: "console.log('start');\nsetTimeout(() => console.log('timeout'), 0);\nPromise.resolve().then(() => console.log('promise'));\nconsole.log('end');",
        solutionHintMarkdown: "Think: sync logs first, promise then timeout."
      }
    ]
  }
};
