/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// atlist1f/src/store/streamControlStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

export const useStreamControlStore = create<StreamControlState>()(
  // persist(
  (set, get) => ({
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
        const response = await fetch(`${API_BASE_URL}/api/stream/status`, {
          headers: { Authorization: `Bearer ${apiToken}` },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch monitoring status.");
        }

        if (data.isActive && data.videoId) {
          set({
            isCurrentlyMonitoring: true,
            currentMonitoringVideoId: data.videoId,
            liveChatId: data.liveChatId,
            startedAt: data.startedAt,
            statusMessage: `Currently monitoring Video ID: ${data.videoId}`,
            errorMessage: null,
          });
        } else {
          set({
            isCurrentlyMonitoring: false,
            currentMonitoringVideoId: null,
            liveChatId: null,
            startedAt: null,
            statusMessage: "No active monitoring session found.",
            errorMessage: null,
          });
        }
      } catch (error: any) {
        console.error("Error checking active monitoring:", error);
        set({
          errorMessage: error.message || "Error checking status.",
          statusMessage: null,
          isCurrentlyMonitoring: false,
          currentMonitoringVideoId: null,
        });
      } finally {
        set({ isLoadingAction: false });
      }
    },

    startMonitoring: async (
      videoId: string,
      apiToken: string
    ): Promise<boolean> => {
      if (!videoId.trim() || !apiToken) {
        set({
          errorMessage: "Video ID or Auth Token is missing.",
          isLoadingAction: false,
        });
        return false;
      }
      set({
        isLoadingAction: true,
        errorMessage: null,
        statusMessage: `Starting monitoring for ${videoId}...`,
      });
      try {
        const response = await fetch(`${API_BASE_URL}/api/stream/start`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiToken}`,
          },
          body: JSON.stringify({ videoId: videoId.trim() }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to start monitoring.");
        }

        set({
          isCurrentlyMonitoring: true,
          currentMonitoringVideoId: videoId.trim(),
          liveChatId: data.liveChatId || null,
          startedAt: new Date().toISOString(),
          statusMessage: data.message || `Monitoring started for ${videoId}.`,
          errorMessage: null,
        });
        return true;
      } catch (error: any) {
        console.error("Error starting monitoring (store):", error);
        set({
          errorMessage: error.message || "Error starting monitoring.",
          statusMessage: null,
        });
        return false;
      } finally {
        set({ isLoadingAction: false });
      }
    },

    stopMonitoring: async (
      videoId: string,
      apiToken: string
    ): Promise<boolean> => {
      if (!apiToken) {
        set({
          errorMessage: "Auth Token is missing.",
          isLoadingAction: false,
        });
        return false;
      }
      const currentVideoId = get().currentMonitoringVideoId;
      if (!currentVideoId) {
        set({
          errorMessage: "No stream is currently being monitored to stop.",
          isLoadingAction: false,
        });
        return false;
      }

      set({
        isLoadingAction: true,
        errorMessage: null,
        statusMessage: `Stopping monitoring for ${currentVideoId}...`,
      });
      try {
        const response = await fetch(`${API_BASE_URL}/api/stream/stop`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiToken}`,
          },
          body: JSON.stringify({ videoId: currentVideoId }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to stop monitoring.");
        }

        set({
          isCurrentlyMonitoring: false,
          currentMonitoringVideoId: null,
          liveChatId: null,
          startedAt: null,
          statusMessage: data.message || "Monitoring stopped.",
          errorMessage: null,
        });
        return true;
      } catch (error: any) {
        console.error("Error stopping monitoring (store):", error);
        set({
          errorMessage: error.message || "Error stopping monitoring.",
          statusMessage: null,
        });
        return false;
      } finally {
        set({ isLoadingAction: false });
      }
    },
  })
  // {
  //   name: "atlist-stream-control-storage",
  //   storage: createJSONStorage(() => localStorage),
  //   partialize: (state) => ({
  //     currentMonitoringVideoId: state.isCurrentlyMonitoring
  //       ? state.currentMonitoringVideoId
  //       : null,
  //   }),
  // }
);
