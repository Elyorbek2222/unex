import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@/app/globals.css";

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
    <html lang={lang} className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
