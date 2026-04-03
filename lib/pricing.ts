// ─────────────────────────────────────────────────────────────
//  UNEX Express — Official tariff tables (ООО «Unity Express»)
//  Source: official price list document, 2024
// ─────────────────────────────────────────────────────────────

export type DeliveryMode = 'standard' | 'transit'

export type DeliveryType =
  | 'office-office'        // От офиса – До офиса
  | 'office-door-city'     // От офиса – До двери в центре города
  | 'door-door'            // От двери – До двери Городов
  | 'office-regional'      // От офиса – До областного центра
  | 'office-tashkent-reg'  // От офиса – До Ташкентского Областного центра

export interface DeliveryTypeInfo {
  value: DeliveryType
  label_ru: string
  label_uz: string
  label_en: string
  description_ru: string
}

export const deliveryTypes: DeliveryTypeInfo[] = [
  {
    value: 'office-office',
    label_ru: 'Офис → Офис',
    label_uz: 'Ofisdan Ofisga',
    label_en: 'Office to Office',
    description_ru: 'Сдаёте в нашем офисе, получатель забирает в офисе',
  },
  {
    value: 'office-door-city',
    label_ru: 'Офис → Дверь (центр)',
    label_uz: 'Ofisdan Eshikkacha (markaz)',
    label_en: 'Office to Door (city center)',
    description_ru: 'Сдаёте в офисе, доставим до двери в центре города',
  },
  {
    value: 'door-door',
    label_ru: 'Дверь → Дверь',
    label_uz: 'Eshikdan Eshikkacha',
    label_en: 'Door to Door',
    description_ru: 'Курьер забирает у вас и доставляет прямо до получателя',
  },
  {
    value: 'office-regional',
    label_ru: 'Офис → Областной центр',
    label_uz: 'Ofisdan Viloyat markazigacha',
    label_en: 'Office to Regional Center',
    description_ru: 'Сдаёте в офисе, доставим до областного центра',
  },
  {
    value: 'office-tashkent-reg',
    label_ru: 'Офис → Ташкент. обл.',
    label_uz: 'Ofisdan Toshkent Viloyatigacha',
    label_en: 'Office to Tashkent Region',
    description_ru: 'Доставка до Ташкентского областного центра',
  },
]

// ─────────────────────────────────────────────────────────────
//  BASE TARIFF TABLE (kg: 1–15)
//  Standard delivery — direct shipment
// ─────────────────────────────────────────────────────────────
const standardRates: Record<DeliveryType, number[]> = {
  'office-office':       [20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000],
  'office-door-city':    [35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000],
  'door-door':           [50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000, 120000],
  'office-regional':     [45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000],
  'office-tashkent-reg': [35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000],
}

// ─────────────────────────────────────────────────────────────
//  TRANSIT TARIFF TABLE (kg: 1–15)
//  Transit post — shipments from one branch to another
// ─────────────────────────────────────────────────────────────
const transitRates: Record<DeliveryType, number[]> = {
  'office-office':       [25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000],
  'office-door-city':    [40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000, 110000],
  'door-door':           [55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000, 120000, 125000],
  'office-regional':     [50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000, 120000],
  'office-tashkent-reg': [45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000],
}

// Per-kg increment after 15 kg (extrapolation)
const RATE_PER_EXTRA_KG = 5000

/**
 * Returns the price for a given weight, delivery type, and mode.
 * For weights > 15 kg, extrapolates linearly.
 */
export function getBasePrice(
  weight: number,
  type: DeliveryType,
  mode: DeliveryMode
): number {
  const table = mode === 'transit' ? transitRates : standardRates
  const rates = table[type]
  const kg = Math.max(1, Math.ceil(weight)) // round up to whole kg, min 1

  if (kg <= 15) {
    return rates[kg - 1]
  }

  // Extrapolate for > 15 kg
  const base = rates[14] // price at 15 kg
  return base + (kg - 15) * RATE_PER_EXTRA_KG
}

// ─────────────────────────────────────────────────────────────
//  VOLUMETRIC WEIGHT
//  Formula: (L cm × W cm × H cm) / 5000
// ─────────────────────────────────────────────────────────────
export function calcVolumetricWeight(
  lengthCm: number,
  widthCm: number,
  heightCm: number
): number {
  return (lengthCm * widthCm * heightCm) / 5000
}

/** Returns the billable weight (actual vs volumetric, whichever is greater) */
export function getBillableWeight(
  actualKg: number,
  lengthCm: number,
  widthCm: number,
  heightCm: number
): { billable: number; volumetric: number; usedVolumetric: boolean } {
  const volumetric = calcVolumetricWeight(lengthCm, widthCm, heightCm)
  const usedVolumetric = volumetric > actualKg
  return {
    billable: usedVolumetric ? volumetric : actualKg,
    volumetric,
    usedVolumetric,
  }
}

// ─────────────────────────────────────────────────────────────
//  CASH-ON-DELIVERY (Наложенный платёж)
// ─────────────────────────────────────────────────────────────
export const codTariff = {
  city_up_to_2kg: 50000,       // До 2 кг — город
  center_district_up_to_2kg: 50000, // До 2 кг — центр/район
  above_2kg: 'Договорная',
  acceptance_fee_percent: 0,   // 0%
  return_fee: 'Бесплатно',
}

// ─────────────────────────────────────────────────────────────
//  ADDITIONAL SERVICES
// ─────────────────────────────────────────────────────────────
export const additionalServices = [
  { name_ru: 'СМС-уведомление (Отправителю и Получателю)', price_ru: 'Бесплатно', info_ru: 'SMS по указанному номеру в заказе' },
  { name_ru: 'Возврат почты Отправителю', price_ru: 'Полная стоимость 100%', info_ru: 'Если получатель отказал или не отвечает. Срок хранения — 7 дней' },
  { name_ru: 'Фирменный пакет (Большой 45×64 см)', price_ru: 'Бесплатно', info_ru: '' },
  { name_ru: 'Фирменный пакет (Средний 30×48 см)', price_ru: 'Бесплатно', info_ru: '' },
  { name_ru: 'Фирменный пакет (Маленький 25×43 см)', price_ru: 'Бесплатно', info_ru: '' },
  { name_ru: 'Быстрая доставка по городу', price_ru: '70 000 сум', info_ru: '' },
  { name_ru: 'Быстрая доставка по региону', price_ru: '140 000 сум', info_ru: '' },
]

// ─────────────────────────────────────────────────────────────
//  PACKAGING (Коробки)
// ─────────────────────────────────────────────────────────────
export const packagingOptions = [
  { price: 3000,  size: '20×15×10 см' },
  { price: 5000,  size: '30×20×15 см' },
  { price: 6000,  size: '30×25×20 см' },
  { price: 8000,  size: '40×30×30 см' },
  { price: 10000, size: '50×40×30 см' },
]

// ─────────────────────────────────────────────────────────────
//  DELIVERY TIME BY REGION
// ─────────────────────────────────────────────────────────────
export const deliveryTimes = [
  {
    hours: '18–24 часа',
    cities: [
      'Наманган', 'Чуст', 'Учкурган', 'Андижан', 'Кургантепа', 'Асака',
      'Фергана', 'Маргилан', 'Риштон', 'Коканд', 'Гулистан',
      'Джизак', 'Галлаорол', 'Самарканд', 'Ургут', 'Каттакурган',
      'Навои', 'Зарафшан', 'Бухара', 'Гиждуван', 'Карши', 'Шахрисабз',
    ],
  },
  {
    hours: '18–48 часов',
    cities: ['Термиз', 'Денов', 'Сариосие', 'Ургенч', 'Хива', 'Беруний', 'Нукус'],
  },
]

// ─────────────────────────────────────────────────────────────
//  CITIES LIST (for selectors)
// ─────────────────────────────────────────────────────────────
export const uzbekCities = [
  'Toshkent', 'Samarqand', 'Farg\'ona', 'Andijon', 'Namangan',
  'Buxoro', 'Qarshi', 'Termiz', 'Urganch', 'Navoiy',
  'Jizzax', 'Nukus', 'Qo\'qon', 'Marg\'ilon', 'Chirchiq',
  'Angren', 'Olmaliq', 'Guliston', 'Shahrisabz', 'Denov',
  'Chust', 'Asaka', 'Kattaqo\'rg\'on', 'Zarafshon',
]

// ─────────────────────────────────────────────────────────────
//  LEGACY COMPAT (used by old CalculatorSection)
// ─────────────────────────────────────────────────────────────
export interface PricingInput {
  from: string
  to: string
  weight: number
  volume: number
  deliveryType: 'standard' | 'express' | 'cargo' | 'international'
}

export interface PricingResult {
  basePrice: number
  serviceFee: number
  total: number
  currency: string
  days: string
}

const legacyMultiplier: Record<PricingInput['deliveryType'], number> = {
  standard: 1.0,
  express: 1.4,
  cargo: 0.9,
  international: 2.0,
}

const legacyDays: Record<PricingInput['deliveryType'], string> = {
  standard: '18–24 soat',
  express: '3–6 soat',
  cargo: '2–5 kun',
  international: '14–21 kun',
}

export function calculatePrice(input: PricingInput): PricingResult {
  const { weight, deliveryType } = input
  const mul = legacyMultiplier[deliveryType]
  const basePrice =
    Math.round((getBasePrice(weight, 'door-door', 'standard') * mul) / 1000) * 1000
  const serviceFee = 0
  return {
    basePrice,
    serviceFee,
    total: basePrice + serviceFee,
    currency: 'UZS',
    days: legacyDays[deliveryType],
  }
}
