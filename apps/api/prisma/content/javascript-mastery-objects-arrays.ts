import type { LessonContent } from "./javascript-mastery-types";

export const javascriptMasteryObjectsArrays: Record<string, LessonContent> = {
  "creating-objects": {
    title: "Creating objects",
    estimatedMinutes: 75,
    contentMarkdown: `# Creating objects

## What you will learn
- What objects are and why they are used
- Multiple ways to create objects
- How to model real-world data with objects

## Beginner glossary
- Object: a collection of key-value pairs.
- Property: a key-value pair inside an object.
- Key: the name used to access a value.
- Value: the data stored for a key.
- Literal: a value written directly in code, like {}.

## Big picture
Objects let you group related data into a single unit. They are the most common structure for representing real-world entities such as users, products, orders, and settings. Instead of storing separate variables for name, role, and age, you store them inside one object.

## Mental model
Think of an object as a labeled drawer. Each label (key) points to a value. You can open a drawer by its label to get the value inside.

## Ways to create objects
1. Object literal (most common):

\`\`\`js
const user = { name: "Ava", role: "admin", active: true };
\`\`\`

2. Object constructor:

\`\`\`js
const user = new Object();
user.name = "Ava";
\`\`\`

3. Object.create for explicit prototypes:

\`\`\`js
const user = Object.create(null);
user.name = "Ava";
\`\`\`

## Deep dive: keys and values
- Keys are usually strings. If you use a number, it is converted to a string.
- Values can be any type: strings, numbers, arrays, other objects, functions.
- You can nest objects to represent complex data.

## Example: nested object
\`\`\`js
const order = {
  id: 101,
  customer: { name: "Lee", tier: "gold" },
  items: [{ sku: "A1", qty: 2 }, { sku: "B2", qty: 1 }]
};
\`\`\`

## Real world usage
- API responses are often objects with nested data.
- Configuration files often map keys to settings.
- State management in apps often uses objects.

## Common mistakes
- Using arrays when keys are needed.
- Forgetting that object keys are strings.
- Mutating nested objects without copying them.

## Practice checklist
- Can you create an object with multiple fields?
- Can you model a real-world entity as an object?
- Can you nest objects safely?

## Mini project idea
Create an object that represents a book library with an array of book objects, each with title, author, and year. Add a function that counts how many books are newer than 2015.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
` ,
    quizQuestions: [
      {
        question: "An object is:",
        options: ["A list of values", "A collection of key-value pairs", "A number", "A loop"],
        correctIndex: 1,
        explanation: "Objects store key-value pairs."
      },
      {
        question: "Which is an object literal?",
        options: ["[]", "{}", "()", "<>"],
        correctIndex: 1,
        explanation: "{} is an object literal."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create an object for a movie with title, rating, and year.",
        starterCode: "const movie = {\n  // add properties\n};\n",
        solutionHintMarkdown: "Use keys like title, rating, year."
      }
    ]
  },
  "accessing-properties": {
    title: "Accessing properties",
    estimatedMinutes: 75,
    contentMarkdown: `# Accessing properties

## What you will learn
- Dot notation vs bracket notation
- How to access dynamic keys
- How to avoid runtime errors with missing properties

## Beginner glossary
- Dot notation: object.key
- Bracket notation: object["key"]
- Dynamic key: a key stored in a variable

## Big picture
Objects store data by key. JavaScript provides two ways to access them: dot notation for fixed keys and bracket notation for dynamic or unusual keys.

## Mental model
Dot notation is like a fixed label. Bracket notation is like reading a label from a note in your hand. If the note changes, the label you open changes too.

## Dot notation
Use when the key is a valid identifier and known ahead of time:

\`\`\`js
const user = { name: "Ava", role: "admin" };
console.log(user.name);
\`\`\`

## Bracket notation
Use when the key is dynamic or has special characters:

\`\`\`js
const key = "role";
console.log(user[key]);

const settings = { "dark-mode": true };
console.log(settings["dark-mode"]);
\`\`\`

## Dealing with missing properties
Accessing a missing property returns undefined. Avoid errors by checking:

\`\`\`js
if (user && user.profile) {
  console.log(user.profile.bio);
}
\`\`\`

## Real world usage
- Accessing API data with unknown keys
- Reading configuration values
- Building dynamic object keys in loops

## Common mistakes
- Using dot notation when a variable key is needed
- Assuming missing properties throw errors
- Accessing deep properties without checks

## Practice checklist
- Can you access properties with both syntaxes?
- Can you handle missing properties safely?
- Can you use dynamic keys?

## Mini project idea
Build a settings object and write a function that reads values based on user input keys.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
` ,
    quizQuestions: [
      {
        question: "Bracket notation is useful when:",
        options: ["The key is fixed", "The key is stored in a variable", "The key is numeric only", "Never"],
        correctIndex: 1,
        explanation: "Bracket notation supports dynamic keys."
      },
      {
        question: "Accessing a missing property returns:",
        options: ["null", "undefined", "false", "error"],
        correctIndex: 1,
        explanation: "Missing properties return undefined."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Use bracket notation to read a property using a variable key.",
        starterCode: "const user = { name: \"Ava\", role: \"admin\" };\nconst key = \"role\";\n// log the value\n",
        solutionHintMarkdown: "Use user[key]."
      }
    ]
  },
  "object-methods": {
    title: "Object methods",
    estimatedMinutes: 75,
    contentMarkdown: `# Object methods

## What you will learn
- How to define methods on objects
- How this works in methods
- How methods help model behavior

## Beginner glossary
- Method: a function stored on an object.
- this: a keyword that refers to the current object in a method call.

## Big picture
Objects can store both data and behavior. Methods are functions that live on objects and often use this to access object data.

## Mental model
Think of a method as a tool attached to an object. The tool can access the object's data using this.

## Example
\`\`\`js
const user = {
  name: "Ava",
  greet() {
    return "Hello, " + this.name;
  }
};

console.log(user.greet());
\`\`\`

## Using this safely
- this depends on how a method is called.
- If you extract a method, you may lose this.

\`\`\`js
const greet = user.greet;
console.log(greet()); // this is undefined in strict mode
\`\`\`

## Real world usage
- Cart objects with add/remove methods
- User objects with login or logout methods
- Configuration objects with helper functions

## Common mistakes
- Using arrow functions as methods when you need this
- Losing this by passing methods directly as callbacks

## Practice checklist
- Can you define a method that uses this?
- Can you explain when this changes?
- Can you keep methods small and focused?

## Mini project idea
Create a cart object with items and a total method that sums prices.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions
` ,
    quizQuestions: [
      {
        question: "A method is:",
        options: ["A variable", "A function on an object", "An array", "A loop"],
        correctIndex: 1,
        explanation: "Methods are functions stored on objects."
      },
      {
        question: "Inside a method, this usually refers to:",
        options: ["The global object", "The object the method is called on", "The function itself", "Undefined always"],
        correctIndex: 1,
        explanation: "this refers to the object the method belongs to when called as obj.method()."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create an object with a method that returns its own name.",
        starterCode: "const user = {\n  name: \"Ava\",\n  // add method\n};\n",
        solutionHintMarkdown: "Use this.name inside the method."
      }
    ]
  },
  "arrays-and-array-methods-map": {
    title: "Arrays and array methods: map",
    estimatedMinutes: 90,
    contentMarkdown: `# Arrays and array methods: map

## What you will learn
- What map does and when to use it
- How the map callback works
- How to transform real data sets

## Beginner glossary
- Array: an ordered list of values.
- Map: a method that transforms each item into a new value.
- Callback: a function passed into another function.

## Big picture
map creates a new array by running a callback on every element of an existing array. The original array is not changed. This makes map a safe and predictable way to transform data.

## Mental model
Think of map as a conveyor belt. Each item goes through the same machine and comes out transformed. The belt itself is not changed.

## Map callback signature
The callback receives:
- value: the current item
- index: the current position
- array: the original array

Most of the time you only need the value.

## Core example
\`\`\`js
const prices = [10, 15, 20];
const withTax = prices.map((p) => p * 1.1);
\`\`\`

## Real world usage patterns
1. Formatting API data for UI:

\`\`\`js
const users = [
  { id: 1, firstName: "Ava", lastName: "Stone" },
  { id: 2, firstName: "Lee", lastName: "Park" }
];

const labels = users.map((u) => "" + u.firstName + " " + u.lastName);
\`\`\`

2. Converting units:

\`\`\`js
const meters = [1, 5, 10];
const feet = meters.map((m) => m * 3.28084);
\`\`\`

3. Transforming for rendering:

\`\`\`js
const items = [{ id: "a1", name: "Pen" }, { id: "b2", name: "Notebook" }];
const listItems = items.map((item) => "<li>" + item.name + "</li>");
\`\`\`

## Common mistakes
- Forgetting to return a value in the callback
- Using map for side effects (use forEach instead)
- Mutating objects inside map and expecting immutability

## Practice checklist
- Can you transform arrays of objects?
- Can you avoid modifying the original array?
- Can you explain the difference between map and forEach?

## Mini project idea
Given a list of products, create a new list that includes formatted price strings like "Notebook - $12.00".

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
` ,
    quizQuestions: [
      {
        question: "map returns:",
        options: ["The original array", "A new array", "A number", "A string"],
        correctIndex: 1,
        explanation: "map returns a new array."
      },
      {
        question: "map is best used for:",
        options: ["Filtering", "Transforming", "Sorting", "Finding"],
        correctIndex: 1,
        explanation: "map transforms values."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Use map to convert an array of temperatures from C to F.",
        starterCode: "const celsius = [0, 10, 20];\nconst fahrenheit = celsius.map((c) => {\n  // return F value\n});\nconsole.log(fahrenheit);",
        solutionHintMarkdown: "Use (c * 9) / 5 + 32."
      }
    ]
  },
  "arrays-and-array-methods-filter": {
    title: "Arrays and array methods: filter",
    estimatedMinutes: 90,
    contentMarkdown: `# Arrays and array methods: filter

## What you will learn
- How filter selects items based on a condition
- How to combine filter with other methods
- Real-world filtering patterns

## Beginner glossary
- Filter: a method that keeps items matching a condition.
- Predicate: a function that returns true or false.

## Big picture
filter produces a new array with only the elements that pass the predicate. It is essential for search, visibility rules, and data cleanup.

## Mental model
Think of filter as a sieve: only items that pass the test remain.

## Core example
\`\`\`js
const nums = [1, 2, 3, 4];
const evens = nums.filter((n) => n % 2 === 0);
\`\`\`

## Real world usage patterns
1. Search filtering:

\`\`\`js
const products = [
  { name: "Notebook", price: 12 },
  { name: "Pen", price: 2 }
];

const affordable = products.filter((p) => p.price <= 10);
\`\`\`

2. User status filtering:

\`\`\`js
const users = [
  { name: "Ava", active: true },
  { name: "Lee", active: false }
];

const activeUsers = users.filter((u) => u.active);
\`\`\`

## Common mistakes
- Returning non-boolean values from the predicate
- Using filter when you need just one item (use find)

## Practice checklist
- Can you filter by multiple conditions?
- Can you chain filter with map?
- Can you keep predicates readable?

## Mini project idea
Build a function that filters a list of tasks to only those due today and not completed.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
` ,
    quizQuestions: [
      {
        question: "filter returns:",
        options: ["A new array", "A number", "The first match", "The original array"],
        correctIndex: 0,
        explanation: "filter returns a new array."
      },
      {
        question: "The filter callback should return:",
        options: ["A number", "A boolean", "A string", "An object"],
        correctIndex: 1,
        explanation: "The callback returns true or false."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Filter a list of names to only those longer than 4 characters.",
        starterCode: "const names = [\"Ava\", \"Jordan\", \"Lee\", \"Chris\"];\nconst longNames = names.filter((name) => {\n  // return true if length > 4\n});\nconsole.log(longNames);",
        solutionHintMarkdown: "Use name.length > 4."
      }
    ]
  },
  "arrays-and-array-methods-reduce": {
    title: "Arrays and array methods: reduce",
    estimatedMinutes: 95,
    contentMarkdown: `# Arrays and array methods: reduce

## What you will learn
- How reduce combines values into one result
- How to use the accumulator correctly
- Advanced reduce patterns for grouping and indexing

## Beginner glossary
- Reduce: a method that collapses an array into a single value.
- Accumulator: the running result.
- Initial value: the starting accumulator value.

## Big picture
reduce is a powerful method that can build totals, objects, or new arrays. It is especially useful when you need to derive a single result from a list.

## Mental model
Imagine a rolling total. Each item adds something to the total, and at the end you get one final value.

## Core example: sum
\`\`\`js
const nums = [1, 2, 3];
const sum = nums.reduce((total, n) => total + n, 0);
\`\`\`

## Advanced example: index by ID
\`\`\`js
const users = [
  { id: "u1", name: "Ava" },
  { id: "u2", name: "Lee" }
];

const byId = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
\`\`\`

## Advanced example: grouping
\`\`\`js
const items = [
  { type: "fruit", name: "apple" },
  { type: "fruit", name: "banana" },
  { type: "veg", name: "carrot" }
];

const grouped = items.reduce((acc, item) => {
  if (!acc[item.type]) acc[item.type] = [];
  acc[item.type].push(item.name);
  return acc;
}, {});
\`\`\`

## Common mistakes
- Forgetting to return the accumulator
- Using the wrong initial value
- Mutating inputs without realizing it

## Practice checklist
- Can you sum values with reduce?
- Can you build an object map?
- Can you explain the accumulator in simple words?

## Mini project idea
Given an array of orders, reduce them into a total revenue number and a list grouped by customer ID.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
` ,
    quizQuestions: [
      {
        question: "reduce returns:",
        options: ["A new array", "A single value", "The original array", "A boolean"],
        correctIndex: 1,
        explanation: "reduce returns a single accumulated value."
      },
      {
        question: "The accumulator is:",
        options: ["The current item", "The running result", "The last index", "The array itself"],
        correctIndex: 1,
        explanation: "The accumulator holds the running result."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Use reduce to count how many tasks are completed.",
        starterCode: "const tasks = [\n  { title: 'A', done: true },\n  { title: 'B', done: false },\n  { title: 'C', done: true }\n];\nconst doneCount = tasks.reduce((acc, task) => {\n  // return updated acc\n}, 0);\nconsole.log(doneCount);",
        solutionHintMarkdown: "Add 1 when task.done is true."
      }
    ]
  },
  "arrays-and-array-methods-find": {
    title: "Arrays and array methods: find",
    estimatedMinutes: 75,
    contentMarkdown: `# Arrays and array methods: find

## What you will learn
- How find returns the first matching item
- How find differs from filter
- How to handle missing results safely

## Beginner glossary
- Find: returns the first item that matches a condition.
- Undefined: the value returned when no match exists.

## Big picture
find returns a single element, not an array. This makes it ideal for lookups by ID or unique fields. If nothing matches, you get undefined.

## Mental model
Think of find as searching through a list until you spot the first match, then stopping.

## Example
\`\`\`js
const users = [{ id: 1 }, { id: 2 }];
const user = users.find((u) => u.id === 2);
\`\`\`

## Real world usage
- Find a product by SKU
- Locate a user by ID
- Retrieve a selected item from a list

## Common mistakes
- Expecting find to return multiple results
- Forgetting to check for undefined

## Practice checklist
- Can you use find with unique identifiers?
- Can you handle the case when it returns undefined?
- Can you explain when filter is more appropriate?

## Mini project idea
Search a list of orders by order ID and show details if found, otherwise show a not found message.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
` ,
    quizQuestions: [
      {
        question: "find returns:",
        options: ["A new array", "The first matching element", "The index", "A boolean"],
        correctIndex: 1,
        explanation: "find returns the first matching element."
      },
      {
        question: "If no match is found, find returns:",
        options: ["null", "undefined", "false", "0"],
        correctIndex: 1,
        explanation: "find returns undefined when no match exists."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Find a user with the name 'Sam' in an array.",
        starterCode: "const users = [{ name: \"Ava\" }, { name: \"Sam\" }];\nconst result = users.find((u) => {\n  // return true for Sam\n});\nconsole.log(result);",
        solutionHintMarkdown: "Check u.name === 'Sam'."
      }
    ]
  },
  "arrays-and-array-methods-some-every": {
    title: "Arrays and array methods: some / every",
    estimatedMinutes: 75,
    contentMarkdown: `# Arrays and array methods: some / every

## What you will learn
- How some checks if any item matches
- How every checks if all items match
- How to use them for validation

## Beginner glossary
- some: returns true if at least one item matches.
- every: returns true if all items match.

## Big picture
some and every are boolean checks over arrays. They are great for validation and permission checks.

## Mental model
some asks "Is there at least one?" every asks "Do they all satisfy this?"

## Example
\`\`\`js
const nums = [2, 4, 6];
const hasOdd = nums.some((n) => n % 2 !== 0);
const allEven = nums.every((n) => n % 2 === 0);
\`\`\`

## Real world usage
- Check if any user is inactive
- Ensure all items are in stock
- Validate that all fields are filled

## Common mistakes
- Confusing some and every
- Forgetting to return booleans from callbacks

## Practice checklist
- Can you explain the difference in plain language?
- Can you combine some/every with other checks?
- Can you avoid unnecessary loops by using these methods?

## Mini project idea
Given a list of tasks, check if any are overdue and whether all are complete.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
` ,
    quizQuestions: [
      {
        question: "some returns true when:",
        options: ["All items match", "Any item matches", "No items match", "Array is empty"],
        correctIndex: 1,
        explanation: "some returns true if at least one item matches."
      },
      {
        question: "every returns true when:",
        options: ["Any item matches", "All items match", "First item matches", "Array is empty"],
        correctIndex: 1,
        explanation: "every returns true only if all items match."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Use every to check if all scores are passing (>= 60).",
        starterCode: "const scores = [70, 85, 60];\nconst allPassing = scores.every((s) => {\n  // return true if s >= 60\n});\nconsole.log(allPassing);",
        solutionHintMarkdown: "Return s >= 60."
      }
    ]
  },
  "destructuring": {
    title: "Destructuring",
    estimatedMinutes: 75,
    contentMarkdown: `# Destructuring

## What you will learn
- How to unpack values from objects and arrays
- Default values and renaming
- How destructuring improves readability

## Beginner glossary
- Destructuring: unpacking values into variables.
- Alias: renaming a destructured variable.

## Big picture
Destructuring makes code shorter and clearer by pulling values out of objects and arrays in one line. It is heavily used in modern JavaScript and React.

## Mental model
Think of destructuring as pattern matching. You describe the shape you want, and JavaScript pulls values into variables.

## Examples
\`\`\`js
const user = { name: "Ava", role: "admin" };
const { name, role } = user;

const nums = [1, 2, 3];
const [first, second] = nums;
\`\`\`

## Defaults and renaming
\`\`\`js
const { name: userName, age = 18 } = user;
\`\`\`

## Real world usage
- Extracting fields from API responses
- Reading props in functions
- Swapping or ignoring array values

## Common mistakes
- Destructuring undefined without defaults
- Confusing array order with object keys

## Practice checklist
- Can you rename variables while destructuring?
- Can you provide defaults?
- Can you destructure function parameters?

## Mini project idea
Write a function that takes a user object and destructures name, role, and a default for city.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
` ,
    quizQuestions: [
      {
        question: "Destructuring is used to:",
        options: ["Loop arrays", "Unpack values", "Sort data", "Create objects"],
        correctIndex: 1,
        explanation: "Destructuring unpacks values from arrays or objects."
      },
      {
        question: "Array destructuring is based on:",
        options: ["Key names", "Order", "Types", "Length"],
        correctIndex: 1,
        explanation: "Array destructuring is positional."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Destructure a product object to get name and price.",
        starterCode: "const product = { name: \"Pen\", price: 2 };\n// destructure here\n",
        solutionHintMarkdown: "Use const { name, price } = product."
      }
    ]
  },
  "spread-operator": {
    title: "Spread operator",
    estimatedMinutes: 75,
    contentMarkdown: `# Spread operator

## What you will learn
- How to copy arrays and objects with spread
- How to merge data safely
- How spread enables immutable updates

## Beginner glossary
- Spread: ... syntax that expands values.
- Shallow copy: a copy of the top level only.
- Immutable update: creating new objects or arrays instead of mutating.

## Big picture
The spread operator expands arrays or objects into individual elements or properties. It is essential for immutable updates in modern JavaScript.

## Mental model
Think of spread as dumping the contents of a box onto the table, so you can build a new box with those contents plus changes.

## Examples
\`\`\`js
const a = [1, 2];
const b = [...a, 3];

const user = { name: "Ava" };
const updated = { ...user, role: "admin" };
\`\`\`

## Real world usage
- React state updates
- Merging config objects
- Copying arrays before sorting or modifying

## Common mistakes
- Assuming spread makes deep copies
- Overwriting properties without noticing

## Practice checklist
- Can you add items immutably to arrays?
- Can you update a nested object without mutation?
- Can you explain shallow vs deep copy?

## Mini project idea
Build a settings updater that merges user settings into defaults using spread.

## Further reading
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
` ,
    quizQuestions: [
      {
        question: "Spread syntax is written as:",
        options: ["...", "***", "->", "??"],
        correctIndex: 0,
        explanation: "The spread operator uses three dots."
      },
      {
        question: "Spread creates a:",
        options: ["Deep copy", "Shallow copy", "Reference only", "Frozen copy"],
        correctIndex: 1,
        explanation: "Spread creates a shallow copy."
      }
    ],
    exercises: [
      {
        promptMarkdown: "Create a new array by adding an item to an existing array without mutation.",
        starterCode: "const nums = [1, 2, 3];\nconst next = // use spread\nconsole.log(next);",
        solutionHintMarkdown: "Use [...nums, 4]."
      }
    ]
  }
};
