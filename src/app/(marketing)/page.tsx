// src/app/(marketing)/page.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function HomePage() {
  return (
    <section className="container flex flex-col items-center gap-6 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-32">
      <h1 className="text-balance text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        Elevate Your Livestreams with{" "}
        <span className="text-primary">atList</span>
      </h1>
      <p className="max-w-[750px] text-balance text-lg text-muted-foreground sm:text-xl">
        Seamlessly log chats, moderate like a pro, and engage your audience
        effortlessly. All with your own account, fully customizable.
      </p>
      <div className="flex w-full items-center justify-center space-x-4">
        <Link
          href={`${BACKEND_URL}/auth/google`}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-11 px-8
                     bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Get Started
        </Link>
        <Link
          href="/features"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-11 px-8
                     border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
