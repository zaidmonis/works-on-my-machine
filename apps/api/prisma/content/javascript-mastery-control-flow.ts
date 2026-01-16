import type { LessonContent } from "./javascript-mastery-types";

export const javascriptMasteryControlFlow: Record<string, LessonContent> = {
  "if-else": {
    title: "if / else",
    estimatedMinutes: 60,
    contentMarkdown: `# if / else

## What you will learn
- How conditional branches work
- How to structure multiple conditions with else if
- How to write readable, safe conditions

## Beginner glossary
- Condition: a true or false test.
- Branch: one path of execution in code.
- Boolean: true or false value used in conditions.

## Big picture
if and else let your program choose between different actions. The condition is evaluated first. If it is true, the if block runs. Otherwise, the else block runs. You can chain multiple checks with else if.

## Mental model
Think of if/else as a decision tree. Each condition asks a yes or no question. When a condition is true, JavaScript follows that branch and skips the rest.

## Deep dive
- Use parentheses to make conditions clear.
- Prefer strict equality (===) to avoid coercion bugs.
- Group conditions with && and || when needed, but keep them readable.

## Example
\`\`\`js
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("Keep practicing");
}
\`\`\`

## Real world usage
- Validating user input
- Permission checks (is logged in, has access)
- Feature toggles and A/B tests

## Common mistakes
- Using = instead of ===
- Writing long conditions that are hard to read
- Forgetting to handle the default case

## Quick check
1. When does the else block run?
2. How do you check multiple ranges?

## Try it
Write a function that labels a number as positive, negative, or zero.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
`,
    quizQuestions: [
      {
        question: "When does an else block run?",
        options: ["Always", "Only when the if condition is false", "Only when the if condition is true", "Never"],
        correctIndex: 1,
        explanation: "else runs when the if condition is false."
      },
      {
        question: "Which keyword allows multiple branches?",
        options: ["else", "else if", "switch", "break"],
        correctIndex: 1,
        explanation: "else if lets you chain additional conditions."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Write a function that labels a number as positive, negative, or zero.",
        starterCode: "function labelNumber(n) {\n  // return a string\n}\n\nconsole.log(labelNumber(3));",
        solutionHintMarkdown: "Use if, else if, and else."
      }
    ]
  },
  "switch": {
    title: "switch",
    estimatedMinutes: 60,
    contentMarkdown: `# switch

## What you will learn
- How switch compares values
- How case, break, and default work together
- When switch is clearer than if/else chains

## Beginner glossary
- Case: a labeled branch in a switch statement.
- Break: exits the switch so the next case does not run.
- Default: the fallback case when no match is found.

## Big picture
switch compares one value against multiple case labels using strict equality. It is useful when you have many exact matches to check, like roles or status codes.

## Mental model
Think of switch as a lookup table. JavaScript looks for a matching label and runs that block. Without break, execution falls through to the next case.

## Deep dive
- Use break to avoid fall-through unless you want it.
- Use default to handle unknown values.
- switch is best for exact matches, not complex boolean logic.

## Example
\`\`\`js
switch (role) {
  case "admin":
    console.log("Full access");
    break;
  case "editor":
    console.log("Write access");
    break;
  default:
    console.log("Read only");
}
\`\`\`

## Real world usage
- Mapping statuses to messages
- Handling keyboard input codes
- Routing based on action types

## Common mistakes
- Forgetting break and running multiple cases
- Using switch for complex conditions (use if/else)

## Quick check
1. What happens if you omit break?
2. What comparison does switch use?

## Try it
Map a shipping status to a user-facing message using switch.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
`,
    quizQuestions: [
      {
        question: "switch compares with:",
        options: ["==", "===", "<", ">"],
        correctIndex: 1,
        explanation: "switch uses strict equality."
      },
      {
        question: "If you omit break, the code will:",
        options: ["Throw an error", "Fall through to the next case", "Stop execution", "Skip the switch"],
        correctIndex: 1,
        explanation: "Without break, execution continues into the next case."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Use a switch to map a color to a hex code.",
        starterCode: "function colorToHex(color) {\n  switch (color) {\n    // cases\n    default:\n      return \"#000000\";\n  }\n}\n\nconsole.log(colorToHex(\"red\"));",
        solutionHintMarkdown: "Add cases for red, green, and blue."
      }
    ]
  },
  "loops-for": {
    title: "loops: for",
    estimatedMinutes: 60,
    contentMarkdown: `# loops: for

## What you will learn
- The three parts of a for loop
- How to loop a fixed number of times
- How to iterate over arrays with index access

## Beginner glossary
- Loop: a way to repeat a block of code.
- Initialization: the starting value of the counter.
- Condition: the test that decides if the loop continues.
- Update: how the counter changes each iteration.

## Big picture
A for loop is ideal when you know how many times you want to repeat. It includes initialization, condition, and update in a single line, which makes it compact and explicit.

## Mental model
Think of a for loop as a counter that moves from a start value to an end value, checking a condition at each step.

## Deep dive
- Use let for the counter to keep it scoped to the loop.
- Be careful with off-by-one errors (<= vs <).
- Use array.length to avoid hard-coding sizes.

## Example
\`\`\`js
for (let i = 0; i < 3; i += 1) {
  console.log(i);
}
\`\`\`

## Real world usage
- Iterating over arrays by index
- Repeating a task a set number of times
- Building a results list from data

## Common mistakes
- Forgetting to update the counter
- Using the wrong loop condition

## Quick check
1. What does the update expression do?
2. When is for better than while?

## Try it
Sum the numbers from 1 to 5 using a for loop.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
`,
    quizQuestions: [
      {
        question: "A for loop runs while:",
        options: ["The condition is true", "The condition is false", "The update is true", "The init is true"],
        correctIndex: 0,
        explanation: "The loop continues while the condition is true."
      },
      {
        question: "Which part increments the counter?",
        options: ["Initialization", "Condition", "Update", "Body"],
        correctIndex: 2,
        explanation: "The update expression typically increments the counter."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Sum the numbers from 1 to 5 using a for loop.",
        starterCode: "let sum = 0;\nfor (let i = 1; i <= 5; i += 1) {\n  // add to sum\n}\nconsole.log(sum);",
        solutionHintMarkdown: "Use sum += i inside the loop."
      }
    ]
  },
  "loops-while": {
    title: "loops: while",
    estimatedMinutes: 60,
    contentMarkdown: `# loops: while

## What you will learn
- How while loops work
- When to use while instead of for
- How to avoid infinite loops

## Beginner glossary
- Condition: the test that controls the loop.
- Infinite loop: a loop that never ends.
- Sentinel: a value that tells the loop to stop.

## Big picture
A while loop repeats as long as a condition is true. It is useful when you do not know how many times the loop should run in advance.

## Mental model
Think of while as "keep going until a condition changes." You must update something inside the loop so the condition eventually becomes false.

## Deep dive
- Use while for reading input until a stop condition.
- Use for when the number of iterations is known.
- Always update the variable used in the condition.

## Example
\`\`\`js
let count = 3;
while (count > 0) {
  console.log(count);
  count -= 1;
}
\`\`\`

## Real world usage
- Reading input until a user cancels
- Polling until a condition is met
- Processing queues until empty

## Common mistakes
- Forgetting to update the condition variable
- Using while where for is clearer

## Quick check
1. When should you use while?
2. What causes an infinite loop?

## Try it
Count down from 5 to 1 using a while loop.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while
`,
    quizQuestions: [
      {
        question: "A while loop runs:",
        options: ["At least once", "While the condition is true", "Only once", "Only for arrays"],
        correctIndex: 1,
        explanation: "The loop runs while its condition is true."
      },
      {
        question: "An infinite loop usually happens when:",
        options: ["The condition never changes", "You use for", "You use break", "You use continue"],
        correctIndex: 0,
        explanation: "If the condition never changes, the loop never ends."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Use a while loop to count down from 5 to 1.",
        starterCode: "let n = 5;\nwhile (n > 0) {\n  // log n\n  // decrement n\n}",
        solutionHintMarkdown: "Log n and then decrement it inside the loop."
      }
    ]
  },
  "loops-do-while": {
    title: "loops: do-while",
    estimatedMinutes: 60,
    contentMarkdown: `# loops: do-while

## What you will learn
- How do-while differs from while
- Why it runs at least once
- Safe use cases for do-while

## Beginner glossary
- Post-check loop: a loop that checks the condition after the body runs.
- Guard condition: the check that decides whether to continue.

## Big picture
A do-while loop runs the body first, then checks the condition. This guarantees one execution, which is useful for prompts or tasks that must run at least once.

## Mental model
Think of do-while as "do it once, then decide if you should keep going."

## Example
\`\`\`js
let tries = 0;
do {
  tries += 1;
} while (tries < 1);
\`\`\`

## Real world usage
- Prompting a user at least once
- Retrying an operation after an initial attempt

## Common mistakes
- Using do-while when you do not need the guaranteed first run
- Forgetting that the condition is checked after the body

## Quick check
1. Does do-while run if the condition is false?
2. When is it useful?

## Try it
Use do-while to run a task once and then stop.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while
`,
    quizQuestions: [
      {
        question: "do-while executes the body:",
        options: ["Only if condition is true", "At least once", "Never", "Only for arrays"],
        correctIndex: 1,
        explanation: "The body runs once before the condition check."
      },
      {
        question: "The condition is checked:",
        options: ["Before the body", "After the body", "Inside the body", "Never"],
        correctIndex: 1,
        explanation: "The condition is checked after the loop body runs."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Use do-while to run a task once and then stop.",
        starterCode: "let ran = false;\ndo {\n  // set ran to true\n} while (ran === false);\nconsole.log(ran);",
        solutionHintMarkdown: "Set ran = true inside the loop."
      }
    ]
  },
  "loops-for-of": {
    title: "loops: for...of",
    estimatedMinutes: 60,
    contentMarkdown: `# loops: for...of

## What you will learn
- How to iterate over values of iterables
- Why for...of is cleaner than index loops for arrays
- What can be iterated with for...of

## Beginner glossary
- Iterable: a value you can loop over, like an array or string.
- Value: the item produced each iteration.

## Big picture
for...of is designed for iterables and gives you values directly. It is clean and readable, especially when you do not need the index.

## Mental model
Think of for...of as "give me each value in this collection one at a time."

## Example
\`\`\`js
const letters = ["a", "b", "c"];
for (const letter of letters) {
  console.log(letter);
}
\`\`\`

## Real world usage
- Looping through array items
- Iterating over characters in a string
- Working with Map or Set values

## Common mistakes
- Using for...of with plain objects
- Forgetting that it gives values, not keys

## Quick check
1. What does for...of give you?
2. What can you iterate with it?

## Try it
Build a sentence by looping through an array of words.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
`,
    quizQuestions: [
      {
        question: "for...of iterates over:",
        options: ["Object keys", "Iterable values", "Only arrays", "Only strings"],
        correctIndex: 1,
        explanation: "It iterates over values of an iterable."
      },
      {
        question: "Which is iterable?",
        options: ["Array", "Plain object", "Function", "Number"],
        correctIndex: 0,
        explanation: "Arrays are iterable."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Use for...of to build a string from an array of words.",
        starterCode: "const words = [\"hello\", \"world\"];\nlet sentence = \"\";\nfor (const word of words) {\n  // build sentence\n}\nconsole.log(sentence);",
        solutionHintMarkdown: "Append each word with a space."
      }
    ]
  },
  "loops-for-in": {
    title: "loops: for...in",
    estimatedMinutes: 60,
    contentMarkdown: `# loops: for...in

## What you will learn
- How to iterate over object keys
- How for...in differs from for...of
- How to avoid inherited properties

## Beginner glossary
- Key: the name of a property in an object.
- Enumerable: a property that shows up in loops.
- Inherited: a property that comes from the prototype.

## Big picture
for...in loops over the enumerable keys of an object. It is meant for objects, not arrays. If you want only own properties, you must check for them.

## Mental model
Think of for...in as "list all the property names on this object."

## Example
\`\`\`js
const user = { name: "Zaid", role: "admin" };
for (const key in user) {
  if (Object.hasOwn(user, key)) {
    console.log(key, user[key]);
  }
}
\`\`\`

## Real world usage
- Iterating over settings objects
- Converting objects into arrays
- Building query strings from key-value pairs

## Common mistakes
- Using for...in on arrays
- Forgetting to filter inherited properties

## Quick check
1. What does for...in give you?
2. How do you skip inherited properties?

## Try it
Sum all values in an object using for...in.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
`,
    quizQuestions: [
      {
        question: "for...in iterates over:",
        options: ["Values", "Keys", "Indexes only", "Characters"],
        correctIndex: 1,
        explanation: "It iterates over enumerable keys."
      },
      {
        question: "To avoid inherited keys, you can use:",
        options: ["Object.hasOwn", "Array.isArray", "JSON.parse", "Math.random"],
        correctIndex: 0,
        explanation: "Object.hasOwn checks for own properties."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Sum all values in an object using for...in.",
        starterCode: "const scores = { a: 3, b: 5, c: 2 };\nlet total = 0;\nfor (const key in scores) {\n  // add scores[key]\n}\nconsole.log(total);",
        solutionHintMarkdown: "Add scores[key] to total."
      }
    ]
  },
  "break-continue": {
    title: "break & continue",
    estimatedMinutes: 60,
    contentMarkdown: `# break & continue

## What you will learn
- How break exits a loop early
- How continue skips the current iteration
- When to use each for clarity

## Beginner glossary
- Iteration: one pass through a loop.
- Early exit: stopping a loop before it naturally ends.

## Big picture
break stops a loop immediately. continue skips the current iteration and moves to the next. These keywords are helpful, but overuse can make loops hard to read.

## Mental model
Use break when you found what you need. Use continue when you want to skip invalid items.

## Example
\`\`\`js
for (const n of [1, 2, 3, 4]) {
  if (n === 3) continue;
  if (n === 4) break;
  console.log(n); // 1, 2
}
\`\`\`

## Real world usage
- Finding the first matching item
- Skipping invalid data rows
- Ending a loop after a success condition

## Common mistakes
- Using break when you meant to skip one item
- Overusing continue and hiding logic

## Quick check
1. What does continue do?
2. When should you use break?

## Try it
Find the first even number in an array and stop looping.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break
`,
    quizQuestions: [
      {
        question: "continue does what?",
        options: ["Stops the loop", "Skips the current iteration", "Restarts the program", "Throws an error"],
        correctIndex: 1,
        explanation: "It skips the current iteration and continues."
      },
      {
        question: "break is used to:",
        options: ["Skip one item", "Exit the loop", "Pause the loop", "Sort data"],
        correctIndex: 1,
        explanation: "It exits the loop immediately."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Find the first even number in an array and stop looping.",
        starterCode: "const nums = [1, 3, 7, 8, 10];\nlet firstEven = null;\nfor (const n of nums) {\n  // set firstEven and break\n}\nconsole.log(firstEven);",
        solutionHintMarkdown: "Check n % 2 === 0, then set and break."
      }
    ]
  }
};
