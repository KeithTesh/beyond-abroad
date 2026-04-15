// FILE: src/app/studio/[[...tool]]/page.tsx
// ROUTE: /studio  (Calorine's admin panel)
// PURPOSE: Embeds Sanity Studio in the Next.js app
//          Calorine logs in here to manage all site content
// NOTE: Excluded from locale middleware (see middleware.ts) and blocked by robots.ts

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} />
}