import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { profile } from "@/data/profile";
export const metadata: Metadata = {
  ...(profile.siteUrl ? { metadataBase: new URL(profile.siteUrl) } : {}),
  title: { default: `${profile.name} — Full Stack Software Developer`, template: `%s — ${profile.name}` },
  description: profile.summary,
  authors: [{ name: profile.name }],
  openGraph: { title: `${profile.name} — Software Developer`, description: profile.summary, type: "website", locale: "en_US" },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body id="top"><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>; }
