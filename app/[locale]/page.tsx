import type { Metadata } from "next";
import HomeClient from "./_home-client";

type Props = { params: Promise<{ locale: string }> };

const BASE_URL = "https://unex.uz";

const SEO = {
  uz: {
    title:       "UNEX Express — Kuryerlik Xizmati O'zbekistonda | 60+ Filial, 24 Soatda Yetkazish",
    description: "O'zbekiston bo'ylab 24 soatda yetkazish kafolati. 60+ filial, 12 viloyat. Sovg'alar, hujjatlar, posylkalar — bepul qadoqlash, sug'urta va kuryer 30 daqiqada. +998 55 500-22-55",
    keywords:    "kuryerlik xizmati toshkent, posylka yetkazish, unex express, kuryer o'zbekiston, tez yetkazish, express yetkazish uzbekiston, 24 soatda yetkazish",
    og_locale:   "uz_UZ",
  },
  ru: {
    title:       "UNEX Express — Курьерская Служба в Узбекистане | 60+ Филиалов, Доставка за 24 Часа",
    description: "Доставка по всему Узбекистану за 24 часа. 60+ филиалов, 12 регионов. Подарки, документы, посылки — бесплатная упаковка, страховка, курьер через 30 минут. +998 55 500-22-55",
    keywords:    "курьерская служба ташкент, доставка посылок узбекистан, unex express, экспресс доставка, курьер, доставка за 24 часа ташкент",
    og_locale:   "ru_RU",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale === "ru" ? "ru" : "uz";
  const s = SEO[l];

  return {
    title:       s.title,
    description: s.description,
    keywords:    s.keywords,
    alternates: {
      canonical: `${BASE_URL}/${l}`,
      languages: {
        "uz":        `${BASE_URL}/uz`,
        "ru":        `${BASE_URL}/ru`,
        "x-default": `${BASE_URL}/uz`,
      },
    },
    openGraph: {
      title:       s.title,
      description: s.description,
      url:         `${BASE_URL}/${l}`,
      siteName:    "UNEX Express",
      type:        "website",
      locale:      s.og_locale,
    },
    twitter: {
      card:        "summary_large_image",
      title:       s.title,
      description: s.description,
    },
    robots: {
      index:          true,
      follow:         true,
      googleBot: {
        index:             true,
        follow:            true,
        "max-snippet":     -1,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const l = (locale === "ru" ? "ru" : "uz") as "uz" | "ru";

  /* ── JSON-LD: LocalBusiness ── */
  const jsonLd = {
    "@context":             "https://schema.org",
    "@type":                ["LocalBusiness", "CourierService"],
    "@id":                  `${BASE_URL}/${l}`,
    name:                   "UNEX Express",
    alternateName:          "UNEX EXPRESS",
    url:                    `${BASE_URL}/${l}`,
    logo:                   `${BASE_URL}/logo-red-bg.png`,
    image:                  `${BASE_URL}/logo-red-bg.png`,
    description:            SEO[l].description,
    telephone:              "+998552002255",
    email:                  "unex0102@gmail.com",
    address: {
      "@type":          "PostalAddress",
      addressCountry:   "UZ",
      addressLocality:  l === "ru" ? "Ташкент" : "Toshkent",
      addressRegion:    l === "ru" ? "Ташкент" : "Toshkent",
    },
    geo: {
      "@type":    "GeoCoordinates",
      latitude:   41.2995,
      longitude:  69.2401,
    },
    areaServed: {
      "@type": "Country",
      name:    "Uzbekistan",
    },
    openingHoursSpecification: {
      "@type":     "OpeningHoursSpecification",
      dayOfWeek:   ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens:       "07:00",
      closes:      "23:00",
    },
    priceRange: "$$",
    aggregateRating: {
      "@type":       "AggregateRating",
      ratingValue:   "4.9",
      reviewCount:   "2400",
      bestRating:    "5",
      worstRating:   "1",
    },
    sameAs: [
      "https://t.me/unexexpress",
    ],
  };

  /* ── JSON-LD: Service ── */
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type":    "Service",
    name:       l === "ru" ? "Курьерская доставка по Узбекистану" : "O'zbekiston bo'ylab kuryerlik yetkazish",
    provider: {
      "@type": "Organization",
      name:    "UNEX Express",
    },
    areaServed:      { "@type": "Country", name: "Uzbekistan" },
    availableChannel: {
      "@type":           "ServiceChannel",
      servicePhone:      "+998552002255",
      serviceUrl:        `${BASE_URL}/${l}`,
      availableLanguage: ["Uzbek", "Russian"],
    },
    offers: {
      "@type":        "Offer",
      priceCurrency:  "UZS",
      price:          "20000",
      priceValidUntil: "2025-12-31",
      description:    l === "ru" ? "Доставка от 20 000 сум" : "Yetkazish 20 000 so'mdan",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <HomeClient locale={l} />
    </>
  );
}
