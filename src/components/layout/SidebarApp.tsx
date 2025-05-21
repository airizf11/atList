// alis1f/src/components/layout/SidebarApp.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Squares2X2Icon, // Dashboard
  Cog6ToothIcon, // Settings
  ChatBubbleLeftRightIcon, // Chat Logging (Placeholder)
  ShieldCheckIcon, // Moderation (Placeholder)
  ArrowLeftOnRectangleIcon, // Sign out
  LifebuoyIcon, // Feedback/Support
  InformationCircleIcon, // Connections (Placeholder)
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
}

const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Squares2X2Icon },
  {
    href: "/dashboard/stream-control",
    label: "Stream Control",
    icon: ChatBubbleLeftRightIcon,
    disabled: false,
  }, // Contoh sub-halaman
  {
    href: "/dashboard/moderation",
    label: "Moderation Rules",
    icon: ShieldCheckIcon,
    disabled: false,
  }, // Contoh
];

const accountNavItems: NavItem[] = [
  { href: "/settings", label: "Settings", icon: Cog6ToothIcon },
  {
    href: "/connections",
    label: "Connections",
    icon: InformationCircleIcon,
    disabled: true,
  }, // Placeholder
  { href: "/feedback", label: "Feedback", icon: LifebuoyIcon, disabled: false }, // Mengarah ke page contact/feedback
];

export default function SidebarApp() {
  const pathname = usePathname();
  const { userProfile, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-card border-r border-border flex flex-col">
      <div className="h-16 flex items-center justify-center px-4 border-b border-border">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <svg
            className="h-7 w-auto text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          <span className="font-bold text-lg text-foreground">atList</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {mainNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.disabled ? "#" : item.href}
            className={`
              group flex items-center px-3 py-2.5 text-sm font-medium rounded-md
              transition-colors duration-150 ease-in-out
              ${
                item.disabled
                  ? "text-muted-foreground/50 cursor-not-allowed"
                  : pathname === item.href ||
                    (pathname.startsWith(item.href) &&
                      item.href !== "/dashboard") // Untuk active state sub-halaman
                  ? "bg-primary/10 text-primary hover:bg-primary/15"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }
            `}
            aria-disabled={item.disabled}
            onClick={(e) => item.disabled && e.preventDefault()}
          >
            <item.icon
              className="mr-3 flex-shrink-0 h-5 w-5"
              aria-hidden="true"
            />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-border space-y-1">
        {accountNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.disabled ? "#" : item.href}
            className={`
              group flex items-center px-3 py-2.5 text-sm font-medium rounded-md
              transition-colors duration-150 ease-in-out
              ${
                item.disabled
                  ? "text-muted-foreground/50 cursor-not-allowed"
                  : pathname === item.href
                  ? "bg-primary/10 text-primary hover:bg-primary/15"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }
            `}
            aria-disabled={item.disabled}
            onClick={(e) => item.disabled && e.preventDefault()}
          >
            <item.icon
              className="mr-3 flex-shrink-0 h-5 w-5"
              aria-hidden="true"
            />
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="group flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150 ease-in-out"
        >
          <ArrowLeftOnRectangleIcon
            className="mr-3 flex-shrink-0 h-5 w-5"
            aria-hidden="true"
          />
          Sign Out
        </button>
      </div>

      {userProfile && (
        <div className="px-4 py-3 border-t border-border flex items-center space-x-3">
          <Image
            src={userProfile.avatar_url || "/default-avatar.png"}
            alt="User Avatar"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-avatar.png";
            }}
          />
          <div>
            <p className="text-sm font-medium text-foreground truncate">
              {userProfile.name || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {userProfile.email}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
