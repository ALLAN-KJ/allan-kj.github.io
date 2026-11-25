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
  metadataBase: new URL("https://allan-kj.github.io/"),
  applicationName: "Allan K.J",
  title: "Allan K.J — Cybersecurity Specialist & Creative 3D Engineer",
  description:
    "Official interactive 3D portfolio of Allan K.J — Cybersecurity specialist and creative developer. Explore real-time WebGL experiences, IPsec VPN security research, and full-stack software engineering.",
  keywords: [
    "Allan K.J",
    "Allan K J",
    "Allan KJ",
    "Allan K.J portfolio",
    "Allan K.J official website",
    "Allan K.J developer",
    "Allan Karunya",
    "Allan Cybersecurity",
    "Full-Stack Developer",
    "Creative Developer",
    "Allan portfolio",
    "IPsec Sentinel",
  ],
  authors: [{ name: "Allan K.J", url: "https://allan-kj.github.io/" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Allan K.J — Cybersecurity Specialist & Creative 3D Engineer",
    description:
      "Official interactive 3D portfolio of Allan K.J — Cybersecurity specialist and creative developer. Featuring real-time WebGL 3D scenes and security research.",
    url: "https://allan-kj.github.io/",
    siteName: "Allan K.J",
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
  "@id": "https://allan-kj.github.io/#website",
  name: "Allan K.J",
  alternateName: ["Allan K.J Portfolio", "Allan Portfolio", "Allan KJ"],
  url: "https://allan-kj.github.io/",
  publisher: {
    "@id": "https://allan-kj.github.io/#person",
  },
  author: {
    "@id": "https://allan-kj.github.io/#person",
  },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://allan-kj.github.io/#profilepage",
  dateCreated: "2026-08-19",
  dateModified: "2026-11-25",
  mainEntity: {
    "@id": "https://allan-kj.github.io/#person",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://allan-kj.github.io/#person",
  name: "Allan K J",
  alternateName: ["Allan K.J", "Allan K. J.", "Allan KJ"],
  url: "https://allan-kj.github.io/",
  image: "https://allan-kj.github.io/icon-512.png",
  jobTitle: "Cybersecurity Specialist & Full-Stack Developer",
  description:
    "Cybersecurity specialist and creative developer engineering immersive 3D web applications, network defense systems, and full-stack software architectures.",
  disambiguatingDescription:
    "Cybersecurity specialist, network defense researcher, and creative full-stack software engineer based in India, alumnus of Karunya Institute of Technology and Sciences.",
  knowsAbout: [
    "Cybersecurity",
    "Network Security",
    "IPsec VPN Architecture",
    "Full-Stack Web Development",
    "Next.js",
    "TypeScript",
    "Three.js",
    "GSAP Animation",
    "Tailwind CSS",
    "Linux System Administration",
    "IoT Architectures",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Karunya Institute of Technology and Sciences",
    sameAs: "https://www.karunya.edu/",
  },
  worksFor: {
    "@type": "Organization",
    name: "ZF Group (ZF Friedrichshafen AG)",
    sameAs: "https://www.zf.com/",
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Privacy and Security in Online Social Media",
      credentialCategory: "NPTEL Elite Certification",
      recognizedBy: {
        "@type": "Organization",
        name: "NPTEL (IIIT Hyderabad / IIT Madras)",
      },
      url: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL26CS141S1084806030",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Red Hat System Administration I (RH124)",
      credentialCategory: "Certificate of Attendance",
      recognizedBy: {
        "@type": "Organization",
        name: "Red Hat",
      },
      url: "https://www.credly.com/badges/d96a0650-ceea-430e-85cd-f56ea4f194a0",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Artificial Intelligence Fundamentals",
      credentialCategory: "Professional Credential",
      recognizedBy: {
        "@type": "Organization",
        name: "IBM SkillsBuild",
      },
      url: "https://www.credly.com/badges/49bc6703-d622-46a9-a8c5-1a1a95fdd993",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Oracle Java Foundations (1Z0-811)",
      credentialCategory: "Professional Credential",
      recognizedBy: {
        "@type": "Organization",
        name: "Oracle",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Introduction to IoT",
      credentialCategory: "Student Credential",
      recognizedBy: {
        "@type": "Organization",
        name: "Cisco Networking Academy",
      },
    },
  ],
  sameAs: [
    "https://github.com/ALLAN-KJ",
    "https://linkedin.com/in/allan-k-j-21389838a",
    "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL26CS141S1084806030",
    "https://www.credly.com/badges/d96a0650-ceea-430e-85cd-f56ea4f194a0",
    "https://www.credly.com/badges/49bc6703-d622-46a9-a8c5-1a1a95fdd993",
  ],
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://allan-kj.github.io/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${clashDisplay.variable} h-full antialiased font-sans`}
    >
      <head>
        <link rel="canonical" href="https://allan-kj.github.io/" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
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
