// src/components/landing/FeaturesSection.tsx
import { ShieldCheck, MessageSquareQuote, Cog, Repeat } from "lucide-react";

const featureList = [
  {
    icon: MessageSquareQuote,
    title: "Real-time Chat Logging",
    description:
      "Automatically log your YouTube live chat to a Discord channel. Never miss a valuable comment or suggestion.",
  },
  {
    icon: ShieldCheck,
    title: "Customizable Moderation",
    description:
      "Moderate your chat with your own account. Set up auto-replies, filters, and warnings easily (coming soon).",
  },
  {
    icon: Cog,
    title: "Full Account Control",
    description:
      "Operate everything using your own YouTube account. No third-party bot permissions that might compromise your channel.",
  },
  {
    icon: Repeat,
    title: "Highly Configurable",
    description:
      "Tailor every aspect to fit your unique streaming style and community needs through a simple and intuitive UI.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="w-full bg-muted/50 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why Choose atList?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the powerful features designed to make your streaming life
            easier and more engaging.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featureList.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
