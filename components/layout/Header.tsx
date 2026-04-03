'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Phone, Globe } from 'lucide-react'
import type { Dictionary, Locale } from '@/lib/dictionary'

interface HeaderProps {
  dict: Dictionary
  locale: Locale
}

const localeLabels: Record<Locale, string> = { uz: "O'Z", ru: 'RU', en: 'EN' }

export default function Header({ dict, locale }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { href: '#services', label: dict.nav.services },
    { href: '#calculator', label: dict.nav.calculator },
    { href: '#map', label: dict.nav.map },
    { href: '#contact', label: dict.nav.contact },
  ]

  const otherLocales = (['uz', 'ru', 'en'] as Locale[]).filter((l) => l !== locale)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/98 shadow-md' : 'bg-white/95'
      } backdrop-blur-md border-b border-red-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo-red-bg.png"
              alt="Unex Express"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Unex <span className="text-[#D32F2F]">Express</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#D32F2F] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Phone */}
            <a
              href="tel:+998711000001"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-[#D32F2F] transition-colors"
            >
              <Phone size={15} />
              +998 71 100 00 01
            </a>

            {/* Lang switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-[#D32F2F] transition-colors"
              >
                <Globe size={14} />
                {localeLabels[locale]}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
                  {otherLocales.map((l) => (
                    <Link
                      key={l}
                      href={`/${l}`}
                      onClick={() => setLangOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#D32F2F] transition-colors"
                    >
                      {localeLabels[l]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <a
              href="#calculator"
              className="px-4 py-2 bg-[#D32F2F] text-white text-sm font-semibold rounded-lg hover:bg-[#B71C1C] transition-colors"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {dict.nav.order}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-medium text-gray-700 hover:text-[#D32F2F] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
            {(['uz', 'ru', 'en'] as Locale[]).map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  l === locale
                    ? 'bg-[#D32F2F] text-white'
                    : 'border border-gray-200 text-gray-600 hover:border-[#D32F2F] hover:text-[#D32F2F]'
                }`}
              >
                {localeLabels[l]}
              </Link>
            ))}
          </div>
          <a
            href="#calculator"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center py-3 bg-[#D32F2F] text-white font-semibold rounded-xl hover:bg-[#B71C1C] transition-colors"
          >
            {dict.nav.order}
          </a>
        </div>
      )}
    </header>
  )
}
