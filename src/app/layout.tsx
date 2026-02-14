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
  title: {
    default: 'מיכל סיימון | עורכת דין - נדל"ן ומקרקעין',
    template: "%s | מיכל סיימון - עורכת דין",
  },
  description:
    'עורכת דין מיכל סיימון - משרד עורכי דין המתמחה בנדל"ן, מקרקעין ועסקאות נדל"ן. ליווי משפטי מקצועי ואישי בבית שמש והסביבה.',
  keywords: [
    "עורכת דין",
    'נדל"ן',
    "מקרקעין",
    "בית שמש",
    'עסקאות נדל"ן',
    "ליווי משפטי",
    "מיכל סיימון",
  ],
  authors: [{ name: "מיכל סיימון" }],
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "מיכל סיימון | עורכת דין",
    title: 'מיכל סיימון | עורכת דין - נדל"ן ומקרקעין',
    description:
      'משרד עורכי דין המתמחה בנדל"ן, מקרקעין ועסקאות נדל"ן. ליווי משפטי מקצועי ואישי.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://michalsimonlaw.com"),
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
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
