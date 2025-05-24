// atlist1f/src/components/layout/SidebarApp.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Squares2X2Icon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  ArrowLeftOnRectangleIcon,
  LifebuoyIcon,
  PuzzlePieceIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

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
  },
  {
    href: "/settings/moderation",
    label: "Moderation Rules",
    icon: ShieldCheckIcon,
  },
  {
    href: "/settings/integrations",
    label: "Integrations",
    icon: PuzzlePieceIcon,
  },
];

const accountNavItems: NavItem[] = [
  { href: "/settings", label: "General Settings", icon: Cog6ToothIcon },
  { href: "/feedback", label: "Feedback", icon: LifebuoyIcon },
];

export default function SidebarApp() {
  const pathname = usePathname();
  const { userProfile, logout } = useAuthStore();
  const isMobileSidebarOpen = useAuthStore(
    (state) => state.isMobileSidebarOpen
  );
  const setMobileSidebarOpen = useAuthStore(
    (state) => state.setMobileSidebarOpen
  );

  const handleLogout = async () => {
    await logout();
    setMobileSidebarOpen(false);
  };

  const closeSidebar = () => setMobileSidebarOpen(false);

  const navigationContent = (
    <>
      <div className="h-16 flex items-center justify-center px-4 border-b border-border shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center space-x-2"
          onClick={closeSidebar}
        >
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
            onClick={() => {
              if (!item.disabled) closeSidebar();
            }}
            className={`
              group flex items-center px-3 py-2.5 text-sm font-medium rounded-md
              transition-colors duration-150 ease-in-out
              ${
                item.disabled
                  ? "text-muted-foreground/50 cursor-not-allowed"
                  : pathname === item.href ||
                    (pathname.startsWith(item.href) &&
                      item.href !== "/dashboard")
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }
            `}
            aria-disabled={item.disabled}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            <item.icon
              className="mr-3 flex-shrink-0 h-5 w-5"
              aria-hidden="true"
            />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-border space-y-1 shrink-0">
        {accountNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.disabled ? "#" : item.href}
            onClick={() => {
              if (!item.disabled) closeSidebar();
            }}
            className={`
              group flex items-center px-3 py-2.5 text-sm font-medium rounded-md
              transition-colors duration-150 ease-in-out
              ${
                item.disabled
                  ? "text-muted-foreground/50 cursor-not-allowed"
                  : pathname === item.href
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }
            `}
            aria-disabled={item.disabled}
            aria-current={pathname === item.href ? "page" : undefined}
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
        <div className="px-4 py-3 border-t border-border flex items-center space-x-3 shrink-0">
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
    </>
  );

  return (
    <>
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-card border-r border-border">
        {navigationContent}
      </aside>

      <Transition.Root show={isMobileSidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 md:hidden"
          onClose={setMobileSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setMobileSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card ring-1 ring-black/10 dark:ring-white/10">
                  {navigationContent}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
