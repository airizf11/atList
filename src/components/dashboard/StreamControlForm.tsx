/* eslint-disable @typescript-eslint/no-unused-vars */
// atlist1f/src/components/dashboard/StreamControlForm.tsx
"use client";

import { useState, FormEvent, useEffect } from "react";
import { useStreamControlStore } from "@/store/streamControlStore";
import {
  PlayIcon,
  StopIcon,
  InformationCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

interface StreamControlFormProps {
  apiToken: string | null;
}

export default function StreamControlForm({
  apiToken,
}: StreamControlFormProps) {
  const {
    currentMonitoringVideoId,
    isCurrentlyMonitoring,
    isLoadingAction,
    statusMessage,
    errorMessage,
    startMonitoring,
    stopMonitoring,
    clearMessages,
  } = useStreamControlStore();

  const [localVideoId, setLocalVideoId] = useState("");

  useEffect(() => {
    if (isCurrentlyMonitoring && currentMonitoringVideoId) {
      setLocalVideoId(currentMonitoringVideoId);
    }
  }, [isCurrentlyMonitoring, currentMonitoringVideoId]);

  const handleStart = async () => {
    if (!apiToken) return;
    await startMonitoring(localVideoId, apiToken);
  };

  const handleStop = async () => {
    if (!apiToken || !currentMonitoringVideoId) return;
    await stopMonitoring(currentMonitoringVideoId, apiToken);
    setLocalVideoId("");
  };

  useEffect(() => {
    return () => {
      clearMessages();
    };
  }, [clearMessages]);

  return (
    <div className="bg-card p-6 sm:p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-foreground mb-1">
        Stream Control
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Enter the Video ID of your YouTube live stream to begin.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div>
          <label
            htmlFor="videoId"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            YouTube Live Video ID
          </label>
          <div className="relative">
            <input
              type="text"
              name="videoId"
              id="videoId"
              className="block w-full rounded-md border-0 py-2.5 px-3.5 text-foreground bg-background ring-1 ring-inset ring-input placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm read-only:bg-muted/50 read-only:cursor-not-allowed"
              placeholder="e.g., jNQXAC9IVRw"
              value={localVideoId}
              onChange={(e) => setLocalVideoId(e.target.value)}
              readOnly={isCurrentlyMonitoring || isLoadingAction}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <InformationCircleIcon className="h-5 w-5 text-muted-foreground/70" />
            </div>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Example: For URL{" "}
            <code>https://www.youtube.com/watch?v=dQw4w9WgXcQ</code>, ID is{" "}
            <code>dQw4w9WgXcQ</code>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {!isCurrentlyMonitoring ? (
            <button
              type="button"
              onClick={handleStart}
              disabled={
                !localVideoId.trim() || isLoadingAction || isCurrentlyMonitoring
              }
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoadingAction ? (
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <PlayIcon className="h-5 w-5 mr-2" />
              )}
              {isLoadingAction ? "Starting..." : "Start Monitoring"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStop}
              disabled={isLoadingAction}
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-destructive hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoadingAction ? (
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <StopIcon className="h-5 w-5 mr-2" />
              )}
              {isLoadingAction ? "Stopping..." : "Stop Monitoring"}
            </button>
          )}
        </div>
      </form>

      {(statusMessage || errorMessage) && (
        <div className="mt-6 p-3 rounded-md text-sm bg-muted/80 border">
          {statusMessage && (
            <p className="text-green-600 dark:text-green-400">
              {statusMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-destructive dark:text-red-400">{errorMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}
