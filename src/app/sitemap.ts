// FILE: src/app/sitemap.ts
// PURPOSE: Auto-generates XML sitemap including all blog post slugs from Sanity
// USED BY: Next.js at /sitemap.xml

import { MetadataRoute } from 'next'
import { client } from '@/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://beyondabroad.com'

  const slugs = await client.fetch(
    `*[_type == "blogPost" && published == true]{ slug, publishedAt }`
  ) as { slug: { current: string }; publishedAt: string }[]

  const localePrefixes = ['/en', '/sw']

  const staticRoutes = localePrefixes.flatMap((prefix) =>
    ['', '/services', '/about', '/events', '/blog', '/contact', '/faq'].map((r) => ({
      url:              `${base}${prefix}${r}`,
      lastModified:     new Date(),
      changeFrequency:  'weekly' as const,
      priority:         r === '' ? 1 : 0.8,
    }))
  )

  const blogRoutes = localePrefixes.flatMap((prefix) =>
    slugs.map(p => ({
      url:             `${base}${prefix}/blog/${p.slug.current}`,
      lastModified:    new Date(p.publishedAt),
      changeFrequency: 'monthly' as const,
      priority:        0.6,
    }))
  )

  return [...staticRoutes, ...blogRoutes]
}