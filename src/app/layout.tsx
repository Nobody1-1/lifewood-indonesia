import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// Optimasi font loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Optimasi font loading
  preload: true,
});

export const metadata: Metadata = {
  title: "Life Wood Indonesia - Premium Furniture",
  description: "PT. Life Wood Indonesia - Premium furniture manufacturer from Jepara, Indonesia. Discover our high-quality wooden furniture and visit our stores across Indonesia.",
  keywords: "furniture, wooden furniture, premium furniture, Indonesia, Jepara, Life Wood",
  authors: [{ name: "Life Wood Indonesia" }],
  creator: "Life Wood Indonesia",
  publisher: "Life Wood Indonesia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Life Wood Indonesia - Premium Furniture",
    description: "Premium furniture manufacturer from Jepara, Indonesia",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: "Life Wood Indonesia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life Wood Indonesia - Premium Furniture",
    description: "Premium furniture manufacturer from Jepara, Indonesia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistSans.variable}>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//unpkg.com" />
        <link rel="dns-prefetch" href="//www.openstreetmap.org" />
      </head>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-white">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
