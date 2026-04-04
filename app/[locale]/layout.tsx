import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "optional",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "optional",
  variable: "--font-playfair",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL("https://unex.uz"),
    icons: {
      icon: "/logo-red-bg.png",
      shortcut: "/logo-red-bg.png",
      apple: "/logo-red-bg.png",
    },
    other: {
      "og:site_name": "UNEX Express",
    },
    alternates: {
      languages: {
        uz: "https://unex.uz/uz",
        ru: "https://unex.uz/ru",
        "x-default": "https://unex.uz/uz",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale === "ru" ? "ru" : "uz";

  return (
    <html lang={lang} className={`h-full antialiased ${inter.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col bg-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
