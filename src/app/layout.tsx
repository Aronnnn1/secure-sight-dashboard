// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionWrapper } from "@/components/SessionWrapper"; // ✅ NEW import
import Navbar from "@/components/Navbar";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Secure Sight Dashboard",
  description: "A surveillance dashboard for monitoring and reporting",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#0a0a0a] text-[#ededed]">
      <body className="bg-[#0a0a0a] text-[#ededed]">
        <Navbar />
        <SessionWrapper>{children}</SessionWrapper> {/* ✅ Wrapped correctly */}
      </body>
    </html>
  );
}
