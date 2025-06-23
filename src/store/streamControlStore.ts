// src/store/streamControlStore.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import toast from "react-hot-toast";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

interface StreamControlState {
  currentMonitoringVideoId: string | null;
  isCurrentlyMonitoring: boolean;
  liveChatId: string | null;
  startedAt: string | null;
  isLoadingAction: boolean;
  statusMessage: string | null;
  errorMessage: string | null;

  checkActiveMonitoring: (apiToken: string) => Promise<void>;
  startMonitoring: (videoId: string, apiToken: string) => Promise<boolean>;
  stopMonitoring: (videoId: string, apiToken: string) => Promise<boolean>;
  clearMessages: () => void;
}

async function fetchWithAuth(
  url: string,
  options: RequestInit,
  apiToken: string
) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ error: "An unknown error occurred." }));
    throw new Error(
      errorData.error || `Request failed with status ${response.status}`
    );
  }
  return response.json();
}

export const useStreamControlStore = create<StreamControlState>()(
  (set, get) => ({
    // Initial State
    currentMonitoringVideoId: null,
    isCurrentlyMonitoring: false,
    liveChatId: null,
    startedAt: null,
    isLoadingAction: false,
    statusMessage: null,
    errorMessage: null,

    clearMessages: () => set({ statusMessage: null, errorMessage: null }),

    checkActiveMonitoring: async (apiToken: string) => {
      if (!apiToken) return;
      set({
        isLoadingAction: true,
        errorMessage: null,
        statusMessage: "Checking active monitoring...",
      });

      try {
        const data = await fetchWithAuth(
          `${API_BASE_URL}/api/stream/status`,
          {},
          apiToken
        );
        if (data.isActive && data.videoId) {
          set({
            isCurrentlyMonitoring: true,
            currentMonitoringVideoId: data.videoId,
            liveChatId: data.liveChatId,
            startedAt: data.startedAt,
            statusMessage: `Currently monitoring Video ID: ${data.videoId}`,
          });
        } else {
          set({
            isCurrentlyMonitoring: false,
            currentMonitoringVideoId: null,
            liveChatId: null,
            startedAt: null,
            statusMessage: "No active monitoring session found.",
          });
        }
      } catch (error: any) {
        console.error("Error checking active monitoring:", error);
        set({ errorMessage: error.message || "Error checking status." });
      } finally {
        set({ isLoadingAction: false });
      }
    },

    startMonitoring: async (
      videoId: string,
      apiToken: string
    ): Promise<boolean> => {
      if (!videoId.trim()) {
        set({ errorMessage: "Video ID cannot be empty." });
        return false;
      }
      set({
        isLoadingAction: true,
        errorMessage: null,
        statusMessage: `Starting monitoring for ${videoId}...`,
      });
      const toastId = toast.loading(`Starting monitoring for ${videoId}...`);

      try {
        const data = await fetchWithAuth(
          `${API_BASE_URL}/api/stream/start`,
          {
            method: "POST",
            body: JSON.stringify({ videoId: videoId.trim() }),
          },
          apiToken
        );

        set({
          isCurrentlyMonitoring: true,
          currentMonitoringVideoId: videoId.trim(),
          liveChatId: data.liveChatId || null,
          startedAt: new Date().toISOString(),
          statusMessage: data.message || `Monitoring started for ${videoId}.`,
        });
        toast.success(data.message || `Monitoring started successfully!`, {
          id: toastId,
        });
        return true;
      } catch (error: any) {
        console.error("Error starting monitoring:", error);
        set({ errorMessage: error.message, statusMessage: null });
        toast.error(error.message, { id: toastId });
        return false;
      } finally {
        set({ isLoadingAction: false });
      }
    },

    stopMonitoring: async (
      videoId: string,
      apiToken: string
    ): Promise<boolean> => {
      const currentVideoId = get().currentMonitoringVideoId;
      if (!currentVideoId) {
        set({ errorMessage: "No stream is currently being monitored." });
        return false;
      }
      set({
        isLoadingAction: true,
        errorMessage: null,
        statusMessage: `Stopping monitoring...`,
      });
      const toastId = toast.loading(`Stopping monitoring...`);

      try {
        const data = await fetchWithAuth(
          `${API_BASE_URL}/api/stream/stop`,
          {
            method: "POST",
            body: JSON.stringify({ videoId: currentVideoId }),
          },
          apiToken
        );

        set({
          isCurrentlyMonitoring: false,
          currentMonitoringVideoId: null,
          liveChatId: null,
          startedAt: null,
          statusMessage: data.message || "Monitoring stopped.",
        });
        toast.success(data.message || "Monitoring stopped.", { id: toastId });
        return true;
      } catch (error: any) {
        console.error("Error stopping monitoring:", error);
        set({ errorMessage: error.message, statusMessage: null });
        toast.error(error.message, { id: toastId });
        return false;
      } finally {
        set({ isLoadingAction: false });
      }
    },
  })
);
