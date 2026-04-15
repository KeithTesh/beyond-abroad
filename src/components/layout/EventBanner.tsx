// FILE: src/components/layout/EventBanner.tsx
// PURPOSE: Yellow top strip — driven by Sanity featuredEvent.bannerTextEn/Sw
//          Calorine updates this from /studio → Featured Event
//          Hidden automatically when no active featured event exists
// STYLING: Tailwind v4 inline classes only

import Link from 'next/link'
import { client, FEATURED_EVENT_QUERY, FEATURED_REGULAR_EVENT_QUERY } from '@/sanity/client'
import type { FeaturedEvent, Event } from '@/types'

export default async function EventBanner({ locale = 'en' }: { locale?: string }) {
  const [featuredDoc, regularEvent]: [FeaturedEvent | null, (Event & { shortText?: string; registrationLink?: string }) | null] =
    await Promise.all([
      client.fetch(FEATURED_EVENT_QUERY),
      client.fetch(FEATURED_REGULAR_EVENT_QUERY),
    ])

  const isSw = locale === 'sw'

  // Prefer dedicated featuredEvent doc; fall back to the first featured regular event
  let bannerText: string | undefined
  let ctaLink:   string | undefined
  let ctaLabel:  string | undefined

  if (featuredDoc) {
    bannerText = isSw ? featuredDoc.bannerTextSw : featuredDoc.bannerTextEn
    ctaLink    = featuredDoc.ctaLink
    ctaLabel   = isSw ? featuredDoc.ctaLabelSw : featuredDoc.ctaLabelEn
  }

  if (!bannerText && regularEvent) {
    bannerText = isSw && regularEvent.titleSw ? regularEvent.titleSw : regularEvent.titleEn
    ctaLink    = regularEvent.registrationLink ?? regularEvent.learnMoreLink
    ctaLabel   = isSw ? 'Omba Sasa' : 'Apply Now'
  }

  if (!bannerText) return null

  return (
    <div className="bg-yellow-300 border-b border-yellow-400">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-teal-700 text-base shrink-0">🎓</span>
          <p className="text-teal-700 text-sm font-bold truncate">{bannerText}</p>
        </div>
        {ctaLink && (
          <Link
            href={ctaLink}
            className="shrink-0 bg-teal-700 text-yellow-300 text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-teal-800 transition-colors"
          >
            {ctaLabel || 'Apply Now'} →
          </Link>
        )}
      </div>
    </div>
  )
}