- remove files from `public/*`
- clear `globals.css`
- clear `page.tsx`
- install shadcn `npx shadcn@latest init`
- install components `npx shadcn@latest add button label input sonner`
- show button and test `dev` server

== PART 1 ==

- install Better Auth `npm install better-auth`
- create `.env` and set Environment Variables
- create `lib/auth.ts`
- setup `postgres` database with `neon.tech`
- install prisma `npm install prisma --save-dev`
- initialize prisma `npx prisma init`
- create **Post** Model
- push database changes `npx prisma db push`
- add `generated` to `.gitignore`
- adjust **scripts** in `package.json`

- create single Prisma Client in `lib/prisma.ts`
- setup prisma adapter with better-auth
- generate auth tables `npx @better-auth/cli generate --output=auth.schema.prisma`
- make tweaks to `schema.prisma`
- quick walkthrough the models:
  - `User`
  - `Session`
  - `Account`
  - `Verification`
- push database changes `npx prisma db push`
- create Mount Handler in `app/api/auth/[...all]/route.ts`
- adjust `eslint.config.mjs` to ignore `/src/generated/**/*`
- create Client instance in `lib/auth-client.ts`

- Enable Email & Password Authentication
- Create Sign Up Page PT1
  - Create Form `components/register-form.tsx`
  - Log Form Values
- Setup Sonner
- Create Sign Up Page PT2
  - Add Form Validation
  - Destructure SignUp Function
  - Showcase `onError`
- OPTIONS - **minPasswordLength**
- Create Sign Up Page PT3
  - Sign Up _default automatically signs in the user_
- Show Session on Profile Page
- Show Data in Neon Dashboard
- Sign Out User
  - Destructure SignOut Function
  - Show Removed Cookies
- Create Sign In Page PT1
  - Create Form `components/login-form.tsx`
  - Log Form Values
  - Destructure SignIn Function
- Show Unauthorized on Profile Page
- Create Sign In Page PT2
  - Showcase `onError`
  - Sign In User
- FINISH PART 1

== PART 2 ==

- Showcase `onRequest` and `onResponse`
- Showcase Full Cycle Again
- Add Convenience Links for Auth Pages
- OPTIONS - **autoSignIn**
  - Showcase
- OPTIONS - **advanced.database.generateId**
  - Table IDs (change `schema.prisma` and push)
  - Showcase
  - Truncate Tables
- OPTIONS - **emailAndPassword.password**
  - Create User
  - Argon2 `npm install @node-rs/argon2`
  - Add to `next.config.ts`
  - Create Utilities `lib/argon2.ts`
  - Add to `lib/auth.ts`
  - Showcase
  - Truncate Tables
- Create User
- Sign Up User via SERVER ACTIONS
  - Create Action
  - Log Form Values
  - Sign Up User on Server
- Sign In User via SERVER ACTIONS
  - Create Action
  - Log Form Values
  - Sign In User on Server
  - Showcase - No Cookies
  - Manually Set Cookies
  - Showcase - Cookies
  - Passing Headers to Sign In
- PLUGINS - **nextCookies()**
- FINISH PART 2

== PART 3 ==

- Get Session on Client
  - Create Get Started Button
  - Destructure useSession
  - Showcase
- OPTIONS - **session.expiresIn**
  - Change to 15 seconds
  - Showcase
  - Change to 30 days
- Middleware
  - check for existence of a session cookie
  - showcase on auth routes
- Error Handling
- Hooks
  - Validate Email
  - Transform Name

== PART 4 ==

- Roles (Custom Method)
- Prisma
  - Add UserRole Enum
  - Push changes `npx prisma db push`
- User
  - Show field is added beacuse of `@default`
  - Truncate Tables
  - Create new User
- Profile PT1
  - Show role is not typed in `session.user`
- OPTIONS - **user.additionalFields**
  - Showcase `input` option
- Profile PT2
  - Show role is now typed and added to `session.user`
- ISSUE: Client Session has no Context of the Role
  - Cute circle on `get-started-button.tsx`
  - InferAdditionalFields plugin on Client
- Admin Panel
  - Create Page / Link
  - Manually Change Role
  - Update Middleware
  - Guard `/admin/dashboard`
  - List Users With Prisma Query
  - Delete User With Prisma Query
- Database Hooks
- Roles (Admin Plugin)
  - generate auth tables `npx @better-auth/cli generate --output=roles.schema.prisma`
  - compare and contrast (look at Schema section)
  - Push changes `npx prisma db push`
  - Create Permissions (No Posts)
  - Add to `lib/auth.ts` and `lib/auth-client.ts`
  - List Users With Admin Plugin
  - EXERCISE: Delete User With Admin Plugin
  - Change Permissions (With Posts)
- Create Dropdown to Change Role for Admins
- FINISH PART 4

== PART 5 ==

- Google OAuth
  - Create Buttons
- GitHub OAuth
- Account Linking
- Error Handling
  - `/auth/login/error`
- FINISH PART 5

== PART 6 ==

- Nodemailer
  - Create Template
- Verify Email
  - `emailAndPassword.requireEmailVerification`
  - `emailVerification`
  - Handle Error / Expired `/auth/verify`
  - Destructure sendVerificationEmail
  - Handle Login Page Not Verified
- Create Post Sign Up Page
  - Showcase
- Forgot Password
  - Page / Form / Success
- Reset Password
  - Page / Form / Success
  - Showcase
- FINISH PART 6

== PART 7 ==

- Show the image
- Updating User
  - change name / image
  - update hook
  - updating password
- Custom Sessions
  - type inference for plugins workaround
- PLUGINS - **Magic Link**
  - add to client instance
  - Create UI
  - adjust hooks
- Cookie Cache
- FINISH PART 7


------------

 ✅ COMPLETED TASKS

    Part 1 - Initial Setup

    - ✅ Install Better Auth (better-auth is installed)
    - ✅ Create .env with environment variables (DATABASE_URL configured)
    - ✅ Create lib/auth.ts (configured with Prisma adapter, email/password, 
    social providers)
    - ✅ Setup postgres database with neon.tech (DATABASE_URL points to Neon)
    - ✅ Install Prisma (prisma installed as dev dependency)
    - ✅ Initialize Prisma (schema exists at src/db/schema.prisma)
    - ✅ Create Prisma Client in lib/prisma.ts 
    - ✅ Setup Prisma adapter with better-auth
    - ✅ Generate auth tables (User, Account, Session, Verification models 
    exist)
    - ✅ Push database changes (migrations completed)
    - ✅ Create Mount Handler in app/api/auth/[...all]/route.ts
    - ✅ Create Client instance in lib/auth-client.ts
    - ✅ Enable Email & Password Authentication
    - ✅ Create Sign Up Page (at /auth/sign-up)
    - ✅ Create Sign In Page (at /auth/sign-in)

    Part 2 - Advanced Features

    - ✅ PLUGINS - nextCookies() (imported and configured)
    - ✅ Social Providers (Google and GitHub configured)

    Part 3 - Session Management

    - ✅ Session configuration (30 days expiry configured)
    - ✅ Middleware setup (checking for sessions, protecting routes)

    Part 4 - Additional Features

    - ✅ Passkey plugin configured
    - ✅ Dodo Payments integration
    - ✅ Completed Sonner Integration
    - ✅ Form Validation - Basic validation exists but could be enhanced
    - 🚧 SMTP TODO: (Network Setup via: Gmail) 
    - ✅ Profile Page - Need to create a proper profile page showing session 
    - ✅ Sign Out functionality - Not visible in current implementation
    - ✅ Sign Up/In via SERVER ACTIONS - Implemented with form actions
    - ✅ Manual Cookie Setting - Handled by Better Auth with headers
    - ✅ 
    - ✅ 
    - ✅ 
    - ✅ 

    ❌ NOT COMPLETED / NEEDS WORK / MISSING CORE FEATURES


    Part 2 - Server Actions

    5. ✅ Sign Up/In via SERVER ACTIONS - Implemented with form actions
    6. ✅ Manual Cookie Setting - Handled by Better Auth with headers

    Part 3 - Client Features

    7. useSession Hook Usage - Not fully utilized in components
    8. Error Handling Pages - Missing /auth/login/error page

    Part 4 - Roles & Permissions

    9. User Roles - No role system implemented
    10. Admin Panel - No admin functionality

    Part 5 - OAuth Enhancement

    11. Account Linking - Basic OAuth exists but no explicit account linking 
    UI
    12. OAuth Error Handling - Missing error pages

    Part 6 - Email Features

    13. Email Verification - Not configured (requireEmailVerification: false)
    14. Forgot Password Flow - Not implemented
    15. Reset Password - Not implemented
    16. Nodemailer Integration - No email service configured

    Part 7 - User Management

    17. Update User Profile - Settings page exists but limited functionality
    18. Change Password - Not implemented
    19. Custom Sessions - Basic sessions only
    20. Cookie Cache - Configured but could be optimized

    🔧 RECOMMENDATIONS

    High Priority

    1. Add proper sign-out functionality in UserControl component
    2. Create forgot/reset password flow
    3. Implement proper error handling pages
    4. Add form validation with zod

    Medium Priority

    5. Implement email verification
    6. Add role-based access control
    7. Create admin panel for user management
    8. Enhance profile/settings page

    Low Priority

    9. Implement server actions for auth
    10. Add more OAuth providers
    11. Implement magic link authentication
    12. Add two-factor authentication back (if needed)

  Update Todos
  ⎿  ☐ Add sign-out functionality to UserControl component
     ☐ Create forgot password page and flow
     ☐ Create reset password page and flow
     ☐ Add proper error handling pages
     ☐ Enhance form validation with zod
     ☐ Create profile page showing session data