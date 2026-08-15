import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.description,
  keywords: site.keywords,
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- to jest root layout, więc dotyczy każdej strony */}
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Chettan+2:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
