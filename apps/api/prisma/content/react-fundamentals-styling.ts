import type { LessonContent } from "./javascript-mastery-types";

export const reactFundamentalsStyling: Record<string, LessonContent> = {
  "css-modules": {
    title: "CSS Modules",
    estimatedMinutes: 60,
    contentMarkdown: `# CSS Modules

## What you will learn
- How CSS Modules scope styles locally
- How to structure component styles in real projects
- How to avoid common styling conflicts

## Big picture
CSS Modules solve the problem of global CSS conflicts. Instead of relying on global class names, each class is scoped to the component, which prevents unintended style collisions in large codebases.

## Beginner glossary
- CSS: the language used to style HTML elements.
- Class: a named style you can apply to elements.
- Scope: the range where a style applies.
- Collision: when two styles unintentionally affect the same element.

## How it works
When you import a module file, the build tool transforms class names into unique identifiers. You reference classes through the imported styles object. This gives you local scope while still writing standard CSS.

## Example walkthrough
A button style defined in a module file:

    /* Button.module.css */
    .button {
      background: #1f2937;
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
    }

And used in a component:

    import styles from "./Button.module.css";

    function Button({ label }) {
      return <button className={styles.button}>{label}</button>;
    }

## Real world usage
- Component libraries where styles should not leak
- Teams working on different features in the same codebase
- Long-lived projects where CSS conflicts accumulate over time

## Common mistakes
- Forgetting the module naming convention
- Mixing global and module styles without a plan
- Overusing global selectors inside modules

## Practice checklist
- Can you explain how class names are scoped?
- Can you structure styles per component?
- Can you use module classes without relying on globals?

## Mini project idea
Create a small card library with CSS Modules and build two card variants using the same base styles.

## Further reading
- https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/
`,
    quizQuestions: [
      {
        question: "CSS Modules help by:",
        options: [
          "Adding inline styles",
          "Scoping class names locally",
          "Removing CSS",
          "Replacing JSX"
        ],
        correctIndex: 1,
        explanation: "Modules scope class names to avoid conflicts."
      },
      {
        question: "Which file name activates CSS Modules in many setups?",
        options: ["styles.css", "styles.module.css", "module.css", "app.css"],
        correctIndex: 1,
        explanation: "The .module.css convention enables CSS Modules."
      },
      {
        question: "What is a benefit of CSS Modules?",
        options: [
          "Automatic global styling",
          "No class name collisions",
          "No need for CSS",
          "Built-in animations"
        ],
        correctIndex: 1,
        explanation: "Locally scoped class names prevent collisions."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a CSS Module for a Card component with a border and padding.",
        starterCode: "// Card.module.css\n// .card { }\n\n// Card.jsx\nimport styles from \"./Card.module.css\";\n\nfunction Card({ children }) {\n  return <div className={styles.card}>{children}</div>;\n}\n",
        solutionHintMarkdown: "Add border and padding properties to .card."
      },
      {
        promptMarkdown: "Explain why CSS Modules are safer in large codebases.",
        starterCode: "// Write your answer here",
        solutionHintMarkdown: "Mention scoped class names and fewer collisions."
      }
    ]
  },
  "inline-styles": {
    title: "Inline styles",
    estimatedMinutes: 60,
    contentMarkdown: `# Inline styles

## What you will learn
- How inline styles work in React
- When inline styles are appropriate
- Limitations compared to CSS files

## Big picture
Inline styles in React are passed as a JavaScript object to the style prop. This makes it easy to apply dynamic values based on state or props. However, inline styles do not support pseudo-classes or media queries.

## Beginner glossary
- Inline style: styles written directly on an element.
- Style prop: a React prop that accepts a style object.
- Pseudo-class: a CSS state like hover or focus.

## How it works
Style properties are written in camelCase. Numeric values are interpreted as pixels unless a unit is provided as a string. Because styles are plain objects, you can compute them dynamically in code.

## Example walkthrough
A badge that changes color based on status:

    function Badge({ status }) {
      const style = {
        padding: "4px 8px",
        borderRadius: 4,
        backgroundColor: status === "ok" ? "#10b981" : "#f59e0b",
        color: "white"
      };
      return <span style={style}>{status}</span>;
    }

## Real world usage
- Quick dynamic styling
- Conditional layout tweaks
- Small components without dedicated CSS files

## Common mistakes
- Using hyphenated CSS keys instead of camelCase
- Forgetting units when needed
- Overusing inline styles for large layouts

## Practice checklist
- Can you explain why inline styles use objects?
- Can you apply dynamic styles based on props?
- Can you list the limitations of inline styles?

## Mini project idea
Build a priority tag component that changes background color based on priority level. Add a toggle to switch themes.

## Further reading
- https://react.dev/learn#adding-styles
`,
    quizQuestions: [
      {
        question: "React inline styles are passed as:",
        options: ["A string", "A JavaScript object", "A CSS file", "A class name"],
        correctIndex: 1,
        explanation: "Inline styles use objects like { color: 'red' }."
      },
      {
        question: "Which property name is correct in inline styles?",
        options: ["background-color", "backgroundColor", "background_color", "background"],
        correctIndex: 1,
        explanation: "Inline styles use camelCase property names."
      },
      {
        question: "What is a limitation of inline styles?",
        options: [
          "No dynamic values",
          "No support for media queries",
          "Cannot set colors",
          "Cannot use objects"
        ],
        correctIndex: 1,
        explanation: "Inline styles cannot handle media queries or pseudo-classes."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Apply a dynamic background color based on a priority prop.",
        starterCode: "function Tag({ priority }) {\n  return <span>Item</span>;\n}\n",
        solutionHintMarkdown: "Create a style object and pass it to the style prop."
      },
      {
        promptMarkdown: "Fix the inline style so it sets a font size of 14px.",
        starterCode: "function Label() {\n  return <span style={{ font-size: 14 }}>Label</span>;\n}\n",
        solutionHintMarkdown: "Use fontSize: 14 or fontSize: '14px'."
      }
    ]
  },
  "tailwind-css-basics": {
    title: "Tailwind CSS basics",
    estimatedMinutes: 60,
    contentMarkdown: `# Tailwind CSS basics

## What you will learn
- The utility-first styling approach
- How to compose UI with Tailwind classes
- How to keep Tailwind usage maintainable

## Big picture
Tailwind is a utility-first CSS framework. Instead of writing custom CSS for each component, you compose styles by combining utility classes directly in your JSX. This encourages consistency and speeds up development.

## Beginner glossary
- Utility class: a small single-purpose CSS class like p-4 or text-lg.
- Framework: a set of tools and rules that helps you build faster.
- Design system: a shared set of styles, spacing, and color rules.

## How it works
Tailwind provides classes for spacing, typography, color, layout, and more. You can build complex designs without leaving your component file. For repeated patterns, extract components or use reusable class strings.

## Example walkthrough
A simple alert component:

    function Alert({ message }) {
      return (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
          {message}
        </div>
      );
    }

## Real world usage
- Rapid UI prototyping
- Consistent design systems across teams
- Utility-first layouts with small reusable components

## Common mistakes
- Long unreadable class strings without extraction
- Mixing Tailwind with conflicting global styles
- Not learning the spacing and color scale

## Practice checklist
- Can you build a component using only utilities?
- Can you extract repeated class patterns?
- Can you balance readability and flexibility?

## Mini project idea
Build a small dashboard card with Tailwind utilities for layout, spacing, and typography. Create two variants with different colors.

## Further reading
- https://tailwindcss.com/docs/utility-first
`,
    quizQuestions: [
      {
        question: "Tailwind CSS is primarily:",
        options: [
          "A component library",
          "A utility-first CSS framework",
          "A JavaScript framework",
          "A testing tool"
        ],
        correctIndex: 1,
        explanation: "Tailwind is a utility-first CSS framework."
      },
      {
        question: "What is a common benefit of Tailwind?",
        options: [
          "No HTML needed",
          "Fast styling without writing custom CSS",
          "Automatic state management",
          "Built-in routing"
        ],
        correctIndex: 1,
        explanation: "Tailwind speeds up styling with utility classes."
      },
      {
        question: "When should you extract a component in Tailwind?",
        options: [
          "When class lists repeat",
          "When you use any utility",
          "When you want inline styles",
          "When you avoid JSX"
        ],
        correctIndex: 0,
        explanation: "Extract components when the class list repeats."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Style a button using Tailwind utilities for padding, background, and hover state.",
        starterCode: "function PrimaryButton({ label }) {\n  return <button>{label}</button>;\n}\n",
        solutionHintMarkdown: "Try px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700."
      },
      {
        promptMarkdown: "Create a card layout with Tailwind that includes a title and body text.",
        starterCode: "function InfoCard({ title, body }) {\n  return (\n    <div>\n      <h3>{title}</h3>\n      <p>{body}</p>\n    </div>\n  );\n}\n",
        solutionHintMarkdown: "Use rounded, shadow, and p-4 for structure."
      }
    ]
  }
};
