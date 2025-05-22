// atlist1f/src/app/(app)/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import SidebarApp from "@/components/layout/SidebarApp";
// import HeaderApp from '@/components/layout/HeaderApp'; // Opsional

function AppLoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-background">
      <p className="text-xl text-foreground">Loading application...</p>
      {/* Bisa tambah spinner */}
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isAuthenticated,
    isLoading: authIsLoading,
    userProfile,
  } = useAuthStore();

  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);

  useEffect(() => {
    if (!authIsLoading) {
      setIsAuthCheckComplete(true);
      if (!isAuthenticated) {
        const redirectTo =
          pathname !== "/" ? `?redirect=${encodeURIComponent(pathname)}` : "";
        router.replace(`/${redirectTo}`);
      }
    }
  }, [isAuthenticated, authIsLoading, router, pathname]);

  if (!isAuthCheckComplete || (authIsLoading && !userProfile)) {
    return <AppLoadingScreen />;
  }

  if (!isAuthenticated) {
    return <AppLoadingScreen />; // Atau "Unauthorized"
  }

  return (
    <div className="flex h-screen bg-background">
      <SidebarApp />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/40 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
