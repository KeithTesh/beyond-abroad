// FILE: src/app/[locale]/events/page.tsx
// ROUTE: /events
// PURPOSE: Events & Intakes page — editable featured event from Sanity,
//          grid of upcoming events with photos, short text, status badges
// STYLING: Tailwind v4 inline classes only

export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import EventBanner   from '@/components/layout/EventBanner'
import WhatsAppFloatServer from '@/components/ui/WhatsAppFloatServer'
import { client, FEATURED_EVENT_QUERY, FEATURED_REGULAR_EVENT_QUERY, EVENTS_QUERY, urlFor } from '@/sanity/client'
import type { FeaturedEvent, Event } from '@/types'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title:       locale === 'sw' ? 'Matukio na Michakato' : 'Events & Intakes',
    description: locale === 'sw'
      ? 'Kuwa mbele ya kila mchakato, siku wazi na muda wa mwisho wa ufadhili.'
      : 'Stay ahead of every intake, open day and scholarship deadline.',
  }
}

const statusStyle: Record<string, string> = {
  open:           'bg-teal-500 text-white',
  upcoming:       'bg-blue-500 text-white',
  'closing-soon': 'bg-red-500 text-white',
  live:           'bg-red-600 text-white animate-pulse',
  closed:         'bg-gray-400 text-white',
}

const topColor: Record<string, string> = {
  open: '#0E5C5C', upcoming: '#3B82F6', 'closing-soon': '#EF4444', live: '#DC2626', closed: '#9CA3AF',
}

const statusEn: Record<string, string> = { open:'Open', upcoming:'Upcoming', 'closing-soon':'Closing Soon', live:'Live', closed:'Closed' }
const statusSw: Record<string, string> = { open:'Wazi', upcoming:'Inakuja', 'closing-soon':'Inafunga Hivi Karibuni', live:'Inaendelea', closed:'Imefungwa' }
const typeLabel: Record<string, string> = { intake:'Intake', webinar:'Webinar', workshop:'Workshop', 'info-session':'Info Session', scholarship:'Scholarship' }

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isSw = locale === 'sw'

  const [fe, regularFe, events]: [FeaturedEvent, Event & { photo?: FeaturedEvent['image'] }, Event[]] = await Promise.all([
    client.fetch(FEATURED_EVENT_QUERY),
    client.fetch(FEATURED_REGULAR_EVENT_QUERY),
    client.fetch(EVENTS_QUERY),
  ])

  const featuredEvent: FeaturedEvent | null = fe ?? (regularFe ? {
    titleEn:        regularFe.titleEn,
    titleSw:        regularFe.titleSw,
    subtitleEn:     regularFe.shortText,
    deadline:       regularFe.deadline,
    requirementsEn: regularFe.requirements,
    image:          regularFe.photo ?? ({ asset: { _ref: '' } } as FeaturedEvent['image']),
    ctaLabelEn:     'Apply Now',
    ctaLabelSw:     'Omba Sasa',
    ctaLink:        regularFe.registrationLink ?? '',
    learnMoreLink:  regularFe.learnMoreLink,
  } : null)

  const evTitle = (e: Event) => isSw && e.titleSw ? e.titleSw : e.titleEn

  return (
    <>
      <EventBanner locale={locale} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-teal-700 py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-teal-600 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
          <div className="max-w-7xl mx-auto relative">
            <div className="yellow-bar mb-4" />
            <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
              {isSw ? 'Matukio na Michakato' : 'Events & Intakes'}
            </h1>
            <p className="text-white/75 text-lg">
              {isSw ? 'Kuwa mbele ya kila mchakato, siku wazi na muda wa mwisho wa ufadhili' : 'Stay ahead of every intake, open day and scholarship deadline'}
            </p>
          </div>
        </section>

        {/* Featured event — editable from Sanity */}
        {featuredEvent && (
          <section className="py-8 md:py-12 px-4 sm:px-6 bg-teal-700">
            <div className="max-w-7xl mx-auto">
              <div className="bg-teal-800 rounded-2xl overflow-hidden grid lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-auto bg-teal-600 overflow-hidden">
                  {featuredEvent.image?.asset?._ref ? (
                    <Image src={urlFor(featuredEvent.image).width(800).height(500).url()} alt={featuredEvent.image.alt || ''} width={800} height={500} unoptimized className="object-cover w-full h-full" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white/40 text-sm">📸 Event image — add in Sanity</p>
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 animate-pulse">
                    🔴 {isSw ? 'Inaendelea' : 'Live'}
                  </span>
                  <h2 className="text-white text-2xl md:text-3xl font-extrabold mb-4">
                    {isSw && featuredEvent.titleSw ? featuredEvent.titleSw : featuredEvent.titleEn}
                  </h2>
                  {featuredEvent.deadline && <p className="text-yellow-300 font-semibold mb-2">📅 {featuredEvent.deadline}</p>}
                  {(isSw ? featuredEvent.requirementsSw : featuredEvent.requirementsEn) && (
                    <p className="text-white/65 text-sm mb-6">{isSw ? featuredEvent.requirementsSw : featuredEvent.requirementsEn}</p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    {featuredEvent.ctaLink && (
                      <Link href={featuredEvent.ctaLink} className="bg-yellow-300 text-teal-700 font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all">
                        {(isSw ? featuredEvent.ctaLabelSw : featuredEvent.ctaLabelEn) || 'Apply Now'}
                      </Link>
                    )}
                    {featuredEvent.learnMoreLink && (
                      <Link href={featuredEvent.learnMoreLink} className="border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 active:scale-95 transition-all">
                        {isSw ? 'Jifunze Zaidi' : 'Learn More'}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Events grid */}
        <section className="py-10 md:py-14 px-4 sm:px-6 bg-teal-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-teal-700 text-2xl font-extrabold mb-2">
              {isSw ? 'Matukio Yanayokuja' : 'Upcoming Events'}
            </h2>
            <div className="yellow-bar mb-8" />
            {!events?.length && (
              <p className="text-gray-400 text-center py-12">
                {isSw ? 'Hakuna matukio kwa sasa.' : 'No events currently. Check back soon.'}
              </p>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {events?.map((ev) => (
                <div key={ev._id} className="bg-white rounded-2xl overflow-hidden border border-teal-100 hover:border-teal-300 transition-all flex flex-col">
                  {/* Coloured top bar */}
                  <div style={{ height: 6, background: topColor[ev.status] || '#0E5C5C' }} />
                  {/* Event photo */}
                  {ev.photo?.asset?._ref && (
                    <div className="aspect-video bg-teal-100 overflow-hidden">
                      <Image src={urlFor(ev.photo).width(600).height(340).url()} alt={ev.photo.alt || evTitle(ev)} width={600} height={340} unoptimized className="object-cover w-full h-full" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusStyle[ev.status] || 'bg-teal-500 text-white'}`}>
                        {isSw ? statusSw[ev.status] : statusEn[ev.status]}
                      </span>
                      {ev.eventType && (
                        <span className="bg-teal-50 text-teal-600 text-xs font-semibold px-3 py-1 rounded-full">
                          {typeLabel[ev.eventType] || ev.eventType}
                        </span>
                      )}
                    </div>
                    <h3 className="text-teal-700 font-bold text-base mb-2 leading-snug">{evTitle(ev)}</h3>
                    {ev.shortText && <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{ev.shortText}</p>}
                    {ev.deadline && <p className="text-gray-400 text-xs mb-1">📅 {ev.deadline}</p>}
                    {ev.country   && <p className="text-teal-500 text-xs font-semibold mb-4">🌍 {ev.country}</p>}
                    {ev.registrationLink && (
                      <Link href={ev.registrationLink} className="mt-auto block text-center bg-teal-50 hover:bg-teal-100 text-teal-600 text-sm font-bold py-2.5 rounded-xl transition-colors">
                        {isSw ? 'Angalia Maelezo na Omba →' : 'View Details & Apply →'}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloatServer />
    </>
  )
}