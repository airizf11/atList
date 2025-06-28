// src/app/dashboard/page.tsx
/* eslint-disable react/no-unescaped-entities */
import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth-buttons";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
          <SignOutButton />
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter">
            Welcome, {session.user.name}!
          </h2>
          <p className="text-muted-foreground">
            Your dashboard is ready. Let's connect your YouTube account to get
            started.
          </p>
          {/* Tombol "Connect YouTube" akan kita tambahkan di sini nanti */}
        </div>
      </main>
    </div>
  );
}
