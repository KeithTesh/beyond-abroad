'use client'

// FILE: src/components/home/index.tsx
// PURPOSE: Homepage section components (except Hero)
//   ServicesGrid        — 6 service cards in 3-col grid
//   PartnersStrip       — partner logos strip
//   Testimonials        — 3 student cards (Sanity data with fallback)
//   FeaturedEventSection— teal event section from Sanity featuredEvent
// STYLING: Tailwind v4 inline classes only

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

// ── PartnersStrip ─────────────────────────────────────────
const partners = ['Multiworld International', 'British Council', 'Uniserve Education', 'Sable Education', 'S3 Education', 'University of Manchester']

export function PartnersStrip() {
  return (
    <div className="bg-teal-50 border-y border-teal-100 py-5 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
        <span className="text-teal-500 text-xs font-bold uppercase tracking-wider shrink-0">Trusted partners:</span>
        {partners.map((p) => (
          <span key={p} className="bg-white border border-teal-200 text-teal-600 text-xs font-semibold px-4 py-2 rounded-lg">{p}</span>
        ))}
      </div>
    </div>
  )
}

// ── Testimonials ──────────────────────────────────────────
const fallback = [
  { _id: '1', name: 'Amara Wanjiku',  country: 'Now in Canada 🇨🇦',          quote: '"Caroline made the whole process seamless — from IELTS tips to my study permit."',             rating: 5 },
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
                  {(t as Testimonial).photo ? (
                    <Image src={urlFor((t as Testimonial).photo!).width(96).height(96).url()} alt={t.name} width={48} height={48} className="object-cover w-full h-full" />
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
export function FeaturedEventSection({ event, locale }: { event: FeaturedEvent | null; locale: string }) {
  if (!event) return null

  const isSw         = locale === 'sw'
  const title        = isSw && event.titleSw        ? event.titleSw        : event.titleEn
  const subtitle     = isSw && event.subtitleSw     ? event.subtitleSw     : event.subtitleEn
  const requirements = isSw && event.requirementsSw ? event.requirementsSw : event.requirementsEn
  const ctaLabel     = isSw && event.ctaLabelSw     ? event.ctaLabelSw     : event.ctaLabelEn

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-teal-700 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-64 bg-teal-600 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="max-w-7xl mx-auto relative">
        <div className="bg-yellow-300 text-teal-700 text-xs font-bold px-4 py-1.5 rounded-lg inline-block mb-6 max-w-full break-words">
          ✏️ Admin: Update from /studio → Featured Event
        </div>
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
              {event.image ? (
                <Image src={urlFor(event.image).width(800).height(450).url()} alt={event.image.alt || title} width={800} height={450} className="object-cover w-full h-full rounded-2xl" />
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
    </section>
  )
}