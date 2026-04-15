// FILE: src/components/contact/ContactForm.tsx
// PURPOSE: Client-side contact form — state, validation, POST to /api/contact
//          Step indicators, WhatsApp button, bilingual
// STYLING: Tailwind v4 inline classes only

'use client'

import { useState } from 'react'

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.857L.057 23.428a.5.5 0 00.609.61l5.718-1.484A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.184-1.433l-.372-.22-3.853 1.001 1.022-3.74-.242-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

export default function ContactForm({ locale }: { locale: string }) {
  const isSw = locale === 'sw'
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [form, setForm] = useState({ name:'', phone:'', email:'', service:'', destination:'', message:'' })

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  const inp = 'w-full px-4 py-3 border-2 border-teal-100 rounded-xl text-sm bg-white outline-none focus:border-teal-500 transition-colors placeholder:text-gray-400'

  const services = [
    { value:'', label: isSw ? 'Chagua huduma...' : 'Select a service...' },
    { value:'Career & Course Guidance',  label: isSw ? 'Mwongozo wa Kazi na Kozi' : 'Career & Course Guidance' },
    { value:'University Applications',   label: isSw ? 'Maombi ya Chuo Kikuu'     : 'University Applications' },
    { value:'Visa Processing',           label: isSw ? 'Usindikaji wa Visa'        : 'Visa Processing' },
    { value:'Scholarship Finder',        label: isSw ? 'Utafutaji wa Ufadhili'     : 'Scholarship Finder' },
    { value:'Pre-Departure Briefing',    label: isSw ? 'Maelezo ya Kabla ya Kuondoka' : 'Pre-Departure Briefing' },
    { value:'Accommodation & Travel',   label: isSw ? 'Makazi na Safari'           : 'Accommodation & Travel' },
    { value:'General Enquiry',           label: isSw ? 'Swali la Kawaida'          : 'General Enquiry' },
  ]

  const destinations = [
    { value:'',               label: isSw ? 'Chagua nchi...' : 'Select country...' },
    { value:'Canada',         label: 'Canada' },
    { value:'United Kingdom', label: isSw ? 'Uingereza'  : 'United Kingdom' },
    { value:'Australia',      label: 'Australia' },
    { value:'Germany',        label: isSw ? 'Ujerumani'  : 'Germany' },
    { value:'Netherlands',    label: isSw ? 'Uholanzi'   : 'Netherlands' },
    { value:'USA',            label: 'USA' },
    { value:'Other',          label: isSw ? 'Nyingine'   : 'Other' },
  ]

  if (status === 'success') return (
    <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-8 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h3 className="text-teal-700 font-bold text-xl mb-2">{isSw ? 'Ujumbe umetumwa!' : 'Message sent!'}</h3>
      <p className="text-gray-500 text-sm">
        {isSw ? 'Calorine atawasiliana nawe ndani ya masaa 24.' : "Calorine will be in touch within 24 hours. Check your email for a confirmation."}
      </p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      {/* Steps */}
      <div className="flex gap-2 mb-6">
        {[isSw ? '1. Kuhusu wewe' : '1. About you', isSw ? '2. Mipango yako' : '2. Your plans', isSw ? '3. Ujumbe' : '3. Message'].map((s,i) => (
          <div key={i} className="flex-1 text-center py-2 rounded-lg text-xs font-bold bg-teal-50 text-teal-500 border border-teal-100">{s}</div>
        ))}
      </div>

      <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-teal-700 mb-1.5">{isSw ? 'Jina kamili' : 'Full name'}</label>
            <input className={inp} type="text" required value={form.name} onChange={set('name')} placeholder={isSw ? 'Jina lako kamili' : 'Your full name'} />
          </div>
          <div>
            <label className="block text-xs font-bold text-teal-700 mb-1.5">{isSw ? 'Simu / WhatsApp' : 'Phone / WhatsApp'}</label>
            <input className={inp} type="tel" required value={form.phone} onChange={set('phone')} placeholder="+254 ..." />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-teal-700 mb-1.5">{isSw ? 'Barua pepe' : 'Email address'}</label>
          <input className={inp} type="email" required value={form.email} onChange={set('email')} placeholder={isSw ? 'wewe@mfano.com' : 'you@example.com'} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-teal-700 mb-1.5">{isSw ? 'Huduma unayohitaji' : 'Service interested in'}</label>
            <select className={inp} value={form.service} onChange={set('service')}>
              {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-teal-700 mb-1.5">{isSw ? 'Nchi unayolengea' : 'Destination country'}</label>
            <select className={inp} value={form.destination} onChange={set('destination')}>
              {destinations.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-teal-700 mb-1.5">{isSw ? 'Ujumbe wako' : 'Your message'}</label>
          <textarea className={inp} required rows={4} value={form.message} onChange={set('message')}
            placeholder={isSw ? 'Tuambie kuhusu wewe na unachohitaji msaada nao...' : 'Tell us about yourself and what you need help with...'} />
        </div>

        <button type="submit" disabled={status === 'loading'}
          className="w-full bg-teal-500 text-white font-bold py-3.5 rounded-xl hover:bg-teal-700 active:scale-95 transition-all disabled:opacity-60 text-sm">
          {status === 'loading' ? (isSw ? 'Inatuma...' : 'Sending...') : (isSw ? 'Tuma ujumbe wangu →' : 'Send my message →')}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-teal-200" />
          <span className="text-gray-400 text-xs">{isSw ? 'au' : 'or'}</span>
          <div className="flex-1 h-px bg-teal-200" />
        </div>

        <a href="https://wa.me/254743456817?text=Hi, I found Beyond Abroad and I'd like to enquire about studying abroad."
          target="_blank" rel="noopener noreferrer"
          className="w-full font-bold py-3.5 rounded-xl active:scale-95 transition-all text-sm flex items-center justify-center gap-2 text-white"
          style={{ backgroundColor: '#25D366' }}>
          <WhatsAppIcon />
          {isSw ? 'Zungumza nasi kwenye WhatsApp' : 'Chat with us on WhatsApp'}
        </a>

        {status === 'error' && (
          <p className="text-red-500 text-xs text-center">
            {isSw ? 'Kuna hitilafu. Tafadhali jaribu WhatsApp au barua pepe moja kwa moja.' : 'Something went wrong. Please try WhatsApp or email directly.'}
          </p>
        )}
      </div>
    </form>
  )
}