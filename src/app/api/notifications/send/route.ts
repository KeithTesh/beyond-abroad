import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getResend, AUDIENCE_ID, FROM_EMAIL } from '@/lib/resend'
import { client, urlFor, BLOG_POST_QUERY } from '@/sanity/client'

const EVENT_NOTIFICATION_QUERY = `*[_type == "event" && _id == $id][0] {
  _id,
  titleEn,
  titleSw,
  status,
  eventType,
  country,
  deadline,
  requirements,
  shortText,
  descriptionEn,
  descriptionSw,
  photo { asset { _ref }, alt },
  registrationLink,
  learnMoreLink,
  featured
}`

const requestSchema = z.object({
  type: z.enum(['blog', 'event']),
  slug: z.string().optional(),
  id: z.string().optional(),
  locale: z.enum(['en', 'sw']).optional(),
})

function chunkArray<T>(items: T[], size: number) {
  const chunks: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size))
  }
  return chunks
}

function renderNotificationTemplate({
  type,
  title,
  summary,
  detailsHtml,
  detailsText,
  heroImage,
  imageAlt,
  pageUrl,
  siteHost,
  includeImage,
  unsubscribeUrl,
}: {
  type: 'blog' | 'event'
  title: string
  summary: string
  detailsHtml: string
  detailsText: string
  heroImage?: string | null
  imageAlt?: string | null
  pageUrl: string
  siteHost: string
  includeImage: boolean
  unsubscribeUrl: string
}) {
  return {
    subject: type === 'blog'
      ? `New blog post published: ${title}`
      : `New event posted: ${title}`,
    text: `${type === 'blog' ? 'New blog post:' : 'New event:'} ${title}

${summary}

${detailsText}

${includeImage ? `Image available: ${heroImage}` : 'No image available for this item.'}

Read more: ${pageUrl}

You are receiving this because you subscribed to Beyond Abroad news.
To unsubscribe: ${unsubscribeUrl}`,
    html: `
      <div style="font-family:Inter, Arial, sans-serif;background:#f3f7f6;padding:0;margin:0;line-height:1.5;color:#1e3f3d;">
        <div style="max-width:720px;margin:0 auto;border-radius:18px;overflow:hidden;box-shadow:0 18px 45px rgba(15,23,42,0.08);background:#ffffff;">
          <div style="background:#073D3D;padding:30px;text-align:center;color:#F5C72E;">
            <p style="margin:0;font-size:14px;letter-spacing:1px;text-transform:uppercase;color:#F5C72E;">Beyond Abroad</p>
            <h1 style="margin:12px 0 0;font-size:28px;line-height:1.1;">${type === 'blog' ? 'New blog post' : 'New event'} announced</h1>
          </div>
          ${heroImage ? `<div style="background:#eaf5f2;text-align:center;"><img src="${heroImage}" alt="${imageAlt || title}" style="width:100%;max-height:360px;object-fit:cover;display:block;" /></div>` : ''}
          <div style="padding:30px;">
            <h2 style="margin:0 0 14px;font-size:24px;color:#073D3D;">${title}</h2>
            <p style="margin:0 0 24px;color:#47585a;font-size:16px;">${summary}</p>
            ${detailsHtml}
            <div style="margin-top:24px;text-align:center;">
              <a href="${pageUrl}" style="display:inline-block;background:#073D3D;color:#F5C72E;text-decoration:none;padding:14px 26px;border-radius:999px;font-weight:700;">View details</a>
            </div>
            <div style="margin-top:28px;padding:18px 20px;border-radius:16px;background:#f4fbfa;color:#47585a;font-size:14px;">
              <p style="margin:0 0 6px;font-weight:700;">Image availability</p>
              <p style="margin:0;">${includeImage ? 'This notification contains a featured image from the post.' : 'No featured image exists for this post yet.'}</p>
            </div>
          </div>
          <div style="background:#e7f2f0;padding:22px 30px;color:#294b48;font-size:14px;">
            <p style="margin:0 0 6px;font-weight:700;">Stay connected</p>
            <p style="margin:0 0 6px;">You subscribed to the Beyond Abroad newsletter for updates on study abroad intakes, scholarships, and visa guidance.</p>
            <p style="margin:0;color:#073D3D;">Unsubscribe anytime: <a href="${unsubscribeUrl}" style="color:#073D3D;text-decoration:underline;">${unsubscribeUrl}</a></p>
          </div>
          <div style="background:#ffffff;padding:18px 30px 26px;color:#84938f;font-size:13px;text-align:center;">
            <p style="margin:0;">Beyond Abroad • ${siteHost}</p>
          </div>
        </div>
      </div>
    `,
  }
}

export async function POST(req: NextRequest) {
  try {
    let requestBody: unknown
    try {
      requestBody = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON', message: 'Request body must be valid JSON.' }, { status: 400 })
    }

    const { type, slug, id, locale } = requestSchema.parse(requestBody)
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://beyondabroadco.com').replace(/\/$/, '')
    const resolvedLocale = locale || 'en'
    const localePrefix = `${siteUrl}/${resolvedLocale}`

    if (!client) {
      return NextResponse.json({ error: 'Sanity client unavailable' }, { status: 500 })
    }

    const resend = getResend()
    type ResendContact = { email?: string; unsubscribed?: boolean }
    const contactsResponse = await resend.contacts.list({ audienceId: AUDIENCE_ID })
    const contacts = (contactsResponse.data?.data ?? []) as ResendContact[]
    const recipients = contacts
      .filter((contact) => contact.email && !contact.unsubscribed)
      .map((contact) => contact.email as string)

    if (!recipients.length) {
      return NextResponse.json({ error: 'No subscribers found to notify' }, { status: 404 })
    }

    let title = ''
    let summary = ''
    let detailsHtml = ''
    let detailsText = ''
    let heroImage: string | null = null
    let imageAlt: string | null = null
    let pageUrl = localePrefix
    let includeImage = false

    if (type === 'blog') {
      if (!slug) {
        return NextResponse.json({ error: 'Blog slug required' }, { status: 400 })
      }

      const blog = await client.fetch(BLOG_POST_QUERY, { slug })
      if (!blog) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
      }

      title = blog.titleEn || 'New blog post'
      summary = blog.excerpt || `A new ${blog.category ?? 'blog post'} from Beyond Abroad.`
      pageUrl = `${localePrefix}/blog/${blog.slug?.current ?? slug}`
      heroImage = blog.coverImage ? urlFor(blog.coverImage).width(1200).url() : null
      imageAlt = typeof blog.coverImage?.alt === 'string' ? blog.coverImage.alt : null
      includeImage = Boolean(blog.coverImage)
      detailsHtml = `
        <div style="color:#334e4b;font-size:15px;line-height:1.8;">
          <p style="margin:0 0 10px;"><strong>Category:</strong> ${blog.category || 'General'}</p>
          <p style="margin:0 0 10px;"><strong>Author:</strong> ${blog.author || 'Beyond Abroad'}</p>
          <p style="margin:0 0 10px;"><strong>Published:</strong> ${new Date(blog.publishedAt).toLocaleDateString('en-GB')}</p>
          <p style="margin:0 0 10px;"><strong>Read time:</strong> ${blog.readTime ? `${blog.readTime} min` : 'Estimated 3-5 min'}</p>
          <p style="margin:0 0 10px;"><strong>Summary:</strong> ${summary}</p>
        </div>
      `
      detailsText = `Category: ${blog.category || 'General'}\nAuthor: ${blog.author || 'Beyond Abroad'}\nPublished: ${new Date(blog.publishedAt).toLocaleDateString('en-GB')}\nRead time: ${blog.readTime ? `${blog.readTime} min` : 'Estimated 3-5 min'}\nSummary: ${summary}`
    } else {
      if (!id) {
        return NextResponse.json({ error: 'Event id required' }, { status: 400 })
      }

      const event = await client.fetch(EVENT_NOTIFICATION_QUERY, { id })
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 })
      }

      title = event.titleEn || 'New event'
      summary = event.shortText || event.descriptionEn || 'A new event is now available at Beyond Abroad.'
      pageUrl = `${localePrefix}/events`
      heroImage = event.photo ? urlFor(event.photo).width(1200).url() : null
      imageAlt = typeof event.photo?.alt === 'string' ? event.photo.alt : null
      includeImage = Boolean(event.photo)
      detailsHtml = `
        <div style="color:#334e4b;font-size:15px;line-height:1.8;">
          <p style="margin:0 0 10px;"><strong>Status:</strong> ${event.status || 'Upcoming'}</p>
          <p style="margin:0 0 10px;"><strong>Type:</strong> ${event.eventType || 'General event'}</p>
          <p style="margin:0 0 10px;"><strong>Destination:</strong> ${event.country || 'International'}</p>
          <p style="margin:0 0 10px;"><strong>Deadline:</strong> ${event.deadline || 'Not specified'}</p>
          <p style="margin:0 0 10px;"><strong>Registration:</strong> ${event.registrationLink ? `<a href="${event.registrationLink}" style="color:#073D3D;text-decoration:underline;">Register here</a>` : 'Not available yet'}</p>
          <p style="margin:0 0 10px;"><strong>Details:</strong> ${summary}</p>
        </div>
      `
      detailsText = `Status: ${event.status || 'Upcoming'}\nType: ${event.eventType || 'General event'}\nDestination: ${event.country || 'International'}\nDeadline: ${event.deadline || 'Not specified'}\nRegistration: ${event.registrationLink || 'Not available yet'}\nDetails: ${summary}`
    }

    const unsubscribeUrl = `${localePrefix}/unsubscribe`
    const previewPageUrl = pageUrl
    const emailTemplate = renderNotificationTemplate({
      type,
      title,
      summary,
      detailsHtml,
      detailsText,
      heroImage,
      imageAlt,
      pageUrl: previewPageUrl,
      siteHost: siteUrl.replace(/^https?:\/\//, ''),
      includeImage,
      unsubscribeUrl,
    })

    const recipientBatches = chunkArray(recipients, 50)
    for (const batch of recipientBatches) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: batch,
        subject: emailTemplate.subject,
        text: emailTemplate.text,
        html: emailTemplate.html,
      })
    }

    return NextResponse.json({ success: true, sentTo: recipients.length })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', issues: err.issues }, { status: 400 })
    }

    console.error('Notifications send error:', err)
    return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 })
  }
}
