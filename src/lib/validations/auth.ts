import { z } from "zod";

// Email validation
const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

// Password validation helpers
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const simplePasswordSchema = z
  .string()
  .min(1, "Password is required");

// Sign In Schema
export const signInSchema = z.object({
  email: emailSchema,
  password: simplePasswordSchema,
});

// Sign Up Schema
export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Profile Update Schema
export const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "First name can only contain letters")
    .optional()
    .or(z.literal("")),
  lastName: z
    .string()
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Last name can only contain letters")
    .optional()
    .or(z.literal("")),
  email: emailSchema,
  phone: z
    .string()
    .regex(/^(\+?\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  image: z.string().optional(),
});

// Password Reset Schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Type exports
export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// Password strength checker
export function getPasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 25;
  } else {
    feedback.push("At least 8 characters");
  }

  if (/[A-Z]/.test(password)) {
    score += 25;
  } else {
    feedback.push("One uppercase letter");
  }

  if (/[a-z]/.test(password)) {
    score += 25;
  } else {
    feedback.push("One lowercase letter");
  }

  if (/[0-9]/.test(password)) {
    score += 25;
  } else {
    feedback.push("One number");
  }

  // Bonus for special characters
  if (/[^A-Za-z0-9]/.test(password)) {
    score = Math.min(100, score + 10);
  }

  return { score, feedback };
}