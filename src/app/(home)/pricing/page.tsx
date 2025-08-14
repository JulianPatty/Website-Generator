'use client';

import DodoCheckout from "@/components/payment/dodo-checkout";
import DodoPortal from "@/components/payment/dodo-portal";
import { useSession } from "@/lib/auth-client";

export default function Pricing() {
    const { data: session } = useSession();
    
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
                    <p className="text-lg text-foreground/70">Choose the plan that works for you</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Basic Plan */}
                    <div className="border border-foreground/20 rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Basic Plan</h2>
                        <div className="mb-6">
                            <span className="text-4xl font-bold">$9</span>
                            <span className="text-foreground/70">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                                <span className="mr-2">✓</span>
                                <span>Access to basic features</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">✓</span>
                                <span>Up to 10 projects</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">✓</span>
                                <span>Email support</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">✓</span>
                                <span>Basic analytics</span>
                            </li>
                        </ul>
                        <DodoCheckout 
                            slug="basic-plan" 
                            buttonText="Start Basic Plan"
                            className="w-full bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors"
                        />
                    </div>
                    
                    {/* Premium Plan */}
                    <div className="border-2 border-foreground rounded-lg p-8 relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-4 py-1 rounded-full text-sm">
                            Most Popular
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Premium Plan</h2>
                        <div className="mb-6">
                            <span className="text-4xl font-bold">$29</span>
                            <span className="text-foreground/70">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                                <span className="mr-2">✓</span>
                                <span>Everything in Basic</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">✓</span>
                                <span>Unlimited projects</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">✓</span>
                                <span>Priority support</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">✓</span>
                                <span>Advanced analytics</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">✓</span>
                                <span>Custom integrations</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">✓</span>
                                <span>Team collaboration</span>
                            </li>
                        </ul>
                        <DodoCheckout 
                            slug="premium-plan" 
                            buttonText="Start Premium Plan"
                            className="w-full bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors"
                        />
                    </div>
                </div>
                
                {/* Customer Portal Link */}
                {session?.user && (
                    <div className="text-center mt-12">
                        <p className="text-foreground/70 mb-4">Already subscribed?</p>
                        <DodoPortal />
                    </div>
                )}
            </div>
        </div>
    );
}