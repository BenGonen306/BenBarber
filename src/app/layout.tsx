import type { Metadata } from "next";
import { Heebo, Rubik } from "next/font/google";
import Script from "next/script";
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
  title: "מכללת גורדון | הנדסאי אלקטרוניקה ומכטרוניקה י״ג י״ד",
  description:
    "מסלול ייחודי לדחיית שירות או לאחר שירות: תעודת הנדסאי אלקטרוניקה / מכטרוניקה, תואר ראשון ותעודת הוראה טכנולוגית - הכול בשנתיים בלבד.",
  keywords: [
    "גורדון",
    "הנדסאי",
    "אלקטרוניקה",
    "מכטרוניקה",
    "תעודת הוראה",
    "תואר ראשון",
    "י״ג י״ד",
    "דחיית שירות",
    "מלגת פרח",
  ],
  openGraph: {
    title: "מכללת גורדון | הנדסאי אלקטרוניקה ומכטרוניקה",
    description:
      "שלוש תעודות בשנתיים: הנדסאי + תואר ראשון + תעודת הוראה. הרשמה לתשפ״ז פתוחה.",
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
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2034031087149219');
          fbq('track', 'PageView');
        `}</Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2034031087149219&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen overflow-x-hidden pt-12">
        {children}
      </body>
    </html>
  );
}
