import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import "./globals.css";

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'עורכת דין נדל״ן בבית שמש | מיכל סיימון – מכר, רכישה, קומבינציה',
  description: "מיכל סיימון, עורכת דין נדל״ן עם 15+ שנות ניסיון. ליווי מלא בעסקאות מכר, רכישה, בדיקת נאותות ותמ״א. פגישת ייעוץ ראשונית ללא עלות. 054-7850530",
  keywords: "עורכת דין נדלן, עורך דין נדלן בית שמש, עורכת דין מקרקעין, מכר דירה, רכישת דירה, בדיקת נאותות, עסקת קומבינציה, תמא, מיכל סיימון, עורך דין טאבו, ליווי משפטי נדלן",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://michalsimon.law",
  },
  openGraph: {
    title: 'עורכת דין נדל״ן בבית שמש | מיכל סיימון – מכר, רכישה, קומבינציה',
    description: "מיכל סיימון, עורכת דין נדל״ן עם 15+ שנות ניסיון. ליווי מלא בעסקאות מכר, רכישה, בדיקת נאותות ותמ״א. פגישת ייעוץ ראשונית ללא עלות.",
    url: "https://michalsimon.law",
    siteName: 'עו״ד מיכל סיימון — משרד עורכי דין נדל״ן',
    images: [
      {
        url: "/images/og-michal.jpg",
        width: 1200,
        height: 630,
        alt: 'עו״ד מיכל סיימון — עורכת דין נדל״ן בבית שמש',
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: 'עורכת דין נדל״ן | מיכל סיימון',
    description: "ליווי מלא בעסקאות מכר, רכישה, בדיקת נאותות ותמ״א. 15+ שנות ניסיון. פגישה ראשונית ללא עלות.",
    images: ["/images/og-michal.jpg"],
  },
  metadataBase: new URL("https://michalsimon.law"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${frankRuhlLibre.variable} ${heebo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo-white.png" />
        <meta name="theme-color" content="#0B1A2F" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
