import type { Metadata } from "next";
import { Roboto_Flex, Unica_One } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

import Header from "@/components/ui-elements/Header";
import Footer from "@/components/ui-elements/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, BUSINESS } from "@/lib/site";
import { organizationSchema } from "@/lib/schema";

const unicaOne = Unica_One({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-unica-one",
  weight: "400",
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-flex",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS.name} | Licensed DMV Contractor`,
    template: `%s | ${BUSINESS.shortName}`,
  },
  description:
    "Licensed general contractor serving residential, commercial, and government clients across Maryland and Washington, DC since 2010. MHIC, GC, and New Home Builder licensed.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: BUSINESS.name,
    url: SITE_URL,
    title: `${BUSINESS.name} | Licensed DMV Contractor`,
    description:
      "Licensed general contractor serving the DMV — residential, commercial, and government projects since 2010.",
    images: [{ url: "/kitchen.jpg", width: 1200, height: 630, alt: BUSINESS.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: BUSINESS.name,
    description:
      "Licensed general contractor serving the DMV since 2010 — residential, commercial, and government.",
    images: ["/kitchen.jpg"],
  },
};

export default function RootLayout({
   children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;

    return (
        <html lang="en" className={`${robotoFlex.variable} ${unicaOne.variable}`} suppressHydrationWarning>
            <body className={`${robotoFlex.className} antialiased`}>
                <JsonLd data={organizationSchema} />
                <ThemeProvider>
                    <Header />
                    <main id="main-content">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
            {gaId && <GoogleAnalytics gaId={gaId} />}
        </html>
    );
}
