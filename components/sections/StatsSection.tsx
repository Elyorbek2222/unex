'use client'

import { useEffect, useRef, useState } from 'react'
import { Package, Clock, MapPin, Users, Star } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionary'

interface StatsSectionProps {
  dict: Dictionary
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])

  return count
}

function StatItem({
  icon,
  value,
  suffix,
  label,
  active,
}: {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  active: boolean
}) {
  const count = useCountUp(value, 1800, active)

  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white/90 backdrop-blur-sm">
        {icon}
      </div>
      <div
        className="text-4xl sm:text-5xl font-extrabold text-white leading-none"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        {count.toLocaleString('uz-UZ')}{suffix}
      </div>
      <div className="text-white/70 text-sm font-medium">{label}</div>
    </div>
  )
}

export default function StatsSection({ dict }: StatsSectionProps) {
  const s = dict.stats
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: <Package size={28} />, value: 50000, suffix: '+', label: s.deliveries },
    { icon: <Clock size={28} />, value: 3, suffix: '+', label: s.years },
    { icon: <MapPin size={28} />, value: 60, suffix: '+', label: s.branches },
    { icon: <Users size={28} />, value: 12, suffix: '', label: s.regions },
    { icon: <Star size={28} />, value: 98, suffix: '%', label: s.satisfaction },
  ]

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 60%, #880E0E 100%)' }}
      ref={ref}
    >
      {/* Decorative elements */}
      <div className="absolute top-[-30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-black/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/20 mb-3">
            {s.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {s.title}{' '}
            <span className="text-white/85">{s.title_accent}</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
