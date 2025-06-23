// atlist1f/src/components/settings/DiscordWebhookForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PaperAirplaneIcon,
  ArrowDownTrayIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function DiscordWebhookForm() {
  const { alisApiToken } = useAuthStore();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [initialWebhookUrl, setInitialWebhookUrl] = useState("");
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!alisApiToken) {
      setIsLoadingInitial(false);
      return;
    }
    setIsLoadingInitial(true);
    setMessage(null);

    fetch(`${API_BASE_URL}/api/settings/user-settings`, {
      headers: { Authorization: `Bearer ${alisApiToken}` },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errData) => {
            throw new Error(errData.error || "Failed to fetch user settings.");
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.discord_webhook_url) {
          setWebhookUrl(data.discord_webhook_url);
          setInitialWebhookUrl(data.discord_webhook_url);
        } else {
          setWebhookUrl("");
          setInitialWebhookUrl("");
        }
      })
      .catch((err) => {
        console.error("Error fetching webhook URL:", err);
        setMessage({
          type: "error",
          text: err.message || "Could not load current webhook URL.",
        });
      })
      .finally(() => setIsLoadingInitial(false));
  }, [alisApiToken]);

  const handleSaveSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!alisApiToken) {
      setMessage({
        type: "error",
        text: "Authentication session has expired. Please re-login.",
      });
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
      if (!response.ok)
        throw new Error(data.error || "Failed to update webhook URL.");

      setMessage({
        type: "success",
        text: data.message || "Webhook URL updated successfully!",
      });
      setInitialWebhookUrl(webhookUrl.trim());
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "An unknown error occurred while saving.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestWebhook = async () => {
    if (!alisApiToken) {
      setMessage({
        type: "error",
        text: "Authentication session has expired. Please re-login.",
      });
      return;
    }
    const urlToTest = webhookUrl.trim();
    if (!urlToTest) {
      setMessage({
        type: "info",
        text: "Please enter or save a Webhook URL to test.",
      });
      return;
    }

    setIsTesting(true);
    setMessage(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/settings/discord-webhook/test`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${alisApiToken}`,
          },
          body: JSON.stringify({ webhookUrl: urlToTest }),
        }
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(
          data.error ||
            "Test failed. Please check the URL and Discord permissions."
        );

      setMessage({
        type: "success",
        text: data.message || "Test message sent! Check your Discord channel.",
      });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "An unknown error occurred during the test.",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const hasChanged = webhookUrl.trim() !== initialWebhookUrl.trim();

  if (isLoadingInitial) {
    return (
      <div className="bg-card p-6 sm:p-8 rounded-lg shadow-lg animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
        <div className="h-10 bg-muted rounded w-full mb-2"></div>
        <div className="h-4 bg-muted rounded w-3/4 mb-6"></div>
        <div className="flex justify-end gap-3">
          <div className="h-10 bg-muted/80 rounded w-28"></div>
          <div className="h-10 bg-primary/70 rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSaveSubmit}
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
            onChange={(e) => {
              setWebhookUrl(e.target.value);
              if (
                message?.type === "info" &&
                message?.text.includes("Please enter or save a Webhook URL")
              ) {
                setMessage(null);
              }
            }}
            disabled={isSaving || isTesting}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground flex items-start">
          <InformationCircleIcon className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0 text-muted-foreground/80" />
          <span>
            Enter the full webhook URL from your Discord server. You can find
            this in Server Settings → Integrations → Webhooks. Leave blank to
            disable.
          </span>
        </p>
      </div>

      {message && (
        <div
          className={`flex items-start p-3 rounded-md text-sm ${
            message.type === "success"
              ? "bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600"
              : message.type === "error"
              ? "bg-red-100 dark:bg-red-800/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600"
              : "bg-sky-100 dark:bg-sky-800/30 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-600"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          ) : message.type === "error" ? (
            <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          ) : (
            <InformationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          )}
          <span className="flex-grow">{message.text}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={handleTestWebhook}
          disabled={isSaving || isTesting || !webhookUrl.trim()}
          className="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isTesting ? (
            <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <PaperAirplaneIcon className="h-5 w-5 mr-2 transform -rotate-45" />
          )}
          {isTesting ? "Testing..." : "Test Webhook"}
        </button>
        <button
          type="submit"
          disabled={isSaving || isTesting || !hasChanged}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          )}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
