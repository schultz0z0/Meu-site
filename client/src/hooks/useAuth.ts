import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export interface AuthUser {
  id: string;
  username: string;
}

export function useAuth() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setLocation("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return { user, loading, checkAuth, logout };
}
