"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Settings, HelpCircle, CreditCard } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Props {
  showName?: boolean;
}

export const UserControl = ({ showName = true }: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    toast.loading("Signing you out...");
    
    try {
      await signOut();
      toast.dismiss();
      toast.success("Signed out successfully", {
        description: "Come back soon!",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.dismiss();
      console.error("Failed to sign out:", error);
      toast.error("Failed to sign out", {
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || user.email?.[0]?.toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-1 gap-2">
          <Avatar className="h-3 w-3">
            <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          {showName && user.name && (
            <span className="text-sm font-medium">{user.name}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/settings">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/pricing">
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
        </Link>
         
        <Link href="/settings">
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
        </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
        <HelpCircle className="mr-2 h-4 w-4" />
          <Link href="/help">
            <span> Help </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} disabled={isLoading}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoading ? "Signing out..." : "Sign out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};