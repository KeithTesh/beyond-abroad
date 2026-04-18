'use client'

// FILE: src/components/home/index.tsx
// PURPOSE: Homepage section components (except Hero)
//   ServicesGrid        — 6 service cards in 3-col grid
//   PartnersStrip       — partner logos strip
//   Testimonials        — 3 student cards (Sanity data with fallback)
//   FeaturedEventSection— teal event section from Sanity featuredEvent
// STYLING: Tailwind v4 inline classes only

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/client'
import { SectionHeading } from '@/components/ui/index'
import { localePath } from '@/i18n/routing'
import type { Testimonial, FeaturedEvent } from '@/types'

// ── Services data ─────────────────────────────────────────
const services = [
  { icon: '🎓', titleEn: 'Career & Course Guidance',   titleSw: 'Mwongozo wa Kazi na Kozi',       descEn: 'We match you with the right course and country based on your grades, budget and goals.',          descSw: 'Tunakuunganisha na kozi na nchi inayofaa kulingana na alama zako, bajeti na malengo yako.',     items: ['Course shortlisting', 'Country comparison', 'University rankings', 'Career alignment'] },
  { icon: '🏫', titleEn: 'University Applications',    titleSw: 'Maombi ya Chuo Kikuu',            descEn: 'From shortlisting to submitting — every document, deadline and detail handled expertly.',         descSw: 'Kutoka kuchagua hadi kuwasilisha — kila hati, muda wa mwisho na maelezo yanashughulikiwa.',     items: ['Personal statement', 'Document review', 'Submission tracking', 'Offer management'] },
  { icon: '📋', titleEn: 'Visa Processing',             titleSw: 'Usindikaji wa Visa',              descEn: 'All visa types handled with a 95% success rate across 30+ countries.',                            descSw: 'Aina zote za visa zinashughulikiwa na kiwango cha mafanikio cha 95% katika nchi 30+.',          items: ['Document preparation', 'Interview coaching', 'Biometrics guidance', 'Status tracking'] },
  { icon: '🎖️',titleEn: 'Scholarship Finder',          titleSw: 'Utafutaji wa Ufadhili',           descEn: 'We find scholarships you never knew you qualified for — merit, need-based and fully funded.',     descSw: 'Tunapata ufadhili ambao hukujua unastahili — wa sifa, mahitaji na ufadhili kamili.',            items: ['Fully funded matching', 'Merit scholarships', 'Essay review', 'Deadline tracking'] },
  { icon: '✈️', titleEn: 'Pre-Departure Briefing',     titleSw: 'Maelezo ya Kabla ya Kuondoka',   descEn: 'Packing, banking, culture and everything you need to know before you fly.',                       descSw: 'Ufungaji, benki, utamaduni na kila kitu unachohitaji kujua kabla ya kuruka.',                  items: ['Cultural orientation', 'Budgeting abroad', 'Health insurance', 'Arrival checklist'] },
  { icon: '🏠', titleEn: 'Accommodation & Travel',     titleSw: 'Makazi na Safari',                descEn: 'Safe affordable housing and flight bookings so you arrive stress-free from day one.',             descSw: 'Makazi salama ya bei nafuu na ubukuaji wa ndege ili uwasili bila msongo wa mawazo.',            items: ['Campus & off-campus', 'Flight booking', 'Airport pickup', 'Move-in support'] },
]

// ── ServicesGrid ──────────────────────────────────────────
export function ServicesGrid({ locale }: { locale: string }) {
  const isSw = locale === 'sw'
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading
            label={isSw ? 'Huduma Zetu' : 'What We Offer'}
            title={isSw ? 'Huduma Zetu' : 'Our Services'}
            subtitle={isSw ? 'Msaada kamili kwa kila hatua ya safari yako ya elimu ya kimataifa' : 'End-to-end support for every stage of your international education journey'}
            centered
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((sv) => (
            <div key={sv.titleEn} className="bg-white border border-teal-100 rounded-2xl p-6 hover:border-teal-300 transition-all" style={{ boxShadow: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(7,61,61,0.12)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              <div className="border-l-4 border-teal-500 pl-4 mb-4" style={{ borderRadius: 0 }}>
                <div className="text-3xl mb-2">{sv.icon}</div>
                <h3 className="text-teal-700 font-bold text-lg">{isSw ? sv.titleSw : sv.titleEn}</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{isSw ? sv.descSw : sv.descEn}</p>
              <ul className="space-y-1.5 mb-5">
                {sv.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={localePath('/contact', locale)} className="text-teal-500 text-sm font-bold hover:text-teal-700 transition-colors">
                {isSw ? 'Uliza →' : 'Enquire →'}
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href={localePath('/services', locale)} className="bg-teal-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-teal-700 active:scale-95 transition-all inline-block">
            {isSw ? 'Ona Huduma Zote' : 'View All Services'}
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── PartnersSection ───────────────────────────────────────
const partners = [
  { name: 'Metropolitan\nCommunity College',  abbr: 'MCC', bg: 'bg-indigo-700'  },
  { name: 'Staffordshire\nUniversity',         abbr: 'SU',  bg: 'bg-red-700'    },
  { name: 'Southeast\nCommunity College',      abbr: 'SCC', bg: 'bg-emerald-700'},
  { name: 'University of\nMaryland',           abbr: 'UMD', bg: 'bg-red-800'    },
  { name: 'Vancouver Island\nUniversity',      abbr: 'VIU', bg: 'bg-teal-700'   },
  { name: 'Lakehead\nUniversity',              abbr: 'LU',  bg: 'bg-blue-800'   },
]

export function PartnersSection({ locale }: { locale: string }) {
  const isSw = locale === 'sw'
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-teal-700 text-3xl md:text-4xl font-extrabold mb-3">
            {isSw ? 'Washirika Wetu' : 'Our Partners'}
          </h2>
          <div className="yellow-bar mx-auto mb-4" />
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            {isSw
              ? 'Tunashirikiana na vyuo vikuu na taasisi zinazotambulika duniani ili kukupa fursa bora za elimu na kazi nje ya nchi.'
              : 'We work with recognised universities and institutions worldwide to open the right doors for every student we guide.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((p) => (
            <div key={p.abbr}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:border-teal-200 hover:shadow-sm transition-all">
              <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center shrink-0`}>
                <span className="text-white text-xs font-extrabold tracking-tight">{p.abbr}</span>
              </div>
              <p className="text-gray-600 text-xs font-semibold text-center leading-snug whitespace-pre-line">{p.name}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          {isSw
            ? 'na taasisi nyingi zaidi katika Amerika ya Kaskazini, Ulaya, na Australia'
            : 'and many more institutions across North America, Europe, and Australia'}
        </p>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────
const fallback = [
  { _id: '1', name: 'Amara Wanjiku',  country: 'Now in Canada 🇨🇦',          quote: '"Calorine made the whole process seamless — from IELTS tips to my study permit."',             rating: 5 },
  { _id: '2', name: 'David Omondi',   country: 'Working in UK 🇬🇧',           quote: '"I got a fully funded scholarship I never knew I qualified for. Beyond Abroad changed my life."', rating: 5 },
  { _id: '3', name: 'Fatima Nassir',  country: 'University in Australia 🇦🇺', quote: '"The pre-departure briefing was incredible. I landed knowing exactly what to do."',              rating: 5 },
]

export function Testimonials({ testimonials, locale }: { testimonials: Testimonial[]; locale: string }) {
  const isSw  = locale === 'sw'
  const items = testimonials?.length ? testimonials : fallback

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-teal-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading
            label={isSw ? 'Hadithi za Mafanikio' : 'Student Success Stories'}
            title={isSw ? 'Wanafunzi Wanasema Nini' : 'What Students Say'}
            centered
          />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t._id} className="bg-white rounded-2xl p-6 border-t-4 border-yellow-300 border border-teal-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden shrink-0">
                  {(t as Testimonial).photo?.asset?._ref ? (
                    <Image src={urlFor((t as Testimonial).photo!).width(96).height(96).url()} alt={t.name} width={48} height={48} unoptimized className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-teal-600 font-bold text-lg">{t.name[0]}</span>
                  )}
                </div>
                <div>
                  <p className="text-teal-700 font-bold text-sm">{t.name}</p>
                  <p className="text-teal-500 text-xs">{t.country}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3 italic">{t.quote}</p>
              <div className="text-yellow-400 text-sm">{'★'.repeat(t.rating || 5)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FeaturedEventSection ──────────────────────────────────
export function FeaturedEventSection({ events, locale }: { events: FeaturedEvent[]; locale: string }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (events.length <= 1) return
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % events.length)
        setVisible(true)
      }, 350)
    }, 30000)
    return () => clearInterval(interval)
  }, [events.length])

  function goTo(i: number) {
    if (i === index) return
    setVisible(false)
    setTimeout(() => { setIndex(i); setVisible(true) }, 350)
  }

  if (!events?.length) return null

  const event        = events[index]
  const isSw         = locale === 'sw'
  const title        = isSw && event.titleSw        ? event.titleSw        : event.titleEn
  const subtitle     = isSw && event.subtitleSw     ? event.subtitleSw     : event.subtitleEn
  const requirements = isSw && event.requirementsSw ? event.requirementsSw : event.requirementsEn
  const ctaLabel     = isSw && event.ctaLabelSw     ? event.ctaLabelSw     : event.ctaLabelEn

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-teal-700 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-64 bg-teal-600 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="max-w-7xl mx-auto relative">
        <div style={{ transition: 'opacity 0.35s ease', opacity: visible ? 1 : 0 }}>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            <div>
              <p className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-3">
                {isSw ? 'Tukio Maalum' : 'Featured Event'}
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-4">{title}</h2>
              {subtitle     && <p className="text-white/70 text-lg mb-4">{subtitle}</p>}
              {event.deadline && <p className="text-yellow-300 font-semibold mb-4">📅 {event.deadline}</p>}
              {requirements  && <p className="text-white/65 text-sm mb-6">{requirements}</p>}
              <div className="flex flex-wrap gap-4">
                {event.ctaLink && (
                  <Link href={event.ctaLink} className="bg-yellow-300 text-teal-700 font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all">
                    {ctaLabel || 'Apply Now'}
                  </Link>
                )}
                {event.learnMoreLink && (
                  <Link href={event.learnMoreLink} className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 active:scale-95 transition-all">
                    {isSw ? 'Jifunze Zaidi' : 'Learn More'}
                  </Link>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="bg-teal-600 rounded-2xl aspect-video flex items-center justify-center overflow-hidden">
                {event.image?.asset?._ref ? (
                  <Image src={urlFor(event.image).width(800).height(450).url()} alt={event.image.alt || title} width={800} height={450} unoptimized className="object-cover w-full h-full rounded-2xl" />
                ) : (
                  <div className="text-center">
                    <div className="text-5xl mb-2">📸</div>
                    <p className="text-white/40 text-sm">Event image — add in Sanity</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators — only shown when there are multiple events */}
        {events.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {events.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to event ${i + 1}`}
                style={{ transition: 'width 0.3s ease, opacity 0.3s ease' }}
                className={`h-2 rounded-full ${i === index ? 'w-6 bg-yellow-300' : 'w-2 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ── CommitmentSection ─────────────────────────────────────
const credentials = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    titleEn: 'British Council Certified',
    titleSw: 'Cheti cha British Council',
    descEn:  'Officially recognised by the British Council as a certified student counselor.',
    descSw:  'Inatambuliwa rasmi na British Council kama mshauri wa wanafunzi aliyeidhinishwa.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    titleEn: 'ICEF Trained Consultant',
    titleSw: 'Mshauri Aliyefunzwa na ICEF',
    descEn:  'Verified education agent through ICEF, the global network for international student recruitment.',
    descSw:  'Wakala wa elimu aliyethibitishwa kupitia ICEF, mtandao wa kimataifa wa uajiri wa wanafunzi.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
    titleEn: '95% Visa Success Rate',
    titleSw: 'Kiwango cha 95% cha Mafanikio ya Visa',
    descEn:  'A proven record of successful visa outcomes for students across 30+ destination countries.',
    descSw:  'Rekodi iliyothibitishwa ya matokeo mazuri ya visa kwa wanafunzi katika nchi 30+ za uasiliani.',
  },
]

export function CommitmentSection({ locale }: { locale: string }) {
  const isSw = locale === 'sw'
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-amber-50 border border-amber-100 rounded-3xl px-8 py-10 md:px-14 md:py-14 text-center">

          {/* Shield icon */}
          <div className="flex justify-center mb-4 text-amber-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
              <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>

          <h2 className="text-amber-600 text-2xl md:text-3xl font-extrabold mb-4">
            {isSw ? 'Dhamira Yetu kwa Ubora' : 'Our Commitment to Excellence'}
          </h2>

          <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
            {isSw
              ? 'Katika Beyond Abroad, tunajiweka kwa viwango vya juu zaidi vya ushauri wa elimu. Vyeti na ushirikiano wetu vinaonyesha dhamira yetu ya kutoa mwongozo wa kuaminika na wa kubadilisha maisha kwa kila mwanafunzi tunayemhudumia.'
              : 'At Beyond Abroad, we hold ourselves to the highest professional standards in education consulting. Our credentials and affiliations reflect our unwavering dedication to trusted, impactful guidance for every student we serve across East Africa.'}
          </p>

          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {credentials.map((c) => (
              <div key={c.titleEn} className="flex flex-col items-center text-center gap-3">
                <div className="text-amber-500">{c.icon}</div>
                <p className="text-teal-700 font-bold text-sm">{isSw ? c.titleSw : c.titleEn}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{isSw ? c.descSw : c.descEn}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-xs mt-10">
            {isSw
              ? 'Vyeti vyetu vinahuishwa mara kwa mara ili kuhakikisha wanafunzi daima wanapata mwongozo wanaoweza kuuamini.'
              : 'Our credentials are actively maintained and renewed to ensure every student receives guidance they can trust.'}
          </p>
        </div>
      </div>
    </section>
  )
}