import { ArrowRight } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionary'

interface PartnersSectionProps {
  dict: Dictionary
}

const partners = [
  { name: 'Wildberries', logo: 'WB', color: '#CB11AB' },
  { name: 'Uzum Market', logo: 'UZ', color: '#FF5A00' },
  { name: 'Ozon', logo: 'OZ', color: '#005BFF' },
  { name: 'SDEK', logo: 'CD', color: '#00AA00' },
  { name: 'Aliexpress', logo: 'AE', color: '#FF6701' },
  { name: 'Kaspi', logo: 'KS', color: '#F14635' },
  { name: 'Amazon', logo: 'AM', color: '#FF9900' },
  { name: 'JD.com', logo: 'JD', color: '#E11D35' },
]

export default function PartnersSection({ dict }: PartnersSectionProps) {
  const p = dict.partners

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-red-50 text-[#D32F2F] text-xs font-bold uppercase tracking-wider rounded-full border border-red-100 mb-3">
            {p.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {p.title}{' '}
            <span className="text-[#D32F2F]">{p.title_accent}</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{p.subtitle}</p>
        </div>

        {/* Partner logos */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300"
                style={{ background: partner.color }}
              >
                {partner.logo}
              </div>
              <span className="text-xs text-gray-500 font-medium text-center">{partner.name}</span>
            </div>
          ))}
        </div>

        {/* CTA card */}
        <div
          className="rounded-3xl p-10 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)' }}
        >
          <div className="absolute top-[-30%] right-[-10%] w-[300px] h-[300px] rounded-full bg-white/5" />
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {p.become_partner}
            </h3>
            <p className="text-white/80 mb-7 max-w-lg mx-auto">{p.partner_desc}</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#D32F2F] font-bold rounded-xl hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {p.become_partner}
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
