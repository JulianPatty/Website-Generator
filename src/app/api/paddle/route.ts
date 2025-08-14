import { Environment, Paddle } from "@paddle/paddle-node-sdk";

const paddle = new Paddle(process.env.PADDLE_API_KEY, {
    environment: Environment.sandbox,
})

export async function GET(req: Request) {
    const txn = await paddle.transactions.create({
        items: [{
            quantity: 1,
            price: { 
                name: "Basic Plan",
                description: "Basic Plan",
                unitPrice: {
                    currencyCode: "USD",
                    amount: "2000",
                },
                product: {
                    name: "Basic Plan",
                    description: "Basic Plan",
                    taxCategory: "standard",
                }
            }
        }]
    })

    }

