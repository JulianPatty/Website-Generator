"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserControl } from "@/components/user-control";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/theme-toggle";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useAuth();

    return (
        <nav className="p-6 w-full sticky top-0 left-0 right-0 z-50 bg-background border-b border-border">
            <div className="absolute w-full h-full backdrop-blur flex-none transition-colors duration-500 border-b border-gray-500/5 dark:border-gray-300/[0.06] data-[is-opaque=true]:bg-background-light data-[is-opaque=true]:supports-backdrop-blur:bg-background-light/95 data-[is-opaque=true]:dark:bg-background-dark/75 data-[is-opaque=false]:supports-backdrop-blur:bg-background-light/60 data-[is-opaque=false]:dark:bg-transparent">
            <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Image src="/logo.svg" alt="logo" width={28} height={28} className="dark:invert" />
                    <h1 className="text-xl font-semibold pl-2">
                        Setn.ai
                    </h1>
                </Link>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    {!isLoading && (
                        <>
                            {!isAuthenticated ? (
                                <>
                                    <Link href="/sign-in">
                                        <Button variant="ghost" size="sm">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/sign-up">
                                        <Button size="sm">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <UserControl />
                            )}
                        </>
                    )}
                </div>
            </div>
            </div>
        </nav>
    )
}