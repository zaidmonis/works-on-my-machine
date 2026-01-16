import type { LessonContent } from "./javascript-mastery-types";

export const javascriptMasteryCore: Record<string, LessonContent> = {
  "what-is-javascript": {
    title: "What is JavaScript?",
    estimatedMinutes: 60,
    contentMarkdown: `# What is JavaScript?

## What you will learn
- What JavaScript is and where it runs
- The difference between JavaScript (language) and the runtime (environment)
- How JavaScript is used in real products

## Beginner glossary
- Language: a set of rules for writing instructions a computer can run.
- Runtime: the environment that executes the language and provides extra features.
- Browser: software that loads web pages (Chrome, Firefox, Edge).
- Node.js: a runtime that lets JavaScript run outside the browser.
- API: a feature provided by the runtime, such as fetch or the DOM.

## Big picture
JavaScript is a programming language created for the web. It runs inside browsers to make pages interactive and dynamic. Today, it also runs on servers via Node.js, enabling full stack development with one language.

JavaScript the language is standardized by ECMAScript. The runtime (browser or Node.js) adds extra APIs such as the DOM in browsers or the filesystem in Node.js. This is why the same JavaScript code can behave differently depending on where it runs.

## Mental model
Think of JavaScript as the core language, and the runtime as a toolbox around it. The language gives you syntax, data types, and control flow. The runtime gives you power: network requests, timers, user input, and storage. When you write code, you are using both the language and the runtime APIs.

## Deep dive
JavaScript is single threaded, which means it runs one piece of code at a time. This makes it easier to reason about, but it also means long tasks can block the UI. To handle asynchronous work, JavaScript uses an event loop and callbacks or promises.

JavaScript is also dynamically typed. You do not declare types in advance, which makes it fast to write but requires discipline to avoid mistakes.

## Example
\`\`\`js
console.log("Hello from JavaScript");
\`\`\`

## Real world usage
- Web apps: interactive UIs, forms, dashboards
- Backend APIs: Node.js servers and microservices
- Tools: build scripts, automation, CLI tools
- Mobile: React Native and hybrid apps

## Common mistakes
- Confusing JavaScript with browser APIs like the DOM
- Assuming JavaScript only runs in the browser
- Ignoring the asynchronous nature of many APIs

## Quick check
1. What is the difference between JavaScript and a runtime?
2. Where can JavaScript run outside the browser?

## Try it
Write a script that prints your name and the current date to the console.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction
`,
    quizQuestions: [
      {
        question: "Which statement is true about JavaScript?",
        options: [
          "It only runs in browsers",
          "It can run in browsers and on servers",
          "It is the same as HTML",
          "It is a database language"
        ],
        correctIndex: 1,
        explanation: "JavaScript runs in browsers and on servers via Node.js."
      },
      {
        question: "ECMAScript refers to:",
        options: [
          "The JavaScript standard",
          "A browser-only API",
          "A CSS framework",
          "A database engine"
        ],
        correctIndex: 0,
        explanation: "ECMAScript is the standardized specification for the JavaScript language."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a message variable and log it to the console.",
        starterCode: "const message = \"\";\nconsole.log(message);",
        solutionHintMarkdown: "Assign any string to message before logging."
      }
    ]
  },
  "how-javascript-runs-js-engine-runtime-call-stack": {
    title: "How JavaScript runs (JS Engine, Runtime, Call Stack)",
    estimatedMinutes: 70,
    contentMarkdown: `# How JavaScript runs (JS Engine, Runtime, Call Stack)

## What you will learn
- What the JavaScript engine does
- What the runtime provides
- How the call stack executes code

## Beginner glossary
- Engine: the program that parses and executes JavaScript (V8, SpiderMonkey).
- Runtime: the environment around the engine (browser or Node.js).
- Call stack: a stack that tracks which function is currently running.
- Event loop: the system that handles async callbacks when the stack is empty.

## Big picture
When you run JavaScript, the engine reads your code, converts it into something the computer can run, and executes it. The runtime provides extra APIs like timers, the DOM, or filesystem access. The call stack keeps track of the active function calls.

## Mental model
Imagine the call stack as a stack of plates. Each function call adds a plate, and when the function returns, the plate is removed. Only the top plate can run. If a function takes too long, everything else must wait.

## Deep dive
- The engine parses your code, builds an internal structure, and executes it.
- The runtime provides host APIs that are not part of the language itself.
- Asynchronous tasks are handled by the runtime and scheduled back to the call stack through the event loop.

## Example
\`\`\`js
function a() {
  b();
}
function b() {
  console.log("in b");
}

// Call stack: a -> b
// Then returns to a, then to global
a();
\`\`\`

## Real world usage
- Debugging: understanding stack traces
- Performance: spotting long tasks that block the UI
- Async code: knowing why callbacks run later

## Common mistakes
- Thinking setTimeout runs on the call stack immediately
- Writing long loops that freeze the UI
- Assuming async tasks run in parallel on the main thread

## Quick check
1. What does the JavaScript engine do?
2. Why does a long loop freeze the page?

## Try it
Create a nested function call and print the order of logs to visualize the stack.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling
`,
    quizQuestions: [
      {
        question: "Which component executes JavaScript code?",
        options: [
          "The JavaScript engine",
          "The DOM",
          "The CSS parser",
          "The database"
        ],
        correctIndex: 0,
        explanation: "The engine parses and executes JavaScript."
      },
      {
        question: "The call stack is:",
        options: [
          "First-in, first-out",
          "Last-in, first-out",
          "A key-value store",
          "A background thread"
        ],
        correctIndex: 1,
        explanation: "The call stack is LIFO: last-in, first-out."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create two functions that call each other and log the order they run.",
        starterCode: "function first() {\n  // call second\n}\n\nfunction second() {\n  // log a message\n}\n\nfirst();",
        solutionHintMarkdown: "Call second inside first and log inside second."
      }
    ]
  },
  "variables-var-let-const": {
    title: "Variables: var, let, const",
    estimatedMinutes: 60,
    contentMarkdown: `# Variables: var, let, const

## What you will learn
- How variables are declared and scoped
- The differences between var, let, and const
- How to avoid common bugs caused by hoisting and reassignment

## Beginner glossary
- Variable: a named container for a value.
- Declaration: introducing a variable with var, let, or const.
- Scope: where a variable is accessible.
- Hoisting: JavaScript moving declarations to the top of scope at runtime.

## Big picture
Use let for variables that change and const for variables that should not be reassigned. var is older, function-scoped, and can create confusing bugs due to hoisting.

## Mental model
Think of let and const as block-scoped, meaning they live only inside the nearest set of braces. var ignores block scope and lives in the whole function. This is why var can leak values out of loops and if blocks.

## Deep dive
- let can be reassigned, const cannot be reassigned.
- const does not make objects immutable; it only prevents reassignment.
- var is hoisted and initialized to undefined, which can lead to unexpected behavior.

## Example
\`\`\`js
let count = 0;
count += 1;

const user = { name: "Zaid" };
user.name = "Sam"; // allowed
\`\`\`

## Real world usage
- Use const by default to prevent accidental reassignment.
- Use let for counters, loop indices, and mutable state.
- Avoid var in modern code unless working with legacy code.

## Common mistakes
- Using var in a loop and expecting block scope
- Assuming const makes objects deeply immutable
- Reassigning a const and causing a runtime error

## Quick check
1. Which keyword is block-scoped and reassignable?
2. Can you push into a const array?

## Try it
Refactor a snippet that uses var into let and const.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
`,
    quizQuestions: [
      {
        question: "Which keyword is block-scoped and can be re-assigned?",
        options: ["var", "let", "const", "function"],
        correctIndex: 1,
        explanation: "let is block-scoped and re-assignable."
      },
      {
        question: "Which statement about const is true?",
        options: [
          "It makes objects immutable",
          "It prevents re-assignment",
          "It is function-scoped",
          "It is the same as var"
        ],
        correctIndex: 1,
        explanation: "const prevents re-assigning the variable, not mutating its contents."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Fix the variables so the code runs without errors.",
        starterCode: "const total = 1;\n// increase total\n// total = total + 1;\nconsole.log(total);",
        solutionHintMarkdown: "Use let if you need to re-assign."
      }
    ]
  },
  "data-types-string-number-boolean": {
    title: "Data Types: string, number, boolean",
    estimatedMinutes: 60,
    contentMarkdown: `# Data Types: string, number, boolean

## What you will learn
- What primitive types are
- How strings, numbers, and booleans behave
- How to avoid type-related bugs

## Beginner glossary
- Primitive: a basic value type in JavaScript.
- String: text data in quotes.
- Number: numeric data (integers and decimals).
- Boolean: true or false value.

## Big picture
JavaScript has primitive data types. Strings are text, numbers represent both integers and decimals, and booleans represent true or false. These are the building blocks of most programs.

## Mental model
Think of strings as sequences of characters, numbers as values you can do math with, and booleans as yes/no flags that drive conditions.

## Deep dive
- JavaScript has only one number type, so 1 and 1.5 are both numbers.
- Strings can be combined with +, but that may coerce numbers into strings.
- Booleans are central to if statements and loops.

## Example
\`\`\`js
const name = "Ada"; // string
const age = 30; // number
const isAdmin = false; // boolean

console.log(typeof name, typeof age, typeof isAdmin);
\`\`\`

## Real world usage
- Strings: user names, product titles, messages
- Numbers: prices, counts, scores, measurements
- Booleans: feature flags, permissions, UI toggles

## Common mistakes
- Treating numeric strings as numbers
- Using loose equality with booleans and numbers
- Forgetting that non-empty strings are truthy

## Quick check
1. What does typeof 10 return?
2. What is a boolean used for?

## Try it
Create variables for a username, score, and isOnline flag and log them.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
`,
    quizQuestions: [
      {
        question: "What is the result of typeof \"hello\"?",
        options: ["string", "number", "boolean", "object"],
        correctIndex: 0,
        explanation: "Strings return the type string."
      },
      {
        question: "Which value is a boolean?",
        options: ["0", "\"false\"", "false", "\"0\""],
        correctIndex: 2,
        explanation: "false is the boolean value."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create variables for a username, score, and isOnline flag.",
        starterCode: "const username = \"\";\nconst score = 0;\nconst isOnline = false;\nconsole.log(username, score, isOnline);",
        solutionHintMarkdown: "Use a string, a number, and a boolean."
      }
    ]
  },
  "data-types-null-vs-undefined": {
    title: "Data Types: null vs undefined",
    estimatedMinutes: 60,
    contentMarkdown: `# Data Types: null vs undefined

## What you will learn
- The difference between null and undefined
- When each value appears
- How to handle missing values safely

## Beginner glossary
- undefined: a variable declared but not assigned.
- null: an explicit assignment meaning no value.
- Falsy: a value treated as false in conditions.

## Big picture
undefined means a value is missing because it was never assigned. null means a value was intentionally set to nothing. They both represent absence, but for different reasons.

## Mental model
Think of undefined as uninitialized. Think of null as intentionally empty. This distinction helps communicate intent in code.

## Deep dive
- typeof undefined is "undefined".
- typeof null is "object" due to a historical bug.
- Equality rules: null == undefined is true, but strict equality treats them as different.

## Example
\`\`\`js
let user; // undefined
const selected = null; // intentional empty value

console.log(user, selected);
\`\`\`

## Real world usage
- undefined: optional parameters not passed
- null: resetting a value or clearing a selection
- APIs: missing values may be undefined or null depending on design

## Common mistakes
- Using null and undefined interchangeably
- Assuming typeof null returns "null"
- Using loose equality and hiding bugs

## Quick check
1. What does undefined indicate?
2. What does typeof null return?

## Try it
Write a function that returns null when a value is missing.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null
`,
    quizQuestions: [
      {
        question: "undefined usually means:",
        options: [
          "The value was never assigned",
          "The value is intentionally empty",
          "The value is a number",
          "The value is a function"
        ],
        correctIndex: 0,
        explanation: "undefined indicates a missing assignment."
      },
      {
        question: "What is typeof null?",
        options: ["null", "undefined", "object", "number"],
        correctIndex: 2,
        explanation: "typeof null is a historical bug and returns object."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Write a function that returns null when a value is missing.",
        starterCode: "function getName(user) {\n  // return null if user or user.name is missing\n}\n\nconsole.log(getName(null));",
        solutionHintMarkdown: "Check for falsy values and return null explicitly."
      }
    ]
  },
  "data-types-symbol-bigint": {
    title: "Data Types: symbol, bigint",
    estimatedMinutes: 60,
    contentMarkdown: `# Data Types: symbol, bigint

## What you will learn
- Why Symbol exists and how it is used
- How BigInt handles very large integers
- Practical use cases for both

## Beginner glossary
- Symbol: a unique identifier type.
- BigInt: a number type for very large integers.
- Unique: no two values are the same, even if they look similar.

## Big picture
Symbol creates unique identifiers, often used as object keys that should not conflict with other keys. BigInt allows you to represent integers larger than Number.MAX_SAFE_INTEGER without losing precision.

## Mental model
Use Symbol when you need a hidden or collision-free key. Use BigInt when normal numbers are too large and precision matters.

## Deep dive
- Two Symbols with the same description are still different.
- BigInt values are created with an n suffix or BigInt() constructor.
- You cannot mix BigInt and Number in arithmetic without conversion.

## Example
\`\`\`js
const id = Symbol("userId");
const user = { [id]: 123 };

const big = 9007199254740993n;
\`\`\`

## Real world usage
- Symbols: library internals, metadata keys
- BigInt: financial calculations, large IDs, timestamps beyond safe integer range

## Common mistakes
- Mixing BigInt and Number without converting
- Expecting Symbol keys to show up in Object.keys

## Quick check
1. How do you create a BigInt literal?
2. Are two Symbols with the same description equal?

## Try it
Store a value in an object using a Symbol key and read it back.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
`,
    quizQuestions: [
      {
        question: "How do you create a BigInt literal?",
        options: ["BigInt(10)", "10n", "Number(10)", "10b"],
        correctIndex: 1,
        explanation: "Add n to the end of an integer literal."
      },
      {
        question: "Two symbols created with the same description are:",
        options: ["equal", "different", "numbers", "strings"],
        correctIndex: 1,
        explanation: "Each Symbol is unique, even with the same description."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a Symbol key and store a secret value in an object.",
        starterCode: "const secretKey = Symbol(\"secret\");\nconst data = {};\n// store a value using secretKey\nconsole.log(data[secretKey]);",
        solutionHintMarkdown: "Use data[secretKey] = \"value\"."
      }
    ]
  },
  "type-coercion": {
    title: "Type coercion",
    estimatedMinutes: 60,
    contentMarkdown: `# Type coercion

## What you will learn
- How JavaScript converts types automatically
- The difference between loose and strict equality
- How to avoid coercion bugs

## Beginner glossary
- Coercion: automatic conversion from one type to another.
- Loose equality: == comparison that allows type conversion.
- Strict equality: === comparison that checks both type and value.

## Big picture
JavaScript sometimes converts values for you. This can be convenient, but it can also cause surprising results. Understanding coercion helps you write predictable code.

## Mental model
Treat coercion as a hidden step. If you do not explicitly convert values, JavaScript may do it for you. Use strict equality to avoid surprises.

## Deep dive
- The + operator with a string turns numbers into strings.
- The - operator with strings attempts numeric conversion.
- == performs type conversion, === does not.

## Example
\`\`\`js
console.log("5" + 1); // "51"
console.log("5" - 1); // 4
console.log(0 == false); // true
console.log(0 === false); // false
\`\`\`

## Real world usage
- Parsing user input from forms (strings to numbers)
- Comparing values from APIs
- Safely handling optional values

## Common mistakes
- Using == and expecting strict comparisons
- Relying on implicit conversion in complex conditions
- Comparing numbers stored as strings

## Quick check
1. What does === do that == does not?
2. Why is "5" + 1 a string?

## Try it
Convert a string input to a number and compare it using strict equality.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
`,
    quizQuestions: [
      {
        question: "Which operator avoids implicit coercion?",
        options: ["==", "===", "=", "!=!"],
        correctIndex: 1,
        explanation: "=== compares both type and value."
      },
      {
        question: "What is the result of \"5\" + 1?",
        options: ["6", "51", "NaN", "TypeError"],
        correctIndex: 1,
        explanation: "+ with a string coerces the number to a string."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Fix the comparisons by using strict equality.",
        starterCode: "const input = \"0\";\nif (input == 0) {\n  console.log(\"zero\");\n}",
        solutionHintMarkdown: "Convert input to a number, then use ===."
      }
    ]
  },
  "operators-arithmetic-comparison-logical": {
    title: "Operators (arithmetic, comparison, logical)",
    estimatedMinutes: 60,
    contentMarkdown: `# Operators (arithmetic, comparison, logical)

## What you will learn
- How arithmetic operators perform math
- How comparison operators produce booleans
- How logical operators combine conditions

## Beginner glossary
- Operator: a symbol that performs an action on values.
- Operand: the value an operator works on.
- Short-circuit: stopping evaluation early when the result is known.

## Big picture
Operators let you calculate values and make decisions. Arithmetic operators do math, comparison operators return booleans, and logical operators combine booleans to build conditions.

## Mental model
Think of arithmetic as calculators, comparisons as questions that return true or false, and logical operators as glue that connects multiple questions.

## Deep dive
- +, -, *, /, % are arithmetic operators.
- >, <, >=, <=, === compare values and return true or false.
- &&, ||, ! combine booleans and short-circuit when possible.

## Example
\`\`\`js
const total = 10 + 5 * 2; // 20
const isAdult = age >= 18;
const canView = isAdult && hasTicket;
\`\`\`

## Real world usage
- Calculating totals and discounts
- Validating inputs and conditions
- Building permission logic

## Common mistakes
- Forgetting operator precedence
- Using == when strict comparison is needed
- Confusing && and || behavior

## Quick check
1. What does % return?
2. When does && stop evaluating?

## Try it
Write a condition that checks if a user is logged in and has a subscription.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators
`,
    quizQuestions: [
      {
        question: "What does the % operator return?",
        options: ["Quotient", "Remainder", "Power", "Average"],
        correctIndex: 1,
        explanation: "% returns the remainder."
      },
      {
        question: "&& will:",
        options: ["Always evaluate both sides", "Short-circuit on false", "Only work with numbers", "Sort arrays"],
        correctIndex: 1,
        explanation: "&& stops when the left side is false."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Compute whether a user can access premium content.",
        starterCode: "const isLoggedIn = true;\nconst hasSubscription = false;\n// set canAccess\nconst canAccess = false;\nconsole.log(canAccess);",
        solutionHintMarkdown: "Use isLoggedIn && hasSubscription."
      }
    ]
  }
};
