import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const BASE_URL = "https://applyauto.ai";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ApplyAuto — Automated Job Applications & Hiring Manager Outreach",
    template: "%s | ApplyAuto",
  },
  description:
    "Stop filling out job applications manually. ApplyAuto automatically applies to jobs on LinkedIn, Indeed, and company career portals — then contacts the hiring manager directly. 18.4% interview rate. Start free.",
  keywords: [
    "automated job applications",
    "auto apply to jobs",
    "job application automation",
    "apply to jobs automatically",
    "AI job application software",
    "job search automation",
    "automatic job applicant",
    "job application bot",
    "apply to 100 jobs automatically",
    "automate job search",
  ],
  authors: [{ name: "ApplyAuto" }],
  creator: "ApplyAuto",
  publisher: "ApplyAuto",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "ApplyAuto",
    title: "ApplyAuto — Apply to Jobs Automatically While You Sleep",
    description:
      "Upload your resume once. ApplyAuto applies to jobs on your behalf and reaches out to hiring managers directly. 14,203+ applications sent, 18.4% interview rate.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ApplyAuto — Automated Job Application Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ApplyAuto — Apply to Jobs Automatically",
    description:
      "Stop filling out job applications manually. ApplyAuto applies for you and contacts the hiring manager directly.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
