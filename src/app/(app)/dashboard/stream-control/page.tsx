// src/app/(app)/dashboard/stream-control/page.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useStreamControlStore } from "@/store/streamControlStore";
import { StreamControlForm } from "@/components/dashboard/StreamControlForm";
import { SendMessageForm } from "@/components/dashboard/SendMessageForm";

function CurrentlyMonitoringInfo() {
  const {
    isCurrentlyMonitoring,
    currentMonitoringVideoId,
    liveChatId,
    startedAt,
  } = useStreamControlStore();

  if (!isCurrentlyMonitoring) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="text-lg font-semibold">Active Session</h3>
      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Video ID:</span>{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">
            {currentMonitoringVideoId}
          </code>
        </p>
        <p>
          <span className="font-medium text-foreground">Status:</span>{" "}
          <span className="text-green-600 dark:text-green-400">Active</span>
        </p>
        {startedAt && (
          <p>
            <span className="font-medium text-foreground">Started:</span>{" "}
            {new Date(startedAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default function StreamControlPage() {
  const { alisApiToken, isAuthenticated } = useAuthStore();
  const { checkActiveMonitoring } = useStreamControlStore();

  useEffect(() => {
    if (isAuthenticated && alisApiToken) {
      checkActiveMonitoring(alisApiToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, alisApiToken]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stream Control</h1>
        <p className="text-muted-foreground">
          Manage your YouTube live stream monitoring session.
        </p>
      </div>

      <StreamControlForm />

      <CurrentlyMonitoringInfo />

      <SendMessageForm />
    </div>
  );
}
