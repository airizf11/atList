// src/app/(app)/dashboard/page.tsx
"use client";

import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const { userProfile } = useAuthStore();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        Hi, {userProfile?.name?.split(" ")[0] || "Streamer"}!
      </h1>
      <p className="text-lg text-muted-foreground">
        Welcome back to your atList dashboard.
      </p>

      <div className="mt-8 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h2 className="text-lg font-semibold">Quick Overview</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your stream monitoring status and quick actions will appear here soon.
        </p>
      </div>
    </div>
  );
}
