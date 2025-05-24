// atlist1f/src/app/(app)/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import SidebarApp from "@/components/layout/SidebarApp";
import HeaderApp from "@/components/layout/HeaderApp";

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
    <div className="min-h-screen bg-background">
      <SidebarApp />

      <div className="md:pl-64 flex flex-col flex-1">
        <HeaderApp />
        <main className="flex-1 py-6 md:py-8 px-4 sm:px-6 lg:px-8 bg-muted/30 dark:bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  );
}
