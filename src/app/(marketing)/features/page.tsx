// atlist1f/src/app/(marketing)/features/page.tsx
import type { Metadata } from "next";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore the powerful features of atList that enhance your livestreaming experience.",
};

const featuresList = [
  {
    name: "Real-time Chat Logging to Discord",
    description:
      "Never miss an important message. All your live chat is automatically archived to your private Discord server, making it easy to review feedback, suggestions, and memorable moments.",
    icon: CheckCircleIcon,
  },
  {
    name: "Customizable Chat Moderation",
    description:
      "Take full control of your chat with your own YouTube account. Set up automated filters, warnings, message deletions, and user timeouts/bans based on keywords or user behavior.",
    icon: CheckCircleIcon,
  },
  {
    name: "Personalized Auto-Replies",
    description:
      "Engage with your viewers даже (even) when you are busy. Configure custom auto-replies for frequently asked questions or specific commands.",
    icon: CheckCircleIcon,
  },
  {
    name: "Scheduled Broadcast Messages",
    description:
      "Keep your audience informed. Schedule automated messages to be sent to your live chat at regular intervals – perfect for reminders, social media plugs, or sponsor shoutouts.",
    icon: CheckCircleIcon,
  },
  {
    name: "User-Friendly Web Interface",
    description:
      "Manage all settings, monitor activity, and configure your preferences through an intuitive and modern web dashboard. No complex setups required.",
    icon: CheckCircleIcon,
  },
  {
    name: "Secure and Private",
    description:
      "atList operates using OAuth 2.0 for secure YouTube account connection. Your data and configurations are yours alone.",
    icon: CheckCircleIcon,
  },
];

export default function FeaturesPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            atList Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need for a Better Stream
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            atList provides a comprehensive suite of tools to help you manage
            your livestreams more effectively and engage with your community
            like never before.
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {featuresList.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon
                      className="h-6 w-6 text-primary-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
