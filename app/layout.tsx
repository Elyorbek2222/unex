import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://unex.uz"),
  verification: {
    yandex: "2fbe3c005924e537",
    google: "W3ktBXhmbOvlVDNrzQarT_QlB2USi1J4VtZxZ-OtmN8",
  },
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
