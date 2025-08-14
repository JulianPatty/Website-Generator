import { Checkout } from '@dodopayments/nextjs';

// GET handler for static checkout (with query parameters)
export const GET = Checkout({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  returnUrl: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/success` : 'http://localhost:3000/success',
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode',
  type: 'static',
});

// POST handler for dynamic checkout (with JSON body)
export const POST = Checkout({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  returnUrl: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/success` : 'http://localhost:3000/success',
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode',
  type: 'dynamic',
});