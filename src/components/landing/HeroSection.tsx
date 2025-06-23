// src/components/landing/HeroSection.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

function CTAButtons() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div className="h-11 w-48 animate-pulse rounded-md bg-muted" />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
      {isAuthenticated ? (
        <Link
          href="/dashboard"
          className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      ) : (
        <Link
          href={`${BACKEND_URL}/auth/google`}
          className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Get Started for Free
        </Link>
      )}
      <Link
        href="#features"
        className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Learn More
      </Link>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="container flex flex-col items-center py-20 text-center md:py-32"
    >
      <h1 className="text-balance text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        Elevate Your Livestreams with{" "}
        <span className="text-primary">atList</span>
      </h1>
      <p className="mt-6 max-w-[750px] text-balance text-lg text-muted-foreground sm:text-xl">
        Seamlessly log chats, moderate like a pro, and engage your audience
        effortlessly. All with your own account, fully customizable.
      </p>
      <div className="mt-10">
        <CTAButtons />
      </div>
    </section>
  );
}
