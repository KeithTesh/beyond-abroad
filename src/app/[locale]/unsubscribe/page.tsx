// FILE: src/app/[locale]/unsubscribe/page.tsx
// ROUTE: /unsubscribe?email=...
// PURPOSE: Newsletter unsubscribe confirmation — reads email from URL query param,
//          calls /api/newsletter/unsubscribe automatically on load
// STYLING: Tailwind v4 inline classes only

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link   from 'next/link'
import { useLocale } from 'next-intl'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { localePath } from '@/i18n/routing'

export default function UnsubscribePage() {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const [status, setStatus] = useState<'idle'|'loading'|'done'|'error'>('idle')

  useEffect(() => {
    if (!email) return
    setStatus('loading')
    fetch('/api/newsletter/unsubscribe', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(r => setStatus(r.ok ? 'done' : 'error'))
      .catch(() => setStatus('error'))
  }, [email])

  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
          {status === 'loading' && (
            <p className="text-teal-600 text-lg font-medium">Processing your request...</p>
          )}
          {status === 'done' && (
            <>
              <div className="text-5xl mb-4">👋</div>
              <h1 className="text-teal-700 text-2xl font-extrabold mb-3">You have been unsubscribed</h1>
              <p className="text-gray-500 text-sm mb-6">
                <strong>{email}</strong> has been removed from the Beyond Abroad newsletter.
              </p>
              <Link href={localePath('/', locale)} className="bg-teal-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors inline-block">
                Back to Home
              </Link>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="text-5xl mb-4">⚠️</div>
              <h1 className="text-teal-700 text-2xl font-extrabold mb-3">Something went wrong</h1>
              <p className="text-gray-500 text-sm mb-6">
                Please email us at <strong>carolmwenda09@gmail.com</strong> and we will remove you manually.
              </p>
              <Link href={localePath('/', locale)} className="bg-teal-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors inline-block">
                Back to Home
              </Link>
            </>
          )}
          {status === 'idle' && !email && (
            <>
              <div className="text-5xl mb-4">❓</div>
              <h1 className="text-teal-700 text-2xl font-extrabold mb-3">No email provided</h1>
              <p className="text-gray-500 text-sm mb-6">Please use the unsubscribe link in your email.</p>
              <Link href={localePath('/', locale)} className="bg-teal-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors inline-block">
                Back to Home
              </Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}