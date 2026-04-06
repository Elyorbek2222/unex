import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
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
    openGraph: {
      images: [
        {
          url: "/hero-bg.jpg",
          width: 1200,
          height: 630,
          alt: "UNEX Express — Kuryerlik Xizmati",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/hero-bg.jpg"],
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
        <Script id="yandex-metrika" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=108413555','ym');
          ym(108413555,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});
        `}</Script>
        <noscript><img src="https://mc.yandex.ru/watch/108413555" style={{position:"absolute",left:"-9999px"}} alt="" /></noscript>
      </body>
    </html>
  );
}
