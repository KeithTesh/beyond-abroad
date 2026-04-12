// FILE: src/app/sitemap.ts
// PURPOSE: Auto-generates XML sitemap including all blog post slugs from Sanity
// USED BY: Next.js at /sitemap.xml

import { MetadataRoute } from 'next'
import { client } from '@/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://beyondabroad.com'

  const slugs = await client.fetch<{ slug: { current: string }; publishedAt: string }[]>(
    `*[_type == "blogPost" && published == true]{ slug, publishedAt }`
  )

  const staticRoutes = ['', '/services', '/about', '/events', '/blog', '/contact', '/faq'].map(r => ({
    url:              `${base}${r}`,
    lastModified:     new Date(),
    changeFrequency:  'weekly' as const,
    priority:         r === '' ? 1 : 0.8,
  }))

  const blogRoutes = slugs.map(p => ({
    url:             `${base}/blog/${p.slug.current}`,
    lastModified:    new Date(p.publishedAt),
    changeFrequency: 'monthly' as const,
    priority:        0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}