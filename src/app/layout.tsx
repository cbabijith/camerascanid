import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.camerascan.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Camera Scan | Trusted Camera Sales, Service & Rental Since 1994",
    template: "%s | Camera Scan",
  },
  description:
    "Camera Scan — professional camera sales, repair, rental services, used cameras, accessories, and authorized servicing for leading brands. Serving Kottayam since 1994.",
  keywords: [
    "Camera Scan",
    "camera sales Kottayam",
    "camera repair Kottayam",
    "camera rental",
    "used cameras",
    "Canon service",
    "Nikon service",
    "Sony service",
    "sensor cleaning",
    "lens repair",
  ],
  authors: [{ name: "Camera Scan" }],
  creator: "Camera Scan",
  publisher: "Camera Scan",
  manifest: "/manifest.json",
  icons: {
    icon: "/camerasc.svg",
    apple: "/camerasc.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Camera Scan",
    title: "Camera Scan | Trusted Camera Sales, Service & Rental Since 1994",
    description:
      "Professional camera sales, repair, rental services, used cameras, accessories, and authorized servicing. Serving Kottayam since 1994.",
    images: [
      {
        url: "/camerasc.svg",
        width: 512,
        height: 512,
        alt: "Camera Scan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Camera Scan | Trusted Camera Sales, Service & Rental Since 1994",
    description:
      "Professional camera sales, repair, rental services, used cameras, accessories, and authorized servicing. Since 1994.",
    images: ["/camerasc.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Camera Scan",
  description:
    "Professional camera sales, repair, rental services, used cameras, accessories, and authorized servicing for leading brands.",
  url: SITE_URL,
  telephone: "+914812568876",
  email: "camerascan@gmail.com",
  foundingDate: "1994",
  image: `${SITE_URL}/camerasc.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "YMCA Buildings, Sastri Road",
    addressLocality: "Kottayam",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "9.5916",
    longitude: "76.5216",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    SITE_URL,
    "https://www.instagram.com/camera_scan_official/",
    "https://www.facebook.com/camerascankottayam/",
    "https://www.youtube.com/@camerascan1",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
