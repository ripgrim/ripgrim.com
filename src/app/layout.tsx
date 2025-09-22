import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import { CommandMenu } from "@/components/command-menu";
import Header from "@/components/header";
import Providers from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "grim",
  description:
    "professional fuckarounder by scratching unscratchable itches and building whatever I want.",
  openGraph: {
    title: "grim",
    description:
      "professional fuckarounder by scratching unscratchable itches and building whatever I want.",
    url: "https://ripgrim.com",
    siteName: "grim",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "grim",
    description:
      "professional fuckarounder by scratching unscratchable itches and building whatever I want.",
    creator: "@grimcodes",
  },
  icons: {
    icon: "https://ext.same-assets.com/3954104829/3482906856.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="grid h-svh grid-rows-[auto_1fr]">
            <Header />
            {children}
          </div>
          <CommandMenu />
        </Providers>
      </body>
    </html>
  );
}
