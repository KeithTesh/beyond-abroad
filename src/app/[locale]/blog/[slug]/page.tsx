// FILE: src/app/[locale]/blog/[slug]/page.tsx
// ROUTE: /blog/[slug]
// PURPOSE: Individual blog post — cover image or video embed, rich portable text
//          body (with inline images + videos), author card, related posts, newsletter CTA
// STYLING: Tailwind v4 inline classes only

export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import EventBanner   from '@/components/layout/EventBanner'
import WhatsAppFloatServer from '@/components/ui/WhatsAppFloatServer'
import { localePath } from '@/i18n/routing'
import { NewsletterStrip } from '@/components/ui/index'
import { client, BLOG_POST_QUERY, RELATED_POSTS_QUERY, SIDEBAR_EVENTS_QUERY, SIDEBAR_RECENT_POSTS_QUERY, urlFor } from '@/sanity/client'
import type { BlogPost, Event } from '@/types'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug, locale } = await params
  const post: BlogPost = await client.fetch(BLOG_POST_QUERY, { slug })
  if (!post) return { title: 'Post Not Found' }
  return {
    title:       locale === 'sw' && post.titleSw ? post.titleSw : post.titleEn,
    description: post.excerpt,
    openGraph:   { images: post.coverImage ? [{ url: urlFor(post.coverImage).width(1200).height(630).url() }] : [] },
  }
}

function getEmbedUrl(url: string) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  const vm = url.match(/vimeo\.com\/(\d+)/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`
  return null
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function renderBody(blocks: unknown[]) {
  if (!blocks) return null
  return blocks.map((block: unknown, i: number) => {
    const b = block as Record<string, unknown>
    if (b._type === 'block') {
      const style    = (b.style as string) || 'normal'
      const children = (b.children as Array<{ text: string; marks?: string[] }>) || []
      const text     = children.map((c, ci) => {
        let el: React.ReactNode = c.text
        if (c.marks?.includes('strong')) el = <strong key={ci}>{el}</strong>
        if (c.marks?.includes('em'))     el = <em key={ci}>{el}</em>
        if (c.marks?.includes('code'))   el = <code key={ci} className="bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded text-sm font-mono">{el}</code>
        return el
      })
      if (style === 'h2')         return <h2 key={i} className="text-teal-700 text-2xl font-extrabold mt-8 mb-3">{text}</h2>
      if (style === 'h3')         return <h3 key={i} className="text-teal-600 text-xl font-bold mt-6 mb-2">{text}</h3>
      if (style === 'blockquote') return <blockquote key={i} className="border-l-4 border-yellow-300 pl-4 italic text-gray-500 my-4">{text}</blockquote>
      return <p key={i} className="text-gray-600 leading-relaxed mb-4">{text}</p>
    }
    if (b._type === 'image') {
      const img = b as { asset?: unknown; alt?: string; caption?: string }
      if (!img.asset) return null
      return (
        <figure key={i} className="my-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image src={urlFor(img as Parameters<typeof urlFor>[0]).width(900).height(506).url()} alt={img.alt || ''} fill className="object-cover" />
          </div>
          {img.caption && <figcaption className="text-center text-gray-400 text-sm mt-2">{img.caption}</figcaption>}
        </figure>
      )
    }
    if (b._type === 'videoEmbed') {
      const v = b as { url?: string; caption?: string }
      if (!v.url) return null
      const embed = getEmbedUrl(v.url)
      return (
        <figure key={i} className="my-6">
          {embed
            ? <div className="relative aspect-video rounded-2xl overflow-hidden bg-black"><iframe src={embed} className="absolute inset-0 w-full h-full" allowFullScreen /></div>
            : <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-teal-500 underline">{v.url}</a>
          }
          {v.caption && <figcaption className="text-center text-gray-400 text-sm mt-2">{v.caption}</figcaption>}
        </figure>
      )
    }
    return null
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const isSw = locale === 'sw'

  const post: BlogPost = await client.fetch(BLOG_POST_QUERY, { slug })
  if (!post) notFound()

  const [related, sidebarEvents, recentPosts] = await Promise.all([
    client.fetch(RELATED_POSTS_QUERY, { slug, category: post.category }) as Promise<BlogPost[]>,
    client.fetch(SIDEBAR_EVENTS_QUERY) as Promise<Event[]>,
    client.fetch(SIDEBAR_RECENT_POSTS_QUERY, { slug }) as Promise<BlogPost[]>,
  ])

  const title   = isSw && post.titleSw ? post.titleSw : post.titleEn
  const body    = isSw && post.bodySw?.length ? post.bodySw : post.bodyEn

  return (
    <>
      <EventBanner locale={locale} />
      <Navbar />
      <main>
        {/* Article + Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10 xl:gap-14 items-start">

            {/* Main article column */}
            <div>
              <Link href={localePath('/blog', locale)} className="text-teal-500 text-sm font-semibold hover:underline mb-6 inline-block">
                ← {isSw ? 'Rudi kwa Blogu' : 'Back to Blog'}
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {post.category && <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full capitalize">{post.category.replace('-',' ')}</span>}
                <span className="text-gray-400 text-sm">{formatDate(post.publishedAt)}</span>
                {post.readTime && <span className="text-gray-400 text-sm">· {post.readTime} {isSw ? 'dak za kusoma' : 'min read'}</span>}
              </div>
              <h1 className="text-teal-700 text-3xl md:text-4xl font-extrabold leading-tight mb-6">{title}</h1>
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-teal-100">
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm shrink-0">CK</div>
                <div>
                  <p className="text-teal-700 font-semibold text-sm">{post.author}</p>
                  <p className="text-gray-400 text-xs">{isSw ? 'Mwanzilishi, Beyond Abroad' : 'Founder, Beyond Abroad'}</p>
                </div>
              </div>
              <article>{renderBody(body || [])}</article>
              {post.category && (
                <div className="mt-10 pt-6 border-t border-teal-100">
                  <span className="text-gray-400 text-xs mr-2">Filed under:</span>
                  <span className="bg-teal-50 text-teal-600 text-xs font-semibold px-3 py-1 rounded-full capitalize">{post.category.replace('-',' ')}</span>
                </div>
              )}
            </div>

            {/* Sidebar — hidden on mobile/tablet */}
            <aside className="hidden lg:block space-y-5 sticky top-24">

              {/* Upcoming Events */}
              {sidebarEvents.length > 0 && (
                <div className="border border-teal-100 rounded-2xl overflow-hidden">
                  <div className="bg-teal-700 px-4 py-3">
                    <h3 className="text-white font-bold text-xs uppercase tracking-wider">{isSw ? 'Matukio Yanayokuja' : 'Upcoming Events'}</h3>
                  </div>
                  <div className="divide-y divide-teal-50">
                    {sidebarEvents.map(ev => (
                      <div key={ev._id} className="p-4">
                        <p className="text-teal-700 font-semibold text-sm leading-snug mb-1">{isSw && ev.titleSw ? ev.titleSw : ev.titleEn}</p>
                        {ev.deadline && <p className="text-xs text-gray-400 mb-2">{isSw ? 'Mwisho:' : 'Deadline:'} {formatDate(ev.deadline)}</p>}
                        {(ev.registrationLink || ev.learnMoreLink) && (
                          <a href={(ev.registrationLink || ev.learnMoreLink)!} target="_blank" rel="noopener noreferrer"
                            className="inline-block bg-yellow-300 text-teal-700 text-xs font-bold px-3 py-1 rounded-full hover:bg-yellow-400 transition-colors">
                            {isSw ? 'Jiandikishe →' : 'Register →'}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 bg-teal-50 border-t border-teal-100">
                    <Link href={localePath('/events', locale)} className="text-teal-500 text-xs font-semibold hover:underline">
                      {isSw ? 'Tazama matukio yote →' : 'View all events →'}
                    </Link>
                  </div>
                </div>
              )}

              {/* Recent Articles */}
              {recentPosts.length > 0 && (
                <div className="border border-teal-100 rounded-2xl overflow-hidden">
                  <div className="bg-teal-700 px-4 py-3">
                    <h3 className="text-white font-bold text-xs uppercase tracking-wider">{isSw ? 'Makala ya Hivi Karibuni' : 'Recent Articles'}</h3>
                  </div>
                  <div className="divide-y divide-teal-50">
                    {recentPosts.map(rp => (
                      <Link key={rp._id} href={localePath(`/blog/${rp.slug.current}`, locale)}
                        className="block p-4 hover:bg-teal-50 transition-colors group">
                        <p className="text-teal-700 font-semibold text-sm leading-snug mb-1 group-hover:text-teal-500 line-clamp-2">
                          {isSw && rp.titleSw ? rp.titleSw : rp.titleEn}
                        </p>
                        <span className="text-gray-400 text-xs">{formatDate(rp.publishedAt)}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-3 bg-teal-50 border-t border-teal-100">
                    <Link href={localePath('/blog', locale)} className="text-teal-500 text-xs font-semibold hover:underline">
                      {isSw ? 'Tazama machapisho yote →' : 'View all posts →'}
                    </Link>
                  </div>
                </div>
              )}

              {/* Contact shortcut */}
              <div className="border border-yellow-200 rounded-2xl overflow-hidden">
                <div className="bg-yellow-300 px-4 py-3">
                  <h3 className="text-teal-700 font-bold text-xs uppercase tracking-wider">{isSw ? 'Unahitaji Msaada?' : 'Need Help?'}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {isSw ? 'Uko tayari kuanza safari yako ya masomo nje ya nchi? Washauri wetu wako hapa kukusaidia.' : 'Ready to start your study abroad journey? Our advisors are here to help.'}
                  </p>
                  <Link href={localePath('/contact', locale)}
                    className="block text-center bg-teal-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-teal-700 transition-colors">
                    {isSw ? 'Wasiliana Nasi →' : 'Contact Us →'}
                  </Link>
                </div>
              </div>

            </aside>
          </div>
        </div>

        <NewsletterStrip variant="dark" />

        {/* Related posts */}
        {related?.length > 0 && (
          <section className="py-10 md:py-14 px-4 sm:px-6 bg-teal-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-teal-700 text-2xl font-extrabold mb-2">{isSw ? 'Makala Yanayohusiana' : 'Related Articles'}</h2>
              <div className="yellow-bar mb-6" />
              <div className="grid md:grid-cols-3 gap-5">
                {related.map(rp => (
                  <Link key={rp._id} href={localePath(`/blog/${rp.slug.current}`, locale)}
                    className="group bg-white border border-teal-100 rounded-2xl overflow-hidden hover:border-teal-300 transition-all">
                    <div className="relative aspect-video bg-teal-100">
                      {rp.coverImage
                        ? <Image src={urlFor(rp.coverImage).width(400).height(225).url()} alt={rp.coverImage.alt || ''} fill className="object-cover" />
                        : <div className="absolute inset-0 flex items-center justify-center"><span className="text-3xl">📝</span></div>
                      }
                    </div>
                    <div className="p-4">
                      <h3 className="text-teal-700 font-bold text-sm leading-snug mb-2 group-hover:text-teal-500 transition-colors line-clamp-2">
                        {isSw && rp.titleSw ? rp.titleSw : rp.titleEn}
                      </h3>
                      <span className="text-teal-500 text-xs font-bold group-hover:underline">{isSw ? 'Soma →' : 'Read →'}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppFloatServer />
    </>
  )
}