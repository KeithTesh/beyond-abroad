// FILE: src/components/ui/index.tsx
// PURPOSE: Shared UI primitives — Button, Badge, SectionHeading, StatsBar, NewsletterStrip
// STYLING: Tailwind v4 inline classes only — no @apply
// IMPORT:  import { Button, Badge, SectionHeading, StatsBar, NewsletterStrip } from '@/components/ui'

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

// ── Button ────────────────────────────────────────────────
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'yellow' | 'ghost'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children, variant = 'primary', href, onClick,
  type = 'button', disabled, className = '', size = 'md',
}: ButtonProps) {
  const sz = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }[size]

  const v = {
    primary:   'bg-teal-500 text-white hover:bg-teal-700',
    secondary: 'border-2 border-teal-500 text-teal-500 hover:bg-teal-50',
    yellow:    'bg-yellow-300 text-teal-700 hover:bg-yellow-400',
    ghost:     'border-2 border-white text-white hover:bg-white/10',
  }[variant]

  const base = `inline-flex items-center justify-center font-bold rounded-xl active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${sz} ${v} ${className}`
  if (href) return <Link href={href} className={base}>{children}</Link>
  return <button type={type} onClick={onClick} disabled={disabled} className={base}>{children}</button>
}

// ── Badge ─────────────────────────────────────────────────
type BadgeVariant = 'open' | 'closing-soon' | 'upcoming' | 'live' | 'closed' | 'featured' | 'category'

export function Badge({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
  const styles: Record<BadgeVariant, string> = {
    open:           'bg-teal-500 text-white',
    'closing-soon': 'bg-red-500 text-white',
    upcoming:       'bg-blue-500 text-white',
    live:           'bg-red-600 text-white animate-pulse',
    closed:         'bg-gray-400 text-white',
    featured:       'bg-yellow-300 text-teal-700',
    category:       'bg-teal-100 text-teal-700',
  }
  return (
    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${styles[variant]}`}>
      {children}
    </span>
  )
}

// ── SectionHeading ────────────────────────────────────────
export function SectionHeading({
  label, title, subtitle, centered = false, light = false,
}: {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}) {
  return (
    <div className={centered ? 'text-center' : ''}>
      {label && (
        <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${light ? 'text-yellow-300' : 'text-teal-500'}`}>
          {label}
        </p>
      )}
      <h2 className={`text-3xl md:text-4xl font-extrabold mb-3 ${light ? 'text-white' : 'text-teal-700'}`}>
        {title}
      </h2>
      <div className={`yellow-bar mb-4 ${centered ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`text-base leading-relaxed ${light ? 'text-white/70' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ── StatsBar ──────────────────────────────────────────────
export function StatsBar() {
  const t = useTranslations('stats')
  const stats = [
    { value: '500+', label: t('students') },
    { value: '30+',  label: t('countries') },
    { value: '95%',  label: t('visa') },
    { value: '20+',  label: t('partners') },
    { value: '5 ★',  label: t('rating') },
  ]
  return (
    <div className="bg-teal-500">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-3 md:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-yellow-300 text-3xl font-extrabold">{s.value}</div>
            <div className="text-white/75 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── NewsletterStrip ───────────────────────────────────────
export function NewsletterStrip({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const t    = useTranslations('newsletter')
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const isDark = variant === 'dark'

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className={`py-12 px-6 ${isDark ? 'bg-teal-700' : 'bg-teal-50 border-y border-teal-100'}`}>
      <div className="max-w-2xl mx-auto text-center">
        <h3 className={`text-2xl font-extrabold mb-2 ${isDark ? 'text-yellow-300' : 'text-teal-700'}`}>
          {t('heading')}
        </h3>
        <p className={`text-sm mb-6 ${isDark ? 'text-white/70' : 'text-gray-500'}`}>{t('subheading')}</p>
        {status === 'success' ? (
          <p className={`text-sm font-medium py-3 px-6 rounded-xl ${isDark ? 'bg-teal-600 text-teal-100' : 'bg-teal-100 text-teal-700'}`}>
            {t('success')}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder={t('placeholder')} required
              className={`flex-1 px-4 py-3 rounded-xl text-sm outline-none border-2 transition-colors ${
                isDark
                  ? 'bg-teal-800 border-teal-500 text-white placeholder-white/35 focus:border-yellow-300'
                  : 'bg-white border-teal-200 text-gray-800 placeholder-gray-400 focus:border-teal-500'
              }`}
            />
            <button
              type="submit" disabled={status === 'loading'}
              className="bg-yellow-300 text-teal-700 font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all disabled:opacity-60 whitespace-nowrap"
            >
              {status === 'loading' ? '...' : t('subscribe')}
            </button>
          </form>
        )}
        {status === 'error' && <p className="text-red-400 text-xs mt-2">{t('error')}</p>}
        <p className={`text-xs mt-3 ${isDark ? 'text-white/35' : 'text-gray-400'}`}>{t('disclaimer')}</p>
      </div>
    </div>
  )
}