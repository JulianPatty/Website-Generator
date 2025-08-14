'use client';

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

interface DodoPortalProps {
  buttonText?: string;
  className?: string;
}

export default function DodoPortal({ 
  buttonText = "Manage Subscription", 
  className = "bg-background text-foreground border border-foreground/20 px-6 py-3 rounded-lg hover:bg-foreground/5 transition-colors"
}: DodoPortalProps) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handlePortal = async () => {
    if (!session?.user) {
      toast.error("Please sign in to continue");
      return;
    }

    setLoading(true);
    try {
      const { data: customerPortal, error } = await authClient.dodopayments.customer.portal();

      if (error) {
        console.error("Portal error:", error);
        toast.error("Failed to open customer portal");
        return;
      }

      if (customerPortal?.redirect && customerPortal?.url) {
        window.location.href = customerPortal.url;
      }
    } catch (error) {
      console.error("Portal error:", error);
      toast.error("An error occurred opening the portal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePortal}
      disabled={loading}
      className={className}
    >
      {loading ? "Opening..." : buttonText}
    </button>
  );
}