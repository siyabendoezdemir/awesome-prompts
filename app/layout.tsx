import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PromptLibrarySidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'Prompt Library',
  description: 'A collection of useful prompts for AI-assisted writing and problem-solving.',
  openGraph: {
    title: 'Prompt Library',
    description: 'A collection of useful prompts for AI-assisted writing and problem-solving.',
    images: [
      {
        url: 'https://prompts.siya.digital/api/og/static',
        width: 1200,
        height: 630,
        alt: 'Prompt Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Library',
    description: 'A collection of useful prompts for AI-assisted writing and problem-solving.',
    images: [
      {
        url: 'https://prompts.siya.digital/api/og/static',
        width: 1200,
        height: 630,
        alt: 'Prompt Library',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex h-screen w-screen">
            <PromptLibrarySidebar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
            <Toaster />
          </div>
        </SidebarProvider>
        <Analytics />
      </body>
    </html>
  );
}
