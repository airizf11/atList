// src/app/(marketing)/layout.tsx
import { HeaderMarketing } from "@/components/layout/HeaderMarketing";

function FooterMarketing() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <p className="text-center text-xs leading-5 text-muted-foreground">
          © {new Date().getFullYear()} atList. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderMarketing />
      <main className="flex-1">{children}</main>
      <FooterMarketing />
    </div>
  );
}
