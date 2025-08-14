'use client';

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

interface DodoCheckoutProps {
  slug: string; // Changed from priceId to slug
  buttonText?: string;
  className?: string;
}

export default function DodoCheckout({ 
  slug, 
  buttonText = "Subscribe", 
  className = "bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors"
}: DodoCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleCheckout = async () => {
    if (!session?.user) {
      toast.error("Please sign in to continue");
      return;
    }

    setLoading(true);
    try {
      const { data: checkout, error } = await authClient.dodopayments.checkout({
        slug, // Use the slug from configuration
        customer: {
          email: session.user.email!,
          name: session.user.name || undefined,
        },
      });

      if (error) {
        console.error("Checkout error:", error);
        toast.error("Failed to create checkout session");
        return;
      }

      if (checkout?.url) {
        window.location.href = checkout.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
    >
      {loading ? "Processing..." : buttonText}
    </button>
  );
}