// src/components/dashboard/StreamControlForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useStreamControlStore } from "@/store/streamControlStore";
import { useAuthStore } from "@/store/authStore";
import { Play, StopCircle, Loader2 } from "lucide-react";

export function StreamControlForm() {
  const { alisApiToken } = useAuthStore();
  const {
    currentMonitoringVideoId,
    isCurrentlyMonitoring,
    isLoadingAction,
    errorMessage,
    startMonitoring,
    stopMonitoring,
    clearMessages,
  } = useStreamControlStore();

  const [localVideoId, setLocalVideoId] = useState("");

  useEffect(() => {
    if (isCurrentlyMonitoring && currentMonitoringVideoId) {
      setLocalVideoId(currentMonitoringVideoId);
    } else {
      setLocalVideoId("");
    }
  }, [isCurrentlyMonitoring, currentMonitoringVideoId]);

  useEffect(() => {
    return () => {
      clearMessages();
    };
  }, [clearMessages]);

  const handleStart = () => {
    if (alisApiToken) {
      startMonitoring(localVideoId, alisApiToken);
    }
  };

  const handleStop = () => {
    if (alisApiToken && currentMonitoringVideoId) {
      stopMonitoring(currentMonitoringVideoId, alisApiToken);
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="text-lg font-semibold">Stream Control</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-4">
        Enter a YouTube Video ID to start or stop monitoring.
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="e.g., jNQXAC9IVRw"
          value={localVideoId}
          onChange={(e) => setLocalVideoId(e.target.value)}
          readOnly={isCurrentlyMonitoring || isLoadingAction}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {!isCurrentlyMonitoring ? (
          <button
            onClick={handleStart}
            disabled={!localVideoId.trim() || isLoadingAction}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoadingAction ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            Start
          </button>
        ) : (
          <button
            onClick={handleStop}
            disabled={isLoadingAction}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
          >
            {isLoadingAction ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <StopCircle className="mr-2 h-4 w-4" />
            )}
            Stop
          </button>
        )}
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
}
