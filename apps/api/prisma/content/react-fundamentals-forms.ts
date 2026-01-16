import type { LessonContent } from "./javascript-mastery-types";

export const reactFundamentalsForms: Record<string, LessonContent> = {
  "handling-inputs": {
    title: "Handling inputs",
    estimatedMinutes: 60,
    contentMarkdown: `# Handling inputs

## What you will learn
- How to connect inputs to state
- How to handle different input types
- How to design predictable, accessible forms

## Big picture
In React, form inputs are usually controlled by state. This keeps the UI and the data in sync. It also makes validation and conditional behavior easier to manage.

## Beginner glossary
- Input: a field where the user types or selects a value.
- Controlled input: React state is the source of truth.
- onChange: an event that fires when the input value changes.
- Form state: the collection of values the user has entered.

## Input types and how they differ
- Text inputs use value and onChange
- Checkboxes use checked and onChange
- Select elements use value and onChange
- Radio groups use checked and name

## Generic change handlers
For forms with multiple fields, it is common to use one handler that updates state by field name. This reduces repetition and makes it easier to scale forms.

## Example walkthrough
A form with a text input and a checkbox:

    function SignupForm() {
      const [form, setForm] = useState({ name: "", newsletter: false });

      function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value
        }));
      }

      return (
        <form>
          <input name="name" value={form.name} onChange={handleChange} />
          <label>
            <input
              type="checkbox"
              name="newsletter"
              checked={form.newsletter}
              onChange={handleChange}
            />
            Subscribe
          </label>
        </form>
      );
    }

## Accessibility considerations
- Use labels for inputs
- Provide descriptive placeholder or helper text
- Ensure form controls are keyboard accessible

## Real world usage
- Signup and login forms
- Settings screens with toggles
- Filters and search inputs

## Common mistakes
- Using value on checkboxes instead of checked
- Forgetting name attributes in generic handlers
- Mixing controlled and uncontrolled inputs

## Practice checklist
- Can you handle text, checkbox, and select inputs?
- Can you build a generic change handler?
- Can you keep form state normalized and readable?

## Mini project idea
Build a profile settings form with name, email, and a newsletter checkbox. Add a preview area that updates as the user types.

## Further reading
- https://react.dev/learn/sharing-state-between-components
`,
    quizQuestions: [
      {
        question: "For a text input, which props are typically used?",
        options: ["checked/onChange", "value/onChange", "selected/onClick", "name/onBlur"],
        correctIndex: 1,
        explanation: "Text inputs use value and onChange."
      },
      {
        question: "Checkboxes should be controlled with:",
        options: ["value", "checked", "selected", "defaultValue"],
        correctIndex: 1,
        explanation: "Checkboxes use the checked prop."
      },
      {
        question: "Why keep input values in state?",
        options: [
          "To avoid React",
          "To keep UI and data in sync",
          "To remove event handlers",
          "To speed up CSS"
        ],
        correctIndex: 1,
        explanation: "State keeps the source of truth for the form."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Build a form with name and email inputs stored in one state object.",
        starterCode: "function ContactForm() {\n  const [form, setForm] = useState({ name: \"\", email: \"\" });\n  return (\n    <form>\n      <input name=\"name\" />\n      <input name=\"email\" />\n    </form>\n  );\n}\n",
        solutionHintMarkdown: "Use onChange and setForm with a generic handler."
      },
      {
        promptMarkdown: "Add a checkbox to toggle a termsAccepted boolean in state.",
        starterCode: "function Terms() {\n  const [termsAccepted, setTermsAccepted] = useState(false);\n  return (\n    <label>\n      <input type=\"checkbox\" />\n      Accept terms\n    </label>\n  );\n}\n",
        solutionHintMarkdown: "Use checked and onChange to update state."
      }
    ]
  },
  "validation": {
    title: "Validation",
    estimatedMinutes: 60,
    contentMarkdown: `# Validation

## What you will learn
- How to validate user input on the client
- Strategies for validation timing
- How to present errors clearly

## Big picture
Validation ensures user input is correct before submission. Good validation improves user experience and prevents invalid data from reaching the server.

## Beginner glossary
- Validation: rules that check whether input is acceptable.
- Field-level error: a message tied to a specific input.
- Submit: the action of sending form data for processing.

## Validation strategies
- On submit: validate all fields when the user submits the form
- On change: validate as the user types
- On blur: validate after the user leaves a field

Each strategy has tradeoffs. On change gives immediate feedback but can feel noisy. On submit is simpler but may delay feedback.

## Error messaging
Errors should be clear, specific, and close to the input. Provide guidance about how to fix the issue. Avoid generic messages that do not help the user.

## Example walkthrough
Email validation on submit:

    function EmailForm() {
      const [email, setEmail] = useState("");
      const [error, setError] = useState("");

      function handleSubmit(e) {
        e.preventDefault();
        if (!email.includes("@")) {
          setError("Please enter a valid email.");
          return;
        }
        setError("");
        alert("Submitted");
      }

      return (
        <form onSubmit={handleSubmit}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          {error && <p>{error}</p>}
          <button type="submit">Send</button>
        </form>
      );
    }

## Real world usage
- Password strength checks
- Required fields and minimum lengths
- Email and phone number formats

## Common mistakes
- Validating too early and frustrating users
- Not clearing errors when input becomes valid
- Using different rules on client and server

## Practice checklist
- Can you validate on submit and on blur?
- Can you display field-level errors clearly?
- Can you keep validation rules consistent?

## Mini project idea
Build a registration form with username, email, and password validation. Add inline error messages and disable submit when invalid.

## Further reading
- https://react.dev/learn/sharing-state-between-components
`,
    quizQuestions: [
      {
        question: "What is a common validation approach?",
        options: [
          "Only validate on the server",
          "Validate on submit or on change",
          "Never validate",
          "Validate in CSS"
        ],
        correctIndex: 1,
        explanation: "Client-side validation usually happens on submit or change."
      },
      {
        question: "Why should errors be displayed near the input?",
        options: [
          "It looks better",
          "It helps users fix issues quickly",
          "It reduces bundle size",
          "It avoids state"
        ],
        correctIndex: 1,
        explanation: "Proximity makes it easier to identify and fix errors."
      },
      {
        question: "What should you do after the user fixes an error?",
        options: ["Do nothing", "Clear the error", "Reload the page", "Disable input"],
        correctIndex: 1,
        explanation: "Clear error state when the input is valid again."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Add simple validation to require a username of at least 3 characters.",
        starterCode: "function UsernameForm() {\n  const [username, setUsername] = useState(\"\");\n  const [error, setError] = useState(\"\");\n  return (\n    <form>\n      <input value={username} onChange={(e) => setUsername(e.target.value)} />\n      {/* show error */}\n    </form>\n  );\n}\n",
        solutionHintMarkdown: "Check length on submit and set an error message."
      },
      {
        promptMarkdown: "Explain the tradeoff between validating on change vs on submit.",
        starterCode: "// Write your answer here",
        solutionHintMarkdown: "Mention early feedback vs annoyance for incomplete input."
      }
    ]
  },
  "form-submission": {
    title: "Form submission",
    estimatedMinutes: 60,
    contentMarkdown: `# Form submission

## What you will learn
- How to handle submit events in React
- How to manage loading and success states
- How to handle errors and retries

## Big picture
Submitting a form is usually an async operation. In React, you handle it in an onSubmit handler, prevent the default page reload, validate input, and send the data.

## Beginner glossary
- onSubmit: an event handler that runs when a form is submitted.
- Async: work that happens over time, like a network request.
- Loading state: a flag that tells the UI a request is in progress.

## The typical flow
1. Prevent default form behavior
2. Validate input
3. Set a loading state
4. Send the request
5. Show success or error feedback

## Example walkthrough
A form with loading and status UI:

    function ContactForm() {
      const [name, setName] = useState("");
      const [status, setStatus] = useState("idle");

      async function handleSubmit(e) {
        e.preventDefault();
        setStatus("loading");
        try {
          await fakeRequest({ name });
          setStatus("success");
        } catch (err) {
          setStatus("error");
        }
      }

      return (
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit">Send</button>
          {status === "loading" && <p>Sending...</p>}
          {status === "success" && <p>Sent</p>}
          {status === "error" && <p>Try again</p>}
        </form>
      );
    }

## Real world usage
- Login and signup flows
- Checkout and payment forms
- Settings updates with confirmation messages

## Common mistakes
- Forgetting to prevent default and causing reloads
- Submitting without validation
- Not handling errors or retries

## Practice checklist
- Can you manage loading state during submission?
- Can you provide success and error feedback?
- Can you prevent double submissions?

## Mini project idea
Build a feedback form that shows loading while submitting, success on completion, and a retry button on error.

## Further reading
- https://react.dev/learn/sharing-state-between-components
`,
    quizQuestions: [
      {
        question: "Why call event.preventDefault on form submit?",
        options: [
          "To stop React",
          "To prevent page reload",
          "To clear the form",
          "To add validation"
        ],
        correctIndex: 1,
        explanation: "It prevents the browser from reloading the page."
      },
      {
        question: "What is a good UI state during submission?",
        options: ["idle", "loading", "hidden", "disabled"],
        correctIndex: 1,
        explanation: "A loading state communicates progress to the user."
      },
      {
        question: "Where is submit logic typically handled in React?",
        options: ["onSubmit handler", "onChange handler", "useMemo", "CSS"],
        correctIndex: 0,
        explanation: "Use onSubmit to handle form submission."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Add an isSubmitting flag and disable the submit button while loading.",
        starterCode: "function DemoForm() {\n  const [isSubmitting, setIsSubmitting] = useState(false);\n  return (\n    <form>\n      <button type=\"submit\">Send</button>\n    </form>\n  );\n}\n",
        solutionHintMarkdown: "Disable the button when isSubmitting is true."
      },
      {
        promptMarkdown: "Handle a simple submit that logs the current form state.",
        starterCode: "function SimpleForm() {\n  const [value, setValue] = useState(\"\");\n  return (\n    <form>\n      <input value={value} onChange={(e) => setValue(e.target.value)} />\n      <button type=\"submit\">Save</button>\n    </form>\n  );\n}\n",
        solutionHintMarkdown: "Add an onSubmit handler and call console.log(value)."
      }
    ]
  }
};
