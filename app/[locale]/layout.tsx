import type { Locale } from '@/lib/dictionary'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  return {}
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = ['uz', 'ru', 'en'].includes(locale) ? (locale as Locale) : 'uz'

  return <>{children}</>
}
