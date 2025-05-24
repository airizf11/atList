/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
// atlist1f/src/components/dashboard/SendMessageForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { useAuthStore } from "@/store/authStore";
import { useStreamControlStore } from "@/store/streamControlStore";
import { PaperAirplaneIcon, ArrowPathIcon } from "@heroicons/react/20/solid";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function SendMessageForm() {
  const { alisApiToken } = useAuthStore();
  const { currentMonitoringVideoId, isCurrentlyMonitoring } =
    useStreamControlStore();

  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const targetVideoId = currentMonitoringVideoId;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!alisApiToken || !targetVideoId || !messageText.trim()) {
      setFeedback({
        type: "error",
        text: "Missing token, active Video ID, or message text.",
      });
      return;
    }

    setIsSending(true);
    setFeedback(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/stream/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${alisApiToken}`,
        },
        body: JSON.stringify({
          videoId: targetVideoId,
          messageText: messageText.trim(),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.details?.[0]?.message || "Failed to send message."
        );
      }
      setFeedback({ type: "success", text: data.message || "Message sent!" });
      setMessageText("");
    } catch (error: any) {
      setFeedback({
        type: "error",
        text: error.message || "An unknown error occurred.",
      });
    } finally {
      setIsSending(false);
    }
  };

  if (!isCurrentlyMonitoring || !targetVideoId) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-md mt-8">
        <p className="text-sm text-muted-foreground">
          Start monitoring a stream in "Stream Control" to enable sending
          messages.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Send Message to Live Chat
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="messageText" className="sr-only">
            Your message
          </label>
          <textarea
            id="messageText"
            name="messageText"
            rows={2}
            className="block w-full rounded-md border-0 py-2 px-3.5 bg-background text-foreground shadow-sm ring-1 ring-inset ring-input placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm disabled:opacity-70"
            placeholder={`Send as ${
              useAuthStore.getState().userProfile?.name || "yourself"
            } to Video ID: ${targetVideoId}`}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            disabled={isSending}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSending || !messageText.trim()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60"
          >
            {isSending ? (
              <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <PaperAirplaneIcon className="h-5 w-5 mr-2 transform -rotate-45" />
            )}
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
      {feedback && (
        <p
          className={`mt-3 text-sm ${
            feedback.type === "success"
              ? "text-green-600 dark:text-green-400"
              : "text-destructive dark:text-red-400"
          }`}
        >
          {feedback.text}
        </p>
      )}
    </div>
  );
}
