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
  title: "THE COORDINATED LIVING",
  description: "Welcome to a space dedicated to helping you find hope and guidance in life. Discover resources to help you build a closer relationship with the Lord, find purpose, and anchor your life in faith that provides lasting hope.",
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
    title: "THE COORDINATED LIVING",
    description: "Welcome to a space dedicated to helping you find hope and guidance in life. Discover resources to help you build a closer relationship with the Lord, find purpose, and anchor your life in faith that provides lasting hope.",
    siteName: "The Coordinated Living",
    images: [
      {
        url: "/coordinated-new.webp",
        width: 1200,
        height: 630,
        alt: "THE COORDINATED LIVING",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE COORDINATED LIVING",
    description: "Welcome to a space dedicated to helping you find hope and guidance in life. Discover resources to help you build a closer relationship with the Lord, find purpose, and anchor your life in faith that provides lasting hope.",
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
        {/* OneSignal SDK */}
        <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.OneSignalDeferred = window.OneSignalDeferred || [];
              OneSignalDeferred.push(async function(OneSignal) {
                await OneSignal.init({
                  appId: "9e0ff598-168f-4e83-979f-c6e19991d297",
                });
              });
            `
          }}
        />
      </head>
      <body className={`${manrope.className} ${roboto.variable} ${amita.variable}`}>{children}</body>
    </html>
  );
}
