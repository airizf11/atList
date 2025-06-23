// src/components/layout/AppSidebar.tsx
"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import {
  LayoutDashboard,
  Settings,
  X,
  Atom,
  LogOut,
  SlidersHorizontal,
} from "lucide-react";
import clsx from "clsx";
import { useAuthStore } from "@/store/authStore";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Stream Control",
    href: "/dashboard/stream-control",
    icon: SlidersHorizontal,
    disabled: false,
  },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobileSidebarOpen, setMobileSidebarOpen, userProfile, logout } =
    useAuthStore();

  const handleLogout = () => {
    logout();
    setMobileSidebarOpen(false);
  };

  const sidebarContent = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 pb-4">
      <Link href="/dashboard" className="flex h-16 shrink-0 items-center gap-2">
        <Atom className="h-7 w-7 text-primary" />
        <span className="text-xl font-bold text-foreground">atList</span>
      </Link>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.disabled ? "#" : item.href}
                    onClick={() =>
                      !item.disabled && setMobileSidebarOpen(false)
                    }
                    className={clsx(
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                      item.disabled
                        ? "cursor-not-allowed text-muted-foreground/50"
                        : pathname.startsWith(item.href)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                    aria-disabled={item.disabled}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            {userProfile && (
              <div className="mb-4 flex items-center gap-x-3">
                <Image
                  className="h-9 w-9 rounded-full bg-muted"
                  src={userProfile.avatar_url || "/default-avatar.png"}
                  alt={userProfile.name || "User Avatar"}
                  width={36}
                  height={36}
                  onError={(e) => {
                    e.currentTarget.src = "/default-avatar.png";
                  }}
                />
                <div className="truncate">
                  <p className="text-sm font-semibold text-foreground">
                    {userProfile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {userProfile.email}
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="group -mx-2 flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="h-6 w-6 shrink-0" aria-hidden="true" />
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <>
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
            <div className="fixed inset-0 bg-black/30" />
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
                      <X className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {sidebarContent}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden md:fixed md:inset-y-0 md:z-50 md:flex md:w-64 md:flex-col border-r border-border">
        {sidebarContent}
      </div>
    </>
  );
}
