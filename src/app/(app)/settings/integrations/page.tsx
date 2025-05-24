// alis1f/src/app/(app)/settings/integrations/page.tsx
"use client";

import DiscordWebhookForm from "@/components/settings/DiscordWebhookForm";
import { useEffect } from "react";

export default function IntegrationsSettingsPage() {
  useEffect(() => {
    document.title = "Integrations | atList Settings";
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Integrations
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Connect atList with other services to enhance your workflow.
        </p>
      </div>

      <div className="max-w-2xl">
        <DiscordWebhookForm />
      </div>

      {/* bisa tambah integrasi lain */}
      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground">
          Other Integrations (Coming Soon)
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We are working on bringing more integrations to atList!
        </p>
      </div>
    </div>
  );
}
