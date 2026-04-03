'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionary'

interface ContactSectionProps {
  dict: Dictionary
}

export default function ContactSection({ dict }: ContactSectionProps) {
  const c = dict.contact

  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  const contactInfo = [
    { icon: <Phone size={18} />, label: c.phone_label, value: '+998 71 100 00 01', href: 'tel:+998711000001' },
    { icon: <Mail size={18} />, label: c.email_label, value: 'info@unexexpress.uz', href: 'mailto:info@unexexpress.uz' },
    { icon: <MapPin size={18} />, label: c.address_label, value: "Toshkent shahri, O'zbekiston", href: null },
    { icon: <Clock size={18} />, label: c.hours_label, value: c.hours_value, href: null },
  ]

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-red-50 text-[#D32F2F] text-xs font-bold uppercase tracking-wider rounded-full border border-red-100 mb-3">
            {c.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {c.title}{' '}
            <span className="text-[#D32F2F]">{c.title_accent}</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{c.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact form */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-10 text-center">
                <div className="w-20 h-20 rounded-2xl bg-green-50 flex items-center justify-center">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Xabar yuborildi!
                </h3>
                <p className="text-gray-500 text-sm">Menejerlarimiz tez orada siz bilan bog'lanadi.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', message: '' }) }}
                  className="px-6 py-2.5 text-sm font-semibold text-[#D32F2F] border border-[#D32F2F] rounded-xl hover:bg-red-50 transition-colors"
                >
                  Yana yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{c.name} *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={c.name_placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 focus:border-[#D32F2F] transition-colors bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{c.phone} *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder={c.phone_placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 focus:border-[#D32F2F] transition-colors bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{c.message}</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={c.message_placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 focus:border-[#D32F2F] transition-colors bg-gray-50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#D32F2F] text-white font-bold rounded-xl hover:bg-[#B71C1C] disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      {c.submit}
                    </>
                  )}
                </button>

                {/* Telegram CTA */}
                <a
                  href="https://t.me/unexexpress"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#229ED9] hover:bg-[#1b84b5] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <MessageCircle size={16} />
                  {c.telegram}
                </a>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-5">
            {contactInfo.map((info, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-[#D32F2F] flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{info.label}</div>
                  {info.href ? (
                    <a href={info.href} className="text-gray-900 font-semibold hover:text-[#D32F2F] transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-gray-900 font-semibold">{info.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Map embed placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1 min-h-[160px] flex items-center justify-center">
              <div className="text-center p-6">
                <MapPin size={36} className="text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-400">Toshkent shahri, O'zbekiston</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
