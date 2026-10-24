export type CourseContent = {
  overview: string;
  outcomes: string[];
  articles: string[];
  projectTitle: string;
  projectDescription: string;
  projectDeliverable: string;
};

export const courseContent: Record<string, CourseContent> = {
  "html-css": {
    overview: "Learn how the web is structured and styled, then turn your ideas into a polished multi-page website. Each article introduces one concept and includes examples you can follow as you build.",
    outcomes: ["Structure pages with semantic HTML", "Style layouts, type, and color with CSS", "Create reusable page sections"],
    articles: ["How the web works", "Your first HTML document", "Semantic elements and page structure", "CSS selectors, colors, and type", "Spacing, borders, and reusable styles"],
    projectTitle: "A personal profile website",
    projectDescription: "Bring the lessons together in a responsive profile site with an introduction, a project gallery, and a contact section.",
    projectDeliverable: "A finished website with at least three sections and a consistent visual style.",
  },
  "javascript-fundamentals": {
    overview: "Build a strong JavaScript foundation by learning how values, decisions, functions, and collections fit together. Short articles pair each new idea with readable code examples.",
    outcomes: ["Work with variables and common data types", "Write functions and conditional logic", "Use arrays and objects to organize information"],
    articles: ["Values, variables, and data types", "Operators and expressions", "Making decisions with conditionals", "Functions and reusable logic", "Working with arrays and objects"],
    projectTitle: "An interactive quiz",
    projectDescription: "Create a small quiz that presents questions, checks answers, and tracks a learner’s score using the JavaScript concepts from the course.",
    projectDeliverable: "A working quiz flow with multiple questions, answer feedback, and a final score.",
  },
  "responsive-web-design": {
    overview: "Learn how to make interfaces adapt to different screens. Explore flexible layouts, responsive type, and practical breakpoints before applying them to a complete page.",
    outcomes: ["Use flexible sizing and CSS Grid", "Choose breakpoints based on content", "Check layout and readability across screen sizes"],
    articles: ["Thinking in responsive layouts", "Flexible units and containers", "CSS Grid for page structure", "Media queries and breakpoints", "Responsive images and navigation"],
    projectTitle: "A responsive landing page",
    projectDescription: "Design one landing page that works comfortably on a phone, tablet, and desktop without relying on fixed-width layouts.",
    projectDeliverable: "A responsive page with a navigation, feature section, and clear call to action.",
  },
  "typescript-essentials": {
    overview: "Add confidence to JavaScript projects with TypeScript. Learn how to describe values, shape data, and use the compiler to catch common mistakes as you work.",
    outcomes: ["Annotate values with useful types", "Model objects and function inputs", "Use unions and narrowing to handle multiple cases"],
    articles: ["Why TypeScript and how it checks code", "Primitive types and inference", "Object types and interfaces", "Function parameters and return types", "Union types and narrowing"],
    projectTitle: "A typed task tracker",
    projectDescription: "Model tasks with TypeScript and build a small tracker that can add, update, and filter items while keeping data shapes clear.",
    projectDeliverable: "A task list with typed task records, status updates, and a filter for completed work.",
  },
  "react-fundamentals": {
    overview: "Understand the building blocks of React and compose them into interactive interfaces. Move from components and props to state and user events with clear, focused lessons.",
    outcomes: ["Compose interfaces from reusable components", "Pass data through props", "Manage local state and respond to events"],
    articles: ["Thinking in components", "Writing JSX", "Props and reusable UI", "State and interactive updates", "Handling events and rendering lists"],
    projectTitle: "A small habit tracker",
    projectDescription: "Build a simple habit tracker interface with reusable components, interactive check-ins, and a helpful empty state.",
    projectDeliverable: "A React app that displays habits and lets a learner mark each one complete for the day.",
  },
  "git-github-basics": {
    overview: "Learn the everyday Git workflow for saving progress and collaborating. Practice making commits, exploring history, and sharing a project on GitHub.",
    outcomes: ["Track changes in a repository", "Create useful commits and branches", "Publish a project to GitHub"],
    articles: ["Repositories and the working tree", "Staging and committing changes", "Reading project history", "Branches and merging", "Pushing a project to GitHub"],
    projectTitle: "Publish a project repository",
    projectDescription: "Take a small project from its first local commit to a clean GitHub repository with a useful README and an understandable history.",
    projectDeliverable: "A public or shareable repository with a README, several focused commits, and a clear project structure.",
  },
};
