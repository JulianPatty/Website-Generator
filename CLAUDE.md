# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application
- `npm run dev` - Start Next.js development server
- `npm run dev:full` - Run Next.js, Inngest dev server, and Prisma Studio concurrently (recommended for full development)
- `npm run dev:inngest` - Start Inngest development server separately

### Database Operations
- `npm run db:push` - Push schema changes to database (use during development)
- `npm run db:migrate` - Run database migrations (use for production changes)
- `npm run db:generate` - Regenerate Prisma client after schema changes
- `npm run db:studio` - Open Prisma Studio for database inspection
- `npm run db:seed` - Seed database with initial data

### Build and Deployment
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Architecture Overview

This is a **Next.js 15 application** using the App Router with a code generation platform that executes AI-generated code in sandboxed environments.

### Core Technology Stack
- **Frontend**: Next.js 15 with React 19, TypeScript, TailwindCSS 4.0, Shadcn/UI
- **API Layer**: tRPC for type-safe APIs with Zod validation
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk for user management
- **Payments**: Paddle integration for subscriptions
- **Background Jobs**: Inngest for async processing
- **Code Execution**: E2B sandboxes for isolated code execution
- **AI Integration**: OpenAI GPT-4o for code generation

### Key Architectural Patterns

#### Module-Based Organization
Code is organized into feature modules under `src/modules/` with each module containing:
- Server procedures (tRPC routers)
- UI components
- Views/pages

#### tRPC API Structure
All API endpoints are defined in `src/trpc/routers/` and use:
- Protected procedures with Clerk authentication
- Zod schemas for input validation
- Type-safe client-server communication

#### Background Job Processing
Inngest functions in `src/inngest/` handle:
- AI agent code generation
- Sandbox execution
- Result processing and storage

#### Database Schema
Three main entities:
- **Project**: User projects with unique IDs
- **Message**: Conversation history (USER/ASSISTANT roles)
- **Fragment**: Code execution results with sandbox data

## Code Analysis Instructions

### Explain Function Purpose

When asked to explain what a function or code block does:

1. **Read the surrounding context** - Use the Read tool to view the code with sufficient context (usually 20-30 lines before and after)

2. **Analyze the code** to understand:
   - What the function/code block does
   - What triggers it (event handlers, conditions)
   - What actions it performs
   - Any side effects or state changes

3. **Add a clear comment** above the code explaining its purpose in plain English

### Example Pattern:
- For event handlers: `// [Action] when [trigger condition]`
- For utility functions: `// [What it does] and returns [what]`
- For complex logic: `// [Main purpose], [key behaviors]`

### Common Requests:
- "Explain what this does"
- "Add a comment explaining this"
- "What does this function do"

### Response Format:
1. First read the code with context
2. Add a concise, clear comment
3. Keep explanation brief and focused on the "what" not the "how"

## Important Instructions

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.