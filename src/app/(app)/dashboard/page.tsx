/* eslint-disable react/no-unescaped-entities */
// atlist1f/src/app/(app)/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useStreamControlStore } from "@/store/streamControlStore";
import {
  ArrowRightIcon,
  VideoCameraIcon,
  ChatBubbleLeftEllipsisIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  BellIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon, PlayCircleIcon } from "@heroicons/react/20/solid";

// Komponen Widget Kustom, bisa dipecah ke file sendiri
interface WidgetProps {
  title: string;
  value?: string | number;
  description?: string;
  icon: React.ElementType;
  bgColorClass?: string;
  textColorClass?: string;
  link?: string;
  linkText?: string;
}

function DashboardWidget({
  title,
  value,
  description,
  icon: Icon,
  bgColorClass = "bg-muted/50",
  textColorClass = "text-primary",
  link,
  linkText,
}: WidgetProps) {
  const content = (
    <div
      className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col ${bgColorClass}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Icon className={`h-7 w-7 ${textColorClass}`} />
      </div>
      {value && (
        <p className={`text-3xl font-bold ${textColorClass}`}>{value}</p>
      )}
      {description && (
        <p className="text-sm text-muted-foreground mt-1 flex-grow">
          {description}
        </p>
      )}
      {link && linkText && (
        <div className="mt-4">
          <Link
            href={link}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
          >
            {linkText}
            <ArrowRightIcon className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
  return link ? (
    <Link href={link} className="block h-full">
      {content}
    </Link>
  ) : (
    <div className="h-full">{content}</div>
  );
}

export default function DashboardOverviewPage() {
  const { userProfile, alisApiToken, isAuthenticated } = useAuthStore();
  const {
    isCurrentlyMonitoring,
    currentMonitoringVideoId,
    checkActiveMonitoring,
  } = useStreamControlStore();

  useEffect(() => {
    if (isAuthenticated && alisApiToken) {
      checkActiveMonitoring(alisApiToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, alisApiToken]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Hi, {userProfile?.name?.split(" ")[0] || "Streamer"}!
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome to your atList dashboard. Here's a quick overview.
        </p>
      </div>

      <div
        className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
          isCurrentlyMonitoring
            ? "bg-green-500/10 dark:bg-green-400/10 border border-green-500/30"
            : "bg-card"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {isCurrentlyMonitoring
                ? "Stream Monitoring Active"
                : "No Active Stream Monitoring"}
            </h2>
            {isCurrentlyMonitoring && currentMonitoringVideoId && (
              <p className="text-sm text-muted-foreground mt-1">
                Video ID:{" "}
                <code className="font-mono bg-muted px-1 rounded">
                  {currentMonitoringVideoId}
                </code>
              </p>
            )}
            {!isCurrentlyMonitoring && (
              <p className="text-sm text-muted-foreground mt-1">
                Go to Stream Control to start monitoring your live chat.
              </p>
            )}
          </div>
          {isCurrentlyMonitoring ? (
            <CheckCircleIcon className="h-10 w-10 text-green-500 dark:text-green-400" />
          ) : (
            <VideoCameraIcon className="h-10 w-10 text-muted-foreground" />
          )}
        </div>
        <div className="mt-6">
          <Link
            href="/dashboard/stream-control"
            className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 
              ${
                isCurrentlyMonitoring
                  ? "text-primary-foreground bg-primary hover:bg-primary/90 focus:ring-primary"
                  : "text-primary-foreground bg-secondary hover:bg-secondary/90 focus:ring-secondary"
              }`}
          >
            <PlayCircleIcon className="h-5 w-5 mr-2" />
            {isCurrentlyMonitoring
              ? "Manage Active Stream"
              : "Go to Stream Control"}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardWidget
          title="Chat Logging"
          description="Ensure your Discord webhook is set up for real-time chat archiving."
          icon={ChatBubbleLeftEllipsisIcon}
          link="/settings/integrations"
          linkText="Configure Discord"
          bgColorClass="bg-sky-500/10 dark:bg-sky-400/10"
          textColorClass="text-sky-600 dark:text-sky-400"
        />
        <DashboardWidget
          title="Moderation Rules"
          description="Set up and manage your automated chat moderation filters and replies."
          icon={ShieldCheckIcon}
          link="/dashboard/moderation" // Nanti
          linkText="Manage Rules"
          bgColorClass="bg-rose-500/10 dark:bg-rose-400/10"
          textColorClass="text-rose-600 dark:text-rose-400"
        />
        <DashboardWidget
          title="Account Settings"
          description="Manage your profile, preferences, and application settings."
          icon={Cog6ToothIcon}
          link="/settings"
          linkText="View Settings"
          bgColorClass="bg-slate-500/10 dark:bg-slate-400/10"
          textColorClass="text-slate-600 dark:text-slate-400"
        />
        {/* placeholder */}
        <DashboardWidget
          title="Notifications"
          description="No new notifications."
          icon={BellIcon}
          // link="/notifications"
          // linkText="View All"
          bgColorClass="bg-amber-500/10 dark:bg-amber-400/10"
          textColorClass="text-amber-600 dark:text-amber-400"
        />
        <DashboardWidget
          title="Stream Analytics (Soon)"
          description="Insights from your monitored streams will appear here."
          icon={ChartBarIcon}
          bgColorClass="bg-purple-500/10 dark:bg-purple-400/10"
          textColorClass="text-purple-600 dark:text-purple-400"
        />
      </div>
    </div>
  );
}
