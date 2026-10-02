import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CompareDrawer } from "@/components/comparison/CompareDrawer";
import { CommerceProvider } from "@/context/CommerceContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sound Supply — Everything You Need to Make Sound | India's Pro Audio Destination",
  description:
    "Discover, compare, and shop professional studio recording gear, microphones, audio interfaces, monitors, synthesizers, and instruments with authentic manufacturer warranty in India.",
  keywords: [
    "audio interface",
    "studio monitors",
    "microphones",
    "Focusrite",
    "Shure SM7B",
    "Yamaha HS5",
    "music equipment India",
    "pro audio store",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col bg-canvas text-text-primary antialiased selection:bg-accent selection:text-white">
        <CommerceProvider>
          <SiteHeader />
          <main className="flex-1 pb-14 lg:pb-0">{children}</main>
          <CompareDrawer />
          <SiteFooter />
        </CommerceProvider>
      </body>
    </html>
  );
}
