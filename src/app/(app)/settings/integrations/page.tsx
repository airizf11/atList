// src/app/(app)/settings/integrations/page.tsx
import { DiscordWebhookForm } from "@/components/settings/DiscordWebhookForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integrations",
};

export default function IntegrationsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Discord Integration</h3>
        <p className="text-sm text-muted-foreground">
          Connect atList to a Discord channel for real-time chat logging.
        </p>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <DiscordWebhookForm />
        </div>
      </div>
    </section>
  );
}
