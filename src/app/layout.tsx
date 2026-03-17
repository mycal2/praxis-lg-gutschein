import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Gutschein — Praxis Lebensgefühl",
  description: "Verschenken Sie 10% Rabatt auf eine Sitzung bei Praxis Lebensgefühl in Kiel.",
  openGraph: {
    title: "Gutschein — Praxis Lebensgefühl",
    description: "Verschenken Sie 10% Rabatt auf eine Sitzung bei Praxis Lebensgefühl in Kiel.",
    type: "website",
    locale: "de_DE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Praxis Lebensgefühl — 10% Gutschein" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gutschein — Praxis Lebensgefühl",
    description: "Verschenken Sie 10% Rabatt auf eine Sitzung bei Praxis Lebensgefühl in Kiel.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${nunitoSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
