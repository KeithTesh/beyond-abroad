// FILE: src/components/layout/Footer.tsx
// PURPOSE: Site-wide footer — logo + contact info, quick links, social icons
//          with real brand colors, newsletter signup → /api/newsletter/subscribe
// STYLING: Tailwind v4 inline classes only

'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const LinkedInIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const TikTokIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)
const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
)

export default function Footer() {
  const t  = useTranslations('footer')
  const nt = useTranslations('newsletter')
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  const quickLinks = [
    { href: '/',           label: 'Home' },
    { href: '/services',   label: 'Services' },
    { href: '/about',      label: 'About Us' },
    { href: '/events',     label: 'Events' },
    { href: '/blog',       label: 'Blog' },
    { href: '/faq',        label: 'FAQ' },
    { href: '/contact',    label: 'Contact' },
    { href: '/unsubscribe',label: 'Unsubscribe' },
  ]

  const socials = [
    { icon: <LinkedInIcon />,  label: 'LinkedIn',  href: '#', bg: '#0A66C2' },
    { icon: <TikTokIcon />,    label: 'TikTok',    href: '#', bg: '#000000' },
    { icon: <InstagramIcon />, label: 'Instagram', href: '#', bg: '#E1306C' },
    { icon: <FacebookIcon />,  label: 'Facebook',  href: '#', bg: '#1877F2' },
  ]

  return (
    <footer className="bg-teal-700 border-t-4 border-yellow-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center">
                <span className="text-teal-700 font-extrabold text-xs">BA</span>
              </div>
              <span className="text-yellow-300 font-extrabold text-lg">Beyond Abroad</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{t('tagline')}</p>
            <div className="space-y-2 text-sm text-white/65">
              <p>📍 Nairobi, Kenya  |  Kampala, Uganda</p>
              <p>📞 +254 743456817  |  +256 751173929</p>
              <p>✉️  carolmwenda09@gmail.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-yellow-300 font-bold text-sm uppercase tracking-wider mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/65 hover:text-yellow-300 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-yellow-300 font-bold text-sm uppercase tracking-wider mb-4">{t('followUs')}</h3>
            <div className="flex flex-wrap gap-2 mb-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white text-xs font-bold px-3 py-2 rounded-full hover:opacity-85 transition-opacity"
                  style={{ backgroundColor: s.bg }}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
            <p className="text-white/40 text-xs">
              <Link href="/privacy" className="hover:text-yellow-300 transition-colors">{t('privacy')}</Link>
              {' · '}
              <Link href="/terms" className="hover:text-yellow-300 transition-colors">{t('terms')}</Link>
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-yellow-300 font-bold text-sm uppercase tracking-wider mb-2">{nt('heading')}</h3>
            <p className="text-white/60 text-xs mb-4 leading-relaxed">{nt('subheading')}</p>
            {status === 'success' ? (
              <p className="text-teal-100 text-sm font-medium bg-teal-600 rounded-xl p-3">{nt('success')}</p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder={nt('placeholder')} required
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-teal-800 border border-teal-500 text-white placeholder-white/35 outline-none focus:border-yellow-300 transition-colors"
                />
                <button
                  type="submit" disabled={status === 'loading'}
                  className="w-full bg-yellow-300 text-teal-700 text-sm font-bold py-2.5 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all disabled:opacity-60"
                >
                  {status === 'loading' ? '...' : nt('subscribe')}
                </button>
                {status === 'error' && <p className="text-red-300 text-xs">{nt('error')}</p>}
                <p className="text-white/35 text-xs">{nt('disclaimer')}</p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-teal-600">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/35 text-xs">{t('copy')}</p>
          <p className="text-white/35 text-xs">EN | KSW</p>
        </div>
      </div>
    </footer>
  )
}