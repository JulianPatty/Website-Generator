"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema, type SignInInput, type SignUpInput } from "@/lib/validations/auth";
import { APIError } from "better-auth/api";

type ActionResult<T = void> = 
  | { success: true; data?: T }
  | { success: false; error: string; field?: string };

export async function signUpAction(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validation = signUpSchema.safeParse(rawData);
  
  if (!validation.success) {
    const firstError = validation.error.errors[0];
    return {
      success: false,
      error: firstError.message,
      field: firstError.path[0] as string,
    };
  }

  const { name, email, password } = validation.data;

  try {
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });

    if (!result) {
      return {
        success: false,
        error: "Failed to create account. Please try again.",
      };
    }

    const signInResult = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    if (!signInResult) {
      return {
        success: false,
        error: "Account created but sign-in failed. Please sign in manually.",
      };
    }

  } catch (error) {
    console.error("Sign up error:", error);
    
    if (error instanceof APIError) {
      switch (error.status) {
        case 422: 
          return {
            success: false,
            error: "This email is already registered. Please sign in instead.",
            field: "email",
          };
        case 400:
          return {
            success: false,
            error: error.message || "Invalid input. Please check your information.",
          };
        default:
          return {
            success: false,
            error: "An unexpected error occurred. Please try again.",
          };
      }
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }

  redirect("/");
}

export async function signInAction(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validation = signInSchema.safeParse(rawData);
  
  if (!validation.success) {
    const firstError = validation.error.errors[0];
    return {
      success: false,
      error: firstError.message,
      field: firstError.path[0] as string,
    };
  }

  const { email, password } = validation.data;
  const callbackUrl = formData.get("callbackUrl") as string || "/";

  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    if (!result) {
      return {
        success: false,
        error: "Invalid email or password. Please try again.",
      };
    }

  } catch (error) {
    console.error("Sign in error:", error);
    
    if (error instanceof APIError) {
      switch (error.status) {
        case 401:
          return {
            success: false,
            error: "Invalid email or password. Please try again.",
          };
        case 403:
          return {
            success: false,
            error: "Your account requires email verification. Please check your email.",
          };
        case 429:
          return {
            success: false,
            error: "Too many attempts. Please try again later.",
          };
        default:
          return {
            success: false,
            error: "An unexpected error occurred. Please try again.",
          };
      }
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }

  redirect(callbackUrl);
}

export async function forgotPasswordAction(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return {
      success: false,
      error: "Please enter a valid email address.",
      field: "email",
    };
  }

  try {
    await auth.api.forgetPassword({
      body: {
        email,
        redirectTo: "/auth/reset-password",
      },
      headers: await headers(),
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Forgot password error:", error);
    
    return {
      success: false,
      error: "Failed to send reset email. Please try again.",
    };
  }
}

export async function resetPasswordAction(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!token) {
    return {
      success: false,
      error: "Invalid or missing reset token.",
    };
  }

  if (!password || password.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters.",
      field: "password",
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      error: "Passwords do not match.",
      field: "confirmPassword",
    };
  }

  try {
    await auth.api.resetPassword({
      body: {
        token,
        newPassword: password,
      },
      headers: await headers(),
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Reset password error:", error);
    
    if (error instanceof APIError) {
      if (error.status === 400) {
        return {
          success: false,
          error: "Invalid or expired reset link. Please request a new one.",
        };
      }
    }

    return {
      success: false,
      error: "Failed to reset password. Please try again.",
    };
  }
}

export async function signOutAction(): Promise<void> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Sign out error:", error);
  }
  
  redirect("/");
}