/* eslint-disable @typescript-eslint/no-unused-vars */
// alis1f/src/app/(marketing)/page.tsx
import Image from "next/image";
import Link from "next/link";

import HeroClientSection from "@/components/landing/HeroClientSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CallToActionSection from "@/components/landing/CallToActionSection";
// Mungkin TestimonialsSection, PricingTeaserSection, dll.

export default function LandingPage() {
  return (
    <>
      <section
        id="hero"
        className="bg-background text-foreground py-20 md:py-32"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Elevate Your Livestreams with{" "}
            <span className="text-primary">atList</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            Seamlessly log chats, moderate like a pro, and engage your audience
            effortlessly. All with your own account, fully customizable.
          </p>
          <HeroClientSection />
        </div>
      </section>

      <FeaturesSection />

      <HowItWorksSection />

      <CallToActionSection />

      {/* Tambah seksi lain sesuai kebutuhan:
          - Social Proof / Testimonials
          - Brief "About Us" teaser
          - Visual/Demo singkat (gambar atau video)
      */}
    </>
  );
}
