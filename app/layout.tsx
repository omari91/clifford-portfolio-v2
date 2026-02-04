import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "../components/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Clifford Ondieki | Power Systems Engineer & Grid Systems Architect",
  description:
    "Clifford Ondieki - Power Systems Engineer | IEEE ETECOM 2025 Best Paper Award Winner | M.Sc. Engineering Management | Grid Integration, Renewable Energy & PowerFactory Simulation | Berlin, Germany",
  keywords: [
    "Clifford Omari Ondieki",
    "Power Systems Engineer",
    "Grid Integration",
    "PowerFactory",
    "VDE 4110",
    "Python",
    "IEEE",
    "Renewable Energy",
    "Germany",
    "Engineering Management",
    "Redispatch 3.0",
  ],
  authors: [{ name: "Clifford Omari Ondieki" }],
  robots: { index: true, follow: true },
  other: {
    language: "en",
  },
  icons: { icon: "/imgs/man.jpg" },
  openGraph: {
    type: "website",
    url: "https://www.cliffordomari.com/",
    title: "Clifford Ondieki — Power Systems Engineer & Hybrid Innovator",
    description:
      "IEEE Researcher and Power Systems Engineer bridging PowerFactory simulation and real-world grid integration.",
    images: ["https://www.cliffordomari.com/imgs/og-preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clifford Ondieki — Power Systems Engineer",
    description:
      "IEEE Researcher and Power Systems Engineer bridging PowerFactory simulation and real-world grid integration.",
    images: ["https://www.cliffordomari.com/imgs/og-preview.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#303F9F",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Clifford Omari Ondieki",
  url: "https://www.cliffordomari.com/",
  image: "https://www.cliffordomari.com/imgs/GOAT.jpg",
  jobTitle: "Power Systems Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Independent Grid Engineering Research & Projects",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  sameAs: [
    "https://www.linkedin.com/in/clifford-ondieki-tpm/",
    "https://github.com/omari91",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Clifford Omari",
  url: "https://www.cliffordomari.com/",
  inLanguage: "en-DE",
  author: {
    "@type": "Person",
    name: "Clifford Omari Ondieki",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
