// src/components/layout/HeaderMarketing.tsx
"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Menu as MenuIcon,
  X,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
  Atom,
} from "lucide-react";
import clsx from "clsx";
import { useAuthStore } from "@/store/authStore";
import { ThemeToggleButton } from "../ThemeToggleButton";

const navigation = [
  { name: "Features", href: "/features" },
  { name: "Contact", href: "/contact" },
  // { name: "Pricing", href: "/pricing" },
];

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export function HeaderMarketing() {
  const pathname = usePathname();
  const { isAuthenticated, userProfile, logout, isLoading } = useAuthStore();

  const renderAuthSection = (isMobile: boolean = false) => {
    if (isLoading) {
      return <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />;
    }

    if (isAuthenticated && userProfile) {
      return (
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
            <span className="sr-only">Open user menu</span>
            <Image
              className="h-8 w-8 rounded-full"
              src={userProfile.avatar_url || "/default-avatar.png"}
              alt={userProfile.name || "User Avatar"}
              width={32}
              height={32}
              onError={(e) => {
                e.currentTarget.src = "/default-avatar.png";
              }}
            />
            <span className="hidden sm:inline font-medium text-foreground">
              {userProfile.name?.split(" ")[0]}
            </span>
            <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:inline" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-popover py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/dashboard"
                    className={clsx(
                      "flex w-full items-center px-4 py-2 text-sm",
                      active && "bg-accent"
                    )}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/settings"
                    className={clsx(
                      "flex w-full items-center px-4 py-2 text-sm",
                      active && "bg-accent"
                    )}
                  >
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={clsx(
                      "flex w-full items-center px-4 py-2 text-sm",
                      active && "bg-accent"
                    )}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      );
    }

    return (
      <Link
        href={`${BACKEND_URL}/auth/google`}
        className={clsx(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          isMobile && "w-full"
        )}
      >
        Sign In with Google
      </Link>
    );
  };

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="flex flex-shrink-0 items-center gap-2"
                >
                  <Atom className="h-7 w-7 text-primary" />
                  <span className="text-xl font-bold text-foreground">
                    atList
                  </span>
                </Link>
                <div className="hidden md:ml-10 md:block">
                  <div className="flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6 gap-2">
                  <ThemeToggleButton />
                  {renderAuthSection()}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <ThemeToggleButton />
                <Disclosure.Button className="relative ml-2 inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden border-t border-border">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={clsx(
                    "block rounded-md px-3 py-2 text-base font-medium",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-border pb-3 pt-4">
              <div className="px-2">{renderAuthSection(true)}</div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
