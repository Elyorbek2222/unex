import type { Metadata } from "next";
import HomeClient from "./_home-client";

type Props = { params: Promise<{ locale: string }> };

const BASE_URL = "https://unex.uz";
const OG_IMAGE = `${BASE_URL}/van-boxes.jpg`;

// ISR — 1 soatda bir yangilanadi, edge cache yoqiladi
export const revalidate = 3600;

const SEO = {
  uz: {
    title:       "UNEX Express — Kuryerlik Xizmati O'zbekistonda | 60+ Filial",
    description: "O'zbekiston bo'ylab 24 soatda yetkazish kafolati. 60+ filial, 12 viloyat. Bepul qadoqlash, sug'urta, kuryer 30 daqiqada. +998 55 500-22-55",
    keywords:    "kuryerlik xizmati toshkent, posylka yetkazish, unex express, kuryer o'zbekiston, tez yetkazish, 24 soatda yetkazish",
    og_locale:   "uz_UZ",
  },
  ru: {
    title:       "UNEX Express — Курьерская служба в Узбекистане | 60+ Филиалов",
    description: "Доставка по Узбекистану за 24 часа. 60+ филиалов, 12 регионов. Бесплатная упаковка, страховка, курьер через 30 минут.",
    keywords:    "курьерская служба ташкент, доставка посылок узбекистан, unex express, экспресс доставка, курьер 24 часа",
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
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "UNEX Express — Kuryer xizmati" }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       s.title,
      description: s.description,
      images:      [OG_IMAGE],
    },
    robots: {
      index:          true,
      follow:         true,
      googleBot: {
        index:               true,
        follow:              true,
        "max-snippet":       -1,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const l = (locale === "ru" ? "ru" : "uz") as "uz" | "ru";
  const isRu = l === "ru";

  /* ── JSON-LD: LocalBusiness ── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type":    "LocalBusiness",
    "@id":      `${BASE_URL}/#organization`,
    name:       "UNEX Express",
    legalName:  "ООО «UNEX EXPRESS»",
    url:        `${BASE_URL}/${l}`,
    logo: {
      "@type":  "ImageObject",
      url:      `${BASE_URL}/logo-red-bg.png`,
      width:    400,
      height:   120,
    },
    image: {
      "@type":  "ImageObject",
      url:      OG_IMAGE,
      width:    1200,
      height:   630,
    },
    description:  SEO[l].description,
    telephone:    "+998552002255",
    email:        "unex0102@gmail.com",
    address: {
      "@type":         "PostalAddress",
      addressCountry:  "UZ",
      addressLocality: isRu ? "Ташкент" : "Toshkent",
      addressRegion:   isRu ? "Ташкент" : "Toshkent",
      streetAddress:   isRu ? "г. Ташкент" : "Toshkent sh.",
    },
    geo: {
      "@type":   "GeoCoordinates",
      latitude:  41.2995,
      longitude: 69.2401,
    },
    areaServed: [
      "Toshkent","Samarqand","Farg'ona","Andijon","Namangan",
      "Buxoro","Qarshi","Termiz","Urganch","Navoiy",
      "Jizzax","Nukus",
    ],
    openingHoursSpecification: {
      "@type":    "OpeningHoursSpecification",
      dayOfWeek:  ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens:      "07:00",
      closes:     "23:00",
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
    name:       isRu ? "Курьерская доставка по Узбекистану" : "O'zbekiston bo'ylab kuryerlik yetkazish",
    serviceType: isRu ? "Курьерская служба" : "Kuryerlik xizmati",
    provider: {
      "@type": "LocalBusiness",
      "@id":   `${BASE_URL}/#organization`,
      name:    "UNEX Express",
    },
    areaServed: { "@type": "Country", name: "Uzbekistan" },
    availableChannel: {
      "@type":           "ServiceChannel",
      servicePhone:      "+998552002255",
      serviceUrl:        `${BASE_URL}/${l}`,
      availableLanguage: [
        { "@type": "Language", name: "Uzbek" },
        { "@type": "Language", name: "Russian" },
      ],
    },
    offers: {
      "@type":          "Offer",
      priceCurrency:    "UZS",
      price:            "20000",
      priceValidUntil:  "2026-12-31",
      description:      isRu ? "Доставка от 20 000 сум" : "Yetkazish 20 000 so'mdan",
    },
  };

  /* ── JSON-LD: WebSite ── */
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type":    "WebSite",
    "@id":      `${BASE_URL}/#website`,
    url:        `${BASE_URL}/${l}`,
    name:       "UNEX Express",
    publisher:  { "@type": "LocalBusiness", "@id": `${BASE_URL}/#organization` },
    inLanguage: l === "ru" ? "ru" : "uz",
  };

  /* ── JSON-LD: FAQPage ── */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: isRu ? [
      {
        "@type": "Question",
        name:    "Сколько стоит доставка UNEX Express?",
        acceptedAnswer: {
          "@type": "Answer",
          text:    "Стандартная доставка UNEX Express начинается от 20 000 сум. Точная стоимость зависит от веса, способа доставки (офис–офис, дверь–дверь) и типа тарифа (стандарт или транзит). Для расчёта используйте онлайн-калькулятор на сайте. Бесплатная упаковка и страховка включены в стоимость.",
        },
      },
      {
        "@type": "Question",
        name:    "Когда приедет курьер UNEX Express?",
        acceptedAnswer: {
          "@type": "Answer",
          text:    "Курьер UNEX Express приедет в течение 30 минут после оформления заявки. Работаем ежедневно с 07:00 до 23:00 без выходных. Доставка по всему Ташкенту и 12 регионам Узбекистана.",
        },
      },
      {
        "@type": "Question",
        name:    "В какие регионы Узбекистана доставляет UNEX Express?",
        acceptedAnswer: {
          "@type": "Answer",
          text:    "UNEX Express доставляет во все 12 регионов Узбекистана: Ташкент, Самарканд, Фергана, Андижан, Наманган, Бухара, Карши, Термез, Ургенч, Навои, Джизак, Нукус. Более 60 филиалов по всей стране. Срок доставки: 18–24 часа для основных городов, 18–48 часов для отдалённых районов.",
        },
      },
      {
        "@type": "Question",
        name:    "Что происходит если посылка повреждена при доставке?",
        acceptedAnswer: {
          "@type": "Answer",
          text:    "Каждая посылка UNEX Express застрахована автоматически без доплаты. В случае повреждения или потери возмещаем полную объявленную стоимость без лишних документов и вопросов. Процент повреждений — 0%.",
        },
      },
      {
        "@type": "Question",
        name:    "Принимает ли UNEX Express наложенный платёж?",
        acceptedAnswer: {
          "@type": "Answer",
          text:    "Да, UNEX Express принимает наложенный платёж с комиссией 0%. Деньги переводятся отправителю напрямую. Особенно удобно для интернет-магазинов. Бесплатное хранение посылки 7 дней.",
        },
      },
      {
        "@type": "Question",
        name:    "Сколько времени хранится посылка в UNEX Express?",
        acceptedAnswer: {
          "@type": "Answer",
          text:    "UNEX Express бесплатно хранит посылку 7 дней. Если получатель не забрал посылку в течение 7 дней, начисляется небольшая плата за хранение за каждый дополнительный день.",
        },
      },
    ] : [
      {
        "@type": "Question",
        name:    "UNEX Express yetkazish narxi qancha?",
        acceptedAnswer: {
          "@type": "Answer",
          text:    "UNEX Express standart yetkazish 20 000 so'mdan boshlanadi. Aniq narx og'irlik, yetkazish usuli (ofis–ofis, eshik–eshik) va tarif turiga (standart yoki tranzit) qarab belgilanadi. Saytdagi kalkulyatorda 1 daqiqada aniq narxni bilib oling. Bepul qadoqlash va sug'urta narxga kiradi.",
        },
      },
      {
        "@type": "Question",
        name:    "UNEX Express kuryer qachon keladi?",
        acceptedAnswer: {
          "@type": "Answer",
          text:    "UNEX Express kuryer ariza berilgandan so'ng 30 daqiqa ichida keladi. Har kuni 07:00 dan 23:00 gacha ishlaydi. Toshkent va O'zbekistonning 12 viloyatiga yetkazamiz.",
        },
      },
      {
        "@type": "Question",
        name:    "UNEX Express O'zbekistonning qaysi viloyatlariga yetkazadi?",
        acceptedAnswer: {
          "@type": "Answer",
          text:    "UNEX Express O'zbekistonning barcha 12 viloyatiga yetkazadi: Toshkent, Samarqand, Farg'ona, Andijon, Namangan, Buxoro, Qarshi, Termiz, Urganch, Navoiy, Jizzax, Nukus. 60 dan ortiq filial. Yetkazish muddati: asosiy shaharlar 18–24 soat, uzoq tumanlar 18–48 soat.",
        },
      },
      {
        "@type": "Question",
        name:    "Posilka shikastlansa UNEX Express nima qiladi?",
        acceptedAnswer: {
          "@type": "Answer",
          text:    "Har bir UNEX Express posilkasi qo'shimcha to'lovsiz avtomatik sug'urtalangan. Shikast yetsa yoki yo'qolsa — hujjatsiz va savolsiz to'liq qiymatini qaytaramiz. Shikastlanish foizi — 0%.",
        },
      },
      {
        "@type": "Question",
        name:    "UNEX Express naqdli to'lovni qabul qiladimi?",
        acceptedAnswer: {
          "@type": "Answer",
          text:    "Ha, UNEX Express 0% komissiya bilan naqdli to'lovni qabul qiladi. Pul to'g'ridan-to'g'ri jo'natuvchiga o'tkaziladi. Internet do'konlar uchun juda qulay. Posilkani 7 kun bepul saqlash xizmati ham bor.",
        },
      },
      {
        "@type": "Question",
        name:    "Posilka UNEX Express da qancha vaqt saqlanadi?",
        acceptedAnswer: {
          "@type": "Answer",
          text:    "UNEX Express posilkani 7 kun bepul saqlaydi. Agar qabul qiluvchi 7 kun ichida olmasa, har qo'shimcha kun uchun kichik saqlash haqi olinadi.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HomeClient locale={l} />
    </>
  );
}
