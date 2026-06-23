import type { Metadata } from "next";
import { Heebo, Rubik } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "בנג'י – מספרת בוטיק ואקדמיה לספרות גברים | חולון",
  description:
    "בן גונן – מספרת בוטיק יוקרתית ואקדמיה מובילה לספרות גברים בחולון. קורסים פרונטליים ודיגיטליים, תרגול על לקוחות אמיתיים, וצוות All-Stars שיביא אותך לגרסה הכי חדה שלך.",
  keywords: [
    "ספרות גברים",
    "אקדמיה לספרות",
    "מספרה חולון",
    "בן גונן",
    "ברברינג",
    "קורס ספרות",
    "תספורת גברים",
    "בנג'י",
  ],
  openGraph: {
    title: "בנג'י – מספרת בוטיק ואקדמיה לספרות גברים",
    description: "חוויית ברברינג פרמיום ואקדמיה לספרות גברים. הרוקמים 23, חולון.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${rubik.variable}`}>
      <head />
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "linear-gradient(135deg, #1a1a1a 0%, #96031a 100%)",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          overflowX: "hidden",
          color: "#ffffff",
          fontFamily: "var(--font-heebo), sans-serif",
        }}
      >
        {/* Epoxy floor texture overlay */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(120deg, transparent 0px, transparent 120px, rgba(255,255,255,0.011) 120px, rgba(255,255,255,0.011) 121px), repeating-linear-gradient(240deg, transparent 0px, transparent 90px, rgba(255,255,255,0.007) 90px, rgba(255,255,255,0.007) 91px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <SiteHeader />
          <main style={{ paddingTop: 72 }}>{children}</main>
          <SiteFooter />
        </div>
        <AccessibilityWidget />
      </body>
    </html>
  );
}
