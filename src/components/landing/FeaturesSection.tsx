// atlist1f/src/components/landing/FeaturesSection.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChatBubbleLeftEllipsisIcon,
  CogIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
// import Image from "next/image";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  imageUrl?: string;
}

const features: Feature[] = [
  {
    icon: ChatBubbleLeftEllipsisIcon,
    title: "Real-time Chat Logging",
    description:
      "Automatically log your YouTube live chat to a designated Discord channel. Never miss a valuable comment or suggestion again.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Customizable Moderation",
    description:
      "Moderate your chat with your own account, just like Nightbot, but with full control. Set up auto-replies, filters, and warnings easily.",
  },
  {
    icon: CogIcon,
    title: "Full Account Control",
    description:
      "Operate everything using your own YouTube account. No need for third-party bot permissions that might compromise your channel.",
  },
  {
    icon: ArrowPathIcon,
    title: "Highly Configurable",
    description:
      "Tailor every aspect of logging and moderation to fit your unique streaming style and community needs through simple configurations (soon via UI!).",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-16 md:py-24 bg-slate-100 dark:bg-slate-800"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ui-foreground mb-4">
            Why Choose <span className="text-brand-primary">atList</span>?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Discover the powerful features designed to make your streaming life
            easier and more engaging.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-ui-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <feature.icon
                className="h-12 w-12 text-brand-primary mb-4"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold text-ui-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
