import { Webhooks } from '@dodopayments/nextjs';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET!,
  
  // Generic handler for all webhook events
  onPayload: async (payload) => {
    console.log('[Dodo Webhook] Received event:', payload.event_type);
    console.log('[Dodo Webhook] Payload:', JSON.stringify(payload, null, 2));
  },
  
  // Payment event handlers
  onPaymentSucceeded: async (payload) => {
    console.log('[Dodo Webhook] Payment succeeded:', payload.business_id);
    // TODO: Update user subscription status in database
    // Example:
    // await prisma.user.update({
    //   where: { email: payload.customer.email },
    //   data: { subscriptionStatus: 'active' }
    // });
  },
  
  onPaymentFailed: async (payload) => {
    console.log('[Dodo Webhook] Payment failed:', payload.business_id);
    // TODO: Handle failed payment (send email, update status, etc.)
  },
  
  onPaymentProcessing: async (payload) => {
    console.log('[Dodo Webhook] Payment processing:', payload.business_id);
  },
  
  onPaymentCancelled: async (payload) => {
    console.log('[Dodo Webhook] Payment cancelled:', payload.business_id);
  },
  
  // Refund event handlers
  onRefundSucceeded: async (payload) => {
    console.log('[Dodo Webhook] Refund succeeded:', payload.business_id);
    // TODO: Update records, send confirmation email
  },
  
  onRefundFailed: async (payload) => {
    console.log('[Dodo Webhook] Refund failed:', payload.business_id);
  },
  
  // Subscription event handlers
  onSubscriptionActive: async (payload) => {
    console.log('[Dodo Webhook] Subscription active:', payload.business_id);
    // TODO: Grant access, update user status
    // Example:
    // await prisma.user.update({
    //   where: { email: payload.customer.email },
    //   data: { 
    //     subscriptionStatus: 'active',
    //     subscriptionId: payload.business_id
    //   }
    // });
  },
  
  onSubscriptionOnHold: async (payload) => {
    console.log('[Dodo Webhook] Subscription on hold:', payload.business_id);
    // TODO: Pause access, notify user
  },
  
  onSubscriptionRenewed: async (payload) => {
    console.log('[Dodo Webhook] Subscription renewed:', payload.business_id);
    // TODO: Extend subscription period
  },
  
  onSubscriptionPlanChanged: async (payload) => {
    console.log('[Dodo Webhook] Subscription plan changed:', payload.business_id);
    // TODO: Update user's plan in database
  },
  
  onSubscriptionCancelled: async (payload) => {
    console.log('[Dodo Webhook] Subscription cancelled:', payload.business_id);
    // TODO: Schedule access removal at end of billing period
    // Example:
    // await prisma.user.update({
    //   where: { email: payload.customer.email },
    //   data: { 
    //     subscriptionStatus: 'cancelled',
    //     subscriptionEndsAt: new Date(payload.subscription.ends_at)
    //   }
    // });
  },
  
  onSubscriptionFailed: async (payload) => {
    console.log('[Dodo Webhook] Subscription failed:', payload.business_id);
    // TODO: Handle failed subscription (retry payment, notify user)
  },
  
  onSubscriptionExpired: async (payload) => {
    console.log('[Dodo Webhook] Subscription expired:', payload.business_id);
    // TODO: Remove access, update status
  },
  
  // Dispute event handlers
  onDisputeOpened: async (payload) => {
    console.log('[Dodo Webhook] Dispute opened:', payload.business_id);
    // TODO: Notify admin, prepare evidence
  },
  
  onDisputeWon: async (payload) => {
    console.log('[Dodo Webhook] Dispute won:', payload.business_id);
  },
  
  onDisputeLost: async (payload) => {
    console.log('[Dodo Webhook] Dispute lost:', payload.business_id);
    // TODO: Handle dispute loss (refund, update records)
  },
  
  // License key event handler
  onLicenseKeyCreated: async (payload) => {
    console.log('[Dodo Webhook] License key created:', payload.business_id);
    // TODO: Store license key, send to customer
  },
});