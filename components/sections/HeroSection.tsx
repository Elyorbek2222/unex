'use client'

import dynamic from 'next/dynamic'
import { Package, Truck, MapPin, ArrowRight, ChevronDown } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionary'

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  ),
})

interface HeroSectionProps {
  dict: Dictionary
}

export default function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 55%, #880E0E 100%)',
      }}
    >
      {/* Background decorative circles */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-black/10 pointer-events-none" />

      {/* 3D Scene (right side on desktop) */}
      <div className="absolute inset-0 lg:left-[45%]">
        <HeroScene />
      </div>

      {/* Gradient overlay for text readability on mobile */}
      <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-transparent via-[#D32F2F]/60 to-[#D32F2F]/90 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0 w-full">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 badge-float">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {dict.hero.badge}
          </div>

          {/* Title */}
          <h1
            className="text-white mb-6 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800 }}
          >
            {dict.hero.title}{' '}
            <span className="block text-white/85">{dict.hero.title_accent}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
            {dict.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href="#calculator"
              className="flex items-center gap-2 px-6 py-3.5 bg-white text-[#D32F2F] font-bold rounded-xl hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {dict.hero.cta_primary}
              <ArrowRight size={17} />
            </a>
            <a
              href="#calculator"
              className="flex items-center gap-2 px-6 py-3.5 bg-transparent text-white font-bold rounded-xl border-2 border-white/60 hover:border-white hover:bg-white/10 transition-all duration-200"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {dict.hero.cta_secondary}
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4">
            <StatBadge icon={<Package size={18} />} value="1000+" label={dict.hero.stat_clients} />
            <StatBadge icon={<Truck size={18} />} value="60+" label={dict.hero.stat_branches} />
            <StatBadge icon={<MapPin size={18} />} value="12" label={dict.hero.stat_regions} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#calculator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
      >
        <span className="text-xs font-medium tracking-wider uppercase">scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  )
}

function StatBadge({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
      <div className="text-white/80">{icon}</div>
      <div>
        <div
          className="text-white font-bold text-lg leading-none"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {value}
        </div>
        <div className="text-white/70 text-xs mt-0.5">{label}</div>
      </div>
    </div>
  )
}
