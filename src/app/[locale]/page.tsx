import { Metadata } from 'next'
import { client, FEATURED_EVENT_QUERY, TESTIMONIALS_QUERY } from '@/sanity/client'
import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import EventBanner   from '@/components/layout/EventBanner'
import WhatsAppFloatServer from '@/components/ui/WhatsAppFloatServer'
import Hero          from '@/components/home/Hero'
import { ServicesGrid, PartnersStrip, Testimonials, FeaturedEventSection } from '@/components/home/index'
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

  let featuredEvent = null
  let testimonials  = []

  if (client) {
    try {
      [featuredEvent, testimonials] = await Promise.all([
        client.fetch(FEATURED_EVENT_QUERY),
        client.fetch(TESTIMONIALS_QUERY),
      ])
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
        <PartnersStrip />
        <ServicesGrid locale={locale} />
        <StatsBar />
        <FeaturedEventSection event={featuredEvent} locale={locale} />
        <Testimonials testimonials={testimonials} locale={locale} />
        <NewsletterStrip variant="dark" />
      </main>
      <Footer />
      <WhatsAppFloatServer />
    </>
  )
}
