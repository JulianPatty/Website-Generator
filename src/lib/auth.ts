import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";
import { dodopayments, checkout, portal, webhooks } from "@dodopayments/better-auth";
import { DodoPayments } from "dodopayments";

const prisma = new PrismaClient();

// Initialize Dodo Payments client
export const dodoPayments = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode',
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128
  },
  socialProviders: {
    google: {
      prompt: "select_account", 
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5 // 5 minutes
    }
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],
  plugins: [
    dodopayments({
      client: dodoPayments,
      createCustomerOnSignUp: true,
      use: [
        // Checkout plugin for payment processing
        checkout({
          products: [
            {
              productId: "pdt_basic_monthly", // Replace with your actual product ID from Dodo Payments
              slug: "basic-plan",
            },
            {
              productId: "pdt_premium_monthly", // Replace with your actual product ID from Dodo Payments
              slug: "premium-plan",
            }
          ],
          successUrl: "/success",
          authenticatedUsersOnly: true,
        }),
        
        // Portal plugin for customer self-service
        portal(),
        
        // Webhooks plugin for real-time events
        webhooks({
          webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET!,
          onPayload: async (payload) => {
            console.log("Received webhook:", payload.type);
          },
          onPaymentSucceeded: async (payload) => {
            console.log("Payment succeeded:", payload);
            // Add your business logic here
          },
          onPaymentFailed: async (payload) => {
            console.log("Payment failed:", payload);
            // Handle failed payments
          },
          onSubscriptionActive: async (payload) => {
            console.log("Subscription active:", payload);
            // Update user subscription status
          },
          onSubscriptionCancelled: async (payload) => {
            console.log("Subscription cancelled:", payload);
            // Handle subscription cancellation
          },
        }),
      ],
    })
  ]
});

export type Session = typeof auth.$Infer.Session;

export type User = typeof auth.$Infer.Session.user;