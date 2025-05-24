// atlist1f/src/components/layout/HeaderApp.tsx
"use client";

import { useAuthStore } from "@/store/authStore";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "../ThemeToggleButton";

function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/dashboard/stream-control")) return "Stream Control";
  if (pathname.startsWith("/settings/moderation")) return "Moderation Rules";
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  if (pathname.startsWith("/settings/integrations")) return "Integrations";
  if (pathname.startsWith("/settings")) return "Settings";
  if (pathname.startsWith("/feedback")) return "Feedback";
  // Tambah path lain
  return "atList";
}

export default function HeaderApp() {
  const toggleMobileSidebar = useAuthStore(
    (state) => state.toggleMobileSidebar
  );
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-foreground md:hidden"
        onClick={toggleMobileSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="h-6 w-px bg-muted md:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <ThemeToggleButton />
          {/* Placeholder untuk user menu jika tidak ada di HeaderMarketing */}
          {/* Jika user menu mau di sini juga (selain di HeaderMarketing), kita perlu renderAuthSection lagi */}
        </div>
      </div>
    </header>
  );
}
