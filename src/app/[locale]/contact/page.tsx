// FILE: src/app/[locale]/contact/page.tsx
// ROUTE: /contact
// PURPOSE: Contact page — quick contact cards, step form, WhatsApp CTA,
//          office locations, social links
// STYLING: Tailwind v4 inline classes only

import { Metadata } from 'next'
import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import EventBanner   from '@/components/layout/EventBanner'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import ContactForm   from '@/components/contact/ContactForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title:       locale === 'sw' ? 'Wasiliana Nasi' : 'Contact Us',
    description: locale === 'sw'
      ? 'Piga simu ya mashauriano ya bure au tuma ujumbe. Tunajibu ndani ya masaa 24.'
      : 'Book a free consultation or send us a message. We respond within 24 hours.',
  }
}

const LinkedInIcon   = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const TikTokIcon     = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
const InstagramIcon  = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
const FacebookIcon   = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isSw = locale === 'sw'

  const quickCards = [
    { icon: '📞', labelEn: 'Call us',      labelSw: 'Piga Simu',        valueEn: '+254 743456817\n+256 751173929', valueSw: '+254 743456817\n+256 751173929' },
    { icon: '✉️', labelEn: 'Email us',     labelSw: 'Tuma Barua Pepe',  valueEn: 'carolmwenda09@gmail.com',        valueSw: 'carolmwenda09@gmail.com' },
    { icon: '🕐', labelEn: 'Office hours', labelSw: 'Masaa ya Ofisi',   valueEn: 'Mon–Sat: 8am – 6pm EAT',        valueSw: 'Jumatatu–Jumamosi: 8asubuhi – 6jioni' },
    { icon: '📍', labelEn: 'Offices',      labelSw: 'Ofisi',            valueEn: 'Nairobi, Kenya\nKampala, Uganda', valueSw: 'Nairobi, Kenya\nKampala, Uganda' },
  ]

  const socials = [
    { icon: <LinkedInIcon />,  label: 'LinkedIn',  href: '#', bg: '#0A66C2' },
    { icon: <TikTokIcon />,    label: 'TikTok',    href: '#', bg: '#000000' },
    { icon: <InstagramIcon />, label: 'Instagram', href: '#', bg: '#E1306C' },
    { icon: <FacebookIcon />,  label: 'Facebook',  href: '#', bg: '#1877F2' },
  ]

  return (
    <>
      <EventBanner locale={locale} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-teal-700 py-14 px-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-56 h-56 bg-teal-600 rounded-full translate-x-1/3 -translate-y-1/3 opacity-50" />
          <div className="max-w-7xl mx-auto relative">
            <p className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-3">
              {isSw ? 'Wasiliana' : 'Get in touch'}
            </p>
            <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-3">
              {isSw ? "Hebu Tuanze Safari Yako" : "Let's Start Your Journey Abroad"}
            </h1>
            <div className="yellow-bar mb-3" />
            <p className="text-white/75 text-lg">
              {isSw
                ? 'Piga simu ya mashauriano ya bure au tuma ujumbe. Tunajibu ndani ya masaa 24.'
                : 'Book a free consultation or send us a message. We respond within 24 hours.'}
            </p>
          </div>
        </section>

        {/* Quick cards */}
        <section className="bg-teal-50 border-b border-teal-100">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickCards.map((card) => (
                <div key={card.labelEn} className="bg-white rounded-xl p-4 flex items-start gap-3 border border-teal-100 hover:border-teal-300 transition-colors">
                  <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center text-lg shrink-0">{card.icon}</div>
                  <div>
                    <p className="text-teal-500 text-xs font-bold uppercase tracking-wide mb-1">
                      {isSw ? card.labelSw : card.labelEn}
                    </p>
                    <p className="text-teal-700 text-xs font-semibold whitespace-pre-line leading-relaxed">
                      {isSw ? card.valueSw : card.valueEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-14 px-6 bg-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-teal-700 text-2xl font-extrabold mb-1">
              {isSw ? 'Tuma ujumbe' : 'Send us a message'}
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              {isSw ? 'Jaza fomu na Caroline atajibu ndani ya masaa 24.' : 'Fill in the form and Caroline will reply within 24 hours.'}
            </p>
            <ContactForm locale={locale} />
          </div>
        </section>

        {/* Offices */}
        <section className="py-12 px-6 bg-teal-50 border-t-2 border-teal-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-teal-700 text-xl font-extrabold mb-2">
              {isSw ? 'Ofisi Zetu' : 'Our Offices'}
            </h2>
            <div className="yellow-bar mb-6" />
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { city: 'Nairobi, Kenya',  addr: 'Bukoto Kisaasi Road, Above Qualiworth Supermarket\nWestlands, Nairobi Centre', phone: '+254 743456817' },
                { city: 'Kampala, Uganda', addr: 'Ktishna Center, Westlands\nKampala, Uganda',                                  phone: '+256 751173929' },
              ].map((o) => (
                <div key={o.city} className="bg-white border-l-4 border-yellow-300 rounded-r-2xl p-5">
                  <h3 className="text-teal-700 font-bold text-base mb-2">{o.city}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line mb-2">{o.addr}</p>
                  <p className="text-teal-500 text-sm font-semibold">{o.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="bg-teal-700 py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-yellow-300 font-bold text-sm uppercase tracking-wider mb-4">
              {isSw ? 'Tufuate' : 'Follow us'}
            </h3>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white text-sm font-bold px-4 py-2.5 rounded-full hover:opacity-85 transition-opacity"
                  style={{ backgroundColor: s.bg }}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}