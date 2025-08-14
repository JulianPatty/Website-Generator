import { rateLimiterPrisma } from "rate-limiter-flexible"
 
import { prisma } from "@/lib/db"

const FREE_POINTS = 1000
const FREE_DURATION = 30 * 24 * 60 * 60 // 30 Days
const GENERATION_COST = 250; // 250 Points per Generation

export async function getUsageTracker() {
    const usageTracker = new rateLimiterPrisma({
        storeClient: prisma,
        tableName: "Usage",
        points: FREE_POINTS,
        duration: 30 * 24 * 60 * 60 * 1000,
    })

    return usageTracker
}

export async function consumeCredits(userId: string) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not Authenticated")
    }

    const usageTracker = await getUsageTracker() 
    const result = await usageTracker.consume(userId, GENERATION_COST);
    return result;
}

export async function getUsageStatus(userId: string) {
    const {userId} = await auth();

    if (!userId) {
        throw new Error("User not Authenticated")
    }

    const usageTracker = await getUsageTracker();
    const usage = await usageTracker.get(userId);
    return usage;
}

export async function getUsageByUser(userId: string) {
