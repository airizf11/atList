/* eslint-disable @typescript-eslint/no-unused-vars */
// atlist1f/src/app/(app)/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useStreamControlStore } from "@/store/streamControlStore";
import StreamControlForm from "@/components/dashboard/StreamControlForm";
// import CurrentlyMonitoringCard from '@/components/dashboard/CurrentlyMonitoringCard'; // Akan kita buat

function CurrentlyMonitoringInfo() {
  const {
    isCurrentlyMonitoring,
    currentMonitoringVideoId,
    liveChatId,
    startedAt,
  } = useStreamControlStore();

  if (!isCurrentlyMonitoring || !currentMonitoringVideoId) {
    return null;
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
      {/* Di sini bisa tambahkan log sederhana dari chat yang masuk via WebSocket nanti */}
    </div>
  );
}

export default function DashboardPage() {
  const { userProfile, alisApiToken, isAuthenticated } = useAuthStore();
  const { checkActiveMonitoring, isCurrentlyMonitoring } =
    useStreamControlStore();

  useEffect(() => {
    if (isAuthenticated && alisApiToken) {
      checkActiveMonitoring(alisApiToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, alisApiToken]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Welcome back, {userProfile?.name?.split(" ")[0] || "Streamer"}!
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Control your YouTube live stream monitoring and moderation from here.
        </p>
      </div>

      <StreamControlForm apiToken={alisApiToken} />

      <CurrentlyMonitoringInfo />

      {/* <DashboardSummaryWidgets /> */}
    </div>
  );
}
