import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chetan-waddamani.vercel.app"),
  title: "Chetan Waddamani | Full Stack Developer & AI Enthusiast",
  description:
    "MCA student, Full Stack Developer, AI Enthusiast, Creative Creator and Former General Secretary building practical digital solutions and exploring AI for sustainability.",
  keywords: [
    "Chetan Waddamani",
    "Full Stack Developer",
    "AI Enthusiast",
    "Creative Creator",
    "Former General Secretary",
    "MCA student"
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Chetan Waddamani | Full Stack Developer & AI Enthusiast",
    description:
      "MCA student, Full Stack Developer, AI Enthusiast, Creative Creator and Former General Secretary building practical digital solutions and exploring AI for sustainability.",
    images: ["/profile-portrait.png"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Chetan Waddamani | Full Stack Developer & AI Enthusiast",
    description:
      "MCA student, Full Stack Developer, AI Enthusiast, Creative Creator and Former General Secretary building practical digital solutions and exploring AI for sustainability.",
    images: ["/profile-portrait.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
      <body className="bg-ink text-white antialiased font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}

