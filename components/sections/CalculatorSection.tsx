'use client'

import { useState } from 'react'
import { Calculator, CheckCircle, ArrowRight, Truck, Zap, Package, Globe } from 'lucide-react'
import { calculatePrice, type PricingInput, uzbekCities } from '@/lib/pricing'
import type { Dictionary } from '@/lib/dictionary'

interface CalculatorSectionProps {
  dict: Dictionary
}

const deliveryTypeIcons = {
  standard: <Truck size={16} />,
  express: <Zap size={16} />,
  cargo: <Package size={16} />,
  international: <Globe size={16} />,
}

export default function CalculatorSection({ dict }: CalculatorSectionProps) {
  const c = dict.calculator

  const [form, setForm] = useState<PricingInput>({
    from: 'Toshkent',
    to: 'Samarqand',
    weight: 5,
    volume: 0.01,
    deliveryType: 'standard',
  })
  const [result, setResult] = useState<ReturnType<typeof calculatePrice> | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const deliveryTypes = [
    { value: 'standard', label: c.type_standard },
    { value: 'express', label: c.type_express },
    { value: 'cargo', label: c.type_cargo },
    { value: 'international', label: c.type_international },
  ] as const

  function handleCalculate() {
    const price = calculatePrice(form)
    setResult(price)
  }

  function handleOrder() {
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  function formatPrice(n: number) {
    return n.toLocaleString('uz-UZ')
  }

  return (
    <section id="calculator" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-red-50 text-[#D32F2F] text-xs font-bold uppercase tracking-wider rounded-full border border-red-100 mb-3">
            {c.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {c.title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{c.subtitle}</p>
        </div>

        {/* Calculator card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Top accent */}
            <div className="h-1 bg-gradient-to-r from-[#D32F2F] to-[#EF5350]" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Form side */}
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <Calculator size={20} className="text-[#D32F2F]" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {c.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* From/To */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{c.from}</label>
                      <select
                        value={form.from}
                        onChange={(e) => setForm({ ...form, from: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 focus:border-[#D32F2F] transition-colors bg-gray-50"
                      >
                        {uzbekCities.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{c.to}</label>
                      <select
                        value={form.to}
                        onChange={(e) => setForm({ ...form, to: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 focus:border-[#D32F2F] transition-colors bg-gray-50"
                      >
                        {uzbekCities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Weight/Volume */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{c.weight}</label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.5"
                        value={form.weight}
                        onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 focus:border-[#D32F2F] transition-colors bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{c.volume}</label>
                      <input
                        type="number"
                        min="0.001"
                        step="0.01"
                        value={form.volume}
                        onChange={(e) => setForm({ ...form, volume: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 focus:border-[#D32F2F] transition-colors bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Delivery type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{c.delivery_type}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {deliveryTypes.map(({ value, label }) => (
                        <button
                          key={value}
                          onClick={() => setForm({ ...form, deliveryType: value })}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                            form.deliveryType === value
                              ? 'border-[#D32F2F] bg-red-50 text-[#D32F2F]'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <span className={form.deliveryType === value ? 'text-[#D32F2F]' : 'text-gray-400'}>
                            {deliveryTypeIcons[value]}
                          </span>
                          <span className="truncate">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calculate button */}
                  <button
                    onClick={handleCalculate}
                    className="w-full py-3.5 bg-[#D32F2F] text-white font-bold rounded-xl hover:bg-[#B71C1C] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <Calculator size={18} />
                    {c.calculate}
                  </button>
                </div>
              </div>

              {/* Result side */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-10 flex flex-col justify-between">
                {result ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Hisob-kitob
                      </h3>
                      <p className="text-sm text-gray-500">{form.from} → {form.to}</p>
                    </div>

                    {/* Price rows */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">{c.base_price}</span>
                        <span className="font-semibold text-gray-900">{formatPrice(result.basePrice)} {c.currency}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">{c.service_fee}</span>
                        <span className="font-semibold text-gray-900">{formatPrice(result.serviceFee)} {c.currency}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-white rounded-xl px-4 shadow-sm">
                        <span className="font-bold text-gray-900">{c.total}</span>
                        <span className="font-bold text-[#D32F2F] text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {formatPrice(result.total)} {c.currency}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Truck size={14} />
                        Yetkazish muddati: <span className="font-semibold text-gray-700">{result.days}</span>
                      </div>
                    </div>

                    {/* Guarantees */}
                    <div className="grid grid-cols-2 gap-2">
                      {[c.no_hidden, c.transparent].map((text) => (
                        <div key={text} className="flex items-start gap-1.5 text-xs text-gray-600">
                          <CheckCircle size={13} className="text-green-500 mt-0.5 flex-shrink-0" />
                          {text}
                        </div>
                      ))}
                    </div>

                    {/* Order button */}
                    {submitted ? (
                      <div className="flex items-center gap-2 py-3 px-4 bg-green-50 text-green-700 rounded-xl text-sm font-semibold">
                        <CheckCircle size={16} />
                        Ariza qabul qilindi! Tez orada bog'lanamiz.
                      </div>
                    ) : (
                      <button
                        onClick={handleOrder}
                        className="w-full py-3.5 bg-[#D32F2F] text-white font-bold rounded-xl hover:bg-[#B71C1C] transition-colors flex items-center justify-center gap-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {c.order_now}
                        <ArrowRight size={17} />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-10">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center">
                      <Calculator size={36} className="text-[#D32F2F]" />
                    </div>
                    <p className="text-gray-500 text-sm max-w-xs">
                      Forma to'ldiring va <strong>"{c.calculate}"</strong> tugmasini bosing
                    </p>
                  </div>
                )}

                {/* B2B note */}
                <div className="mt-6 pt-5 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    {c.b2b_text}{' '}
                    <a href="#contact" className="text-[#D32F2F] font-semibold hover:underline">
                      {c.b2b_link} →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
