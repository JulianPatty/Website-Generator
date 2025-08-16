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
            id: 'pdt_S6ncY3gQPU37eJwU6aMQR',
            title: 'Unity-Basic [Standard]',
            price: 19.99,
            period: '/month',
            description: 'Perfect for individuals and small projects',
            features: [
                '10,000 Usage Credits',
                'Access to basic features',
                'Up to 50 Projects',
                'Dashboard & Analytics',
                'Basic analytics',
                { text: 'Custom integrations', included: true },
                { text: 'Team collaboration', included: true },
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
            id: 'pdt_DB4wXUIpzk9O0RMQRRPX2',
            title: 'Unity-Pro [Business]',
            price: 39.99,
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
            title: 'Legacy-Enterprise [Custom]',
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
        <div className="min-h-screen bg-transparent text-foreground">
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