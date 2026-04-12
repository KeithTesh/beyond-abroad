// FILE: src/app/[locale]/layout.tsx
// PURPOSE: Root layout — wraps every page with NextIntlClientProvider,
//          sets html lang, loads Inter font, applies global metadata
// LOCALES: en · sw  (detected by middleware.ts)

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title:       { default: 'Beyond Abroad — International Student Counseling', template: '%s | Beyond Abroad' },
  description: 'British Council certified student counselor helping East African students achieve their international education dreams. Based in Nairobi & Kampala.',
  keywords:    ['study abroad', 'international education', 'student visa', 'scholarship', 'Kenya', 'Uganda'],
  openGraph:   { type: 'website', siteName: 'Beyond Abroad', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale as typeof locales[number])) notFound()
  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen bg-white">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}