import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const clashDisplay = localFont({
  src: [
    { path: "../public/fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ClashDisplay-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://allan-kj.github.io"),
  applicationName: "Allan K.J",
  title: "Allan K.J — Cybersecurity Specialist & Creative 3D Engineer",
  description:
    "Official interactive 3D portfolio of Allan K.J — Cybersecurity specialist and creative developer. Explore real-time WebGL experiences, IPsec VPN security research, and full-stack software engineering.",
  keywords: [
    "Allan K.J",
    "Allan K J",
    "Allan KJ",
    "Allan Karunya",
    "Allan Cybersecurity",
    "Full-Stack Developer",
    "Creative Developer",
    "Allan portfolio",
    "IPsec Sentinel",
  ],
  authors: [{ name: "Allan K.J", url: "https://allan-kj.github.io/" }],
  alternates: {
    canonical: "https://allan-kj.github.io/",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon-192.png",
  },
  openGraph: {
    title: "Allan K.J — Cybersecurity Specialist & Creative 3D Engineer",
    description:
      "Official interactive 3D portfolio of Allan K.J — Cybersecurity specialist and creative developer. Featuring real-time WebGL 3D scenes and security research.",
    url: "https://allan-kj.github.io/",
    siteName: "Allan K.J",
    images: [
      {
        url: "https://allan-kj.github.io/icon-512.png",
        width: 512,
        height: 512,
        alt: "Allan K.J Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allan K.J — Cybersecurity Specialist & Creative 3D Engineer",
    description:
      "Official interactive 3D portfolio of Allan K.J — Cybersecurity specialist and creative developer.",
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
    google: "google86647f30133a7bb7",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Allan K.J",
  alternateName: ["Allan K.J Portfolio", "Allan Portfolio", "Allan KJ"],
  url: "https://allan-kj.github.io/",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Allan K J",
  alternateName: ["Allan K.J", "Allan K. J.", "Allan KJ"],
  url: "https://allan-kj.github.io/",
  image: "https://allan-kj.github.io/icon-512.png",
  jobTitle: "Cybersecurity Specialist & Full-Stack Developer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Karunya Institute of Technology and Sciences",
  },
  sameAs: [
    "https://github.com/ALLAN-KJ",
    "https://linkedin.com/in/allan-k-j-21389838a",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${clashDisplay.variable} h-full antialiased font-sans`}
    >
      <head>
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
