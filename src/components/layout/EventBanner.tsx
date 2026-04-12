// FILE: src/components/layout/EventBanner.tsx
// PURPOSE: Yellow top strip — driven by Sanity featuredEvent.bannerTextEn/Sw
//          Caroline updates this from /studio → Featured Event
//          Hidden automatically when no active featured event exists
// STYLING: Tailwind v4 inline classes only

import Link from 'next/link'
import { client, FEATURED_EVENT_QUERY } from '@/sanity/client'
import type { FeaturedEvent } from '@/types'

export default async function EventBanner({ locale = 'en' }: { locale?: string }) {
  const event: FeaturedEvent | null = await client.fetch(FEATURED_EVENT_QUERY)
  if (!event) return null

  const bannerText = locale === 'sw' ? event.bannerTextSw : event.bannerTextEn
  const ctaLabel   = locale === 'sw' ? event.ctaLabelSw   : event.ctaLabelEn
  if (!bannerText) return null

  return (
    <div className="bg-yellow-300 border-b border-yellow-400">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-teal-700 text-base shrink-0">🎓</span>
          <p className="text-teal-700 text-sm font-bold truncate">{bannerText}</p>
        </div>
        {event.ctaLink && (
          <Link
            href={event.ctaLink}
            className="shrink-0 bg-teal-700 text-yellow-300 text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-teal-800 transition-colors"
          >
            {ctaLabel || 'Apply Now'} →
          </Link>
        )}
      </div>
    </div>
  )
}