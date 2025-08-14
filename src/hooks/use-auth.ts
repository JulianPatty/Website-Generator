"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth-client";
import type { Session, User } from "@/lib/auth";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const { data, error } = await getSession();
        if (data) {
          setSession(data.session);
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSession();
  }, []);

  return { session, user, isLoading, isAuthenticated: !!session };
}