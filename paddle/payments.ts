import { referenceFunction } from "inngest";

referenceFunction({
    id: "paddle/payments/create",
    data:{
        userId: string;
        projectId: string;
        amount: number;
        currency: string;
        status: string;
        createdAt: string;
        updatedAt: string;
    }
})

export const createPayment 