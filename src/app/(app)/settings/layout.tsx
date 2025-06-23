// src/app/(app)/settings/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const settingsNav = [
  { name: "Integrations", href: "/settings/integrations" },
  { name: "Moderation", href: "/settings/moderation" }, // Placeholder
  { name: "Profile", href: "/settings/profile" }, // Placeholder
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account, integrations, and application settings.
        </p>
      </div>

      <nav className="flex border-b">
        {settingsNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              "-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="pt-2">{children}</div>
    </div>
  );
}
