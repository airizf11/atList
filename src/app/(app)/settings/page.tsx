// alis1f/src/app/(app)/settings/page.tsx
"use client";

import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function GeneralSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your general account preferences and application settings.
        </p>
      </div>
      <div className="bg-card p-6 sm:p-8 rounded-lg shadow-lg text-center">
        <Cog8ToothIcon
          className="mx-auto h-16 w-16 text-primary/70"
          aria-hidden="true"
        />
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          General Settings Coming Soon!
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Here you will be able to manage your profile information, theme
          preferences, and other general application settings.
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
