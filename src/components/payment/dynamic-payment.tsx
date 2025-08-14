'use client';

import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";



export default function Payment() {

    const [paddle, setPaddle] = useState<Paddle>();

    useEffect(()=> {
        initializePaddle({
            environment: "sandbox",
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
        }).then((paddle) => setPaddle(paddle));
        
    }, []);

    const handleCheckout = async () => {
        if (!paddle) return alert("Paddle not initialized");

        const response = await fetch("/api/payment");
        const data = await response.json(); 


        paddle.Checkout.open({
           transactionId: data.txn,
           settings: {
            theme: 'dark',
            successUrl: "http://localhost:3000/success",
           },
           items: [{
            priceId: 'pri_01k2kz2pecwbj3zth7z2vjbrhn',
            quantity: 1,
           }],
        });
    }

    return (
        <div>
            <button 
            onClick={handleCheckout}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Proceed to Payment
            </button>
        </div>
    )
    
}