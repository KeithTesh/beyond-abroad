export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { client, ALL_FEATURED_EVENTS_QUERY, ALL_FEATURED_REGULAR_EVENTS_QUERY, TESTIMONIALS_QUERY } from '@/sanity/client'
import type { FeaturedEvent, Event } from '@/types'
import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import EventBanner   from '@/components/layout/EventBanner'
import WhatsAppFloatServer from '@/components/ui/WhatsAppFloatServer'
import Hero          from '@/components/home/Hero'
import { ServicesGrid, PartnersSection, CommitmentSection, Testimonials, FeaturedEventSection } from '@/components/home/index'
import { StatsBar, NewsletterStrip } from '@/components/ui/index'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'sw' ? 'Beyond Abroad — Ushauri wa Elimu ya Kimataifa' : 'Beyond Abroad — International Student Counseling',
    description: locale === 'sw' ? 'Mshauri wa wanafunzi aliyethibitishwa na British Council.' : 'British Council certified student counselor helping East African students study abroad.',
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  let featuredEvents: FeaturedEvent[] = []
  let testimonials  = []

  if (client) {
    try {
      const [allFe, allRegularFe, t] = await Promise.all([
        client.fetch(ALL_FEATURED_EVENTS_QUERY) as Promise<FeaturedEvent[]>,
        client.fetch(ALL_FEATURED_REGULAR_EVENTS_QUERY) as Promise<(Event & { shortText?: string })[]>,
        client.fetch(TESTIMONIALS_QUERY),
      ])
      testimonials = t
      if (allFe?.length) {
        featuredEvents = allFe
      }
      // Append featured regular events if no dedicated featuredEvent docs, or always append them
      if (allRegularFe?.length && !featuredEvents.length) {
        featuredEvents = allRegularFe.map(ev => ({
          titleEn:        ev.titleEn,
          titleSw:        ev.titleSw,
          subtitleEn:     ev.shortText,
          deadline:       ev.deadline,
          requirementsEn: ev.requirements,
          image:          (ev as Event & { photo?: FeaturedEvent['image'] }).photo ?? ({ asset: { _ref: '' } } as FeaturedEvent['image']),
          ctaLabelEn:     'Apply Now',
          ctaLabelSw:     'Omba Sasa',
          ctaLink:        ev.registrationLink ?? '',
          learnMoreLink:  ev.learnMoreLink,
        }))
      }
    } catch (e) {
      // Sanity not connected yet — pages render with fallback content
    }
  }

  return (
    <>
      <EventBanner locale={locale} />
      <Navbar />
      <main>
        <Hero locale={locale} />
        <PartnersSection locale={locale} />
        <ServicesGrid locale={locale} />
        <StatsBar />
        <FeaturedEventSection events={featuredEvents} locale={locale} />
        <Testimonials testimonials={testimonials} locale={locale} />
        <CommitmentSection locale={locale} />
        <NewsletterStrip variant="dark" />
      </main>
      <Footer />
      <WhatsAppFloatServer />
    </>
  )
}
