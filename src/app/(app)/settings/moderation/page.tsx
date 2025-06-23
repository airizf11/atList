// atlist1f/src/app/(app)/settings/moderation/page.tsx
/* eslint-disable react/no-unescaped-entities */
"use client";

import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect } from "react";

export default function ModerationSettingsPage() {
  useEffect(() => {
    document.title = "Moderation Settings | atList";
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure automated moderation rules for your YouTube live chat.
          Manage keywords, auto-replies, and user actions.
        </p>
      </div>

      {/* Placeholder */}
      <div className="bg-card p-6 sm:p-8 rounded-lg shadow-lg text-center">
        <ShieldExclamationIcon
          className="mx-auto h-16 w-16 text-primary/70"
          aria-hidden="true"
        />
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Moderation Settings Coming Soon!
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We are working hard to bring you powerful and customizable moderation
          tools. You'll be able to set up keyword filters, auto-replies, user
          warnings, and more right here.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Stay tuned for updates!
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

      {/* Contoh Nanti */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold leading-6 text-foreground">
          Keyword Filters
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Automatically delete messages or warn users based on specific
          keywords.
        </p>
        <div className="mt-4 bg-card p-4 rounded-md shadow">
          <p className="text-sm text-muted-foreground italic">
            List of keyword filters will appear here...
          </p>
          <button
            type="button"
            className="mt-2 text-sm font-medium text-primary hover:text-primary/80"
          >
            + Add New Filter
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold leading-6 text-foreground">
          Auto-Replies
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Set up automated responses to common questions or commands.
        </p>
        <div className="mt-4 bg-card p-4 rounded-md shadow">
          <p className="text-sm text-muted-foreground italic">
            List of auto-replies will appear here...
          </p>
          <button
            type="button"
            className="mt-2 text-sm font-medium text-primary hover:text-primary/80"
          >
            + Add New Auto-Reply
          </button>
        </div>
      </div>
    </div>
  );
}
