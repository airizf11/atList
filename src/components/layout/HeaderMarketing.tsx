// alis1f/src/components/layout/HeaderMarketing.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import ThemeToggleButton from "../ThemeToggleButton";
import { Fragment, useState, useEffect } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import {
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function HeaderMarketing() {
  const { isAuthenticated, userProfile, logout } = useAuthStore();
  const authLoading = useAuthStore((state) => state.isLoading);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const renderAuthSection = (isMobile = false) => {
    if (!mounted || authLoading) {
      return (
        <div
          className={`rounded-md animate-pulse ${
            isMobile
              ? "w-full h-10 bg-slate-300 dark:bg-slate-700 my-1"
              : "w-28 h-10 bg-slate-200 dark:bg-slate-700"
          }`}
        ></div>
      );
    }
    if (isAuthenticated && userProfile) {
      if (isMobile) {
        return (
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
            <div className="flex items-center px-3 mb-3">
              <div className="flex-shrink-0">
                <Image
                  src={userProfile.avatar_url || "/default-avatar.png"}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/default-avatar.png";
                  }}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-slate-800 dark:text-slate-100">
                  {userProfile.name}
                </div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {userProfile.email}
                </div>
              </div>
            </div>
            <Disclosure.Button
              as={Link}
              href="/dashboard"
              className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100"
            >
              Dashboard
            </Disclosure.Button>
            <Disclosure.Button
              as={Link}
              href="/settings"
              className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100"
            >
              Settings
            </Disclosure.Button>
            <Disclosure.Button
              as="button"
              onClick={handleLogout}
              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100"
            >
              Sign out
            </Disclosure.Button>
          </div>
        );
      }
      return (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
              <Image
                src={userProfile.avatar_url || "/default-avatar.png"}
                alt={userProfile.name || "User"}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-avatar.png";
                }}
              />
              {userProfile.name?.split(" ")[0] || "Account"}
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {userProfile.name || "User"}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {userProfile.email}
                  </p>
                </div>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/dashboard"
                      className={classNames(
                        active ? "bg-slate-100 dark:bg-slate-700" : "",
                        "group flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300"
                      )}
                    >
                      {" "}
                      <Squares2X2Icon className="mr-3 h-5 w-5 text-slate-400 dark:text-slate-500" />{" "}
                      Dashboard{" "}
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/settings"
                      className={classNames(
                        active ? "bg-slate-100 dark:bg-slate-700" : "",
                        "group flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300"
                      )}
                    >
                      {" "}
                      <Cog6ToothIcon className="mr-3 h-5 w-5 text-slate-400 dark:text-slate-500" />{" "}
                      Settings{" "}
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={classNames(
                        active ? "bg-slate-100 dark:bg-slate-700" : "",
                        "group flex w-full items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300"
                      )}
                    >
                      {" "}
                      <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-slate-400 dark:text-slate-500" />{" "}
                      Sign out{" "}
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      );
    }
    return (
      <Link
        href={`${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"
        }/auth/google`}
        className={`px-4 py-2 text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-dark rounded-md shadow-sm transition-colors ${
          isMobile ? "w-full text-center block my-1" : ""
        }`}
      >
        Sign in with Google
      </Link>
    );
  };

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 w-full bg-ui-background/80 dark:bg-ui-background/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-700/50"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/" className="flex items-center space-x-2">
                    <svg
                      className="h-8 w-auto text-brand-primary"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                    <span className="font-bold text-xl text-ui-foreground">
                      atList
                    </span>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={classNames(
                          pathname === link.href
                            ? "text-brand-primary font-semibold border-b-2 border-brand-primary"
                            : "text-slate-600 dark:text-slate-300 hover:text-ui-foreground",
                          "px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        )}
                        aria-current={
                          pathname === link.href ? "page" : undefined
                        }
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-3">
                <ThemeToggleButton />
                {renderAuthSection(false)}
              </div>
              <div className="-mr-2 flex md:hidden">
                <ThemeToggleButton />
                <Disclosure.Button className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-slate-400 dark:text-slate-500 hover:text-ui-foreground hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Disclosure.Panel className="md:hidden border-t border-slate-200 dark:border-slate-700">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <Disclosure.Button
                    key={link.href}
                    as={Link}
                    href={link.href}
                    className={classNames(
                      pathname === link.href
                        ? "bg-indigo-50 dark:bg-slate-700 text-brand-primary"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-ui-foreground",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pb-3 px-2">{renderAuthSection(true)}</div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
