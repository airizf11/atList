// atlist1f/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AuthInitializer from "@/components/AuthInitializer";
// import PageProgressBar from "@/components/layout/PageProgressBar";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "atList - Stream Helper",
    template: "%s | atList",
  },
  description:
    "Elevate your livestreams with seamless chat logging and customizable moderation by atList.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <Script id="theme-setter" strategy="beforeInteractive">
          {`
            (function() {
              function getInitialColorMode() {
                try {
                  const persistedColorPreference = window.localStorage.getItem('atlist-theme');
                  const hasPersistedPreference = typeof persistedColorPreference === 'string';
                  if (hasPersistedPreference) return persistedColorPreference;
                  const mql = window.matchMedia('(prefers-color-scheme: dark)');
                  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
                  if (hasMediaQueryPreference) return mql.matches ? 'dark' : 'light';
                } catch (e) { /* localStorage not available */ }
                return 'system';
              }
              const colorMode = getInitialColorMode();
              if (colorMode === 'dark' || (colorMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            })();
          `}
        </Script>
      </head>
      <body className={`flex flex-col min-h-screen antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="atlist-theme"
        >
          <Analytics />
          <SpeedInsights />
          <AuthInitializer />
          <div className="flex-grow">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
