import type { LessonContent } from "./javascript-mastery-types";

export const javascriptMasteryScopeClosures: Record<string, LessonContent> = {
  "global-vs-local-scope": {
    title: "Global vs local scope",
    estimatedMinutes: 60,
    contentMarkdown: `# Global vs local scope

## What you will learn
- What scope means in JavaScript
- The difference between global and local scope
- How scope affects variable visibility

## Beginner glossary
- Scope: the area where a variable is accessible.
- Global scope: variables available everywhere.
- Local scope: variables available only inside a function or block.

## Big picture
Variables declared in the global scope are available everywhere, but they can cause conflicts. Local variables are safer because they only exist where they are needed.

## Mental model
Think of scope as rooms in a building. Global scope is the lobby, available to everyone. Local scope is a private office; only code inside can access it.

## Example
\`\`\`js
const appName = "Shop"; // global

function greet() {
  const message = "hello"; // local
  console.log(appName, message);
}

console.log(appName);
\`\`\`

## Real world usage
- Avoiding name collisions in large codebases
- Encapsulating data inside functions
- Protecting variables from accidental changes

## Common mistakes
- Creating too many global variables
- Assuming local variables are accessible outside

## Quick check
1. What is global scope?
2. Where can a local variable be used?

## Try it
Create a global constant and a local variable inside a function, then log both from inside the function.

## Further reading
- https://developer.mozilla.org/en-US/docs/Glossary/Scope
`,
    quizQuestions: [
      {
        question: "Global variables are accessible:",
        options: ["Only in functions", "Everywhere", "Only in blocks", "Nowhere"],
        correctIndex: 1,
        explanation: "Global variables can be accessed from any scope."
      },
      {
        question: "Local variables are accessible:",
        options: ["Only inside their scope", "Everywhere", "Only in global scope", "Only in loops"],
        correctIndex: 0,
        explanation: "Local variables are only available inside their scope."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a global variable and a local variable inside a function, then log them.",
        starterCode: "const site = \"Demo\";\nfunction show() {\n  // add local variable and log both\n}\nshow();",
        solutionHintMarkdown: "Log the global and local values inside the function."
      }
    ]
  },
  "block-scope": {
    title: "Block scope",
    estimatedMinutes: 60,
    contentMarkdown: `# Block scope

## What you will learn
- What block scope means
- How let and const behave in blocks
- Why var ignores block scope

## Beginner glossary
- Block: code inside curly braces, like if or for blocks.
- Block scope: variables accessible only inside the block.

## Big picture
let and const are block-scoped, which prevents them from leaking out of if statements or loops. var is function-scoped, so it can leak out of blocks.

## Example
\`\`\`js
if (true) {
  let secret = "inside";
}
// secret is not accessible here
\`\`\`

## Real world usage
- Safer loop counters
- Avoiding accidental variable reuse
- Clearer, more predictable code

## Common mistakes
- Expecting var to be block-scoped
- Reusing variable names in nested blocks

## Quick check
1. Which keywords are block-scoped?
2. Why is var risky in loops?

## Try it
Create a for loop with let and try to access the counter outside the loop.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
`,
    quizQuestions: [
      {
        question: "Which is block-scoped?",
        options: ["var", "let", "function", "switch"],
        correctIndex: 1,
        explanation: "let is block-scoped."
      },
      {
        question: "var is scoped to:",
        options: ["block", "function", "loop", "file"],
        correctIndex: 1,
        explanation: "var is function-scoped."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Show that a let variable is not accessible outside its block.",
        starterCode: "if (true) {\n  let x = 1;\n}\n// try to log x here\n",
        solutionHintMarkdown: "Logging x outside should cause an error."
      }
    ]
  },
  "lexical-scoping": {
    title: "Lexical scoping",
    estimatedMinutes: 60,
    contentMarkdown: `# Lexical scoping

## What you will learn
- What lexical scope means
- How nested functions access outer variables
- Why lexical scope is predictable

## Beginner glossary
- Lexical scope: scope determined by where code is written.
- Nested function: a function inside another function.

## Big picture
JavaScript uses lexical scoping, meaning a function can access variables defined in its outer scope. This is based on where the function is written, not where it is called.

## Mental model
Think of a function carrying a reference to its surrounding environment. If the variable exists outside, the inner function can read it.

## Example
\`\`\`js
const app = "Demo";
function outer() {
  const feature = "Search";
  function inner() {
    console.log(app, feature);
  }
  inner();
}
outer();
\`\`\`

## Real world usage
- Organizing helper functions
- Keeping shared values in a parent scope
- Building factory functions

## Common mistakes
- Expecting scope to depend on where a function is called
- Shadowing variables and causing confusion

## Quick check
1. What determines lexical scope?
2. Can an inner function access outer variables?

## Try it
Create a nested function that logs a variable from its outer scope.

## Further reading
- https://developer.mozilla.org/en-US/docs/Glossary/Lexical_scope
`,
    quizQuestions: [
      {
        question: "Lexical scoping is based on:",
        options: ["Where a function is written", "Where a function is called", "Time", "Global variables"],
        correctIndex: 0,
        explanation: "Lexical scope depends on where code is written."
      },
      {
        question: "Inner functions can access:",
        options: ["Only global variables", "Variables from outer scopes", "Only local variables", "Nothing"],
        correctIndex: 1,
        explanation: "Inner functions can access variables from outer scopes."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Write a function inside a function that logs an outer variable.",
        starterCode: "function outer() {\n  const value = \"outer\";\n  function inner() {\n    // log value\n  }\n  inner();\n}\nouter();",
        solutionHintMarkdown: "Log value inside inner."
      }
    ]
  },
  "closures-with-real-world-examples": {
    title: "Closures (with real-world examples)",
    estimatedMinutes: 70,
    contentMarkdown: `# Closures (with real-world examples)

## What you will learn
- What a closure is and why it matters
- How closures preserve access to outer variables
- Real-world patterns that use closures

## Beginner glossary
- Closure: a function that remembers variables from its outer scope.
- Environment: the variables accessible to a function.

## Big picture
A closure happens when a function is created inside another function and continues to access the outer variables even after the outer function has finished.

## Mental model
Think of a closure as a backpack. The inner function carries the outer variables with it even after the outer function ends.

## Example
\`\`\`js
function createCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

## Real world usage
- Encapsulating private state
- Event handlers that remember configuration
- Factory functions that generate customized behavior

## Common mistakes
- Assuming closures copy values (they keep references)
- Creating closures in loops without understanding scope

## Quick check
1. What does a closure remember?
2. Why are closures useful?

## Try it
Create a factory function that returns a greeting function with a stored name.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
`,
    quizQuestions: [
      {
        question: "A closure is:",
        options: ["A loop", "A function that remembers outer variables", "A class", "A type"],
        correctIndex: 1,
        explanation: "Closures keep access to outer scope variables."
      },
      {
        question: "Closures are useful for:",
        options: ["Sorting arrays", "Encapsulating private state", "Replacing loops", "Deleting variables"],
        correctIndex: 1,
        explanation: "Closures can hide and preserve state."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a function that returns another function which adds a fixed number.",
        starterCode: "function makeAdder(base) {\n  // return a function that adds base\n}\n\nconst add5 = makeAdder(5);\nconsole.log(add5(3));",
        solutionHintMarkdown: "Return (n) => base + n."
      }
    ]
  }
};
