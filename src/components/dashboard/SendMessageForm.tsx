// src/components/dashboard/SendMessageForm.tsx
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, FormEvent } from "react";
import { useAuthStore } from "@/store/authStore";
import { useStreamControlStore } from "@/store/streamControlStore";
import { Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export function SendMessageForm() {
  const { alisApiToken, userProfile } = useAuthStore();
  const { currentMonitoringVideoId, isCurrentlyMonitoring } =
    useStreamControlStore();
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!alisApiToken || !currentMonitoringVideoId || !messageText.trim())
      return;

    setIsSending(true);
    const toastId = toast.loading("Sending message...");

    try {
      const response = await fetch(`${API_BASE_URL}/api/stream/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${alisApiToken}`,
        },
        body: JSON.stringify({
          videoId: currentMonitoringVideoId,
          messageText: messageText.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to send message.");

      toast.success("Message sent!", { id: toastId });
      setMessageText("");
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsSending(false);
    }
  };

  if (!isCurrentlyMonitoring) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="text-lg font-semibold">Send Message to Live Chat</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-4">
        Send a message as "{userProfile?.name}" to the monitored stream.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          rows={3}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          disabled={isSending}
          required
          placeholder="Type your message here..."
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSending || !messageText.trim()}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isSending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
