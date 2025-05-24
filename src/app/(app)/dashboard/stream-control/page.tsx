// atlist1f/src/app/(app)/dashboard/stream-control/page.tsx
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useStreamControlStore } from "@/store/streamControlStore";
import StreamControlForm from "@/components/dashboard/StreamControlForm";

function CurrentlyMonitoringInfo() {
  const {
    isCurrentlyMonitoring,
    currentMonitoringVideoId,
    liveChatId,
    startedAt,
  } = useStreamControlStore();

  if (!isCurrentlyMonitoring || !currentMonitoringVideoId) {
    return (
      <div className="mt-8 p-6 bg-card rounded-lg shadow text-center">
        <p className="text-muted-foreground">
          No stream is currently being monitored.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Start monitoring a stream using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-lg font-semibold text-foreground">
        Currently Monitoring
      </h3>
      <div className="mt-2 space-y-1 text-sm">
        <p>
          Video ID:{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">
            {currentMonitoringVideoId}
          </code>
        </p>
        {liveChatId && (
          <p>
            Live Chat ID:{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">
              {liveChatId}
            </code>
          </p>
        )}
        {startedAt && (
          <p>
            Started:{" "}
            <span className="text-muted-foreground">
              {new Date(startedAt).toLocaleString()}
            </span>
          </p>
        )}
        <p className="text-green-600 dark:text-green-400">Status: Active</p>
      </div>
      {/* Bisa tambah log chat masuk via WebSocket nanti */}
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
    <div className="space-y-8">
      <div>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your active YouTube live stream monitoring here. Input the
          Video ID to start or stop.
        </p>
      </div>

      <StreamControlForm apiToken={alisApiToken} />

      <CurrentlyMonitoringInfo />
    </div>
  );
}
