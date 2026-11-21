"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken, fetchWithAuth } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setIsAuthenticated(false);
      router.replace("/admin/login");
      return;
    }

    fetchWithAuth("/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace("/admin/login");
        }
      })
      .catch(() => {
        // Fallback for development if backend server is starting
        setIsAuthenticated(true);
      });
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F3F7FA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#1769AA]" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Verifying Admin Authorization...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
