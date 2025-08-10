import { PrismaClient, Prisma } from "../src/generated/prisma";

const prisma = new PrismaClient();

const projectData: Prisma.ProjectCreateInput[] = [
  {
    name: "Sample Web Project",
    messages: {
      create: [
        {
          content: "Create a landing page",
          role: "USER",
          type: "RESULT",
        },
        {
          content: "I'll create a landing page for you",
          role: "ASSISTANT",
          type: "RESULT",
          fragment: {
            create: {
              sandboxUrl: "https://example.com/sandbox/1",
              title: "Landing Page",
              files: {
                "index.html": "<html><body>Landing Page</body></html>",
                "style.css": "body { margin: 0; padding: 0; }"
              }
            }
          }
        },
      ],
    },
  },
  {
    name: "React Dashboard",
    messages: {
      create: [
        {
          content: "Build a React dashboard",
          role: "USER",
          type: "RESULT",
        },
        {
          content: "Creating a React dashboard with charts",
          role: "ASSISTANT",
          type: "RESULT",
          fragment: {
            create: {
              sandboxUrl: "https://example.com/sandbox/2",
              title: "React Dashboard",
              files: {
                "App.tsx": "export default function App() { return <div>Dashboard</div> }",
                "index.tsx": "import App from './App'"
              }
            }
          }
        },
      ],
    },
  },
];

export async function main() {
  console.log("Start seeding...");
  
  for (const p of projectData) {
    const project = await prisma.project.create({ 
      data: p,
      include: {
        messages: {
          include: {
            fragment: true
          }
        }
      }
    });
    console.log(`Created project with id: ${project.id}`);
  }
  
  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });