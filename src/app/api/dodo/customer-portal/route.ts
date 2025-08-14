import { CustomerPortal } from '@dodopayments/nextjs';

// GET handler for customer portal
// Requires ?customer_id=cus_xxx query parameter
export const GET = CustomerPortal({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: process.env.NODE_ENV === 'production' ? 'live_mode' : 'test_mode',
});