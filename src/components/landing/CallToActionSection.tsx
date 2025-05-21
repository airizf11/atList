// alis1f/src/components/landing/CallToActionSection.tsx
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function CallToActionSection() {
  return (
    <section id="cta" className="py-16 md:py-24 bg-slate-100 dark:bg-slate-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ui-foreground mb-6">
          Ready to Supercharge Your Streams?
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto">
          Join atList today and take control of your live chat (experience).
        </p>
        <Link
          href={`${BACKEND_URL}/auth/google`}
          className="group inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-white bg-brand-secondary hover:bg-brand-secondary-dark rounded-lg shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary-light"
        >
          Get Started for Free
          <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
