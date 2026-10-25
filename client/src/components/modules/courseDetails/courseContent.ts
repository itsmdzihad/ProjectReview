export type CourseContent = {
  overview: string;
  outcomes: string[];
  articles: string[];
  articleSummaries: string[];
  projectTitle: string;
  projectDescription: string;
  projectDeliverable: string;
};

export const courseContent: Record<string, CourseContent> = {
  "html-css": {
    overview: "Learn how the web is structured and styled, then turn your ideas into a polished multi-page website. Each article introduces one concept and includes examples you can follow as you build.",
    outcomes: ["Structure pages with semantic HTML", "Style layouts, type, and color with CSS", "Create reusable page sections"],
    articles: ["How the web works", "Your first HTML document", "Semantic elements and page structure", "CSS selectors, colors, and type", "Spacing, borders, and reusable styles"],
    articleSummaries: [
      "A browser requests files from a server, then reads HTML to understand the page and CSS to display its design. Knowing this flow helps you understand where each part of a website belongs.",
      "An HTML document gives the browser a predictable starting structure. Add the doctype, document element, head metadata, and body content before building the page itself.",
      "Semantic elements describe the purpose of content. Use landmarks such as header, nav, main, and footer so the page is easier to navigate and maintain.",
      "CSS selectors choose which elements receive styles. Combine clear selectors with considered color and type choices to create a consistent visual hierarchy.",
      "Spacing and borders help group related content and make a layout easier to scan. Reuse a small set of spacing values instead of styling every element independently.",
    ],
    projectTitle: "A personal profile website",
    projectDescription: "Bring the lessons together in a responsive profile site with an introduction, a project gallery, and a contact section.",
    projectDeliverable: "A finished website with at least three sections and a consistent visual style.",
  },
  "javascript-fundamentals": {
    overview: "Build a strong JavaScript foundation by learning how values, decisions, functions, and collections fit together. Short articles pair each new idea with readable code examples.",
    outcomes: ["Work with variables and common data types", "Write functions and conditional logic", "Use arrays and objects to organize information"],
    articles: ["Values, variables, and data types", "Operators and expressions", "Making decisions with conditionals", "Functions and reusable logic", "Working with arrays and objects"],
    articleSummaries: [
      "JavaScript values include strings, numbers, booleans, and other data. Variables give those values meaningful names, while choosing const or let makes reassignment clear.",
      "Operators combine and compare values to produce new results. Expressions can be used anywhere your program needs a calculated value, such as a condition or function argument.",
      "Conditional statements let a program choose what to do based on a true or false test. Use if, else if, and else to make each possible path explicit.",
      "Functions package steps under a reusable name. Parameters provide input and return values send a result back to the code that called the function.",
      "Arrays keep ordered collections, while objects group named properties. Together they help represent lists of records such as quiz questions and learner scores.",
    ],
    projectTitle: "An interactive quiz",
    projectDescription: "Create a small quiz that presents questions, checks answers, and tracks a learner’s score using the JavaScript concepts from the course.",
    projectDeliverable: "A working quiz flow with multiple questions, answer feedback, and a final score.",
  },
  "responsive-web-design": {
    overview: "Learn how to make interfaces adapt to different screens. Explore flexible layouts, responsive type, and practical breakpoints before applying them to a complete page.",
    outcomes: ["Use flexible sizing and CSS Grid", "Choose breakpoints based on content", "Check layout and readability across screen sizes"],
    articles: ["Thinking in responsive layouts", "Flexible units and containers", "CSS Grid for page structure", "Media queries and breakpoints", "Responsive images and navigation"],
    articleSummaries: [
      "Responsive design starts with content that can adapt instead of assuming one fixed screen size. Begin with a narrow layout, then add room where the content needs it.",
      "Relative units and flexible containers let a page grow and shrink naturally. Use max-width to keep long lines readable while allowing the layout to use available space.",
      "CSS Grid divides a page into rows and columns. Define a small number of layout rules and let the grid rearrange content as the viewport changes.",
      "Media queries apply styles when the viewport reaches a useful range. Choose breakpoints when the design needs them, rather than matching a specific device list.",
      "Images should scale within their containers, and navigation needs a clear narrow-screen layout. Check that controls remain readable and usable at every size.",
    ],
    projectTitle: "A responsive landing page",
    projectDescription: "Design one landing page that works comfortably on a phone, tablet, and desktop without relying on fixed-width layouts.",
    projectDeliverable: "A responsive page with a navigation, feature section, and clear call to action.",
  },
  "typescript-essentials": {
    overview: "Add confidence to JavaScript projects with TypeScript. Learn how to describe values, shape data, and use the compiler to catch common mistakes as you work.",
    outcomes: ["Annotate values with useful types", "Model objects and function inputs", "Use unions and narrowing to handle multiple cases"],
    articles: ["Why TypeScript and how it checks code", "Primitive types and inference", "Object types and interfaces", "Function parameters and return types", "Union types and narrowing"],
    articleSummaries: [
      "TypeScript checks JavaScript code before it runs and reports places where values may not match how they are used. This gives you earlier feedback while keeping JavaScript runtime behavior.",
      "Primitive annotations describe values such as strings, numbers, and booleans. Type inference can already determine many of these types, so annotations are most useful when they clarify intent.",
      "Object types and interfaces describe the properties a record should contain. Reusing these shapes makes data contracts clearer across components and functions.",
      "Function types describe the values a function accepts and returns. Clear parameter and return types make a function easier to call correctly and safely reuse.",
      "Union types allow a value to have a small set of possible shapes. Narrowing checks which case is present before code accesses case-specific properties.",
    ],
    projectTitle: "A typed task tracker",
    projectDescription: "Model tasks with TypeScript and build a small tracker that can add, update, and filter items while keeping data shapes clear.",
    projectDeliverable: "A task list with typed task records, status updates, and a filter for completed work.",
  },
  "react-fundamentals": {
    overview: "Understand the building blocks of React and compose them into interactive interfaces. Move from components and props to state and user events with clear, focused lessons.",
    outcomes: ["Compose interfaces from reusable components", "Pass data through props", "Manage local state and respond to events"],
    articles: ["Thinking in components", "Writing JSX", "Props and reusable UI", "State and interactive updates", "Handling events and rendering lists"],
    articleSummaries: [
      "A React component describes one part of an interface and can be composed with other components. Keep each component focused so the overall page is easier to change.",
      "JSX lets a component describe UI with familiar markup-like syntax. JavaScript expressions can be inserted inside braces to show data and conditionally render content.",
      "Props pass information from a parent component to a child. Reusable components use props to display different data while keeping the same structure and behavior.",
      "State stores information that changes while someone uses the interface. Updating state asks React to render the component again with the latest value.",
      "Event handlers respond to actions such as clicks, and list rendering turns collections of data into repeated UI. Stable keys help React keep each list item associated with its data.",
    ],
    projectTitle: "A small habit tracker",
    projectDescription: "Build a simple habit tracker interface with reusable components, interactive check-ins, and a helpful empty state.",
    projectDeliverable: "A React app that displays habits and lets a learner mark each one complete for the day.",
  },
  "git-github-basics": {
    overview: "Learn the everyday Git workflow for saving progress and collaborating. Practice making commits, exploring history, and sharing a project on GitHub.",
    outcomes: ["Track changes in a repository", "Create useful commits and branches", "Publish a project to GitHub"],
    articles: ["Repositories and the working tree", "Staging and committing changes", "Reading project history", "Branches and merging", "Pushing a project to GitHub"],
    articleSummaries: [
      "A Git repository records changes to a project. The working tree is your current set of files, and Git compares it with the last saved commit to show what changed.",
      "Staging selects the changes for the next snapshot. A focused commit with a clear message gives you a useful checkpoint you can understand later.",
      "Project history shows how the code changed over time. Reviewing commits helps you find when a change happened and understand the steps behind it.",
      "Branches let you work on a change without disturbing the main line of work. Merging brings the finished changes back together, where conflicts can be resolved deliberately.",
      "A remote connects your local repository to a shared host such as GitHub. Pushing sends your commits there so the project can be backed up and shared.",
    ],
    projectTitle: "Publish a project repository",
    projectDescription: "Take a small project from its first local commit to a clean GitHub repository with a useful README and an understandable history.",
    projectDeliverable: "A public or shareable repository with a README, several focused commits, and a clear project structure.",
  },
};
