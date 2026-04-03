# UNEX Express — Loyiha Hujjati

> «UNEX EXPRESS» MChJ — O'zbekiston bo'ylab kuryerlik xizmati
> Sayt: https://unex.uz | GitHub: https://github.com/Elyorbek2222/unex

---

## 1. Texnologiyalar

| Soha | Texnologiya | Versiya |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.2 |
| UI kutubxonasi | React | 19.2.4 |
| Til | TypeScript | 5.x |
| Stil | Tailwind CSS | v4 |
| Animatsiya | Framer Motion | 12.38.0 |
| 3D grafika | Three.js + @react-three/fiber | 0.183.2 |
| Ikonlar | Lucide React | 1.7.x |
| Form | React Hook Form + Zod | 7.x |
| Xaritalar | Leaflet + React-Leaflet | 1.9.4 |
| Analytics | Vercel Analytics | latest |
| Deploy | Vercel | — |

---

## 2. Loyiha Tuzilmasi

```
unex-express/
├── app/
│   ├── layout.tsx                  # Root layout (minimal, html/body yo'q)
│   ├── page.tsx                    # / → /uz (permanentRedirect 308)
│   ├── robots.ts                   # /robots.txt — AI crawler ruxsatlari
│   ├── sitemap.ts                  # /sitemap.xml — barcha URLlar
│   ├── globals.css                 # Global stillar, animatsiyalar, Tailwind
│   └── [locale]/
│       ├── layout.tsx              # <html lang={locale}> dinamik
│       ├── page.tsx                # Bosh sahifa (SEO metadata + JSON-LD)
│       ├── _home-client.tsx        # Barcha seksiyalar (client component)
│       └── calculator/
│           └── page.tsx            # Tarif kalkulyatori sahifasi
│
├── components/
│   ├── 3d/
│   │   └── HeroScene.tsx           # Three.js 3D sahna (float animatsiya)
│   ├── layout/
│   │   ├── Header.tsx              # Navigatsiya (eski)
│   │   └── Footer.tsx              # Footer (eski)
│   ├── map/
│   │   └── UzbekistanMap.tsx       # SVG xarita, filiallar
│   └── sections/                   # Eski seksiyalar (zaxira)
│       ├── HeroSection.tsx
│       ├── CalculatorSection.tsx
│       ├── ContactSection.tsx
│       ├── PartnersSection.tsx
│       ├── ServicesSection.tsx
│       └── StatsSection.tsx
│
├── lib/
│   ├── pricing.ts                  # Rasmiy tarif jadvallari (standart + tranzit)
│   ├── dictionary.ts               # Til fayllari loader
│   └── locations.ts                # Filiallar koordinatalari
│
├── messages/
│   ├── uz.json                     # O'zbek tili
│   ├── ru.json                     # Rus tili
│   └── en.json                     # Ingliz tili
│
├── public/
│   ├── van-animation.mp4           # Asosiy hero video (scroll-scrub)
│   ├── map.mp4                     # Filiallar xaritasi animatsiya
│   ├── van-boxes.jpg               # Hero video poster (LCP optimallashtirish)
│   ├── logo-red-bg.png             # Logo (qizil fon — transparent navbar)
│   ├── logo-white-bg.png           # Logo (oq fon — scroll qilingan navbar)
│   ├── hero-bg.jpg                 # Zaxira fon
│   ├── courier.jpg                 # Kuryer rasmi
│   └── llms.txt                    # AI tizimlar uchun kontent indeks
│
├── proxy.ts                        # Next.js middleware (routing)
├── next.config.ts                  # Cache headers, security headers, rasm optimallashtirish
└── LOYIHA.md                       # Shu hujjat
```

---

## 3. Sahifalar va Routlar

| URL | Fayl | Vazifa |
|---|---|---|
| `/` | `app/page.tsx` | `/uz` ga 308 permanent redirect |
| `/uz` | `app/[locale]/page.tsx` | Bosh sahifa (o'zbek) |
| `/ru` | `app/[locale]/page.tsx` | Bosh sahifa (rus) |
| `/uz/calculator` | `app/[locale]/calculator/page.tsx` | Tarif kalkulyatori |
| `/ru/calculator` | `app/[locale]/calculator/page.tsx` | Tarif kalkulyatori |
| `/robots.txt` | `app/robots.ts` | Crawler ruxsatlari |
| `/sitemap.xml` | `app/sitemap.ts` | URL xaritasi |
| `/llms.txt` | `public/llms.txt` | AI tizimlar uchun |

---

## 4. Bosh Sahifa Seksiyalari (`_home-client.tsx`)

Seksiyalar tartibi quyidagicha (yuqoridan pastga):

### 4.1 Navbar
- Transparent → scroll qilganda oq + shadow
- Logotip: qizil fon (transparent) / oq fon (scrolled) — dinamik
- Til almashtiruvchi: UZ / RU
- Mobil: hamburger menyu (AnimatePresence)
- Navigatsiya: Xizmatlar, Kalkulyator, Qanday ishlaydi, Sharhlar, Aloqa

### 4.2 ScrollVideoHero ⭐ (asosiy 3D effekt)
- **Texnika:** `video.currentTime = scrollProgress * video.duration`
- `position: sticky; top: 0; height: 100vh` ichida
- Tashqi konteyner: `height: 260vh` — scroll maydonini yaratadi
- Video: `van-animation.mp4`, poster: `van-boxes.jpg`
- Matn overlay: scroll qilganda `opacity` va `translateY` bilan yo'qoladi
- Progress bar: pastda qizil chiziq
- "SCROLL" indikator pastda

### 4.3 Hero
- Asosiy sarlavha: "Posylkangiz 24 soat ichida yetib boradi yoki bepul"
- 2 ta CTA tugma: "Kuryer chaqirish" (qizil) + "Narxni hisoblash" (shaffof)
- Yonida animatsiyali yetkazish marshrutlari kartasi
- 4 ta badge: Sug'urta, 4.9★, 0% shikastlanish, 60+ filial
- Framer Motion fade-in animatsiya

### 4.4 Ticker
- Uzluksiz gorizontal scroll (CSS animation)
- 8 ta afzallik: "24 soatda yetkazish", "60+ filial", "Kuryer 30 daqiqada" va b.

### 4.5 Stats
- 5 ta statistika: 50 000+, 60+, 24 soat, 12, 0%
- `useInView` bilan scroll trigger animatsiya

### 4.6 Services
- 6 ta xizmat kartasi
- **3D tilt effekti:** `onMouseMove` → `perspective(900px) rotateX/Y`
- Xizmatlar: Sovg'alar, Hujjatlar, Viloyatlarga, Naqdli to'lov, Yirik yuk, Ekspress

### 4.7 CalcBanner
- Kalkulyatorga yo'naltiruvchi banner
- "Narxni hisoblash" tugmasi

### 4.8 BranchesMap ⭐ (yangi)
- **Qora fon** (`#0F0F0F`)
- `map.mp4` — autoplay, loop, 3D perspective konteynerda
- **Mouse tracking tilt:** `useMotionValue` + `useSpring` + `useTransform`
- Pastki overlay: 60+ Filial, 12 Viloyat, 24/7, 30′ badge'lari
- Burchak qizil glow effekti
- Scroll trigger bilan kirish animatsiyasi

### 4.9 HowItWorks
- 4 qadam: Ariza → Kuryer → Kuzatuv → Yetkazildi
- Horizontal progress line (scroll trigger)
- Ketma-ket Framer Motion animatsiya

### 4.10 Testimonials
- 3 ta mijoz sharhi (ism, shahar, platforma, sana)
- Star reyting SVG
- Grid layout, scroll trigger

### 4.11 FAQ ⭐ (yangi)
- 6 ta savol-javob
- `AnimatePresence` accordion (height animatsiya)
- `ChevronDown` 180° aylanadi ochilganda
- Ochiq element: qizil fon

### 4.12 Showcase3D
- Three.js 3D sahna (HeroScene)
- Mouse tracking kamera harakati
- Kompaniya statistikalari

### 4.13 Contact
- Ism + telefon form
- Submit → API (yoki mailto)
- Yon tomonda: telefon, email, ish vaqti

### 4.14 AIAssistant ⭐ (yangi)
- **Fixed position** — o'ng pastki burchak
- `pulseRed` animatsiya bilan qizil tugma
- Ochilganda: qizil header, 4 ta tayyor savol, xabar tizimi
- Har ikki tilda (uz/ru) avtomatik
- Framer Motion `AnimatePresence` panel

### 4.15 Footer
- Logo + tavsif
- Xizmatlar, Ma'lumot, Aloqa ustunlari
- Ijtimoiy tarmoqlar ikonlari
- Copyright

---

## 5. Kalkulyator Sahifasi (`calculator/page.tsx`)

### Tabs:
1. **Kalkulyator** — og'irlik, hajm, yetkazish usuli kiritish → narx
2. **Tariflar** — 1–15 kg jadval (Standart / Tranzit)
3. **Qo'shimcha** — qadoqlash, naqdli to'lov, qo'shimcha xizmatlar
4. **Muddatlar** — viloyatlar bo'yicha yetkazish vaqti

### Texnika:
- `useParams()` — locale detection
- `getBasePrice()` — `lib/pricing.ts` dan
- `getBillableWeight()` — hajmiy og'irlik hisoblash
- Ikki tilli (uz/ru), `en` → `uz` fallback

### AIAssistant widget:
- Kalkulyatorda ham mavjud (alohida nusxa)
- 4 ta tayyor savol: narx, kuryer vaqti, viloyatlar, shikast

---

## 6. Dizayn Tizimi

```css
/* Asosiy ranglar */
--brand:       #E31E24   /* Qizil — asosiy brand rang */
--brand-dark:  #B71519   /* To'q qizil — hover holati */
--dark:        #1A1A1A   /* Qora matn */
--muted:       #6B7280   /* Kulrang — ikkinchi darajali matn */
--surface:     #F8F9FA   /* Ochiq kulrang — card fon */
--white:       #FFFFFF   /* Asosiy fon */

/* Shriftlar */
--font-sans:   'Inter', sans-serif        /* Asosiy matn */
--font-serif:  'Playfair Display', serif  /* Sarlavhalar */
```

### Animatsiya strategiyasi:
- `fadeUp` — standart kirish (opacity 0→1, Y 36→0)
- `useInView` — sahifa pastga scroll qilinganda trigger
- `once: true` — faqat bir marta ijro etiladi
- `AnimatePresence` — FAQ accordion, navbar mobile, AI chat panel
- CSS `@keyframes` — ticker, pulseRed, float, shimmer

---

## 7. Tarif Tizimi (`lib/pricing.ts`)

### Yetkazish turlari:
| Tur | Tavsif |
|---|---|
| `office-office` | Ofisdan Ofisga |
| `office-door-city` | Ofisdan Eshikkacha (markaz) |
| `door-door` | Eshikdan Eshikkacha |
| `office-regional` | Ofisdan Viloyat markazigacha |
| `office-tashkent-reg` | Ofisdan Toshkent Viloyatigacha |

### Tarif rejimlari:
- **Standart** — to'g'ridan-to'g'ri jo'natish
- **Tranzit** — boshqa filial orqali (5 000 so'm qimmatroq)

### Narx hisoblash:
```
1–15 kg → jadvaldan narx
>15 kg  → 15 kg narxi + (kg-15) × 5 000 so'm
Hajmiy og'irlik = (U × K × B sm) / 5 000
Hisob og'irligi = max(haqiqiy, hajmiy)
```

---

## 8. SEO va AI Ko'rinish Tizimi

### Metadata (har bir sahifa uchun):
- Title: 58 belgi (Cyrillic uchun optimallashtirilgan)
- Description: 145 belgi
- Canonical: `https://unex.uz/{locale}`
- hreflang: uz, ru, x-default
- OG image: `van-boxes.jpg` (1200×630)
- Twitter card: `summary_large_image`

### JSON-LD Schemalar (4 ta):
1. **LocalBusiness** — manzil, telefon, reyting, ish vaqti, logo (ImageObject)
2. **Service** — narx, til, hudud, `priceValidUntil: 2026-12-31`
3. **WebSite** — site nomi, publisher
4. **FAQPage** — 6 ta savol-javob (har ikki tilda)

### AI tizimlar uchun:
- `robots.ts` — GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot → Allow
- `llms.txt` — sayt tavsifi, asosiy sahifalar, litsenziya
- `sitemap.ts` — 4 ta URL, hreflang alternates
- SSR rendering — JS ishlamasdan ham matn ko'rinadi

### Performance:
- ISR `revalidate=3600` — edge cache, TTFB: 740ms → ~50ms
- Video `poster` atributi — LCP: ~5s → ~2s
- MP4 + rasmlar: `Cache-Control: public, max-age=31536000, immutable`
- Brotli kompressiya (Vercel tomonidan)

### Security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 9. Til Tizimi

Sayt uchta tilda ishlaydi: **uz** (asosiy), **ru**, **en**

### Qanday ishlaydi:
- URL: `/uz/...`, `/ru/...`, `/en/...`
- `proxy.ts` middleware — locale detection va redirect
- `_home-client.tsx` ichida `T` obyekti — barcha matnlar uz/ru da
- `en` locale → `uz` ga fallback (kalkulyator, home page)
- `lib/dictionary.ts` — `messages/*.json` fayllardan tarjima yuklash

---

## 10. Qilingan Ishlar Xronologiyasi

### Faza 1 — Saytni qayta qurish
- [x] `ScrollVideoHero` — scroll-scrubbed van animatsiya (260vh sticky)
- [x] `BranchesMap` — map.mp4 + 3D mouse tilt, qora fon
- [x] `HowItWorks` — 4 qadam, scroll trigger
- [x] `Testimonials` — 3 ta sharh
- [x] `FAQ` — accordion, AnimatePresence
- [x] `Services` — 3D tilt hover effekti
- [x] `AIAssistant` — floating chat widget (home + kalkulyator)

### Faza 2 — Kalkulyator
- [x] To'liq o'zbek tiliga tarjima
- [x] `useParams()` bilan locale detection
- [x] Barcha tab'lar: Kalkulyator, Tariflar, Qo'shimcha, Muddatlar
- [x] AIAssistant widget kalkulyatorda ham

### Faza 3 — SEO Audit va Tuzatish
- [x] `robots.ts` — to'g'ri content-type va AI crawler ruxsatlari
- [x] `sitemap.ts` — barcha 4 URL hreflang bilan
- [x] `llms.txt` — Perplexity/ChatGPT AI readiness
- [x] `html lang` dinamik (uz/ru) — locale layout ga ko'chirildi
- [x] `permanentRedirect` (308) — root redirect to'g'rilandi
- [x] FAQPage + WebSite JSON-LD schema qo'shildi
- [x] `CourierService` → `LocalBusiness` (to'g'ri schema type)
- [x] `logo` → `ImageObject` (Google talabi)
- [x] `priceValidUntil` yangilandi (2025→2026)
- [x] `og:image` + `twitter:image` qo'shildi
- [x] ISR `revalidate=3600` — edge cache yoqildi
- [x] Video `poster` atributi — LCP tezlashdi
- [x] MP4 + rasmlar — 1 yil cache headers
- [x] Security headers qo'shildi
- [x] Duplicate H1 id tuzatildi
- [x] `/en/calculator` 500 xato tuzatildi
- [x] Title/description uzunligi optimallashtirildi

### Faza 4 — Deploy
- [x] Vercel Analytics qo'shildi
- [x] GitHub: https://github.com/Elyorbek2222/unex
- [ ] Domen ulash: `unex.uz` → Vercel

---

## 11. Muhim Fayllar

| Fayl | Vazifa |
|---|---|
| `app/[locale]/_home-client.tsx` | Barcha bosh sahifa seksiyalari (1600+ qator) |
| `app/[locale]/page.tsx` | SEO metadata + 4 ta JSON-LD schema |
| `app/[locale]/calculator/page.tsx` | Kalkulyator + AIAssistant (960+ qator) |
| `lib/pricing.ts` | Rasmiy tarif jadvallari va hisoblash mantiq |
| `app/globals.css` | Global stillar + animatsiya keyframes |
| `next.config.ts` | Cache headers, security headers |
| `proxy.ts` | Middleware routing |

---

## 12. Dev Server va Deploy

```bash
# Local ishlatish
cd "unex-express"
npm run dev
# → http://localhost:3333

# Build tekshirish
npm run build

# GitHub push
git add -A
git commit -m "..."
git push origin main
```

**Vercel:** `main` branch ga push qilinsa avtomatik deploy bo'ladi.

---

*Hujjat yangilanishi: 2026-04-03*
*Loyiha: UNEX Express | Muallif: Claude Sonnet 4.6 + Elyorbek*
