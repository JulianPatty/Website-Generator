'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
    const router = useRouter();
    
    useEffect(() => {
        // Optionally redirect to dashboard after a delay
        const timer = setTimeout(() => {
            router.push('/');
        }, 5000);
        
        return () => clearTimeout(timer);
    }, [router]);
    
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                    <p className="text-foreground/70">
                        Thank you for your subscription. You now have access to all features.
                    </p>
                </div>
                
                <div className="space-y-4">
                    <Link 
                        href="/"
                        className="block bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors"
                    >
                        Go to Dashboard
                    </Link>
                    <Link 
                        href="/pricing"
                        className="block text-foreground/70 hover:text-foreground transition-colors"
                    >
                        Manage Subscription
                    </Link>
                </div>
                
                <p className="text-sm text-foreground/50 mt-8">
                    You will be redirected to the dashboard in 5 seconds...
                </p>
            </div>
        </div>
    );
}