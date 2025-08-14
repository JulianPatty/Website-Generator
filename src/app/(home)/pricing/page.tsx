'use client';

import DodoCheckout from "@/components/payment/dodo-checkout";
import DodoPortal from "@/components/payment/dodo-portal";
import { PricingTable } from "@/components/pricing/pricing-table";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";

export default function Pricing() {
    const { data: session } = useSession();
    
    const pricingPlans = [
        {
            id: 'basic',
            title: 'Basic Plan',
            price: 9,
            period: '/month',
            description: 'Perfect for individuals and small projects',
            features: [
                'Access to basic features',
                'Up to 10 projects',
                'Email support',
                'Basic analytics',
                { text: 'Custom integrations', included: false },
                { text: 'Team collaboration', included: false },
            ],
            actionButton: (
                <DodoCheckout 
                    slug="basic-plan" 
                    buttonText="Start Basic Plan"
                    className="w-full"
                />
            ),
        },
        {
            id: 'premium',
            title: 'Premium Plan',
            price: 29,
            period: '/month',
            description: 'Best for growing teams and businesses',
            features: [
                'Everything in Basic',
                'Unlimited projects',
                'Priority support',
                'Advanced analytics',
                'Custom integrations',
                'Team collaboration',
            ],
            highlighted: true,
            actionButton: (
                <DodoCheckout 
                    slug="premium-plan" 
                    buttonText="Start Premium Plan"
                    className="w-full"
                />
            ),
        },
        {
            id: 'enterprise',
            title: 'Enterprise',
            price: 'Custom',
            period: '',
            description: 'Tailored solutions for large organizations',
            features: [
                'Everything in Premium',
                'Dedicated support team',
                'Custom contract',
                'SLA guarantee',
                'On-premise deployment option',
                'Advanced security features',
            ],
            actionButton: (
                <Button className="w-full" variant="outline">
                    Contact Sales
                </Button>
            ),
        },
    ];
    
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-16">
                <PricingTable
                    title="Simple, Transparent Pricing"
                    subtitle="Choose the plan that works for you"
                    plans={pricingPlans}
                    columns={3}
                    className="max-w-6xl mx-auto"
                />
                
                {/* Customer Portal Link */}
                {session?.user && (
                    <div className="text-center mt-12">
                        <p className="text-muted-foreground mb-4">Already subscribed?</p>
                        <DodoPortal />
                    </div>
                )}
            </div>
        </div>
    );
}