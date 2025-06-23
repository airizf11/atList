// src/components/landing/CallToActionSection.tsx
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export function CallToActionSection() {
  return (
    <section id="cta" className="w-full bg-muted/50 py-20 md:py-28">
      <div className="container flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Ready to Supercharge Your Streams?
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Join atList today and take full control of your live chat experience.
          It's free to get started.
        </p>
        <div className="mt-8">
          <Link
            href={`${BACKEND_URL}/auth/google`}
            className="group inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Get Started for Free
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
