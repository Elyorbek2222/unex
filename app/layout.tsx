import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "UNEX Express — Kuryerlik Xizmati | O'zbekiston",
    template: "%s",
  },
  description: "O'zbekiston bo'ylab 24 soatda yetkazish. 60+ filial, 12 viloyat. Bepul qadoqlash va sug'urta.",
  metadataBase: new URL("https://unex.uz"),
  icons: {
    icon: "/logo-red-bg.png",
    shortcut: "/logo-red-bg.png",
    apple: "/logo-red-bg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
