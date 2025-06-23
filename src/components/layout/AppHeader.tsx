// src/components/layout/AppHeader.tsx
"use client";

import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Menu } from "lucide-react";
import { ThemeToggleButton } from "../ThemeToggleButton";

function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  if (pathname.startsWith("/settings")) return "Settings";
  // Tambah path lain nanti
  return "atList";
}

export function AppHeader() {
  const toggleMobileSidebar = useAuthStore(
    (state) => state.toggleMobileSidebar
  );
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background/95 px-4 shadow-sm backdrop-blur-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-foreground md:hidden"
        onClick={toggleMobileSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" />
      </button>

      <div className="h-6 w-px bg-muted-foreground/20 md:hidden" />

      <div className="flex flex-1 items-center justify-between gap-x-4 self-stretch lg:gap-x-6">
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
        <div className="flex items-center gap-x-2">
          {/* Bisa tambah notif or menu lain here */}
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
