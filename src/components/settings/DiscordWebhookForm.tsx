/* eslint-disable @typescript-eslint/no-explicit-any */
// atlist1f/src/components/settings/DiscordWebhookForm.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function DiscordWebhookForm() {
  const { alisApiToken } = useAuthStore();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [initialWebhookUrl, setInitialWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!alisApiToken) return;
    setIsLoading(true);
    setMessage(null);

    fetch(`${API_BASE_URL}/api/settings/user-settings`, {
      headers: { Authorization: `Bearer ${alisApiToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user settings.");
        return res.json();
      })
      .then((data) => {
        if (data.discord_webhook_url) {
          setWebhookUrl(data.discord_webhook_url);
          setInitialWebhookUrl(data.discord_webhook_url);
        }
      })
      .catch((err) => {
        console.error("Error fetching webhook URL:", err);
        setMessage({
          type: "error",
          text: err.message || "Could not load current webhook URL.",
        });
      })
      .finally(() => setIsLoading(false));
  }, [alisApiToken]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!alisApiToken) {
      setMessage({ type: "error", text: "Authentication token is missing." });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/settings/discord-webhook`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${alisApiToken}`,
          },
          body: JSON.stringify({
            webhookUrl: webhookUrl.trim() === "" ? null : webhookUrl.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update webhook URL.");
      }

      setMessage({
        type: "success",
        text: data.message || "Webhook URL updated successfully!",
      });
      setInitialWebhookUrl(webhookUrl.trim());
    } catch (error: any) {
      console.error("Error updating webhook URL:", error);
      setMessage({
        type: "error",
        text: error.message || "An unknown error occurred.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanged = webhookUrl.trim() !== initialWebhookUrl.trim();

  if (isLoading) {
    return (
      <div className="bg-card p-6 rounded-lg shadow animate-pulse">
        <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-muted rounded w-full mb-2"></div>
        <div className="h-4 bg-muted rounded w-3/4 mb-6"></div>
        <div className="h-10 bg-primary/50 rounded w-28"></div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-card p-6 sm:p-8 rounded-lg shadow-lg"
    >
      <div>
        <label
          htmlFor="discord-webhook-url"
          className="block text-sm font-medium leading-6 text-foreground"
        >
          Discord Webhook URL
        </label>
        <div className="mt-2">
          <input
            type="url"
            name="discord-webhook-url"
            id="discord-webhook-url"
            className="block w-full rounded-md border-0 py-2.5 px-3.5 bg-background text-foreground shadow-sm ring-1 ring-inset ring-input placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            placeholder="https://discord.com/api/webhooks/your/webhook"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Enter the full webhook URL from your Discord server settings. Leave
          blank to disable. You can find this in Server Settings → Integrations
          → Webhooks.
        </p>
      </div>

      {message && (
        <div
          className={`flex items-start p-3 rounded-md text-sm ${
            message.type === "success"
              ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700"
              : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          ) : (
            <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          )}
          <span className="flex-grow">{message.text}</span>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving || !hasChanged}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
          ) : null}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
