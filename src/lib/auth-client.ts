import { createAuthClient } from "better-auth/react";
import { dodopaymentsClient } from "@dodopayments/better-auth";
import { passkeyClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [
    dodopaymentsClient(),
    passkeyClient()
  ],
});

 
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  updateUser,
  deleteUser,
  forgetPassword,
  resetPassword,
  // Dodo Payments methods 
  dodopayments,
  // Passkey methods
  passkey,
} = authClient;