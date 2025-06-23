// src/components/settings/DiscordWebhookForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { Loader2, Save, Send, Trash2 } from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export function DiscordWebhookForm() {
  const { alisApiToken } = useAuthStore();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [initialWebhookUrl, setInitialWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      if (!alisApiToken) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/settings/user-settings`,
          {
            headers: { Authorization: `Bearer ${alisApiToken}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch settings.");

        const data = await response.json();
        const url = data.discord_webhook_url || "";
        setWebhookUrl(url);
        setInitialWebhookUrl(url);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, [alisApiToken]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!alisApiToken) return;

    setIsSaving(true);
    const toastId = toast.loading("Saving changes...");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/settings/discord-webhook`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${alisApiToken}`,
          },
          body: JSON.stringify({ webhookUrl: webhookUrl.trim() || null }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save.");

      toast.success("Webhook URL saved!", { id: toastId });
      setInitialWebhookUrl(webhookUrl.trim());
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    if (!alisApiToken || !webhookUrl.trim()) {
      toast.error("Please enter a webhook URL to test.");
      return;
    }
    setIsTesting(true);
    const toastId = toast.loading("Sending test message...");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/settings/discord-webhook/test`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${alisApiToken}`,
          },
          body: JSON.stringify({ webhookUrl: webhookUrl.trim() }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Test failed.");

      toast.success("Test message sent! Check your Discord.", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsTesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-1/3 rounded bg-muted animate-pulse" />
        <div className="h-10 w-full rounded bg-muted animate-pulse" />
        <div className="flex justify-end h-10 w-full">
          <div className="h-10 w-24 rounded bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  const hasChanged = webhookUrl.trim() !== initialWebhookUrl.trim();
  const isActionInProgress = isSaving || isTesting;

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div>
        <label
          htmlFor="webhook-url"
          className="block text-sm font-medium text-foreground"
        >
          Discord Webhook URL
        </label>
        <p className="text-sm text-muted-foreground mt-1">
          Live chat messages will be sent to this channel. Leave blank to
          disable.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <input
            id="webhook-url"
            type="url"
            placeholder="https://discord.com/api/webhooks/..."
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            disabled={isActionInProgress}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
          />
          {webhookUrl && (
            <button
              type="button"
              onClick={() => setWebhookUrl("")}
              disabled={isActionInProgress}
              className="h-10 w-10 flex-shrink-0 inline-flex items-center justify-center rounded-md border border-input bg-background text-muted-foreground hover:bg-accent disabled:opacity-50"
              aria-label="Clear input"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={handleTest}
          disabled={!webhookUrl.trim() || isActionInProgress}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
        >
          {isTesting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Test
        </button>
        <button
          type="submit"
          disabled={!hasChanged || isActionInProgress}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Changes
        </button>
      </div>
    </form>
  );
}
