# Clerk to Better Auth Migration Checklist

## ✅ Completed Migration Items

### 1. Core Authentication
- [x] **Sign Up** - Basic email/password registration
- [x] **Sign In** - Email/password login
- [x] **Sign Out** - Logout functionality
- [x] **Session Management** - Cookie-based sessions
- [x] **Protected Routes** - Middleware-based route protection
- [x] **Auth Context** - Server-side auth context in TRPC

### 2. UI Components
- [x] **Sign In Page** - Custom form at `/sign-in`
- [x] **Sign Up Page** - Custom form at `/sign-up`
- [x] **User Menu** - Basic dropdown with sign out
- [x] **Auth State in Navbar** - Show/hide buttons based on auth

### 3. API Protection
- [x] **Protected TRPC Procedures** - `protectedProcedure` middleware
- [x] **User ID in Context** - Access to `userId` in TRPC context

## ❌ Missing Features to Implement

### 1. User Profile Management
- [ ] **User Profile Page** - View and edit user information
  - Clerk had: `UserProfile` component
  - Need: Custom profile page with form
  
- [ ] **Update User Name** - Change display name
  - Clerk had: Built into `UserProfile`
  - Need: API endpoint and form
  
- [ ] **Update Email** - Change email address
  - Clerk had: Built into `UserProfile`
  - Need: Email verification flow
  
- [ ] **Avatar/Image Upload** - Profile picture management
  - Clerk had: Built-in image upload
  - Need: File upload handling

### 2. Password Management
- [ ] **Change Password** - Update existing password
  - Clerk had: Built into `UserProfile`
  - Need: Password change form with old password verification
  
- [ ] **Forgot Password** - Password reset flow
  - Clerk had: Built-in password reset
  - Need: Email-based reset token system
  
- [ ] **Password Strength Requirements** - Validation rules
  - Clerk had: Configurable password policies
  - Need: Zod validation with requirements

### 3. Email Verification
- [ ] **Email Verification on Sign Up** - Verify email before access
  - Clerk had: `emailVerificationRequired` option
  - Need: Verification token system
  
- [ ] **Resend Verification Email** - Retry verification
  - Clerk had: Built-in resend functionality
  - Need: API endpoint for resending

### 4. Session Management
- [ ] **Remember Me** - Extended session duration
  - Clerk had: Session duration settings
  - Need: Configurable session expiry
  
- [ ] **Active Sessions List** - View all active sessions
  - Clerk had: Session management in `UserProfile`
  - Need: Session tracking and display
  
- [ ] **Revoke Sessions** - Sign out from other devices
  - Clerk had: Built-in session revocation
  - Need: Session invalidation API

### 5. Social Authentication (Optional)
- [ ] **OAuth Providers** - Google, GitHub, etc.
  - Clerk had: Multiple OAuth providers
  - Better Auth supports: Need to configure providers
  
- [ ] **Link/Unlink Social Accounts** - Connect multiple auth methods
  - Clerk had: Account linking in `UserProfile`
  - Need: Account management UI

### 6. Security Features
- [ ] **Two-Factor Authentication (2FA)** - Extra security layer
  - Clerk had: Built-in 2FA support
  - Need: TOTP implementation
  
- [ ] **Rate Limiting** - Prevent brute force attacks
  - Clerk had: Built-in rate limiting
  - Need: Rate limiting middleware
  
- [ ] **Account Lockout** - After failed attempts
  - Clerk had: Automatic lockout policies
  - Need: Failed attempt tracking

### 7. User Experience Features
- [ ] **Redirect After Sign In** - Return to intended page
  - Partially implemented with `callbackUrl`
  - Need: Better handling of protected route redirects
  
- [ ] **Sign In Modal** - In-page authentication
  - Clerk had: `clerk.openSignIn()` modal
  - Need: Modal component for sign in
  
- [ ] **Loading States** - Better loading indicators
  - Clerk had: Built-in loading states
  - Need: Skeleton loaders for auth checks

### 8. Developer Features
- [ ] **User Metadata** - Custom user fields
  - Clerk had: `publicMetadata` and `privateMetadata`
  - Need: Extend User model with custom fields
  
- [ ] **Webhooks** - User lifecycle events
  - Clerk had: Webhook endpoints
  - Need: Event system for user actions
  
- [ ] **User Impersonation** - Admin features
  - Clerk had: Impersonation for testing
  - Need: Admin panel functionality

### 9. Data Migration
- [ ] **Migrate Existing User IDs** - Map Clerk IDs to Better Auth
  - Current state: Projects have orphaned Clerk user IDs
  - Need: Migration script or manual user re-association
  
- [ ] **Preserve User Data** - Maintain user preferences
  - Current state: No user preferences stored
  - Need: Decide what data to preserve

## Implementation Priority

### High Priority (Core Functionality)
1. Forgot Password Flow
2. Email Verification
3. User Profile Page
4. Change Password

### Medium Priority (User Experience)
1. Remember Me
2. Social Authentication (at least Google)
3. Better loading states
4. Sign in modal

### Low Priority (Nice to Have)
1. 2FA
2. Session management UI
3. User metadata
4. Webhooks

## Notes

- The current Better Auth implementation covers basic authentication well
- Most missing features are "nice to have" rather than critical
- Consider which features your users actually need before implementing all
- Some features (like 2FA) may require additional packages or services

## Resources

- [Better Auth Docs](https://www.better-auth.com/docs)
- [Better Auth Plugins](https://www.better-auth.com/docs/plugins)
- Current Implementation Files:
  - `/src/lib/auth.ts` - Auth configuration
  - `/src/lib/auth-client.ts` - Client-side auth
  - `/src/app/api/auth/[...all]/route.ts` - Auth API routes
  - `/src/middleware.ts` - Route protection