'use client'

import { useState } from 'react'

export default function FooterNewsletter({
  heading, subheading, placeholder, subscribeLabel, successMsg, errorMsg, disclaimer,
}: {
  heading: string
  subheading: string
  placeholder: string
  subscribeLabel: string
  successMsg: string
  errorMsg: string
  disclaimer: string
}) {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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
    <div>
      <h3 className="text-yellow-300 font-bold text-sm uppercase tracking-wider mb-2">{heading}</h3>
      <p className="text-white/60 text-xs mb-4 leading-relaxed">{subheading}</p>
      {status === 'success' ? (
        <p className="text-teal-100 text-sm font-medium bg-teal-600 rounded-xl p-3">{successMsg}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder} required
            className="w-full px-4 py-2.5 rounded-xl text-sm bg-teal-800 border border-teal-500 text-white placeholder-white/35 outline-none focus:border-yellow-300 transition-colors"
          />
          <button
            type="submit" disabled={status === 'loading'}
            className="w-full bg-yellow-300 text-teal-700 text-sm font-bold py-2.5 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all disabled:opacity-60"
          >
            {status === 'loading' ? '...' : subscribeLabel}
          </button>
          {status === 'error' && <p className="text-red-300 text-xs">{errorMsg}</p>}
          <p className="text-white/35 text-xs">{disclaimer}</p>
        </form>
      )}
    </div>
  )
}
