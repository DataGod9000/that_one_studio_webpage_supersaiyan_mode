import type { Metadata, Viewport } from "next";
import { Big_Shoulders, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Chrome } from "@/components/Chrome";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { MotionProvider } from "@/components/motion";
import { SITE } from "@/lib/content";

const display = Big_Shoulders({ variable: "--f-display", subsets: ["latin"], weight: ["800"] });
const sans = Manrope({ variable: "--f-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--f-mono", subsets: ["latin"] });

export const viewport: Viewport = { themeColor: "#070706", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "That One Studio | Film studio rental & setbuilding in Singapore", template: "%s | That One Studio" },
  description:
    "1,464 sq ft film studio with a 980 sq ft white cyclorama at Tagore Lane, Singapore. Studio rental and custom setbuilding for film, photo and commercial productions.",
  openGraph: {
    type: "website", siteName: SITE.name, locale: "en_SG",
    title: "That One Studio | Film studio rental & setbuilding in Singapore",
    description: "White cyclorama studio rental and custom setbuilding at Tagore Lane, Singapore.",
    images: [{ url: "/images/studio/facilities.jpg", width: 2400, height: 1600, alt: "Studio lights against the white cyclorama" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description: SITE.tagline,
  url: SITE.url,
  email: SITE.email,
  image: `${SITE.url}/images/studio/facilities.jpg`,
  sameAs: [SITE.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: "Singapore",
    postalCode: SITE.address.postal,
    addressCountry: "SG",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-3 focus:text-ink">
          Skip to content
        </a>
        <MotionProvider>
          <Chrome />
          <Nav />
          <main id="main" className="relative">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
