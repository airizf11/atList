// alis1f/src/components/landing/HeroClientSection.tsx
"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function HeroClientSection() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      {isAuthenticated ? (
        <Link
          href="/dashboard"
          className="group inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-brand-primary hover:bg-brand-primary-dark rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-light"
        >
          Go to Dashboard
          <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <Link
          href={`${BACKEND_URL}/auth/google`}
          className="group inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-brand-secondary hover:bg-brand-secondary-dark rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary-light"
        >
          Get Started with Google
          <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
      <Link
        href="#features"
        className="px-8 py-3 text-base font-medium text-brand-primary dark:text-brand-primary-light hover:text-brand-primary-dark dark:hover:text-brand-primary rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary-light"
      >
        Learn More
      </Link>
    </div>
  );
}
