'use client'

import { Truck, Globe, Warehouse, Building2, Zap, Home, ArrowRight } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionary'

interface ServicesSectionProps {
  dict: Dictionary
}

const serviceIcons = [
  <Truck size={28} key="truck" />,
  <Globe size={28} key="globe" />,
  <Warehouse size={28} key="warehouse" />,
  <Building2 size={28} key="building" />,
  <Zap size={28} key="zap" />,
  <Home size={28} key="home" />,
]

export default function ServicesSection({ dict }: ServicesSectionProps) {
  const s = dict.services

  const cards = [
    { title: s.card1_title, desc: s.card1_desc, icon: serviceIcons[0], color: 'from-red-500 to-red-600' },
    { title: s.card2_title, desc: s.card2_desc, icon: serviceIcons[1], color: 'from-orange-500 to-red-500' },
    { title: s.card3_title, desc: s.card3_desc, icon: serviceIcons[2], color: 'from-rose-500 to-pink-600' },
    { title: s.card4_title, desc: s.card4_desc, icon: serviceIcons[3], color: 'from-red-600 to-rose-700' },
    { title: s.card5_title, desc: s.card5_desc, icon: serviceIcons[4], color: 'from-red-400 to-red-500' },
    { title: s.card6_title, desc: s.card6_desc, icon: serviceIcons[5], color: 'from-rose-600 to-red-700' },
  ]

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-red-50 text-[#D32F2F] text-xs font-bold uppercase tracking-wider rounded-full border border-red-100 mb-3">
            {s.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {s.title}{' '}
            <span className="text-[#D32F2F]">{s.title_accent}</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{s.subtitle}</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <ServiceCard key={i} {...card} learnMore={s.learn_more} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  title,
  desc,
  icon,
  color,
  learnMore,
}: {
  title: string
  desc: string
  icon: React.ReactNode
  color: string
  learnMore: string
}) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
        {icon}
      </div>

      {/* Text */}
      <h3 className="font-bold text-gray-900 text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-5">{desc}</p>

      {/* Link */}
      <a
        href="#contact"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D32F2F] hover:gap-2.5 transition-all"
      >
        {learnMore}
        <ArrowRight size={14} />
      </a>
    </div>
  )
}
