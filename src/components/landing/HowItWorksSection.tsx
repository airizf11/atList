// src/components/landing/HowItWorksSection.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LinkIcon, PlayCircle, UserPlus, Cog } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Connect Account",
    description:
      "Sign in securely with your Google account to link your YouTube channel.",
  },
  {
    icon: Cog,
    title: "Configure Settings",
    description:
      "Set up your Discord webhook for chat logs and customize your preferences.",
  },
  {
    icon: PlayCircle,
    title: "Start Streaming",
    description:
      "Enter your live stream Video ID in the dashboard and let atList run in the background.",
  },
  {
    icon: LinkIcon,
    title: "Enjoy!",
    description:
      "Focus on your content while atList handles chat logging and moderation seamlessly.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Get Started in Minutes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Setting up atList is quick and straightforward.
          </p>
        </div>
        <div className="relative mt-16">
          {/* Connecting line for desktop */}
          <div className="absolute left-0 top-8 hidden h-0.5 w-full bg-border md:block" />
          <div className="grid gap-y-10 gap-x-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
