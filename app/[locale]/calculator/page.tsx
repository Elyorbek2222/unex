"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Calculator, Package, Truck, Building2, ChevronDown, ChevronUp,
  CheckCircle2, Info, ArrowRight, RotateCcw, Ruler, Clock,
  Phone, MapPin, AlertCircle, Box, MessageCircle, X, Send, Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  deliveryTypes, getBasePrice, getBillableWeight,
  packagingOptions, additionalServices, deliveryTimes,
  type DeliveryType, type DeliveryMode,
} from "@/lib/pricing";

/* ── Translations ── */
type Locale = "uz" | "ru";

const T = {
  uz: {
    back:             "← Bosh sahifaga",
    phone_label:      "Qo'ng'iroq",
    badge:            "Tarif kalkulyatori",
    title:            "Yetkazish narxini hisoblang",
    subtitle:         "«UNEX EXPRESS» MChJ rasmiy tariflari · NQSsiz · O'zbekiston",
    tab_calc:         "Kalkulyator",
    tab_table:        "Tariflar",
    tab_extra:        "Qo'shimcha",
    tab_time:         "Muddatlar",
    mode_label:       "Jo'natma turi",
    standard:         "Standart",
    transit:          "Tranzit",
    mode_desc_std:    "To'g'ridan-to'g'ri jo'natish — O'zbekistonning istalgan nuqtasidan",
    mode_desc_tr:     "Tranzit — boshqa filial orqali jo'natish",
    type_label:       "Yetkazish usuli",
    weight_label:     "Jo'natma og'irligi",
    kg:               "kg",
    vol_toggle:       "Hajmiy og'irlikni hisoblash",
    vol_formula:      "Hajmiy og'irlik = (Uzunlik × Kenglik × Balandlik) / 5000",
    dim_l:            "Uzunlik",
    dim_w:            "Kenglik",
    dim_h:            "Balandlik",
    dim_unit:         "sm",
    calc_btn:         "Narxni hisoblash",
    reset_title:      "Tozalash",
    result_label:     "Hisoblash natijasi",
    billable_weight:  "Hisob og'irligi",
    delivery_method:  "Yetkazish usuli",
    price_label:      "Yetkazish narxi",
    sum:              "so'm",
    vol_used:         " — qo'llanildi (haqiqiydan og'irroq)",
    vol_not_used:     " — qo'llanilmadi (haqiqiydan yengilroq)",
    vol_weight:       "Hajmiy og'irlik",
    guarantees:       ["Yashirin to'lovlar yo'q", "SMS-xabarnoma bepul", "Har bir posilka sug'urtalangan"],
    order_btn:        "Buyurtma berish",
    fill_params:      "Parametrlarni to'ldiring",
    fill_hint:        "va «Narxni hisoblash» tugmasini bosing",
    info_title:       "Bilish kerak",
    info_items:       ["Hajmiy og'irlik = (U×K×B sm) / 5000", "Kuryer 30 daqiqada keladi", "Qadoqlash bizdan — bepul", "+998 55 500-22-55"],
    table_weight:     "Og'irlik (KG)",
    table_note:       "* Narxlar NQSsiz so'mda. 15 kg dan oshsa — har kg uchun +5 000 so'm.",
    table_standard:   "Standart tarif",
    table_transit:    "Tranzit tarif",
    extra_packaging:  "Qadoqlash materiallari",
    extra_services:   "Qo'shimcha xizmatlar",
    extra_cod:        "Naqdli to'lov (internet do'konlar)",
    col_packaging:    "Qadoqlash turi",
    col_price:        "Narxi",
    col_size:         "O'lchami",
    col_service:      "Xizmat",
    col_tariff:       "Tarif",
    col_note:         "Izoh",
    box:              "Quti",
    cod_items: [
      { label: "2 kg gacha (shahar)",          value: "50 000 so'm" },
      { label: "2 kg gacha (markaz/tuman)",    value: "50 000 so'm" },
      { label: "2 kg dan ortiq",               value: "Kelishilgan holda" },
      { label: "Naqdli to'lov qabuli",         value: "0%" },
      { label: "Qaytarish (rad etish)",        value: "Bepul" },
    ],
    add_services_uz: [
      { name: "SMS-xabarnoma (Jo'natuvchi va Qabul qiluvchiga)", price: "Bepul",             info: "Buyurtmada ko'rsatilgan raqamga SMS" },
      { name: "Jo'natmani qaytarish",                            price: "To'liq narx 100%",  info: "Qabul qiluvchi rad etsa yoki javob bermasa. Saqlash muddati — 7 kun" },
      { name: "Brendli paket (Katta 45×64 sm)",                  price: "Bepul",             info: "" },
      { name: "Brendli paket (O'rta 30×48 sm)",                  price: "Bepul",             info: "" },
      { name: "Brendli paket (Kichik 25×43 sm)",                 price: "Bepul",             info: "" },
      { name: "Shahar bo'ylab tez yetkazish",                    price: "70 000 so'm",       info: "" },
      { name: "Viloyat bo'ylab tez yetkazish",                   price: "140 000 so'm",      info: "" },
    ],
    time_info:   "Muddatlar ish kunlari uchun. Dam olish va bayram kunlari hisobga olinmaydi. Yomon ob-havo holatida muddat 2–3 kunga uzayishi mumkin.",
    time_cond_title: "Muhim shartlar",
    time_conditions: [
      "Kuryer chaqirilganda har bir jo'natma alohida to'lanadi; chaqiriq uchun tarif bo'yicha bir martalik to'lov olinadi.",
      "Jo'natuvchi kuryer chaqirilgandan keyin jo'natmani topshirishdan bosh tortsa, 10 000 so'm soxta chaqiriq uchun undiriladi.",
      "Tarifda ko'rsatilmagan aholi punktlarigacha yetkazish narxi alohida hisoblanadi.",
      "Kuryer kutishga 10 daqiqadan ortiq bo'lsa — har daqiqaga 5 000 so'm.",
      "To'lov faqat milliy valyutada: naqd pul, karta yoki naqd pulsiz o'tkazma. NQSsiz tariflar.",
    ],
    delivery_times_uz: [
      { hours: "18–24 soat", cities: ["Namangan", "Chust", "Uchqo'rg'on", "Andijon", "Qo'rg'ontepa", "Asaka", "Farg'ona", "Marg'ilon", "Rishton", "Qo'qon", "Guliston", "Jizzax", "G'allarol", "Samarqand", "Urgut", "Kattaqo'rg'on", "Navoiy", "Zarafshon", "Buxoro", "G'ijduvon", "Qarshi", "Shahrisabz"] },
      { hours: "18–48 soat", cities: ["Termiz", "Denov", "Sariosiye", "Urganch", "Xiva", "Beruniy", "Nukus"] },
    ],
    delivery_desc: {
      "office-office":       "Filialga topshirasiz, qabul qiluvchi filialdan oladi",
      "office-door-city":    "Filialga topshirasiz, shahar markazidagi eshikkacha yetkazamiz",
      "door-door":           "Kuryer sizdan olib, bevosita qabul qiluvchiga yetkazadi",
      "office-regional":     "Filialga topshirasiz, viloyat markazigacha yetkazamiz",
      "office-tashkent-reg": "Toshkent viloyat markazigacha yetkazish",
    } as Record<string, string>,
    cta_title:   "Posilka jo'natmoqchimisiz?",
    cta_desc:    "Kuryer 30 daqiqada eshigingizda. Bepul qadoqlash.",
    cta_call:    "Qo'ng'iroq qilish",
    cta_btn:     "Kuryer chaqirish (bepul)",
    ai_title:    "AI Yordamchi",
    ai_hint:     "Savolingizni yozing yoki quyidagilardan birini tanlang",
    ai_questions: [
      "Narx qanday hisoblanadi?",
      "Kuryer qachon keladi?",
      "Qaysi viloyatlarga yetkazasiz?",
      "Posilkam shikastlansa nima bo'ladi?",
    ],
    ai_answers: [
      "Narx og'irlik, yetkazish usuli va tarif turiga (Standart yoki Tranzit) qarab hisoblanadi. Kalkulyatorga og'irlikni kiriting, usulni tanlang va «Narxni hisoblash» tugmasini bosing — natijani darhol ko'rasiz.",
      "Ariza bergandan so'ng kuryer **30 daqiqa** ichida keladi. Toshkent bo'ylab — har doim va kafolatlangan.",
      "O'zbekistonning barcha **12 viloyatiga** yetkazamiz. Asosiy shaharlar 18–24 soat, uzoq hududlar 18–48 soat ichida. Quyida «Muddatlar» bo'limida batafsil ko'ring.",
      "Har bir posilka avtomatik ravishda sug'urtalangan. Shikastlanish holatida **to'liq qiymatini** to'laymiz — hujjatsiz va muammoʼsiz.",
    ],
    ai_placeholder: "Savolingizni yozing...",
    ai_send: "Yuborish",
    ai_default: "Salom! Men UNEX Express AI yordamchisiman. Savol bering yoki yuqoridagi variantlardan birini tanlang.",
  },
  ru: {
    back:             "← На главную",
    phone_label:      "Позвонить",
    badge:            "Тарифный калькулятор",
    title:            "Рассчитайте стоимость доставки",
    subtitle:         "Официальные тарифы ООО «UNEX EXPRESS» · Цены без НДС · Узбекистан",
    tab_calc:         "Калькулятор",
    tab_table:        "Тарифы",
    tab_extra:        "Доп. услуги",
    tab_time:         "Сроки",
    mode_label:       "Тип отправки",
    standard:         "Стандарт",
    transit:          "Транзит",
    mode_desc_std:    "Прямая отправка — из любой точки Узбекистана",
    mode_desc_tr:     "Транзит — отправка через другой филиал компании",
    type_label:       "Способ доставки",
    weight_label:     "Вес отправления",
    kg:               "кг",
    vol_toggle:       "Рассчитать объёмный вес",
    vol_formula:      "Объёмный вес = (Длина × Ширина × Высота) / 5000",
    dim_l:            "Длина",
    dim_w:            "Ширина",
    dim_h:            "Высота",
    dim_unit:         "см",
    calc_btn:         "Рассчитать стоимость",
    reset_title:      "Сбросить",
    result_label:     "Результат расчёта",
    billable_weight:  "Расчётный вес",
    delivery_method:  "Способ доставки",
    price_label:      "Стоимость доставки",
    sum:              "сум",
    vol_used:         " — применён (больше фактического)",
    vol_not_used:     " — не применён (меньше фактического)",
    vol_weight:       "Объёмный вес",
    guarantees:       ["Без скрытых платежей", "СМС-уведомление бесплатно", "Страховка каждой посылки"],
    order_btn:        "Оформить заказ",
    fill_params:      "Заполните параметры",
    fill_hint:        "и нажмите «Рассчитать стоимость»",
    info_title:       "Полезно знать",
    info_items:       ["Объёмный вес = (Д×Ш×В см) / 5000", "Курьер приедет через 30 минут", "Упаковка от нас — бесплатно", "+998 55 500-22-55"],
    table_weight:     "Вес (КГ)",
    table_note:       "* Цены указаны в сумах без учёта НДС. Свыше 15 кг — +5 000 сум за каждый кг.",
    table_standard:   "Стандартный тариф",
    table_transit:    "Транзитный тариф",
    extra_packaging:  "Упаковочные материалы",
    extra_services:   "Дополнительные услуги",
    extra_cod:        "Наложенный платёж (интернет-магазины)",
    col_packaging:    "Вид упаковки",
    col_price:        "Стоимость",
    col_size:         "Размер",
    col_service:      "Услуга",
    col_tariff:       "Тариф",
    col_note:         "Примечание",
    box:              "Коробка",
    cod_items: [
      { label: "Доставка до 2 кг (город)",          value: "50 000 сум" },
      { label: "Доставка до 2 кг (центр/район)",    value: "50 000 сум" },
      { label: "Свыше 2 кг",                        value: "Договорная" },
      { label: "Приём наложенных платежей",          value: "0%" },
      { label: "Возврат (отказ)",                    value: "Бесплатно" },
    ],
    add_services_uz: additionalServices.map(s => ({ name: s.name_ru, price: s.price_ru, info: s.info_ru })),
    time_info:   "Сроки указаны для рабочих дней. Выходные и праздники в срок не включаются. В плохую погоду срок может увеличиться до 2–3 дней.",
    time_cond_title: "Важные условия",
    time_conditions: [
      "При вызове курьера каждая отправка оплачивается отдельно; за вызов берётся разовая оплата согласно тарифу.",
      "Если отправитель отказывается передать отправление после вызова курьера, взимается 10 000 сум за ложный вызов.",
      "Стоимость доставки до населённых пунктов, не указанных в тарифе, рассчитывается индивидуально.",
      "Ожидание курьера свыше 10 минут — 5 000 сум за каждую минуту.",
      "Оплата только в национальной валюте: наличные, карта или безналичный перевод. Тарифы без НДС.",
    ],
    delivery_times_uz: deliveryTimes.map(z => ({ hours: z.hours, cities: z.cities })),
    delivery_desc: {
      "office-office":       "Сдаёте в нашем офисе, получатель забирает в офисе",
      "office-door-city":    "Сдаёте в офисе, доставим до двери в центре города",
      "door-door":           "Курьер забирает у вас и доставляет прямо до получателя",
      "office-regional":     "Сдаёте в офисе, доставим до областного центра",
      "office-tashkent-reg": "Доставка до Ташкентского областного центра",
    } as Record<string, string>,
    cta_title:   "Готовы отправить посылку?",
    cta_desc:    "Курьер у вашей двери через 30 минут. Бесплатная упаковка.",
    cta_call:    "Позвонить",
    cta_btn:     "Вызвать курьера",
    ai_title:    "AI Помощник",
    ai_hint:     "Напишите вопрос или выберите один из вариантов",
    ai_questions: [
      "Как рассчитывается цена?",
      "Когда приедет курьер?",
      "В какие регионы доставляете?",
      "Что если посылка повреждена?",
    ],
    ai_answers: [
      "Цена рассчитывается по весу, способу доставки и типу тарифа (Стандарт или Транзит). Введите вес в калькулятор, выберите способ и нажмите «Рассчитать» — результат сразу на экране.",
      "Курьер приедет в течение **30 минут** после оформления заявки. По Ташкенту — всегда и гарантированно.",
      "Доставляем во все **12 регионов** Узбекистана. Основные города — 18–24 часа, отдалённые районы — 18–48 часов. Подробнее во вкладке «Сроки».",
      "Каждая посылка застрахована автоматически. При повреждении возмещаем **полную стоимость** — без документов и лишних вопросов.",
    ],
    ai_placeholder: "Напишите вопрос...",
    ai_send: "Отправить",
    ai_default: "Здравствуйте! Я AI-помощник UNEX Express. Задайте вопрос или выберите один из вариантов выше.",
  },
} as const;

/* ── helpers ── */
function fmt(n: number, locale: Locale) {
  return n.toLocaleString("ru-RU") + " " + (locale === "uz" ? "so'm" : "сум");
}

/* ══════════════════════════════════════════════════
   AI ASSISTANT WIDGET
══════════════════════════════════════════════════ */
function AIAssistant({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "ai"; text: string }[]>([
    { from: "ai", text: t.ai_default },
  ]);
  const [input, setInput] = useState("");

  const handleQuestion = (q: string, a: string) => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: q },
      { from: "ai", text: a },
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { from: "user", text: q },
      {
        from: "ai",
        text: locale === "uz"
          ? "Rahmat savol uchun! Aniq ma'lumot uchun +998 55 500-22-55 raqamiga qo'ng'iroq qiling yoki yuqoridagi tayyor savollardan foydalaning."
          : "Спасибо за вопрос! Для точной информации позвоните по номеру +998 55 500-22-55 или воспользуйтесь готовыми вопросами выше.",
      },
    ]);
  };

  const renderText = (text: string) => {
    // simple bold: **text**
    return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
      i % 2 === 1
        ? <strong key={i} style={{ color: "#1A1A1A", fontWeight: 700 }}>{part}</strong>
        : part
    );
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", bottom: "28px", right: "28px", zIndex: 1000,
          width: "60px", height: "60px", borderRadius: "50%",
          background: "#E31E24",
          boxShadow: "0 8px 28px rgba(227,30,36,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "none", cursor: "pointer",
          animation: open ? "none" : "pulse-ai 2.5s ease-in-out infinite",
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
              position: "fixed", bottom: "100px", right: "28px", zIndex: 999,
              width: "min(400px, calc(100vw - 32px))",
              borderRadius: "20px", overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
              background: "#fff",
              display: "flex", flexDirection: "column",
              maxHeight: "560px",
            }}
          >
            {/* Header */}
            <div style={{
              background: "#E31E24", padding: "16px 20px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Zap size={16} color="#fff" style={{ fill: "#fff" }} />
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "14px", lineHeight: 1.2 }}>{t.ai_title}</p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>UNEX Express</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", padding: "4px" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick questions */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(26,26,26,0.07)", background: "#F8F9FA" }}>
              <p style={{ fontSize: "11px", color: "rgba(26,26,26,0.45)", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {t.ai_hint}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {t.ai_questions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuestion(q, t.ai_answers[i])}
                    style={{
                      background: "#fff", border: "1.5px solid rgba(227,30,36,0.18)",
                      borderRadius: "10px", padding: "8px 12px",
                      fontSize: "12px", fontWeight: 500, color: "#1A1A1A",
                      cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                    }}
                    onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E31E24"; (e.currentTarget as HTMLElement).style.background = "#FFF5F5"; }}
                    onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(227,30,36,0.18)"; (e.currentTarget as HTMLElement).style.background = "#fff"; }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "10px", minHeight: "120px" }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      padding: "10px 14px",
                      borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.from === "user" ? "#E31E24" : "#F8F9FA",
                      color: msg.from === "user" ? "#fff" : "#1A1A1A",
                      fontSize: "13px", lineHeight: 1.55,
                    }}
                  >
                    {renderText(msg.text)}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(26,26,26,0.07)", display: "flex", gap: "8px" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder={t.ai_placeholder}
                style={{
                  flex: 1, border: "1.5px solid rgba(26,26,26,0.12)", borderRadius: "10px",
                  padding: "9px 14px", fontSize: "13px", outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  background: "#E31E24", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
                aria-label={t.ai_send}
              >
                <Send size={15} color="#fff" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse-ai {
          0%, 100% { box-shadow: 0 8px 28px rgba(227,30,36,0.45); }
          50%       { box-shadow: 0 8px 36px rgba(227,30,36,0.7), 0 0 0 8px rgba(227,30,36,0.12); }
        }
      `}</style>
    </>
  );
}

/* ══════════════════════════════════════════════════
   TARIFF TABLE
══════════════════════════════════════════════════ */
function TariffTable({ mode, locale }: { mode: DeliveryMode; locale: Locale }) {
  const t = T[locale];
  const weights = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1A1A1A]/8">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="bg-[#1A1A1A] text-white">
            <th className="px-4 py-3.5 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">
              {t.table_weight}
            </th>
            {deliveryTypes.map((c) => (
              <th key={c.value} className="px-4 py-3.5 text-center font-semibold text-xs uppercase tracking-wider">
                {locale === "uz" ? c.label_uz : c.label_ru}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weights.map((kg, i) => (
            <tr key={kg} className={`border-t border-[#1A1A1A]/6 transition-colors hover:bg-[#E31E24]/3 ${i % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]"}`}>
              <td className="px-4 py-3 font-bold text-[#1A1A1A] text-center">{kg}</td>
              {deliveryTypes.map((c) => (
                <td key={c.value} className="px-4 py-3 text-center text-[#1A1A1A]/70 font-medium">
                  {getBasePrice(kg, c.value, mode).toLocaleString("ru-RU")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-[#1A1A1A]/40 px-4 py-3 border-t border-[#1A1A1A]/6 bg-[#F8F9FA]">
        {t.table_note}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN CALCULATOR
══════════════════════════════════════════════════ */
function CalcForm({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [mode, setMode] = useState<DeliveryMode>("standard");
  const [type, setType] = useState<DeliveryType>("office-office");
  const [weight, setWeight] = useState<string>("1");
  const [useVol, setUseVol] = useState(false);
  const [dims, setDims] = useState({ l: "", w: "", h: "" });
  const [result, setResult] = useState<null | {
    price: number; billable: number; volumetric: number; usedVol: boolean;
  }>(null);

  const handleCalc = useCallback(() => {
    const w = parseFloat(weight) || 0;
    const l = parseFloat(dims.l) || 0;
    const ww = parseFloat(dims.w) || 0;
    const h = parseFloat(dims.h) || 0;
    const { billable, volumetric, usedVolumetric } = useVol
      ? getBillableWeight(w, l, ww, h)
      : { billable: w, volumetric: 0, usedVolumetric: false };
    const price = getBasePrice(billable || w, type, mode);
    setResult({ price, billable: billable || w, volumetric, usedVol: usedVolumetric });
  }, [weight, dims, type, mode, useVol]);

  const handleReset = () => { setWeight("1"); setDims({ l: "", w: "", h: "" }); setResult(null); };
  const selectedType = deliveryTypes.find((d) => d.value === type)!;
  const selectedLabel = locale === "uz" ? selectedType.label_uz : selectedType.label_ru;

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-6">
      {/* ── Left: form ── */}
      <div className="bg-white rounded-2xl border border-[#1A1A1A]/8 overflow-hidden">
        <div className="h-1 bg-[#E31E24]" />
        <div className="p-6 sm:p-8 space-y-7">

          {/* Mode toggle */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/45 mb-3">{t.mode_label}</p>
            <div className="grid grid-cols-2 gap-2">
              {(["standard", "transit"] as DeliveryMode[]).map((m) => (
                <button key={m} onClick={() => { setMode(m); setResult(null); }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                    mode === m ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-[#1A1A1A]/60 border-[#1A1A1A]/12 hover:border-[#1A1A1A]/25"
                  }`}
                >
                  {m === "standard" ? <><Truck size={14} /> {t.standard}</> : <><Building2 size={14} /> {t.transit}</>}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#1A1A1A]/40 mt-2 flex items-start gap-1.5">
              <Info size={11} className="shrink-0 mt-0.5" />
              {mode === "standard" ? t.mode_desc_std : t.mode_desc_tr}
            </p>
          </div>

          {/* Delivery type */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/45 mb-3">{t.type_label}</p>
            <div className="flex flex-col gap-2">
              {deliveryTypes.map((dt) => (
                <button key={dt.value} onClick={() => { setType(dt.value); setResult(null); }}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
                    type === dt.value ? "border-[#E31E24]/50 bg-[#E31E24]/4" : "border-[#1A1A1A]/8 hover:border-[#1A1A1A]/18 bg-white"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${type === dt.value ? "border-[#E31E24]" : "border-[#1A1A1A]/25"}`}>
                    {type === dt.value && <div className="w-2 h-2 rounded-full bg-[#E31E24]" />}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${type === dt.value ? "text-[#E31E24]" : "text-[#1A1A1A]"}`}>
                      {locale === "uz" ? dt.label_uz : dt.label_ru}
                    </p>
                    <p className="text-[11px] text-[#1A1A1A]/45 mt-0.5">
                      {t.delivery_desc[dt.value]}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Weight */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/45 mb-3">{t.weight_label}</p>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input type="number" min="0.1" step="0.5" value={weight}
                  onChange={(e) => { setWeight(e.target.value); setResult(null); }}
                  className="w-full border border-[#1A1A1A]/12 rounded-xl px-4 py-3 text-lg font-bold text-[#1A1A1A] focus:outline-none focus:border-[#E31E24]/50 bg-white transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#1A1A1A]/35 font-medium">{t.kg}</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 3, 5, 10].map((v) => (
                  <button key={v} onClick={() => { setWeight(String(v)); setResult(null); }}
                    className={`w-10 h-10 rounded-lg text-sm font-semibold border transition-all ${
                      weight === String(v) ? "bg-[#E31E24] text-white border-[#E31E24]" : "bg-[#F8F9FA] text-[#1A1A1A]/50 border-[#1A1A1A]/10 hover:border-[#E31E24]/30"
                    }`}
                  >{v}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Volumetric toggle */}
          <div>
            <button onClick={() => { setUseVol(!useVol); setResult(null); }}
              className="flex items-center gap-2.5 text-sm font-medium text-[#1A1A1A]/60 hover:text-[#E31E24] transition-colors"
            >
              <div className={`w-9 h-5 rounded-full flex items-center transition-all duration-200 px-0.5 ${useVol ? "bg-[#E31E24]" : "bg-[#1A1A1A]/15"}`}>
                <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${useVol ? "translate-x-4" : "translate-x-0"}`} />
              </div>
              <Ruler size={14} />
              {t.vol_toggle}
            </button>
            <AnimatePresence>
              {useVol && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="mt-4 p-4 bg-[#F8F9FA] rounded-xl">
                    <p className="text-xs text-[#1A1A1A]/50 mb-3">{t.vol_formula}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {([["l", t.dim_l], ["w", t.dim_w], ["h", t.dim_h]] as [keyof typeof dims, string][]).map(([k, label]) => (
                        <div key={k}>
                          <label className="text-[10px] text-[#1A1A1A]/45 uppercase tracking-wider font-medium">
                            {label} ({t.dim_unit})
                          </label>
                          <input type="number" min="1" value={dims[k]}
                            onChange={(e) => { setDims((d) => ({ ...d, [k]: e.target.value })); setResult(null); }}
                            placeholder="0"
                            className="mt-1 w-full border border-[#1A1A1A]/12 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:border-[#E31E24]/50 bg-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button onClick={handleCalc}
              className="flex-1 flex items-center justify-center gap-2 bg-[#E31E24] hover:bg-[#B71519] text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-[0_6px_20px_rgba(227,30,36,0.3)] hover:shadow-[0_8px_24px_rgba(227,30,36,0.4)] hover:-translate-y-0.5"
            >
              <Calculator size={17} /> {t.calc_btn}
            </button>
            <button onClick={handleReset} title={t.reset_title}
              className="w-12 h-12 flex items-center justify-center border border-[#1A1A1A]/12 rounded-xl text-[#1A1A1A]/40 hover:text-[#E31E24] hover:border-[#E31E24]/30 transition-all"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Right: result ── */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="bg-[#1A1A1A] rounded-2xl overflow-hidden"
            >
              <div className="p-6 sm:p-7">
                <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">{t.result_label}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-white/8 text-white/60 px-3 py-1 rounded-full">
                    {mode === "standard" ? t.standard : t.transit}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-white/8 text-white/60 px-3 py-1 rounded-full">
                    {selectedLabel}
                  </span>
                </div>
                {useVol && result.volumetric > 0 && (
                  <div className={`flex items-start gap-2 text-xs rounded-xl px-4 py-3 mb-5 ${result.usedVol ? "bg-amber-500/10 text-amber-400" : "bg-white/5 text-white/40"}`}>
                    <AlertCircle size={13} className="shrink-0 mt-0.5" />
                    <span>
                      {t.vol_weight}: <strong>{result.volumetric.toFixed(2)} {t.kg}</strong>
                      {result.usedVol ? t.vol_used : t.vol_not_used}
                    </span>
                  </div>
                )}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">{t.billable_weight}</span>
                    <span className="text-white font-semibold">{result.billable.toFixed(2)} {t.kg}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-t border-white/6 pt-3">
                    <span className="text-white/50">{t.delivery_method}</span>
                    <span className="text-white font-semibold text-right max-w-[140px] text-xs">{selectedLabel}</span>
                  </div>
                </div>
                <div className="bg-[#E31E24]/12 border border-[#E31E24]/20 rounded-xl p-4 mb-6">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{t.price_label}</p>
                  <p className="font-serif text-4xl font-bold text-white leading-none">
                    {result.price.toLocaleString("ru-RU")}
                    <span className="text-xl text-white/60 ml-1 font-sans font-medium"> {t.sum}</span>
                  </p>
                </div>
                <ul className="space-y-2 mb-6">
                  {t.guarantees.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-white/50">
                      <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                <a href="/" className="w-full flex items-center justify-center gap-2 bg-white text-[#1A1A1A] font-bold py-3.5 rounded-xl hover:bg-[#F8F9FA] transition-colors text-sm">
                  {t.order_btn} <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-[#F8F9FA] rounded-2xl border-2 border-dashed border-[#1A1A1A]/10 flex flex-col items-center justify-center gap-4 p-10 text-center"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <Calculator size={30} className="text-[#E31E24]" />
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A]/60 text-sm">{t.fill_params}</p>
                <p className="text-xs text-[#1A1A1A]/35 mt-1">{t.fill_hint}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick info card */}
        <div className="bg-white rounded-2xl border border-[#1A1A1A]/8 p-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/40">{t.info_title}</p>
          {t.info_items.map((item) => (
            <div key={item} className="flex items-center gap-2.5 text-xs text-[#1A1A1A]/55">
              <span className="text-[#E31E24]"><Package size={14} /></span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ADDITIONAL SERVICES TAB
══════════════════════════════════════════════════ */
function AdditionalServicesTab({ locale }: { locale: Locale }) {
  const t = T[locale];
  return (
    <div className="space-y-6">
      {/* Packaging */}
      <div>
        <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-4">{t.extra_packaging}</h3>
        <div className="overflow-x-auto rounded-2xl border border-[#1A1A1A]/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8F9FA]">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/50">{t.col_packaging}</th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/50">{t.col_price}</th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/50">{t.col_size}</th>
              </tr>
            </thead>
            <tbody>
              {packagingOptions.map((p, i) => (
                <tr key={i} className="border-t border-[#1A1A1A]/6 hover:bg-[#E31E24]/2 transition-colors">
                  <td className="px-4 py-3 font-medium text-[#1A1A1A]">{t.box}</td>
                  <td className="px-4 py-3 text-center font-bold text-[#E31E24]">{fmt(p.price, locale)}</td>
                  <td className="px-4 py-3 text-center text-[#1A1A1A]/55">{p.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional services */}
      <div>
        <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-4">{t.extra_services}</h3>
        <div className="overflow-x-auto rounded-2xl border border-[#1A1A1A]/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8F9FA]">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/50">{t.col_service}</th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/50">{t.col_tariff}</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/50">{t.col_note}</th>
              </tr>
            </thead>
            <tbody>
              {t.add_services_uz.map((s, i) => (
                <tr key={i} className="border-t border-[#1A1A1A]/6 hover:bg-[#E31E24]/2 transition-colors">
                  <td className="px-4 py-3 text-[#1A1A1A] font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-bold ${s.price === "Bepul" || s.price === "Бесплатно" ? "text-emerald-600" : "text-[#E31E24]"}`}>
                      {s.price}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#1A1A1A]/45">{s.info}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* COD */}
      <div>
        <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-4">{t.extra_cod}</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {t.cod_items.map((item) => (
            <div key={item.label} className="flex items-center justify-between bg-[#F8F9FA] rounded-xl px-4 py-3.5 border border-[#1A1A1A]/6">
              <span className="text-sm text-[#1A1A1A]/60">{item.label}</span>
              <span className="text-sm font-bold text-[#1A1A1A]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   DELIVERY TIMES TAB
══════════════════════════════════════════════════ */
function DeliveryTimesTab({ locale }: { locale: Locale }) {
  const t = T[locale];
  return (
    <div className="space-y-6">
      <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-[#1A1A1A]/6">
        <div className="flex items-start gap-3">
          <Info size={16} className="text-[#E31E24] shrink-0 mt-0.5" />
          <p className="text-sm text-[#1A1A1A]/60 leading-relaxed">{t.time_info}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {t.delivery_times_uz.map((zone) => (
          <div key={zone.hours} className="bg-white rounded-2xl border border-[#1A1A1A]/8 overflow-hidden">
            <div className="bg-[#1A1A1A] px-5 py-3 flex items-center gap-2">
              <Clock size={15} className="text-[#E31E24]" />
              <span className="text-white font-bold text-sm">{zone.hours}</span>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {zone.cities.map((city) => (
                  <span key={city} className="text-xs bg-[#F8F9FA] text-[#1A1A1A]/65 font-medium px-2.5 py-1 rounded-lg border border-[#1A1A1A]/6">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-base font-bold text-[#1A1A1A]">{t.time_cond_title}</h3>
        {t.time_conditions.map((note, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-[#1A1A1A]/60 bg-[#F8F9FA] rounded-xl px-4 py-3 border border-[#1A1A1A]/6">
            <span className="text-[#E31E24] font-bold shrink-0 mt-0.5 text-xs">{i + 1}.</span>
            {note}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════ */
export default function CalculatorPage() {
  const params = useParams();
  const raw = params?.locale as string;
  const locale: Locale = raw === "ru" ? "ru" : "uz";
  const t = T[locale];
  const [activeTab, setActiveTab] = useState<string>("calc");
  const [modeForTable, setModeForTable] = useState<DeliveryMode>("standard");

  const TABS = [
    { id: "calc",  label: t.tab_calc,  icon: <Calculator size={15} /> },
    { id: "table", label: t.tab_table, icon: <Package size={15} /> },
    { id: "extra", label: t.tab_extra, icon: <Box size={15} /> },
    { id: "time",  label: t.tab_time,  icon: <Clock size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* ── Header ── */}
      <div className="bg-white border-b border-[#1A1A1A]/6 sticky top-0 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href={`/${locale}`} className="flex items-center gap-2.5">
            <Image src="/logo-white-bg.png" alt="UNEX Express" width={110} height={34} className="h-8 w-auto object-contain" />
          </a>
          <div className="flex items-center gap-3">
            <a href="tel:+998552002255" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#1A1A1A]/65 hover:text-[#E31E24] transition-colors">
              <Phone size={13} className="text-[#E31E24]" /> +998 55 500-22-55
            </a>
            <a href={`/${locale}`} className="text-sm font-semibold text-[#E31E24] hover:text-[#B71519] transition-colors flex items-center gap-1">
              {t.back}
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        {/* Page title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#E31E24]/8 border border-[#E31E24]/15 text-[#E31E24] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <Calculator size={12} /> {t.badge}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-2">{t.title}</h1>
          <p className="text-[#1A1A1A]/50 text-base">{t.subtitle}</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white rounded-xl border border-[#1A1A1A]/8 p-1 mb-8 w-fit">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id ? "bg-[#E31E24] text-white shadow-sm" : "text-[#1A1A1A]/50 hover:text-[#1A1A1A] hover:bg-[#F8F9FA]"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {activeTab === "calc" && <CalcForm locale={locale} />}

            {activeTab === "table" && (
              <div className="space-y-5">
                <div className="flex gap-2">
                  {(["standard", "transit"] as DeliveryMode[]).map((m) => (
                    <button key={m} onClick={() => setModeForTable(m)}
                      className={`px-5 py-2 rounded-xl text-sm font-bold border transition-all ${
                        modeForTable === m ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-[#1A1A1A]/50 border-[#1A1A1A]/12 hover:border-[#1A1A1A]/25"
                      }`}
                    >
                      {m === "standard" ? t.table_standard : t.table_transit}
                    </button>
                  ))}
                </div>
                <TariffTable mode={modeForTable} locale={locale} />
              </div>
            )}

            {activeTab === "extra" && <AdditionalServicesTab locale={locale} />}
            {activeTab === "time"  && <DeliveryTimesTab locale={locale} />}
          </motion.div>
        </AnimatePresence>

        {/* CTA bottom */}
        <div className="mt-12 bg-[#1A1A1A] rounded-3xl p-7 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">{t.cta_title}</h2>
            <p className="text-white/50 text-sm">{t.cta_desc}</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href="tel:+998552002255"
              className="flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
            >
              <Phone size={15} /> {t.cta_call}
            </a>
            <a href={`/${locale}`}
              className="flex items-center gap-2 bg-[#E31E24] hover:bg-[#B71519] text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-[0_4px_14px_rgba(227,30,36,0.35)]"
            >
              {t.cta_btn} <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </main>

      {/* AI Assistant floating widget */}
      <AIAssistant locale={locale} />
    </div>
  );
}
