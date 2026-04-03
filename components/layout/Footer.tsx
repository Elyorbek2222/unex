import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin, Send } from 'lucide-react'
import type { Dictionary, Locale } from '@/lib/dictionary'

interface FooterProps {
  dict: Dictionary
  locale: Locale
}

export default function Footer({ dict, locale }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#111111] text-gray-400">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo-white-bg.png" alt="Unex Express" width={40} height={40} className="rounded-lg" />
              <span className="font-bold text-lg text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Unex <span className="text-[#EF5350]">Express</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">{dict.footer.tagline}</p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://t.me/unexexpress"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#D32F2F] flex items-center justify-center transition-colors"
              >
                <Send size={15} className="text-gray-400 hover:text-white" />
              </a>
              <a
                href="https://instagram.com/unexexpress"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#D32F2F] flex items-center justify-center transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{dict.footer.links_title}</h4>
            <ul className="space-y-2">
              {[
                { href: `/${locale}`, label: dict.nav.home },
                { href: '#services', label: dict.nav.services },
                { href: '#calculator', label: dict.nav.calculator },
                { href: '#map', label: dict.nav.map },
                { href: '#contact', label: dict.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-[#EF5350] transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{dict.footer.contact_title}</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+998711000001" className="flex items-start gap-2 text-sm text-gray-500 hover:text-[#EF5350] transition-colors">
                  <Phone size={14} className="mt-0.5 flex-shrink-0" />
                  +998 71 100 00 01
                </a>
              </li>
              <li>
                <a href="mailto:info@unexexpress.uz" className="flex items-start gap-2 text-sm text-gray-500 hover:text-[#EF5350] transition-colors">
                  <Mail size={14} className="mt-0.5 flex-shrink-0" />
                  info@unexexpress.uz
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-500">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                Toshkent shahri, O'zbekiston
              </li>
            </ul>
          </div>

          {/* Language */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{dict.footer.social_title}</h4>
            <div className="flex gap-2">
              {(['uz', 'ru', 'en'] as Locale[]).map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    l === locale
                      ? 'bg-[#D32F2F] text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {l === 'uz' ? "O'Z" : l.toUpperCase()}
                </Link>
              ))}
            </div>
            <a
              href="https://t.me/unexexpress"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-[#229ED9] hover:bg-[#1b84b5] text-white text-sm font-semibold rounded-xl transition-colors w-fit"
            >
              <Send size={15} />
              Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <span>© {year} Unex Express. {dict.footer.copyright}</span>
          <span>🇺🇿 O'zbekiston</span>
        </div>
      </div>
    </footer>
  )
}
