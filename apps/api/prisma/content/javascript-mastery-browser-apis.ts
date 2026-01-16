import type { LessonContent } from "./javascript-mastery-types";

export const javascriptMasteryBrowserApis: Record<string, LessonContent> = {
  "dom-manipulation": {
    title: "DOM manipulation",
    estimatedMinutes: 60,
    contentMarkdown: `# DOM manipulation

## What you will learn
- What the DOM is and how JavaScript interacts with it
- How to select and update elements
- Safer patterns for updating UI

## Beginner glossary
- DOM (Document Object Model): the browser's tree representation of the page.
- Element: a node in the DOM, like a div or button.
- Selector: a string used to find elements.

## Big picture
The DOM is the browser's live representation of your HTML. JavaScript can read and change it to update the page without a full reload.

## Mental model
Think of the DOM as a tree of boxes. JavaScript can find a box and change its text, style, or structure.

## Example
\`\`\`js
const title = document.querySelector("h1");
title.textContent = "Updated";
\`\`\`

## Real world usage
- Updating text after a user action
- Showing or hiding elements
- Building UI from data

## Common mistakes
- Running DOM queries before the page loads
- Repeating expensive DOM updates in loops
- Mixing DOM updates with conflicting frameworks

## Quick check
1. What does document.querySelector return?
2. What is the DOM?

## Try it
Select a paragraph element and change its text.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
`,
    quizQuestions: [
      {
        question: "The DOM is:",
        options: ["A database", "A tree of page elements", "A CSS file", "A JavaScript engine"],
        correctIndex: 1,
        explanation: "The DOM represents the page as a tree of elements."
      },
      {
        question: "querySelector returns:",
        options: ["All elements", "The first matching element", "A number", "A boolean"],
        correctIndex: 1,
        explanation: "querySelector returns the first matching element."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Select an element with class 'card' and change its text.",
        starterCode: "const card = document.querySelector('.card');\n// update text\n",
        solutionHintMarkdown: "Use card.textContent = '...'."
      }
    ]
  },
  "events": {
    title: "Events",
    estimatedMinutes: 60,
    contentMarkdown: `# Events

## What you will learn
- What events are in the browser
- How to listen for events
- How event handlers work

## Beginner glossary
- Event: a signal that something happened (click, input, submit).
- Listener: a function that runs when an event occurs.
- Handler: the function you provide to handle the event.

## Big picture
Events let you respond to user actions. You register a listener on an element, and the handler runs when the event fires.

## Example
\`\`\`js
const button = document.querySelector("button");
button.addEventListener("click", () => {
  console.log("clicked");
});
\`\`\`

## Real world usage
- Button clicks and form submissions
- Keyboard shortcuts
- Drag and drop interactions

## Common mistakes
- Adding multiple listeners by mistake
- Forgetting to remove listeners when needed

## Quick check
1. What does addEventListener do?
2. What is an event handler?

## Try it
Attach a click event to a button and log a message.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
`,
    quizQuestions: [
      {
        question: "An event handler is:",
        options: ["A CSS class", "A function that runs on an event", "A database", "A server"],
        correctIndex: 1,
        explanation: "Handlers run when the event fires."
      },
      {
        question: "addEventListener is used to:",
        options: ["Remove elements", "Listen for events", "Change CSS", "Create arrays"],
        correctIndex: 1,
        explanation: "It registers event listeners."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Add a click listener to a button that changes its text.",
        starterCode: "const button = document.querySelector('button');\n// add listener\n",
        solutionHintMarkdown: "Use addEventListener and set button.textContent."
      }
    ]
  },
  "fetch-api": {
    title: "Fetch API",
    estimatedMinutes: 70,
    contentMarkdown: `# Fetch API

## What you will learn
- How to make HTTP requests with fetch
- How to parse JSON responses
- How to handle errors and loading states

## Beginner glossary
- HTTP: the protocol for web requests.
- Request: asking a server for data.
- Response: the server's reply.
- JSON: a common data format.

## Big picture
fetch is a browser API for making network requests. It returns a promise that resolves to a response, which you can convert to JSON.

## Example
\`\`\`js
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
\`\`\`

## Real world usage
- Loading data from APIs
- Submitting forms to a server
- Integrating third-party services

## Common mistakes
- Forgetting to handle errors
- Assuming fetch throws on HTTP errors (it does not)

## Quick check
1. What does fetch return?
2. How do you convert a response to JSON?

## Try it
Fetch a list of posts and log the first title.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
`,
    quizQuestions: [
      {
        question: "fetch returns:",
        options: ["A response object", "A promise", "A string", "A boolean"],
        correctIndex: 1,
        explanation: "fetch returns a promise."
      },
      {
        question: "To parse JSON, you call:",
        options: ["res.text()", "res.json()", "res.data()", "res.body()"],
        correctIndex: 1,
        explanation: "res.json parses the response body."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Use fetch to load data and log it.",
        starterCode: "fetch('https://jsonplaceholder.typicode.com/todos/1')\n  .then((res) => {\n    // parse JSON\n  })\n  .then((data) => {\n    // log data\n  });",
        solutionHintMarkdown: "Return res.json() and log the data."
      }
    ]
  },
  "localstorage-sessionstorage": {
    title: "localStorage & sessionStorage",
    estimatedMinutes: 60,
    contentMarkdown: `# localStorage & sessionStorage

## What you will learn
- How browser storage works
- The difference between localStorage and sessionStorage
- How to store and retrieve data safely

## Beginner glossary
- localStorage: persistent storage that survives browser restarts.
- sessionStorage: temporary storage cleared when the tab closes.
- Stringify: converting data to a string for storage.

## Big picture
Browser storage lets you save small pieces of data on the client. localStorage persists, while sessionStorage is temporary. Both store string values, so objects must be converted to JSON.

## Example
\`\`\`js
const user = { name: "Ava" };
localStorage.setItem("user", JSON.stringify(user));

const saved = JSON.parse(localStorage.getItem("user"));
console.log(saved);
\`\`\`

## Real world usage
- Remembering theme preference
- Saving drafts or form data
- Storing lightweight settings

## Common mistakes
- Forgetting to stringify objects
- Storing sensitive data in localStorage
- Assuming storage is unlimited

## Quick check
1. What is the difference between localStorage and sessionStorage?
2. Why do you need JSON.stringify?

## Try it
Save a theme setting and read it back.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
`,
    quizQuestions: [
      {
        question: "localStorage persists:",
        options: ["Only until refresh", "Across browser restarts", "Only in memory", "Only for one second"],
        correctIndex: 1,
        explanation: "localStorage persists across browser restarts."
      },
      {
        question: "sessionStorage is cleared:",
        options: ["When the tab closes", "When the page reloads", "Never", "After one hour"],
        correctIndex: 0,
        explanation: "sessionStorage is cleared when the tab closes."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Store an object in localStorage and read it back.",
        starterCode: "const settings = { theme: 'dark' };\n// store and read\n",
        solutionHintMarkdown: "Use JSON.stringify and JSON.parse."
      }
    ]
  }
};
