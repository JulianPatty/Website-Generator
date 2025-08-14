import Payment from "@/components/payment/payment";

export default function Pricing() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="my-10">
            <h1 className="text-2xl font-bold mb-5">Basic Plan</h1>
            <Payment />
        </div>
        </div>
    )
}