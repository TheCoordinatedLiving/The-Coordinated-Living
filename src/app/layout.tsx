import type { Metadata } from "next";
import { Manrope, Roboto } from "next/font/google";
import { Amita } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ 
  subsets: ["latin"],
  display: 'swap'
});

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: 'swap'
});

const amita = Amita({ 
  subsets: ["latin"],
  weight: "400",
  variable: "--font-amita",
  display: 'swap'
});

export const metadata: Metadata = {
  title: "The Coordinated Living - Christian Living & Spiritual Growth",
  description: "Discover guides for Christian living, spiritual growth, and finding purpose in life. Daily reflections, faith-based guidance, and inspiration for your spiritual journey.",
  keywords: [
    "Christian living",
    "spiritual growth", 
    "finding purpose",
    "life fulfillment",
    "daily reflections",
    "faith-based guidance",
    "Christian lifestyle",
    "spiritual development",
    "growing closer to God",
    "finding purpose in challenges",
    "breaking generational cycles",
    "navigating life struggles",
    "personal daily reflections",
    "living a fulfilling life"
  ],
  authors: [{ name: "The Coordinated Living" }],
  creator: "The Coordinated Living",
  publisher: "The Coordinated Living",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.thecoordinatedliving.com",
    title: "The Coordinated Living - Christian Living & Spiritual Growth",
    description: "Discover guides for Christian living, spiritual growth, and finding purpose in life. Daily reflections, faith-based guidance, and inspiration for your spiritual journey.",
    siteName: "The Coordinated Living",
    images: [
      {
        url: "/coordinated-new.webp",
        width: 1200,
        height: 630,
        alt: "The Coordinated Living - Christian Living & Spiritual Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Coordinated Living - Christian Living & Spiritual Growth",
    description: "Discover guides for Christian living, spiritual growth, and finding purpose in life. Daily reflections, faith-based guidance, and inspiration for your spiritual journey.",
    images: ["/coordinated-new.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preload" href="/coordinated-new.webp" as="image" type="image/webp" />
        <link rel="icon" href="/coordinated.ico" />
      </head>
      <body className={`${manrope.className} ${roboto.variable} ${amita.variable}`}>{children}</body>
    </html>
  );
}
