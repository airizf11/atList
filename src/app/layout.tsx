// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AuthInitializer from "@/components/providers/AuthInitializer";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteConfig = {
  name: "atList",
  url: "https://atlistapp.vercel.app",
  ogImage: "https://atlistapp.vercel.app/og-image.png",
  description:
    "Elevate your livestreams with seamless chat logging and customizable moderation by atList.",
  author: "atList Team",
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Your Smart Stream Assistant`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    // creator: "@your_twitter_handle",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <Script id="theme-setter" strategy="beforeInteractive">
          {`
            (function() {
              function getInitialColorMode() {
                try {
                  const persistedColorPreference = window.localStorage.getItem('atlist-theme');
                  if (persistedColorPreference) return persistedColorPreference;
                  const mql = window.matchMedia('(prefers-color-scheme: dark)');
                  return mql.matches ? 'dark' : 'light';
                } catch (e) {}
                return 'light';
              }
              const colorMode = getInitialColorMode();
              if (colorMode === 'dark') {
                document.documentElement.classList.add('dark');
              }
            })();
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="atlist-theme"
        >
          {children}
          <Toaster position="top-center" reverseOrder={false} />
          <AuthInitializer />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
