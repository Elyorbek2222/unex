"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Package, FileText, MapPin, Clock, Shield, Star, Phone,
  CheckCircle2, Truck, ArrowRight, Menu, X, Send,
  MessageCircle, Zap, Heart, Calculator, Building2, ChevronDown,
} from "lucide-react";

export type Locale = "uz" | "ru";

/* ════════════ TRANSLATIONS ════════════ */
const T = {
  uz: {
    /* Nav */
    nav_services:   "Xizmatlar",
    nav_calc:       "Kalkulyator",
    nav_how:        "Qanday ishlaydi",
    nav_reviews:    "Sharhlar",
    nav_contact:    "Aloqa",
    nav_cta:        "Kuryer chaqirish",
    calc_href:      "/uz/calculator",

    /* Hero */
    hero_badge:   "Kuryerlik xizmati · 60+ filial · Butun O'zbekiston",
    hero_h1_1:    "Posylkangiz",
    hero_h1_red:  "24 soat",
    hero_h1_2:    "ichida yetib boradi yoki bepul",
    hero_p:       "Navbatsiz va hujjatsiz. Kuryer",
    hero_bold:    "30 daqiqa",
    hero_p2:      "ichida keladi, o'zi qadoqlaydi va shaxsan qo'lga topshiradi.",
    hero_cta1:    "Kuryer chaqirish (bepul)",
    hero_cta2:    "Narxni hisoblash",
    badge_ins:    "Sug'urta kiritilgan",
    badge_stars:  "4.9 · 2400+ sharh",
    badge_dmg:    "0% shikastlanish",
    badge_fil:    "60+ filial",

    /* Card */
    card_label:   "Yetkazish marshrutlari · O'zbekiston",
    card_badge:   "60+ filial",
    card_origin:  "Jo'natildi",
    card_origin_city: "Toshkent",
    card_cities:  ["Samarqand", "Namangan", "Farg'ona", "Buxoro"],
    card_dest:    "Manzil",
    card_dest_city: "Istalgan viloyat",
    card_time:    "18–24 soat",
    card_eta_label: "O'rtacha vaqt",
    card_eta_val:   "18 soat",
    card_status_label: "Posylka holati",
    card_status_val:   "Kuryer ketmoqda",
    stat1: "Yetkazilgan",
    stat2: "Kafolat",
    stat3: "Shikastlanish",

    /* Ticker */
    ticker: [
      "24 soatda yetkazish yoki bepul",
      "60+ filial butun O'zbekistonda",
      "Kuryer 30 daqiqada",
      "0% shikastlanish",
      "Bepul qadoqlash",
      "Har bir posylka sug'urtalangan",
      "Shaxsan qo'lga topshirish",
      "Naqdli to'lov 0%",
    ],

    /* Stats */
    stats: [
      { v: "50 000+", l: "Yetkazilgan" },
      { v: "60+",     l: "Filiallar" },
      { v: "24 soat", l: "Yetkazish kafolati" },
      { v: "12",      l: "Viloyat" },
      { v: "0%",      l: "Shikastlanish" },
    ],

    /* Services */
    svc_label: "Bizning xizmatlar",
    svc_h2:    "Har qanday posylkani — har qanday joyga",
    svc_p:     "Biz jismoniy shaxslar va internet do'konlarga ixtisoslashanmiz. Murakkab tizimlar emas — oddiy, halol xizmat.",
    services: [
      { tag: "Mashhur",           title: "Sovg'alarni ehtiyotkorlik bilan",   desc: "3 qavatli qadoqlash, foto-fiksatsiya, 0% shikastlanish.",               points: ["Uch qavatli himoya", "Mo'rt buyumlar — bizning ixtisosimiz", "Oldin va keyin foto"] },
      { tag: "Maxfiy",            title: "Shoshilinch hujjatlar",              desc: "Faqat qo'ldan-qo'lga. Qabul qilish uchun elektron imzo.",                points: ["Faqat shaxsan qo'lga", "3 soatda yetkazish", "Qabul imzosi"] },
      { tag: "Butun O'zbekiston", title: "Viloyatlarga jo'natmalar",           desc: "Eng uzoq qishloqlargacha eshik oldiga yetkazamiz.",                      points: ["Barcha 12 viloyat", "To'g'ridan-to'g'ri eshikka", "Real vaqtda kuzatish"] },
      { tag: "Internet do'konlar",title: "Naqdli to'lov (oldindan)",           desc: "To'lovni qabul qilish 0%. Bepul qaytarish.",                            points: ["To'lov qabuli 0%", "Qaytarish bepul", "7 kun saqlash"] },
      { tag: "10 000 kg gacha",   title: "Yirik yuk",                          desc: "O'z avtoparkimiz. 100 g dan 10 000 kg gacha.",                          points: ["10 000 kg gacha", "O'z avtoparki", "LTL yig'ma yuklar"] },
      { tag: "Shoshilinch",       title: "Shahar bo'ylab ekspress",             desc: "O'sha kuni yetkazish. 3–6 soat.",                                      points: ["3–6 soatda yetkazish", "Prioritet ishlov", "Shahar bo'ylab 70 000 so'm"] },
    ],

    /* Calc banner */
    calc_banner_h:  "Rasmiy tarif kalkulyatori",
    calc_banner_p:  "Standart va Tranzit · 1–15+ kg · Hajmiy og'irlik · Qo'shimcha xizmatlar",
    calc_banner_btn:"Narxni hisoblash",

    /* How */
    how_label: "Jarayon",
    how_h2:    "4 ta oddiy qadam",
    how_p:     "Hech qanday navbat, forma va tushunarsiz tizimlar yo'q.",
    steps: [
      { n: "01", title: "Ariza qoldiring",       desc: "Qo'ng'iroq qiling yoki forma to'ldiring — 5 daqiqada qayta aloqaga chiqamiz." },
      { n: "02", title: "Kuryer keladi",          desc: "30 daqiqada. Posylkani bepul qadoqlaydi." },
      { n: "03", title: "Kuzatib boring",         desc: "Marshrutni real vaqtda kuzating — posylka qayerdaligini doimo bilasiz." },
      { n: "04", title: "Qabul qiluvchi mamnun", desc: "Shaxsan qo'lga + yetkazishning foto-tasdig'i." },
    ],

    /* Reviews */
    rev_label: "Sharhlar",
    rev_h2:    "Minglab oilalar ishonadi",
    reviews: [
      { name: "Malika T.", location: "Toshkent, Yunusobod", date: "3 hafta oldin", platform: "Yandex Maps", title: "Onaga tug'ilgan kun tortini", text: "Eziladi deb qo'rqdim. Kuryer 25 daqiqada keldi, shunchalik ehtiyotkorlik bilan joylashtirdiki... Ona ideal holatda oldi! Endi faqat UNEX.", initials: "MT" },
      { name: "Kamol R.",  location: "Samarqand",           date: "1 oy oldin",   platform: "Google Maps", title: "Bitim uchun shoshilinch hujjatlar", text: "Soat 13:00 da berdim — 16:20 da hujjatlar Toshkentdagi hamkorimda. Butun yo'l davomida jonli kuzatuv. Bitim amalga oshdi.", initials: "KR" },
      { name: "Dilnoza Y.", location: "Farg'ona → Toshkent", date: "2 hafta oldin", platform: "2GIS",       title: "Kutganimdan tezroq yetdi",         text: "Farg'onadan 3-4 kun deb o'ylardim. Kechqurun jo'natdim — ertasi kuni soat 14:00 da o'g'lim qutini qo'lida ushlab turardi. Hammasi butun.", initials: "DY" },
    ],

    /* Contact */
    cont_label:   "Murojaat",
    cont_h2_1:    "Vaqtingiz —",
    cont_h2_red:  "bizning mas'uliyatimiz",
    cont_p:       "5 daqiqada qayta qo'ng'iroq qilamiz. Yarim soatda kuryer eshigingizda.",
    cont_bold:    "5 daqiqa",
    cont_bullets: ["5 daqiqada qayta aloqa", "Spam va majburlov yo'q", "Bepul maslahat"],
    cont_phone_label: "Telefon",
    cont_email_label: "Email",
    form_h3:     "Kuryer chaqirish",
    form_sub:    "5 daqiqada qayta aloqa",
    form_name_label: "Ismingiz",
    form_name_ph:    "Masalan, Malika",
    form_phone_label:"Telefon raqami",
    form_submit: "Kuryer chaqirish (bepul)",
    form_sending:"Yuborilmoqda...",
    form_done_h: "Ariza qabul qilindi!",
    form_done_p: "5 daqiqa ichida qayta qo'ng'iroq qilamiz.",
    form_done_bold: "5 daqiqa",
    form_legal:  "Tugmani bosib, shaxsiy ma'lumotlarni qayta ishlashga rozilik bildirasiz.",

    /* Branches Map */
    map_label:   "Filiallar tarmog'i",
    map_h2_1:    "O'zbekistonning",
    map_h2_red:  "har bir burchagida",
    map_p:       "60+ filial, 12 viloyat — posylkangiz qayerda bo'lishidan qat'i nazar, eng yaqin filial 30 daqiqalik masofada.",
    map_badges: [
      { v: "60+",  l: "Filial" },
      { v: "12",   l: "Viloyat" },
      { v: "24/7", l: "Ishlash vaqti" },
      { v: "30′",  l: "Kuryer vaqti" },
    ],
    map_cta: "Filiallarni ko'rish",

    /* Footer */
    footer_desc:     "«UNEX EXPRESS» MChJ — jismoniy shaxslar va internet do'konlar uchun kuryerlik xizmati. 60+ filial.",
    footer_svc_h:    "Xizmatlar",
    footer_svc_list: ["Sovg'a yetkazish", "Shoshilinch hujjatlar", "Viloyatlarga jo'natmalar", "Yirik yuk", "Naqdli to'lov"],
    footer_info_h:   "Ma'lumot",
    footer_info_list:[
      { label: "Tarif kalkulyatori", href: "/uz/calculator" },
      { label: "Filiallar",           href: "#branches" },
      { label: "Yetkazish shartlari", href: "#" },
      { label: "Kompaniya haqida",    href: "#" },
      { label: "Karyera",             href: "#" },
    ],
    footer_cont_h:   "Aloqa",
    footer_addr:     "Toshkent, O'zbekiston",
    footer_hours:    "Du–Ya: 7:00 – 23:00",
    footer_copy:     "MChJ. Barcha huquqlar himoyalangan. Tariflar QQS siz ko'rsatilgan.",
    footer_links:    ["Maxfiylik", "Shartlar"],

    /* AI Assistant */
    ai_title:       "UNEX Yordamchi",
    ai_hint:        "Tez javob oling",
    ai_default:     "Salom! Men UNEX Express AI yordamchisiman. Savol bering yoki quyidagi variantlardan birini tanlang.",
    ai_placeholder: "Savol yozing...",
    ai_send:        "Yuborish",
    ai_questions: [
      "Kuryer qachon keladi?",
      "Narx qanday hisoblanadi?",
      "Qaysi viloyatlarga yetkazasiz?",
      "Posilkam shikastlansa nima bo'ladi?",
    ],
    ai_answers: [
      "Buyurtma berilgandan so'ng kuryer **30 daqiqa** ichida keladi. Toshkent bo'yicha — har doim kafolatli.",
      "Narx og'irlik, yetkazish usuli va tarif turiga (Standart yoki Tranzit) qarab hisoblanadi. **Kalkulyator** bo'limida aniq narxni bilib oling.",
      "O'zbekistonning barcha **12 viloyatiga** yetkazamiz. Asosiy shaharlar — 18–24 soat, uzoq tumanlar — 18–48 soat.",
      "Har bir posilka avtomatik **sug'urtalangan**. Shikast yetsa — hujjatsiz va savolsiz to'liq qiymatini qaytaramiz.",
    ],
  },

  ru: {
    /* Nav */
    nav_services:   "Услуги",
    nav_calc:       "Калькулятор",
    nav_how:        "Как это работает",
    nav_reviews:    "Отзывы",
    nav_contact:    "Контакты",
    nav_cta:        "Вызвать курьера",
    calc_href:      "/ru/calculator",

    /* Hero */
    hero_badge:   "Курьерская служба · 60+ филиалов · Весь Узбекистан",
    hero_h1_1:    "Ваша посылка дойдёт за",
    hero_h1_red:  "24 часа",
    hero_h1_2:    "или доставка за наш счёт",
    hero_p:       "Без очередей и бумажной волокиты. Курьер приедет через",
    hero_bold:    "30 минут",
    hero_p2:      ", сам упакует и доставит лично в руки.",
    hero_cta1:    "Вызвать курьера бесплатно",
    hero_cta2:    "Рассчитать стоимость",
    badge_ins:    "Страховка включена",
    badge_stars:  "4.9 · 2400+ отзывов",
    badge_dmg:    "0% повреждений",
    badge_fil:    "60+ филиалов",

    /* Card */
    card_label:   "Маршрут доставки · Узбекистан",
    card_badge:   "60+ филиалов",
    card_origin:  "Отправление",
    card_origin_city: "Ташкент",
    card_cities:  ["Самарканд", "Наманган", "Фергана", "Бухара"],
    card_dest:    "Назначение",
    card_dest_city: "Любой регион УЗ",
    card_time:    "18–24 ч",
    card_eta_label: "Среднее время",
    card_eta_val:   "18 часов",
    card_status_label: "Статус посылки",
    card_status_val:   "Курьер едет к вам",
    stat1: "Доставок",
    stat2: "Гарантия",
    stat3: "Повреждений",

    /* Ticker */
    ticker: [
      "Доставка за 24 часа или бесплатно",
      "60+ филиалов по Узбекистану",
      "Курьер через 30 минут",
      "0% повреждений",
      "Бесплатная упаковка",
      "Страховка каждой посылки",
      "Личная передача в руки",
      "Наложенный платёж 0%",
    ],

    /* Stats */
    stats: [
      { v: "50 000+", l: "Доставок выполнено" },
      { v: "60+",     l: "Филиалов" },
      { v: "24 ч",    l: "Гарантия доставки" },
      { v: "12",      l: "Регионов" },
      { v: "0%",      l: "Повреждений" },
    ],

    /* Services */
    svc_label: "Наши услуги",
    svc_h2:    "Любую посылку — в любую точку",
    svc_p:     "Мы специализируемся на физических лицах и интернет-магазинах. Никакого корпоративного жаргона — только простой честный сервис.",
    services: [
      { tag: "Популярно",          title: "Бережная доставка подарков",  desc: "3-слойная упаковка, фото-фиксация, 0% повреждений.",              points: ["Тройная защита включена", "Хрупкие предметы — наш профиль", "Фото до и после"] },
      { tag: "Конфиденциально",    title: "Срочные документы",            desc: "Только из рук в руки. Электронная подпись о получении.",          points: ["Строго лично в руки", "Доставка за 3 часа", "Подпись о получении"] },
      { tag: "Весь Узбекистан",    title: "Посылки в регионы",            desc: "Доставляем до двери даже в самых отдалённых кишлаках.",           points: ["Все 12 регионов", "Доставка прямо до порога", "Трекинг в реальном времени"] },
      { tag: "Интернет-магазины",  title: "Наложенный платёж",            desc: "0% за приём наложенного платежа. Бесплатный возврат.",            points: ["Приём платежей 0%", "Возврат бесплатно", "Хранение 7 дней"] },
      { tag: "До 10 000 кг",       title: "Крупный груз",                 desc: "Собственный автопарк. От 100 г до 10 000 кг.",                    points: ["До 10 000 кг", "Собственный автопарк", "Сборные грузы LTL"] },
      { tag: "Срочно",             title: "Экспресс по городу",           desc: "Доставка в тот же день. 3–6 часов.",                             points: ["Доставка 3–6 часов", "Приоритетная обработка", "70 000 сум по городу"] },
    ],

    /* Calc banner */
    calc_banner_h:  "Официальный калькулятор тарифов",
    calc_banner_p:  "Стандарт и Транзит · 1–15+ кг · Объёмный вес · Доп. услуги",
    calc_banner_btn:"Рассчитать стоимость",

    /* How */
    how_label: "Процесс",
    how_h2:    "4 простых шага",
    how_p:     "Никаких форм, очередей и непонятных систем.",
    steps: [
      { n: "01", title: "Оставьте заявку",       desc: "Позвоните или заполните форму — перезвоним за 5 минут." },
      { n: "02", title: "Курьер приедет",         desc: "Через 30 минут. Упакует посылку бесплатно на месте." },
      { n: "03", title: "Отслеживайте",           desc: "Смотрите маршрут в реальном времени — всегда знаете, где посылка." },
      { n: "04", title: "Получатель доволен",     desc: "Лично в руки + фото-подтверждение доставки." },
    ],

    /* Reviews */
    rev_label: "Отзывы",
    rev_h2:    "Нам доверяют тысячи семей",
    reviews: [
      { name: "Малика Т.", location: "Ташкент, Юнусабад",    date: "3 нед. назад",  platform: "Yandex Maps", title: "Торт маме на день рождения",     text: "Боялась, что помнут. Курьер приехал за 25 минут, уложил так бережно... Мама получила в идеальном состоянии! Теперь только UNEX.", initials: "МТ" },
      { name: "Камол Р.",  location: "Самарканд",             date: "1 мес. назад", platform: "Google Maps", title: "Срочные документы для сделки",  text: "Отдал в 13:00 — в 16:20 документы уже у партнёра в Ташкенте. Живой трекинг весь путь. Сделка состоялась. Огромное спасибо!", initials: "КР" },
      { name: "Дилноза Ю.", location: "Фергана → Ташкент",  date: "2 нед. назад", platform: "2GIS",        title: "Из региона быстрее, чем ждала", text: "Думала 3-4 дня из Ферганы. Отправила вечером — на следующий день в 14:00 сын уже держал коробку. Всё целое.", initials: "ДЮ" },
    ],

    /* Contact */
    cont_label:   "Связаться",
    cont_h2_1:    "Ваше время —",
    cont_h2_red:  "наша ответственность",
    cont_p:       "Перезвоним в течение 5 минут. Курьер у двери через полчаса.",
    cont_bold:    "5 минут",
    cont_bullets: ["Перезвоним за 5 минут", "Без спама и навязывания", "Бесплатная консультация"],
    cont_phone_label: "Телефон",
    cont_email_label: "Email",
    form_h3:     "Вызвать курьера",
    form_sub:    "Перезвоним за 5 минут",
    form_name_label: "Ваше имя",
    form_name_ph:    "Например, Малика",
    form_phone_label:"Номер телефона",
    form_submit: "Вызвать курьера бесплатно",
    form_sending:"Отправляем...",
    form_done_h: "Заявка принята!",
    form_done_p: "Перезвоним в течение 5 минут.",
    form_done_bold: "5 минут",
    form_legal:  "Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.",

    /* Branches Map */
    map_label:   "Сеть филиалов",
    map_h2_1:    "В каждом уголке",
    map_h2_red:  "Узбекистана",
    map_p:       "60+ филиалов, 12 регионов — где бы вы ни находились, ближайший филиал в 30 минутах езды.",
    map_badges: [
      { v: "60+",  l: "Филиалов" },
      { v: "12",   l: "Регионов" },
      { v: "24/7", l: "Работаем" },
      { v: "30′",  l: "Курьер" },
    ],
    map_cta: "Смотреть филиалы",

    /* Footer */
    footer_desc:     "ООО «UNEX EXPRESS» — курьерская служба для физических лиц и интернет-магазинов. 60+ филиалов.",
    footer_svc_h:    "Услуги",
    footer_svc_list: ["Доставка подарков", "Срочные документы", "Посылки в регионы", "Крупный груз", "Наложенный платёж"],
    footer_info_h:   "Информация",
    footer_info_list:[
      { label: "Калькулятор тарифов", href: "/ru/calculator" },
      { label: "Филиалы",              href: "#branches" },
      { label: "Условия доставки",     href: "#" },
      { label: "О компании",           href: "#" },
      { label: "Карьера",              href: "#" },
    ],
    footer_cont_h:   "Контакты",
    footer_addr:     "Ташкент, Узбекистан",
    footer_hours:    "Пн–Вс: 7:00 – 23:00",
    footer_copy:     "ООО. Все права защищены. Тарифы указаны без НДС.",
    footer_links:    ["Конфиденциальность", "Условия"],

    /* AI Assistant */
    ai_title:       "AI Помощник UNEX",
    ai_hint:        "Получите быстрый ответ",
    ai_default:     "Здравствуйте! Я AI-помощник UNEX Express. Задайте вопрос или выберите один из вариантов.",
    ai_placeholder: "Напишите вопрос...",
    ai_send:        "Отправить",
    ai_questions: [
      "Когда приедет курьер?",
      "Как рассчитывается цена?",
      "В какие регионы доставляете?",
      "Что если посылка повреждена?",
    ],
    ai_answers: [
      "Курьер приедет в течение **30 минут** после оформления заявки. По Ташкенту — всегда и гарантированно.",
      "Цена рассчитывается по весу, способу доставки и тарифу (Стандарт или Транзит). Точную стоимость узнайте в **Калькуляторе**.",
      "Доставляем во все **12 регионов** Узбекистана. Основные города — 18–24 часа, отдалённые районы — 18–48 часов.",
      "Каждая посылка автоматически **застрахована**. При повреждении возмещаем полную стоимость без документов и вопросов.",
    ],
  },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

function useScroll(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [threshold]);
  return scrolled;
}

/* ════════════ NAVBAR ════════════ */
function Navbar({ locale }: { locale: Locale }) {
  const t = T[locale];
  const scrolled = useScroll();
  const [open, setOpen] = useState(false);
  const links = [
    { label: t.nav_services, href: "#services" },
    { label: t.nav_calc,     href: t.calc_href },
    { label: t.nav_how,      href: "#how" },
    { label: t.nav_reviews,  href: "#reviews" },
    { label: t.nav_contact,  href: "#contact" },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/96 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.07)]" : "bg-transparent"}`}>
      <nav aria-label="Asosiy navigatsiya" className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        <a href={`/${locale}`} className="shrink-0" aria-label="UNEX Express — bosh sahifa">
          <Image src={scrolled ? "/logo-white-bg.png" : "/logo-red-bg.png"} alt="UNEX Express logotipi" width={120} height={36} quality={95} className="h-8 w-auto object-contain transition-opacity duration-300" priority />
        </a>
        <ul className="hidden lg:flex items-center gap-7" role="list">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="text-sm font-medium text-[#1A1A1A]/70 hover:text-[#E31E24] transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="tel:+998552002255" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#1A1A1A] hover:text-[#E31E24] transition-colors" aria-label="Telefon raqami">
            <Phone size={14} className="text-[#E31E24]" aria-hidden="true" /> +998 55 500-22-55
          </a>

          {/* Language switcher */}
          <div className="flex items-center rounded-full border border-[#1A1A1A]/12 overflow-hidden text-xs font-bold" aria-label="Til tanlash">
            <a href="/uz" className={`px-3 py-1.5 transition-colors ${locale === "uz" ? "bg-[#1A1A1A] text-white" : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]"}`} aria-current={locale === "uz" ? "page" : undefined} lang="uz">UZ</a>
            <a href="/ru" className={`px-3 py-1.5 transition-colors ${locale === "ru" ? "bg-[#1A1A1A] text-white" : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]"}`} aria-current={locale === "ru" ? "page" : undefined} lang="ru">RU</a>
          </div>

          <a href="#contact" className="hidden sm:inline-flex items-center gap-2 bg-[#E31E24] hover:bg-[#B71519] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all shadow-[0_4px_14px_rgba(227,30,36,0.3)] hover:-translate-y-0.5">
            {t.nav_cta}
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-[#1A1A1A]" aria-label="Menyu" aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-[#1A1A1A]/6 px-5 pb-5">
            <ul className="flex flex-col py-3 gap-1">
              {links.map((l) => (<li key={l.label}><a href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-sm font-medium text-[#1A1A1A]/70 hover:text-[#E31E24]">{l.label}</a></li>))}
            </ul>
            {/* Mobile language switcher */}
            <div className="flex items-center gap-2 py-3 border-t border-[#1A1A1A]/6 mt-1">
              <span className="text-xs text-[#1A1A1A]/35 font-medium mr-1">{locale === "uz" ? "Til:" : "Язык:"}</span>
              <a href="/uz" className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${locale === "uz" ? "bg-[#1A1A1A] text-white" : "border border-[#1A1A1A]/15 text-[#1A1A1A]/50 hover:text-[#1A1A1A]"}`} lang="uz">O'zbekcha</a>
              <a href="/ru" className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${locale === "ru" ? "bg-[#1A1A1A] text-white" : "border border-[#1A1A1A]/15 text-[#1A1A1A]/50 hover:text-[#1A1A1A]"}`} lang="ru">Русский</a>
            </div>
            <a href="#contact" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 bg-[#E31E24] text-white text-sm font-bold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(227,30,36,0.3)]">
              <Truck size={15} aria-hidden="true" /> {t.nav_cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ════════════ SCROLL VIDEO HERO ════════════ */
function ScrollVideoHero({ locale }: { locale: Locale }) {
  const t = T[locale];
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);
      const vid = videoRef.current;
      if (vid && vid.readyState >= 2 && vid.duration) {
        vid.currentTime = p * vid.duration;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textOpacity = Math.max(0, 1 - progress * 2.5);
  const textY = progress * -50;

  return (
    <div ref={containerRef} style={{ height: "260vh", position: "relative" }} aria-labelledby="hero-heading">
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* Scroll-scrubbed van animation */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/van-animation.mp4"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          aria-hidden="true"
        />

        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.68) 100%)",
          }}
        />

        {/* Hero text — fades + lifts as you scroll */}
        <div
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "80px 20px 0",
            textAlign: "center",
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <p style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(227,30,36,0.18)", border: "1px solid rgba(227,30,36,0.38)",
            color: "#fff", fontSize: "11px", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.14em",
            padding: "8px 18px", borderRadius: "100px", marginBottom: "24px",
          }}>
            <Zap size={11} style={{ fill: "#E31E24", color: "#E31E24" }} /> {t.hero_badge}
          </p>

          <h1
            id="hero-heading"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
              fontWeight: 800, color: "#fff",
              lineHeight: 1.1, marginBottom: "20px",
              maxWidth: "740px",
            }}
          >
            {t.hero_h1_1}{" "}
            <span style={{ color: "#E31E24" }}>{t.hero_h1_red}</span>{" "}
            {t.hero_h1_2}
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.72)", fontSize: "1.05rem",
            lineHeight: 1.7, marginBottom: "36px", maxWidth: "480px",
          }}>
            {t.hero_p}{" "}<strong style={{ color: "#fff", fontWeight: 600 }}>{t.hero_bold}</strong>{t.hero_p2}
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="#contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#E31E24", color: "#fff",
                fontWeight: 700, fontSize: "14px",
                padding: "14px 28px", borderRadius: "12px",
                boxShadow: "0 6px 24px rgba(227,30,36,0.45)",
                textDecoration: "none",
              }}
            >
              <Truck size={15} aria-hidden="true" /> {t.hero_cta1}
            </a>
            <a
              href={t.calc_href}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                color: "#fff", fontWeight: 600, fontSize: "14px",
                padding: "14px 28px", borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              <Calculator size={14} aria-hidden="true" /> {t.hero_cta2}
            </a>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginTop: "36px" }}>
            {([
              { icon: <Shield size={12} />, text: t.badge_ins },
              { icon: <Star size={12} style={{ fill: "#E31E24" }} />, text: t.badge_stars },
              { icon: <CheckCircle2 size={12} />, text: t.badge_dmg },
              { icon: <Building2 size={12} />, text: t.badge_fil },
            ] as const).map((b) => (
              <div key={b.text} style={{
                display: "flex", alignItems: "center", gap: "6px",
                color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 500,
              }}>
                <span style={{ color: "#E31E24" }} aria-hidden="true">{b.icon}</span>{b.text}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll progress bar */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "rgba(255,255,255,0.08)" }}
        >
          <div style={{ width: `${progress * 100}%`, height: "100%", background: "#E31E24", transition: "width 0.06s linear" }} />
        </div>

        {/* Scroll indicator — fades after scroll starts */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", bottom: "40px", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
            color: "rgba(255,255,255,0.5)",
            opacity: progress > 0.05 ? 0 : 1,
            transition: "opacity 0.5s",
          }}
        >
          <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.14em" }}>scroll</span>
          <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }} />
        </div>
      </div>
    </div>
  );
}

/* ════════════ HERO ════════════ */
function Hero({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [reached, setReached] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReached(true), 3600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-white flex items-center overflow-hidden pt-16" aria-labelledby="hero-heading">
      <div className="absolute top-0 right-0 w-[50%] h-full bg-[#F8F9FA] hidden lg:block" aria-hidden="true" />
      <div className="absolute top-1/3 right-[8%] w-64 h-64 bg-[#E31E24]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full py-16 sm:py-24">
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 bg-[#E31E24]/8 border border-[#E31E24]/18 text-[#E31E24] text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <Zap size={12} className="fill-[#E31E24]" aria-hidden="true" /> {t.hero_badge}
          </motion.p>
          <motion.h1 id="hero-heading" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="font-serif text-[2.4rem] sm:text-[3rem] lg:text-[3.25rem] font-bold leading-[1.1] text-[#1A1A1A] mb-5">
            {t.hero_h1_1}{" "}
            <span className="relative inline-block">
              <span className="text-[#E31E24]">{t.hero_h1_red}</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 180 6" fill="none" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 4 C45 1.5, 100 1.5, 178 4" stroke="#E31E24" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
              </svg>
            </span>{" "}
            {t.hero_h1_2}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
            className="text-[#1A1A1A]/55 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            {t.hero_p}{" "}
            <strong className="text-[#1A1A1A]/80 font-semibold">{t.hero_bold}</strong>
            {t.hero_p2}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.28 }}
            className="flex flex-col sm:flex-row gap-3 mb-9">
            <a href="#contact" className="inline-flex items-center justify-center gap-2.5 bg-[#E31E24] hover:bg-[#B71519] text-white font-bold text-sm px-7 py-4 rounded-xl transition-all shadow-[0_6px_22px_rgba(227,30,36,0.35)] hover:shadow-[0_8px_28px_rgba(227,30,36,0.45)] hover:-translate-y-0.5 animate-pulse-red">
              <Truck size={16} aria-hidden="true" /> {t.hero_cta1}
            </a>
            <a href={t.calc_href} className="inline-flex items-center justify-center gap-2 border border-[#1A1A1A]/14 hover:border-[#E31E24]/35 text-[#1A1A1A] hover:text-[#E31E24] font-semibold text-sm px-7 py-4 rounded-xl transition-all hover:bg-[#E31E24]/4">
              <Calculator size={15} aria-hidden="true" /> {t.hero_cta2}
            </a>
          </motion.div>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-5" aria-label="Afzalliklar">
            {[
              { icon: <Shield size={13} aria-hidden="true" />, text: t.badge_ins },
              { icon: <Star size={13} className="fill-[#E31E24]" aria-hidden="true" />, text: t.badge_stars },
              { icon: <CheckCircle2 size={13} aria-hidden="true" />, text: t.badge_dmg },
              { icon: <Building2 size={13} aria-hidden="true" />, text: t.badge_fil },
            ].map((b) => (
              <li key={b.text} className="flex items-center gap-1.5 text-xs text-[#1A1A1A]/50 font-medium">
                <span className="text-[#E31E24]">{b.icon}</span>{b.text}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visual card */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
          className="relative flex items-center justify-center" aria-hidden="true">
          <div className="relative w-full max-w-[460px] mx-auto px-5 pb-14 pt-2">
            <div className="relative rounded-3xl shadow-[0_32px_90px_rgba(0,0,0,0.22)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1D1010] via-[#181212] to-[#121212]" />
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
              <div className="absolute -top-28 -right-20 w-72 h-72 bg-[#E31E24]/16 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#E31E24]/7 rounded-full blur-[70px] pointer-events-none" />

              <div className="relative z-10 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#E31E24] rounded-lg flex items-center justify-center shrink-0 shadow-[0_3px_12px_rgba(227,30,36,0.5)]">
                      <Truck size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-extrabold text-sm tracking-wide leading-none">UNEX</p>
                      <p className="text-white/40 text-[9px] font-medium tracking-widest uppercase leading-none mt-0.5">Express</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#E31E24] bg-[#E31E24]/14 border border-[#E31E24]/22 px-3 py-1.5 rounded-full tracking-wide">
                    {t.card_badge}
                  </span>
                </div>

                <p className="text-[9px] font-bold uppercase tracking-widest text-white/18 mb-5">{t.card_label}</p>

                <div className="relative">
                  <div className="absolute left-5 top-5 bottom-5 w-px bg-white/8" />
                  <motion.div className="absolute left-5 top-5 w-px bg-gradient-to-b from-[#E31E24] via-[#E31E24]/70 to-[#E31E24]/20 origin-top"
                    style={{ height: "calc(100% - 40px)" }}
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                    transition={{ duration: 2.8, delay: 0.7, ease: [0.4, 0, 0.2, 1] }} />

                  <motion.div className="relative flex items-center gap-3 mb-5 z-10"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}>
                    <div className="w-10 h-10 bg-[#E31E24] rounded-xl flex items-center justify-center shrink-0 shadow-[0_4px_18px_rgba(227,30,36,0.5)]">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] text-white/28 font-bold uppercase tracking-wider">{t.card_origin}</p>
                      <p className="text-white font-bold text-sm leading-tight">{t.card_origin_city}</p>
                    </div>
                  </motion.div>

                  {t.card_cities.map((city, i) => (
                    <motion.div key={city} className="relative flex items-center gap-3 mb-3 z-10"
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 1.15 + i * 0.45 }}>
                      <div className="w-10 h-5 flex items-center justify-center shrink-0">
                        <motion.div className="w-2.5 h-2.5 rounded-full border-2 border-[#E31E24]/50 bg-[#E31E24]/22"
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ duration: 0.22, delay: 1.15 + i * 0.45 }} />
                      </div>
                      <p className="text-sm text-white/40 font-medium">{city}</p>
                    </motion.div>
                  ))}

                  <motion.div className="relative flex items-center gap-3 mt-2 z-10"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 3.1 }}>
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 border-emerald-400/35 bg-emerald-500/10"
                      animate={reached ? { scale: [1, 1.18, 1.06, 1], boxShadow: ["0 0 0px rgba(52,211,153,0)", "0 0 28px rgba(52,211,153,0.5)", "0 0 18px rgba(52,211,153,0.3)", "0 0 10px rgba(52,211,153,0.15)"] } : {}}
                      transition={{ duration: 0.55, ease: "easeOut" }}>
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-[9px] text-white/28 font-bold uppercase tracking-wider">{t.card_dest}</p>
                      <motion.p className="font-bold text-sm text-white leading-tight"
                        animate={reached ? { scale: [1, 1.06, 1] } : {}}
                        transition={{ duration: 0.35, delay: 0.08 }}>
                        {t.card_dest_city}
                      </motion.p>
                    </div>
                    <motion.span
                      className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400 bg-emerald-500/12 border border-emerald-400/25 px-2.5 py-1.5 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={reached ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      {t.card_time}
                    </motion.span>
                  </motion.div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/7 grid grid-cols-3 gap-3">
                  {[
                    { v: "50 000+", l: t.stat1 },
                    { v: locale === "ru" ? "24 ч" : "24 soat", l: t.stat2 },
                    { v: "0%",      l: t.stat3 },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <p className="font-serif font-bold text-[#E31E24] text-lg leading-none">{s.v}</p>
                      <p className="text-[9px] text-white/20 font-medium mt-1">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Float: ETA */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.4 }}
              style={{ position: "absolute", right: "-8px", top: "42%" }}>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.14)] p-3.5 flex items-center gap-3 min-w-[155px]">
                <div className="w-9 h-9 bg-[#E31E24] rounded-xl flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(227,30,36,0.38)]">
                  <Clock size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] text-[#1A1A1A]/40 font-bold uppercase tracking-wider">{t.card_eta_label}</p>
                  <p className="text-base font-bold text-[#1A1A1A] font-serif leading-tight">{t.card_eta_val}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Float: status */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.4 }}
              style={{ position: "absolute", left: "-8px", bottom: "0px" }}>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="bg-[#1A1A1A] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-3.5 min-w-[168px]">
                <p className="text-[9px] text-white/35 font-bold uppercase tracking-wider mb-2">{t.card_status_label}</p>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <p className="text-xs font-semibold text-white">{t.card_status_val}</p>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-[#E31E24] rounded-full"
                    initial={{ width: "0%" }} animate={{ width: "68%" }}
                    transition={{ duration: 1.8, delay: 1.2, ease: "easeOut" }} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════ TICKER ════════════ */
function Ticker({ locale }: { locale: Locale }) {
  const items = T[locale].ticker;
  return (
    <div className="bg-[#E31E24] py-3 overflow-hidden" aria-hidden="true">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-white text-sm font-semibold px-7 flex items-center gap-2.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white/45" />{item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ════════════ STATS ════════════ */
function Stats({ locale }: { locale: Locale }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const icons = [<Package size={20} key="p" />, <Building2 size={20} key="b" />, <Clock size={20} key="c" />, <MapPin size={20} key="m" />, <Shield size={20} key="s" />];
  return (
    <section ref={ref} className="bg-[#1A1A1A] py-12 sm:py-16" aria-label="Statistika">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
        {T[locale].stats.map((s, i) => (
          <motion.div key={s.l} custom={i} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
            className="flex flex-col items-center sm:items-start gap-1.5 text-center sm:text-left">
            <span className="text-[#E31E24] mb-1" aria-hidden="true">{icons[i]}</span>
            <p className="font-serif text-3xl font-bold text-white leading-none">{s.v}</p>
            <p className="text-xs text-white/40 font-medium">{s.l}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ════════════ SERVICES ════════════ */
function Services({ locale }: { locale: Locale }) {
  const t = T[locale];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const icons = [<Heart size={22} key="h" />, <FileText size={22} key="f" />, <MapPin size={22} key="m" />, <Building2 size={22} key="b" />, <Truck size={22} key="t" />, <Zap size={22} key="z" />];
  return (
    <section id="services" className="py-20 sm:py-28 bg-white" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} className="max-w-2xl mb-12">
          <p className="text-[#E31E24] text-[11px] font-bold uppercase tracking-[0.14em] mb-3">{t.svc_label}</p>
          <h2 id="services-heading" className="font-serif text-3xl sm:text-[2.5rem] font-bold text-[#1A1A1A] leading-[1.15] mb-3">{t.svc_h2}</h2>
          <p className="text-[#1A1A1A]/50 text-base leading-relaxed">{t.svc_p}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.services.map((c, i) => (
            <motion.article key={c.title} custom={i} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
              className="group bg-white border border-[#1A1A1A]/7 rounded-2xl overflow-hidden hover:border-transparent hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-colors duration-300"
              style={{ transformOrigin: "center center", willChange: "transform" }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                (e.currentTarget as HTMLElement).style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) scale3d(1.02,1.02,1.02)`;
                (e.currentTarget as HTMLElement).style.transition = "none";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
                (e.currentTarget as HTMLElement).style.transition = "transform 0.5s ease";
              }}
            >
              <div className="h-0.5 bg-[#E31E24] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
              <div className="p-6">
                <div className="w-11 h-11 bg-[#E31E24]/8 text-[#E31E24] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#E31E24] group-hover:text-white transition-all duration-300" aria-hidden="true">
                  {icons[i]}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E31E24]/60 bg-[#E31E24]/6 px-2.5 py-1 rounded-full">{c.tag}</span>
                <h3 className="font-serif text-base font-bold text-[#1A1A1A] mt-3 mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-[#1A1A1A]/50 leading-relaxed mb-4">{c.desc}</p>
                <ul className="flex flex-col gap-1.5">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-[#1A1A1A]/55">
                      <CheckCircle2 size={11} className="text-[#E31E24] shrink-0" aria-hidden="true" />{p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════ CALCULATOR BANNER ════════════ */
function CalcBanner({ locale }: { locale: Locale }) {
  const t = T[locale];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="py-8 bg-[#F8F9FA]" aria-label={t.calc_banner_h}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
          className="bg-white rounded-2xl border border-[#1A1A1A]/7 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#E31E24] rounded-xl flex items-center justify-center shrink-0 text-white shadow-[0_4px_14px_rgba(227,30,36,0.3)]" aria-hidden="true">
              <Calculator size={22} />
            </div>
            <div>
              <p className="font-serif font-bold text-lg text-[#1A1A1A]">{t.calc_banner_h}</p>
              <p className="text-sm text-[#1A1A1A]/45">{t.calc_banner_p}</p>
            </div>
          </div>
          <a href={t.calc_href} className="flex items-center gap-2 bg-[#E31E24] hover:bg-[#B71519] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-[0_4px_14px_rgba(227,30,36,0.25)] hover:-translate-y-0.5 shrink-0 whitespace-nowrap">
            {t.calc_banner_btn} <ArrowRight size={14} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════ HOW IT WORKS ════════════ */
/* ════════════ BRANCHES MAP ════════════ */
function BranchesMap({ locale }: { locale: Locale }) {
  const t = T[locale];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top)  / r.height - 0.5);
  }
  function onMouseLeave() { mouseX.set(0); mouseY.set(0); }

  return (
    <section id="branches" style={{ background: "#0F0F0F", padding: "96px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(227,30,36,0.12)", border: "1px solid rgba(227,30,36,0.25)", color: "#E31E24", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "100px", marginBottom: "20px" }}>
            <MapPin size={11} /> {t.map_label}
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "16px" }}>
            {t.map_h2_1} <span style={{ color: "#E31E24" }}>{t.map_h2_red}</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "16px", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>{t.map_p}</p>
        </motion.div>

        {/* 3D Video Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          style={{ perspective: "1200px", cursor: "grab" }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <motion.div
            style={{
              rotateX, rotateY,
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
              position: "relative",
              transformOrigin: "center center",
            }}
          >
            {/* Video */}
            <video
              autoPlay muted loop playsInline
              src="/map.mp4"
              style={{ width: "100%", display: "block", maxHeight: "520px", objectFit: "cover" }}
            />

            {/* Top gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.6) 100%)", pointerEvents: "none" }} />

            {/* Bottom overlay — badge stats */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "12px" }}>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {(t.map_badges as readonly { v: string; l: string }[]).map((b, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px", padding: "8px 14px", textAlign: "center" }}>
                    <div style={{ color: "#E31E24", fontWeight: 800, fontSize: "18px", lineHeight: 1 }}>{b.v}</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", marginTop: "3px", fontWeight: 500 }}>{b.l}</div>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#E31E24", color: "#fff", fontSize: "13px", fontWeight: 700, padding: "10px 20px", borderRadius: "12px", textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(227,30,36,0.4)", flexShrink: 0 }}
              >
                {t.map_cta} <ArrowRight size={14} />
              </a>
            </div>

            {/* Corner glow */}
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(227,30,36,0.25) 0%, transparent 70%)", pointerEvents: "none" }} />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

function HowItWorks({ locale }: { locale: Locale }) {
  const t = T[locale];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const stepIcons = [<Phone size={18} key="p" />, <Truck size={18} key="t" />, <MapPin size={18} key="m" />, <CheckCircle2 size={18} key="c" />];
  return (
    <section id="how" className="py-20 sm:py-28 bg-[#F8F9FA]" aria-labelledby="how-heading">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} className="text-center max-w-xl mx-auto mb-12">
          <p className="text-[#E31E24] text-[11px] font-bold uppercase tracking-[0.14em] mb-3">{t.how_label}</p>
          <h2 id="how-heading" className="font-serif text-3xl sm:text-[2.5rem] font-bold text-[#1A1A1A] leading-tight mb-3">{t.how_h2}</h2>
          <p className="text-[#1A1A1A]/50 text-base">{t.how_p}</p>
        </motion.div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" aria-label={t.how_h2}>
          {t.steps.map((s, i) => (
            <motion.li key={s.n} custom={i} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
              className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.08)] transition-shadow">
              <p className="font-serif text-5xl font-bold text-[#E31E24]/7 leading-none mb-3 select-none" aria-hidden="true">{s.n}</p>
              <div className="w-10 h-10 bg-[#E31E24] rounded-lg flex items-center justify-center text-white mb-4" aria-hidden="true">{stepIcons[i]}</div>
              <h3 className="font-serif text-base font-bold text-[#1A1A1A] mb-1.5">{s.title}</h3>
              <p className="text-sm text-[#1A1A1A]/50 leading-relaxed">{s.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ════════════ TESTIMONIALS ════════════ */
function Testimonials({ locale }: { locale: Locale }) {
  const t = T[locale];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <p className="text-[#E31E24] text-[11px] font-bold uppercase tracking-[0.14em] mb-3">{t.rev_label}</p>
            <h2 id="reviews-heading" className="font-serif text-3xl sm:text-[2.5rem] font-bold text-[#1A1A1A] leading-tight">{t.rev_h2}</h2>
          </div>
          <div className="flex items-center gap-2 shrink-0" aria-label="Reyting: 4.9 dan 5">
            <div className="flex" aria-hidden="true">{[...Array(5)].map((_, i) => <Star key={i} size={15} className="fill-amber-400 text-amber-400" />)}</div>
            <span className="font-bold text-[#1A1A1A] text-sm">4.9</span>
            <span className="text-[#1A1A1A]/40 text-sm">· 2 400+</span>
          </div>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {t.reviews.map((r, i) => (
            <motion.article key={r.name} custom={i} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
              className="bg-[#F8F9FA] rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-shadow flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-white text-xs font-bold shrink-0" aria-hidden="true">{r.initials}</div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">{r.name}</p>
                    <p className="text-[#1A1A1A]/40 text-xs">{r.location}</p>
                  </div>
                </div>
                <span className="text-[10px] text-[#1A1A1A]/28 font-medium">{r.platform}</span>
              </div>
              <div className="flex gap-0.5 mb-3" aria-label="5 yulduz" aria-hidden="true">{[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}</div>
              <h3 className="font-serif font-bold text-[#1A1A1A] text-sm mb-2 leading-snug">{r.title}</h3>
              <p className="text-xs text-[#1A1A1A]/55 leading-relaxed flex-1">{r.text}</p>
              <p className="text-[10px] text-[#1A1A1A]/28 mt-4 pt-3 border-t border-[#1A1A1A]/6">{r.date}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════ CONTACT ════════════ */
function Contact({ locale }: { locale: Locale }) {
  const t = T[locale];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setStatus("loading");
    setTimeout(() => setStatus("done"), 1600);
  };
  const bulletIcons = [<Clock size={14} key="c" />, <Shield size={14} key="s" />, <CheckCircle2 size={14} key="ch" />];
  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#1A1A1A] relative overflow-hidden" aria-labelledby="contact-heading">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#E31E24]/6 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E31E24]/4 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}>
          <p className="text-[#E31E24] text-[11px] font-bold uppercase tracking-[0.14em] mb-4">{t.cont_label}</p>
          <h2 id="contact-heading" className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {t.cont_h2_1}<br /><span className="text-[#E31E24]">{t.cont_h2_red}</span>
          </h2>
          <p className="text-white/45 text-base leading-relaxed mb-8">
            <strong className="text-white">{t.cont_bold}</strong> {locale === "uz" ? "ichida qayta qo'ng'iroq qilamiz. Yarim soatda kuryer eshigingizda." : "— перезвоним. Курьер у двери через полчаса."}
          </p>
          <ul className="flex flex-col gap-3.5 mb-8">
            {t.cont_bullets.map((b, i) => (
              <li key={b} className="flex items-center gap-3 text-sm text-white/55">
                <div className="w-8 h-8 rounded-lg bg-[#E31E24]/12 flex items-center justify-center text-[#E31E24] shrink-0" aria-hidden="true">{bulletIcons[i]}</div>
                {b}
              </li>
            ))}
          </ul>
          <address className="not-italic flex flex-col gap-3">
            <a href="tel:+998552002255" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#E31E24]/15 flex items-center justify-center transition-colors shrink-0" aria-hidden="true">
                <Phone size={14} className="text-[#E31E24]" />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">{t.cont_phone_label}</p>
                <p className="text-sm font-semibold text-white">+998 55 500-22-55</p>
              </div>
            </a>
            <a href="mailto:unex0102@gmail.com" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#E31E24]/15 flex items-center justify-center transition-colors shrink-0" aria-hidden="true">
                <Send size={14} className="text-[#E31E24]" />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">{t.cont_email_label}</p>
                <p className="text-sm font-semibold text-white">unex0102@gmail.com</p>
              </div>
            </a>
          </address>
        </motion.div>
        <motion.div custom={1} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 sm:p-8">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8" role="alert">
                  <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                    <CheckCircle2 size={34} className="text-emerald-400" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-1.5">{t.form_done_h}</h3>
                  <p className="text-white/50 text-sm"><strong className="text-white">{t.form_done_bold}</strong> {locale === "uz" ? "ichida qayta qo'ng'iroq." : "— перезвоним."}</p>
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white mb-1">{t.form_h3}</h3>
                    <p className="text-white/40 text-sm">{t.form_sub}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-[10px] font-bold uppercase tracking-wider text-white/35">{t.form_name_label}</label>
                    <input id="contact-name" type="text" placeholder={t.form_name_ph} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                      className="bg-white/7 border border-white/12 hover:border-white/20 focus:border-[#E31E24]/50 focus:outline-none rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="text-[10px] font-bold uppercase tracking-wider text-white/35">{t.form_phone_label}</label>
                    <input id="contact-phone" type="tel" placeholder="+998 __ ___ __ __" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required autoComplete="tel"
                      className="bg-white/7 border border-white/12 hover:border-white/20 focus:border-[#E31E24]/50 focus:outline-none rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm transition-colors" />
                  </div>
                  <button type="submit" disabled={status === "loading"}
                    className="flex items-center justify-center gap-2.5 bg-[#E31E24] hover:bg-[#B71519] disabled:opacity-60 text-white font-bold text-sm py-4 rounded-xl transition-all shadow-[0_6px_22px_rgba(227,30,36,0.35)] hover:-translate-y-0.5">
                    {status === "loading"
                      ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />{t.form_sending}</>
                      : <><Truck size={16} aria-hidden="true" />{t.form_submit}</>}
                  </button>
                  <p className="text-[11px] text-white/22 text-center">{t.form_legal}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════ 3D SHOWCASE ════════════ */
function Showcase3D({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  /* Mouse-tracking 3D tilt */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top)  / r.height - 0.5);
  }
  function onMouseLeave() { mouseX.set(0); mouseY.set(0); }

  const isUz = locale === "uz";

  const metrics = [
    { value: "50 000+", label: isUz ? "Yetkazilgan"     : "Доставок",     color: "#E31E24" },
    { value: "18 soat", label: isUz ? "O'rtacha vaqt"   : "Среднее время", color: "#10B981" },
    { value: "60+",     label: isUz ? "Filiallar"       : "Филиалов",     color: "#F59E0B" },
    { value: "0%",      label: isUz ? "Shikastlanish"   : "Повреждений",  color: "#6366F1" },
  ];

  const steps = isUz
    ? ["Ariza →", "Kuryer 30 daqiqada →", "Kuzatuv →", "Yetkazildi ✓"]
    : ["Заявка →", "Курьер 30 мин →", "Трекинг →", "Доставлено ✓"];

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 bg-[#0D0D0D] overflow-hidden"
      aria-label={isUz ? "UNEX Express imkoniyatlari" : "Возможности UNEX Express"}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E31E24]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/6 rounded-full blur-[100px]" />
      </div>
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#E31E24] text-[11px] font-bold uppercase tracking-[0.16em] mb-4">
            {isUz ? "Raqamlarda" : "В цифрах"}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            {isUz ? "Nima uchun " : "Почему "}
            <span className="text-[#E31E24]">UNEX Express?</span>
          </h2>
        </motion.div>

        {/* 3D central card + orbiting cards */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center">

          {/* ── 3D MAIN CARD ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ perspective: 900 }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="cursor-none select-none"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-[320px] sm:w-[380px] h-[440px] rounded-3xl"
            >
              {/* Card face */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(227,30,36,0.25)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A0A0A] via-[#160808] to-[#0F0F0F]" />
                {/* Sheen */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: useTransform(
                      [springX, springY],
                      ([x, y]) =>
                        `radial-gradient(circle at ${50 + (x as number) * 60}% ${50 + (y as number) * 60}%, rgba(227,30,36,0.5) 0%, transparent 60%)`
                    ),
                  }}
                />

                <div className="relative z-10 p-7 h-full flex flex-col">
                  {/* Top logo row */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-[#E31E24] rounded-xl flex items-center justify-center shadow-[0_4px_18px_rgba(227,30,36,0.55)]">
                        <Truck size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-extrabold text-sm leading-none tracking-wide">UNEX</p>
                        <p className="text-white/30 text-[9px] uppercase tracking-widest">Express</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/12 border border-emerald-400/25 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {isUz ? "Faol" : "Онлайн"}
                    </span>
                  </div>

                  {/* Big stat */}
                  <div className="mb-6">
                    <p className="text-white/20 text-xs font-bold uppercase tracking-widest mb-1">
                      {isUz ? "Bugungi yetkazishlar" : "Доставок сегодня"}
                    </p>
                    <motion.p
                      className="font-serif text-6xl font-bold text-white leading-none"
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      1 <span className="text-[#E31E24]">247</span>
                    </motion.p>
                  </div>

                  {/* Mini bar chart */}
                  <div className="mb-6">
                    <p className="text-white/18 text-[9px] uppercase tracking-widest mb-3">
                      {isUz ? "Haftalik dinamika" : "Активность за неделю"}
                    </p>
                    <div className="flex items-end gap-1.5 h-12">
                      {[55, 72, 48, 91, 68, 85, 100].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1"
                          style={{ height: `${h}%`, originY: 1, borderRadius: 2, background: i === 6 ? "#E31E24" : "rgba(255,255,255,0.08)" }}
                          initial={{ scaleY: 0 }}
                          animate={inView ? { scaleY: 1 } : {}}
                          transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease: "easeOut" }}
                          whileHover={{ background: "#E31E24" }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Progress rows */}
                  <div className="space-y-3 mt-auto">
                    {[
                      { l: isUz ? "Vaqtida"   : "Вовремя",       v: 97, c: "#10B981" },
                      { l: isUz ? "Sifat"     : "Качество",       v: 99, c: "#E31E24" },
                      { l: isUz ? "Mamnunlik" : "Удовлетворённость", v: 96, c: "#F59E0B" },
                    ].map((row) => (
                      <div key={row.l}>
                        <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1">
                          <span>{row.l}</span><span style={{ color: row.c }}>{row.v}%</span>
                        </div>
                        <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: row.c }}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${row.v}%` } : {}}
                            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3D depth shadow layer */}
              <div
                className="absolute inset-0 rounded-3xl -z-10"
                style={{ transform: "translateZ(-40px) scale(0.96)", background: "rgba(227,30,36,0.12)", filter: "blur(24px)" }}
              />
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Metric cards + flow ── */}
          <div className="flex flex-col gap-5 w-full max-w-sm lg:max-w-xs">
            {/* Metric cards */}
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, x: -4 }}
                className="bg-white/4 border border-white/7 rounded-2xl px-5 py-4 flex items-center gap-4 cursor-default"
                style={{ backdropFilter: "blur(12px)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-serif font-bold text-white text-sm"
                  style={{ background: `${m.color}22`, border: `1.5px solid ${m.color}40` }}
                >
                  <span style={{ color: m.color }}>{m.value.split(" ")[0]}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-base leading-none">
                    {m.value}
                  </p>
                  <p className="text-white/35 text-xs mt-0.5">{m.label}</p>
                </div>
                <motion.div
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ background: m.color }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
              </motion.div>
            ))}

            {/* Flow steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="bg-[#E31E24]/8 border border-[#E31E24]/18 rounded-2xl p-5"
            >
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#E31E24]/70 mb-4">
                {isUz ? "Jarayon" : "Процесс"}
              </p>
              <div className="flex flex-col gap-2.5">
                {steps.map((step, i) => (
                  <motion.div
                    key={step}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.9 + i * 0.1 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#E31E24] flex items-center justify-center shrink-0 text-white text-[9px] font-bold">
                      {i + 1}
                    </div>
                    <p className="text-white/70 text-xs font-medium">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════ FAQ ════════════ */
function FAQ({ locale }: { locale: Locale }) {
  const isUz = locale === "uz";
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const label   = isUz ? "Savol-javoblar" : "Вопросы и ответы";
  const heading = isUz ? "Ko'p so'raladigan savollar" : "Часто задаваемые вопросы";

  const faqs = isUz ? [
    { q: "Yetkazish qancha turadi?",           a: "Standart yetkazish 15 000 so'mdan boshlanadi. Aniq narxni kalkulyatorda 1 daqiqada hisoblaysiz." },
    { q: "Kuryer qachon keladi?",               a: "Ariza bergandan so'ng 30 daqiqa ichida kuryer sizga keladi. Toshkent bo'ylab — har doim." },
    { q: "Qaysi viloyatlarga yetkazasiz?",      a: "O'zbekistonning barcha 12 viloyatiga yetkazamiz. 60 dan ortiq filialimiz mavjud." },
    { q: "Posilka shikastlansa nima bo'ladi?",  a: "Har bir posilka avtomatik sug'urtalangan. Shikastlanish holatida to'liq qiymatini to'laymiz — hujjatsiz." },
    { q: "Naqdli to'lovni qabul qilasizmi?",    a: "Ha, 0% komissiya bilan naqdli to'lovni qabul qilamiz. Pul to'g'ridan-to'g'ri sizga o'tkaziladi." },
    { q: "Posilkani qancha vaqt saqlaysiz?",    a: "Posilkani 7 kun bepul saqlaymiz. Keyin kuniga kichik saqlash haqi olinadi." },
  ] : [
    { q: "Сколько стоит доставка?",             a: "Стандартная доставка от 15 000 сум. Точную стоимость рассчитайте на калькуляторе — займёт 1 минуту." },
    { q: "Когда приедет курьер?",               a: "Курьер приедет в течение 30 минут после оформления заявки. По всему Ташкенту — гарантированно." },
    { q: "В какие регионы доставляете?",        a: "Доставляем во все 12 регионов Узбекистана. Более 60 филиалов по всей стране." },
    { q: "Что если посылка повреждена?",        a: "Каждая посылка застрахована автоматически. В случае повреждения возмещаем полную стоимость — без лишних бумаг." },
    { q: "Принимаете наложенный платёж?",       a: "Да, с комиссией 0%. Деньги переводятся вам напрямую." },
    { q: "Сколько хранится посылка?",           a: "Бесплатно храним посылку 7 дней. После — небольшая плата за хранение в день." },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F8F9FA]" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} className="text-center mb-12">
          <p className="text-[#E31E24] text-[11px] font-bold uppercase tracking-[0.14em] mb-3">{label}</p>
          <h2 id="faq-heading" className="font-serif text-3xl sm:text-[2.5rem] font-bold text-[#1A1A1A] leading-tight">{heading}</h2>
        </motion.div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              style={{
                border: `1.5px solid ${open === i ? "rgba(227,30,36,0.22)" : "rgba(26,26,26,0.08)"}`,
                borderRadius: "16px", overflow: "hidden",
                background: "#fff",
                boxShadow: open === i ? "0 4px 20px rgba(227,30,36,0.07)" : "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  justifyContent: "space-between", padding: "20px",
                  background: "none", border: "none", cursor: "pointer", textAlign: "left",
                }}
              >
                <span style={{
                  fontFamily: "Playfair Display, serif", fontWeight: 700,
                  color: "#1A1A1A", fontSize: "clamp(0.875rem, 2vw, 1rem)",
                  paddingRight: "16px", lineHeight: 1.4,
                }}>
                  {faq.q}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0, width: "28px", height: "28px",
                    borderRadius: "50%",
                    background: open === i ? "#E31E24" : "rgba(26,26,26,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s, transform 0.3s",
                    transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                    color: open === i ? "#fff" : "rgba(26,26,26,0.45)",
                  }}
                >
                  <ChevronDown size={14} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{
                      padding: "0 20px 20px",
                      fontSize: "14px", color: "rgba(26,26,26,0.6)", lineHeight: 1.7,
                    }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════ FOOTER ════════════ */
/* ════════════ AI ASSISTANT ════════════ */
function AIAssistant({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "ai"; text: string }[]>([
    { from: "ai", text: t.ai_default },
  ]);
  const [input, setInput] = useState("");

  const handleQuestion = (q: string, a: string) => {
    setMessages(prev => [...prev, { from: "user", text: q }, { from: "ai", text: a }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setInput("");
    setMessages(prev => [
      ...prev,
      { from: "user", text: q },
      {
        from: "ai",
        text: locale === "uz"
          ? "Rahmat savol uchun! Aniq ma'lumot uchun +998 55 500-22-55 ga qo'ng'iroq qiling."
          : "Спасибо за вопрос! Для точной информации позвоните +998 55 500-22-55.",
      },
    ]);
  };

  const renderText = (text: string) =>
    text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
      i % 2 === 1
        ? <strong key={i} style={{ color: "#1A1A1A", fontWeight: 700 }}>{part}</strong>
        : part
    );

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: "fixed", bottom: "28px", right: "28px", zIndex: 9999,
          width: "60px", height: "60px", borderRadius: "50%",
          background: "#E31E24",
          boxShadow: "0 8px 28px rgba(227,30,36,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "none", cursor: "pointer",
          animation: open ? "none" : "pulseRed 2.5s ease-in-out infinite",
        }}
        aria-label={t.ai_title}
      >
        {open ? <X size={22} color="#fff" /> : <MessageCircle size={24} color="#fff" />}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "fixed", bottom: "100px", right: "28px", zIndex: 9998,
              width: "min(380px, calc(100vw - 40px))",
              borderRadius: "20px", overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
              background: "#fff",
              display: "flex", flexDirection: "column",
              maxHeight: "560px",
            }}
          >
            {/* Header */}
            <div style={{ background: "#E31E24", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={15} color="#fff" style={{ fill: "#fff" }} />
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "13px", lineHeight: 1.2 }}>{t.ai_title}</p>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "11px" }}>UNEX Express</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", padding: "4px" }}>
                <X size={17} />
              </button>
            </div>

            {/* Quick questions */}
            <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(26,26,26,0.07)", background: "#F8F9FA" }}>
              <p style={{ fontSize: "10px", color: "rgba(26,26,26,0.4)", fontWeight: 600, marginBottom: "7px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.ai_hint}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {(t.ai_questions as readonly string[]).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuestion(q, (t.ai_answers as readonly string[])[i])}
                    style={{ background: "#fff", border: "1.5px solid rgba(227,30,36,0.18)", borderRadius: "9px", padding: "7px 11px", fontSize: "12px", fontWeight: 500, color: "#1A1A1A", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}
                    onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E31E24"; (e.currentTarget as HTMLElement).style.background = "#FFF5F5"; }}
                    onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(227,30,36,0.18)"; (e.currentTarget as HTMLElement).style.background = "#fff"; }}
                  >{q}</button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "9px", minHeight: "100px" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "85%", padding: "9px 13px", borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: msg.from === "user" ? "#E31E24" : "#F8F9FA", color: msg.from === "user" ? "#fff" : "#1A1A1A", fontSize: "13px", lineHeight: 1.55 }}>
                    {renderText(msg.text)}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(26,26,26,0.07)", display: "flex", gap: "8px" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder={t.ai_placeholder}
                style={{ flex: 1, border: "1.5px solid rgba(26,26,26,0.12)", borderRadius: "10px", padding: "8px 12px", fontSize: "13px", outline: "none", fontFamily: "inherit" }}
              />
              <button onClick={handleSend} style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#E31E24", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} aria-label={t.ai_send}>
                <Send size={14} color="#fff" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const t = T[locale];
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#111111] text-white" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[#E31E24] rounded-lg flex items-center justify-center shrink-0" aria-hidden="true">
                <Truck size={13} className="text-white" />
              </div>
              <div>
                <p className="text-white font-extrabold text-sm leading-none">UNEX</p>
                <p className="text-white/35 text-[9px] font-medium tracking-widest uppercase leading-none">Express</p>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-4">{t.footer_desc}</p>
            <div className="flex gap-2.5">
              {([<MessageCircle size={14} key="1" />, <Send size={14} key="2" />, <Phone size={14} key="3" />]).map((ic, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#E31E24] flex items-center justify-center transition-all duration-200" aria-label={["Telegram", "Email", "Telefon"][i]}>{ic}</a>
              ))}
            </div>
          </div>
          <nav aria-label={t.footer_svc_h}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/22 mb-4">{t.footer_svc_h}</p>
            <ul className="space-y-2.5">
              {t.footer_svc_list.map((s) => (
                <li key={s}><a href="#services" className="text-xs text-white/40 hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t.footer_info_h}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/22 mb-4">{t.footer_info_h}</p>
            <ul className="space-y-2.5">
              {t.footer_info_list.map((s) => (
                <li key={s.label}><a href={s.href} className="text-xs text-white/40 hover:text-white transition-colors">{s.label}</a></li>
              ))}
            </ul>
          </nav>
          <address className="not-italic">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/22 mb-4">{t.footer_cont_h}</p>
            <ul className="space-y-3">
              {[
                { icon: <Phone size={12} />,  text: "+998 55 500-22-55",   href: "tel:+998552002255" },
                { icon: <Send size={12} />,   text: "unex0102@gmail.com",  href: "mailto:unex0102@gmail.com" },
                { icon: <MapPin size={12} />, text: t.footer_addr,         href: "#" },
                { icon: <Clock size={12} />,  text: t.footer_hours,        href: "#" },
              ].map((c) => (
                <li key={c.text}>
                  <a href={c.href} className="flex items-center gap-2.5 text-xs text-white/40 hover:text-white transition-colors">
                    <span className="text-[#E31E24] shrink-0" aria-hidden="true">{c.icon}</span>{c.text}
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>
        <div className="pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/18 text-xs">© {year} «UNEX EXPRESS» {t.footer_copy}</p>
          <div className="flex gap-4">
            {t.footer_links.map((link) => (
              <a key={link} href="#" className="text-white/18 hover:text-white/40 text-xs transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ════════════ ROOT ════════════ */
export default function HomeClient({ locale }: { locale: Locale }) {
  return (
    <main>
      <Navbar locale={locale} />
      <ScrollVideoHero locale={locale} />
      <Hero locale={locale} />
      <Ticker locale={locale} />
      <Stats locale={locale} />
      <Services locale={locale} />
      <CalcBanner locale={locale} />
      <BranchesMap locale={locale} />
      <HowItWorks locale={locale} />
      <Testimonials locale={locale} />
      <FAQ locale={locale} />
      <Showcase3D locale={locale} />
      <Contact locale={locale} />
      <Footer locale={locale} />
      <AIAssistant locale={locale} />
    </main>
  );
}
