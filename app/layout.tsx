import type { Metadata } from "next";

export const metadata: Metadata = {
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
  return children as React.ReactElement;
}
