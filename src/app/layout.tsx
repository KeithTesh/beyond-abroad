import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Beyond Abroad — International Student Counseling',
    template: '%s | Beyond Abroad',
  },
  description: 'British Council certified student counselor helping East African students achieve their international education dreams.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  return (
    <html lang={locale} className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  )
}
