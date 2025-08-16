import DodoPayments from 'dodopayments';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const {searchParams} = new URL(request.url);
        const productId = searchParams.get("productId") as string;

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
});

  const subscription = await client.subscriptions.create({
    billing: 
        { city: 'SF', country: 'US', state: 'CA', street: '1 Market St', zipcode: '94105' },
    customer: 
        { customer_id: 'customer_123' },
    
    product_id: productId,
    quantity: 1,
    payment_link: true,
    return_url: process.env.NEXT_PUBLIC_APP_URL,
    on_demand: {
    mandate_only: true,
    },
  });

  return NextResponse.json(subscription);
} catch (error) {
    console.error(error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
}
}
