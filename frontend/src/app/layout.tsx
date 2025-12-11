import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // ✅ Import your Navbar component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeuroTrack | AI Mood & Focus Journal",
  description:
    "NeuroTrack is an AI-powered journaling app that helps you reflect, analyze mood trends, and improve focus through emotional insights.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100 selection:bg-purple-600/40 selection:text-white`}>
        <Navbar />

        <main className="pt-20 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
