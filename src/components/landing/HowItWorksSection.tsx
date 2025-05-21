/* eslint-disable @typescript-eslint/no-unused-vars */
// alis1f/src/components/landing/HowItWorksSection.tsx
import {
  UserPlusIcon,
  LinkIcon,
  PlayCircleIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";

interface Step {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 1,
    icon: UserPlusIcon,
    title: "Connect Your Account",
    description:
      "Sign in securely with your Google account to link your YouTube channel.",
  },
  {
    id: 2,
    icon: Cog8ToothIcon,
    title: "Configure Settings",
    description:
      "Set up your Discord webhook for chat logs and customize moderation rules to your liking.",
  },
  {
    id: 3,
    icon: PlayCircleIcon,
    title: "Start Your Stream",
    description:
      "Enter your live stream Video ID in atList dashboard and let it run in the background.",
  },
  {
    id: 4,
    icon: LinkIcon,
    title: "Enjoy Enhanced Streaming",
    description:
      "Focus on your content while atList handles chat logging and moderation seamlessly.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-ui-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ui-foreground mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Setting up atList is quick and straightforward. Follow these simple
            steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 -z-10"></div>

          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center relative px-4"
            >
              <div className="relative mb-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-primary text-white shadow-lg">
                  <step.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <div className="absolute -top-2 -right-2 flex items-center justify-center h-8 w-8 rounded-full bg-brand-secondary text-white text-sm font-bold">
                  {step.id}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-ui-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="lg:hidden mt-6 text-slate-400 dark:text-slate-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
