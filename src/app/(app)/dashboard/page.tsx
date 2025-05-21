// alis1f/src/app/(app)/dashboard/page.tsx
"use client";

import { useState, FormEvent } from "react";
import {
  PlayIcon,
  StopIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const { userProfile } = useAuthStore();
  const [videoId, setVideoId] = useState("");
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoId.trim()) {
      setStatusMessage("Please enter a valid YouTube Video ID.");
      return;
    }

    setIsMonitoring(!isMonitoring);
    if (!isMonitoring) {
      setStatusMessage(
        `Starting monitoring for Video ID: ${videoId}... (Backend logic TBD)`
      );
      // TODO: Panggil API backend untuk memulai monitoring
      // Contoh: await fetch('/api/stream/start', { method: 'POST', body: JSON.stringify({ videoId }) });
    } else {
      setStatusMessage("Stopping monitoring... (Backend logic TBD)");
      // TODO: Panggil API backend untuk menghentikan monitoring
      // Contoh: await fetch('/api/stream/stop', { method: 'POST' });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Welcome back, {userProfile?.name?.split(" ")[0] || "Streamer"}!
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your livestreams and moderation settings here.
        </p>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Stream Control
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="videoId"
              className="block text-sm font-medium text-foreground mb-1"
            >
              YouTube Live Video ID
            </label>
            <div className="relative">
              <input
                type="text"
                name="videoId"
                id="videoId"
                className="block w-full rounded-md border-0 py-2.5 px-3.5 text-foreground bg-background ring-1 ring-inset ring-input placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                placeholder="e.g., jNQXAC9IVRw"
                value={videoId}
                onChange={(e) => {
                  setVideoId(e.target.value);
                  if (statusMessage) setStatusMessage("");
                }}
                disabled={isMonitoring}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <InformationCircleIcon
                  className="h-5 w-5 text-muted-foreground/70 cursor-help"
                  title="Find the Video ID in your YouTube stream URL (e.g., youtube.com/watch?v=VIDEO_ID)"
                />
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Enter the ID of the YouTube video that is currently live or
              scheduled.
            </p>
          </div>

          <button
            type="submit"
            disabled={!videoId.trim()}
            className={`
              inline-flex items-center justify-center px-6 py-2.5 border border-transparent 
              text-sm font-medium rounded-md shadow-sm text-white 
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              ${
                isMonitoring
                  ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  : "bg-primary hover:bg-primary/90 focus:ring-primary"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isMonitoring ? (
              <StopIcon className="h-5 w-5 mr-2" />
            ) : (
              <PlayIcon className="h-5 w-5 mr-2" />
            )}
            {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
          </button>
        </form>
        {statusMessage && (
          <p
            className={`mt-4 text-sm ${
              statusMessage.includes("Starting")
                ? "text-green-600"
                : "text-foreground"
            }`}
          >
            {statusMessage}
          </p>
        )}
      </div>

      {/* Placeholder ringkasan atau statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-foreground">Active Rules</h3>
          <p className="mt-2 text-3xl font-semibold text-primary">12</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-foreground">
            Messages Logged (Today)
          </h3>
          <p className="mt-2 text-3xl font-semibold text-primary">1,234</p>
        </div>
      </div>
    </div>
  );
}
