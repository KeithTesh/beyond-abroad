// FILE: src/components/layout/Navbar.tsx
// PURPOSE: Sticky top navbar — logo, desktop nav links, EN/KSW toggle,
//          Enroll Now CTA, mobile hamburger with slide-down panel
// STYLING: Tailwind v4 inline classes only — no @apply

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const t        = useTranslations('nav')
  const locale   = useLocale()
  const pathname = usePathname()
  const router   = useRouter()

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/',         label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/about',    label: t('about') },
    { href: '/events',   label: t('events') },
    { href: '/blog',     label: t('blog') },
    { href: '/faq',      label: t('faq') },
    { href: '/contact',  label: t('contact') },
  ]

  const isActive = (href: string) => {
    const base = locale === 'en' ? href : `/${locale}${href}`
    return pathname === base || (href !== '/' && pathname.startsWith(base))
  }

  const toggleLocale = () => {
    const next     = locale === 'en' ? 'sw' : 'en'
    const stripped = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${next}${stripped === '/' ? '' : stripped}`)
  }

  return (
    <nav
      className="sticky top-0 z-50 bg-teal-700 border-b-2 border-yellow-300"
      style={{ boxShadow: scrolled ? '0 8px 40px rgba(7,61,61,0.16)' : 'none' }}
    >
      {/* Desktop */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center">
            <span className="text-teal-700 font-extrabold text-xs">BA</span>
          </div>
          <span className="text-yellow-300 font-extrabold text-lg tracking-tight">
            Beyond Abroad
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-yellow-300 text-teal-700'
                  : 'text-white/80 hover:text-yellow-300 hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
          >
            <span className={locale === 'en' ? 'text-yellow-300' : 'text-white/50'}>EN</span>
            <span className="text-white/30">|</span>
            <span className={locale === 'sw' ? 'text-yellow-300' : 'text-white/50'}>KSW</span>
          </button>
          {/* CTA */}
          <Link
            href="/contact"
            className="bg-yellow-300 text-teal-700 text-sm font-bold px-5 py-2 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all"
          >
            {t('enroll')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-white transition-all origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-white transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-teal-800 border-t border-teal-600 px-4 py-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium mb-1 transition-colors ${
                isActive(link.href)
                  ? 'bg-yellow-300 text-teal-700'
                  : 'text-white/80 hover:bg-white/10 hover:text-yellow-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-teal-600">
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full"
            >
              <span className={locale === 'en' ? 'text-yellow-300' : 'text-white/50'}>EN</span>
              <span className="text-white/30">|</span>
              <span className={locale === 'sw' ? 'text-yellow-300' : 'text-white/50'}>KSW</span>
            </button>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center bg-yellow-300 text-teal-700 text-sm font-bold px-4 py-2 rounded-xl"
            >
              {t('enroll')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}