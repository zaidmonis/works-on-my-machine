import type { LessonContent } from "./javascript-mastery-types";

export const javascriptMasteryFunctions: Record<string, LessonContent> = {
  "function-declarations-vs-expressions": {
    title: "Function declarations vs expressions",
    estimatedMinutes: 60,
    contentMarkdown: `# Function declarations vs expressions

## What you will learn
- How declarations and expressions differ
- How hoisting affects function usage
- When to choose each style

## Beginner glossary
- Function: reusable block of code that can be called.
- Declaration: defines a function with the function keyword and a name.
- Expression: defines a function as a value (often assigned to a variable).
- Hoisting: moving declarations to the top of scope at runtime.

## Big picture
Function declarations are hoisted, so you can call them before they appear in code. Function expressions are not hoisted the same way, so you can only call them after the assignment.

## Mental model
Think of declarations as "registered" at the top of the scope. Expressions are created at runtime when the line executes.

## Deep dive
- Declarations: function greet() {}
- Expressions: const greet = function() {}
- Named vs anonymous expressions: names help debugging stack traces.

## Example
\`\`\`js
// Declaration
greet();
function greet() {
  console.log("hello");
}

// Expression
const sayHi = function () {
  console.log("hi");
};
\`\`\`

## Real world usage
- Declarations for shared utility functions
- Expressions for callbacks and inline handlers
- Named expressions for better debugging

## Common mistakes
- Calling function expressions before they are defined
- Using var with expressions and expecting safe hoisting

## Quick check
1. Which type is hoisted fully?
2. When can you call a function expression?

## Try it
Rewrite a declaration into an expression and observe when it can be called.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
`,
    quizQuestions: [
      {
        question: "Which is hoisted and can be called before it is defined?",
        options: ["Function declaration", "Function expression", "Arrow function", "Callback"],
        correctIndex: 0,
        explanation: "Function declarations are hoisted."
      },
      {
        question: "A function expression is created when:",
        options: ["The file loads", "The line executes", "The browser opens", "The stack clears"],
        correctIndex: 1,
        explanation: "Function expressions are created when the assignment runs."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Convert a function declaration into a function expression.",
        starterCode: "function add(a, b) {\n  return a + b;\n}\n",
        solutionHintMarkdown: "Assign the function to a const named add."
      }
    ]
  },
  "arrow-functions": {
    title: "Arrow functions",
    estimatedMinutes: 60,
    contentMarkdown: `# Arrow functions

## What you will learn
- Arrow function syntax variations
- How arrow functions handle this
- When arrow functions are a good choice

## Beginner glossary
- Arrow function: a shorter function syntax using =>.
- this: a special keyword referring to the current context.
- Implicit return: returning a value without the return keyword.

## Big picture
Arrow functions are concise and commonly used for callbacks. They do not have their own this binding, which makes them useful in many cases but unsuitable in others.

## Mental model
Arrow functions behave like regular functions for parameters and return values, but they capture this from the surrounding scope.

## Deep dive
- One parameter can omit parentheses.
- Single expression can omit braces and return.
- Arrow functions are not ideal as methods that rely on this.

## Example
\`\`\`js
const add = (a, b) => a + b;
const double = n => n * 2;
const log = () => console.log("hi");
\`\`\`

## Real world usage
- Array callbacks like map and filter
- Small utility functions
- Inline handlers in frameworks

## Common mistakes
- Using arrow functions for object methods that need this
- Forgetting braces and return in multi-line bodies

## Quick check
1. What does an arrow function do with this?
2. When can you use an implicit return?

## Try it
Rewrite a function expression into an arrow function.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
`,
    quizQuestions: [
      {
        question: "Arrow functions have their own this?",
        options: ["Yes", "No", "Only in classes", "Only in objects"],
        correctIndex: 1,
        explanation: "Arrow functions capture this from the outer scope."
      },
      {
        question: "When can you omit the return keyword?",
        options: ["With a single expression body", "Always", "Never", "Only in loops"],
        correctIndex: 0,
        explanation: "Single expression bodies can use implicit return."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Convert a function to an arrow function with an implicit return.",
        starterCode: "const square = function (n) {\n  return n * n;\n};",
        solutionHintMarkdown: "Use const square = n => n * n."
      }
    ]
  },
  "parameters-return-values": {
    title: "Parameters & return values",
    estimatedMinutes: 60,
    contentMarkdown: `# Parameters & return values

## What you will learn
- How parameters pass data into functions
- How return values send data back out
- How to design functions with clear inputs and outputs

## Beginner glossary
- Parameter: a named input in a function definition.
- Argument: the actual value passed to a function.
- Return value: the output of a function.

## Big picture
Functions take parameters, do work, and return values. Clear inputs and outputs make functions easy to test and reuse.

## Mental model
Think of a function like a machine: inputs go in, a result comes out. If a function does not return a value, it returns undefined.

## Example
\`\`\`js
function add(a, b) {
  return a + b;
}

const result = add(2, 3);
\`\`\`

## Real world usage
- Calculating prices and totals
- Transforming data from APIs
- Encapsulating logic for reuse

## Common mistakes
- Forgetting to return a value
- Relying on side effects instead of return values
- Passing arguments in the wrong order

## Quick check
1. What is the difference between a parameter and an argument?
2. What happens if you do not return anything?

## Try it
Write a function that takes a name and returns a greeting string.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
`,
    quizQuestions: [
      {
        question: "Parameters are:",
        options: ["Inputs in the function definition", "Values returned", "Global variables", "Loop counters"],
        correctIndex: 0,
        explanation: "Parameters are inputs in the function definition."
      },
      {
        question: "If a function does not return, it returns:",
        options: ["null", "undefined", "0", "false"],
        correctIndex: 1,
        explanation: "Functions return undefined by default."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Write a function that multiplies two numbers and returns the result.",
        starterCode: "function multiply(a, b) {\n  // return result\n}\n",
        solutionHintMarkdown: "Use return a * b."
      }
    ]
  },
  "default-parameters": {
    title: "Default parameters",
    estimatedMinutes: 60,
    contentMarkdown: `# Default parameters

## What you will learn
- How to set fallback values for parameters
- Why defaults improve function safety
- When to use defaults vs checks inside the function

## Beginner glossary
- Default value: a value used when none is provided.
- Optional parameter: a parameter that the caller can omit.

## Big picture
Default parameters let you define a fallback value if a caller does not pass one. This makes functions easier to use and reduces manual checks.

## Mental model
Think of defaults as a safety net. If the caller does not provide a value, the function still works.

## Example
\`\`\`js
function greet(name = "friend") {
  return \`Hello, \${name}\`;
}

console.log(greet());
\`\`\`

## Real world usage
- API wrappers with default options
- Utility functions with optional settings
- Formatting functions with fallback behavior

## Common mistakes
- Using defaults that hide errors
- Forgetting that undefined triggers the default but null does not

## Quick check
1. When is a default used?
2. What happens if you pass null?

## Try it
Create a function that formats a price with a default currency.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
`,
    quizQuestions: [
      {
        question: "Default parameters are used when:",
        options: ["The argument is undefined", "The argument is null", "The argument is false", "Always"],
        correctIndex: 0,
        explanation: "Defaults apply when the argument is undefined."
      },
      {
        question: "Passing null will:",
        options: ["Use the default", "Use null", "Throw an error", "Convert to undefined"],
        correctIndex: 1,
        explanation: "null is a provided value, so the default is not used."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Add a default parameter to a function that sets the greeting name.",
        starterCode: "function greet(name) {\n  return \`Hello, \${name}\`;\n}",
        solutionHintMarkdown: "Use name = \"friend\" in the parameter list."
      }
    ]
  },
  "rest-parameters": {
    title: "Rest parameters",
    estimatedMinutes: 60,
    contentMarkdown: `# Rest parameters

## What you will learn
- How rest parameters collect arguments
- How to work with variable-length inputs
- The difference between rest parameters and arrays

## Beginner glossary
- Rest parameter: a way to gather extra arguments into an array.
- Variadic: a function that accepts any number of arguments.

## Big picture
Rest parameters allow you to accept an unknown number of arguments. They gather the remaining arguments into an array you can process.

## Mental model
Think of rest parameters as a bag of extra inputs. You can loop over them like a normal array.

## Example
\`\`\`js
function sum(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));
\`\`\`

## Real world usage
- Utility functions like sum or max
- Logging helpers that accept any number of values
- Wrapping functions with extra arguments

## Common mistakes
- Placing rest parameters before other parameters
- Forgetting rest is an array, not a single value

## Quick check
1. What does ...nums represent?
2. Where can rest parameters appear?

## Try it
Create a function that takes any number of names and returns them as a list.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
`,
    quizQuestions: [
      {
        question: "Rest parameters collect:",
        options: ["The first argument", "All arguments into an array", "Only numbers", "Only strings"],
        correctIndex: 1,
        explanation: "Rest parameters gather the remaining arguments into an array."
      },
      {
        question: "Rest parameters must appear:",
        options: ["First", "Last", "Anywhere", "Nowhere"],
        correctIndex: 1,
        explanation: "Rest parameters must be last."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a function that joins any number of words into a sentence.",
        starterCode: "function makeSentence(...words) {\n  // return sentence\n}\n",
        solutionHintMarkdown: "Use words.join(\" \")."
      }
    ]
  },
  "pure-vs-impure-functions": {
    title: "Pure vs impure functions",
    estimatedMinutes: 60,
    contentMarkdown: `# Pure vs impure functions

## What you will learn
- What makes a function pure
- Why purity improves predictability
- When impure functions are necessary

## Beginner glossary
- Pure function: always returns the same output for the same input, with no side effects.
- Side effect: changing something outside the function (logging, network, mutation).
- Impure function: a function that depends on or changes external state.

## Big picture
Pure functions are easier to test and reason about because they are predictable. Impure functions are sometimes necessary for real-world tasks like logging or updating the DOM.

## Mental model
Think of pure functions as math: same input, same output, no surprises. Impure functions interact with the world and can change things.

## Example
\`\`\`js
// Pure
function add(a, b) {
  return a + b;
}

// Impure
let total = 0;
function addToTotal(n) {
  total += n;
}
\`\`\`

## Real world usage
- Pure: data transformations, calculations, formatting
- Impure: API calls, logging, updating UI

## Common mistakes
- Hiding side effects in utility functions
- Mutating input objects and causing bugs

## Quick check
1. What makes a function pure?
2. Why are pure functions easier to test?

## Try it
Refactor an impure function to be pure by passing all needed data as parameters.

## Further reading
- https://developer.mozilla.org/en-US/docs/Glossary/Pure_function
`,
    quizQuestions: [
      {
        question: "A pure function:",
        options: ["Depends on external state", "Has no side effects", "Always logs", "Mutates inputs"],
        correctIndex: 1,
        explanation: "Pure functions have no side effects."
      },
      {
        question: "Which is a side effect?",
        options: ["Returning a value", "Logging to console", "Calculating sum", "Sorting a copy"],
        correctIndex: 1,
        explanation: "Logging changes the outside world."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Identify whether a function is pure or impure.",
        starterCode: "function logAndReturn(n) {\n  console.log(n);\n  return n;\n}\n",
        solutionHintMarkdown: "Logging makes it impure."
      }
    ]
  }
};
