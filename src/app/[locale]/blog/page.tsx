// FILE: src/app/[locale]/blog/page.tsx
// ROUTE: /blog
// PURPOSE: Blog listing — featured post, category filter tabs, card grid,
//          newsletter strip between rows, supports cover image or video thumbnail
// STYLING: Tailwind v4 inline classes only

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import EventBanner   from '@/components/layout/EventBanner'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import { NewsletterStrip } from '@/components/ui/index'
import { client, BLOG_POSTS_QUERY, urlFor } from '@/sanity/client'
import type { BlogPost } from '@/types'
import BlogSearch from '@/components/blog/BlogSearch'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title:       locale === 'sw' ? 'Blogu ya Beyond Abroad' : 'Beyond Abroad Blog',
    description: locale === 'sw'
      ? 'Hadithi, mwongozo na vidokezo kwa wanafunzi wanaofuata elimu ya kimataifa.'
      : 'Stories, guides and tips for students pursuing international education.',
  }
}

export const categories = [
  { value: 'all',          labelEn: 'All',          labelSw: 'Zote' },
  { value: 'canada',       labelEn: 'Canada',        labelSw: 'Canada' },
  { value: 'uk',           labelEn: 'UK',            labelSw: 'Uingereza' },
  { value: 'australia',    labelEn: 'Australia',     labelSw: 'Australia' },
  { value: 'germany',      labelEn: 'Germany',       labelSw: 'Ujerumani' },
  { value: 'scholarships', labelEn: 'Scholarships',  labelSw: 'Ufadhili' },
  { value: 'visa-tips',    labelEn: 'Visa Tips',     labelSw: 'Vidokezo vya Visa' },
  { value: 'student-life', labelEn: 'Student Life',  labelSw: 'Maisha ya Mwanafunzi' },
]

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getCoverUrl(post: BlogPost) {
  if (post.coverImage) return urlFor(post.coverImage).width(600).height(340).url()
  if (post.coverVideo) {
    const m = post.coverVideo.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    if (m) return `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`
  }
  return null
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isSw = locale === 'sw'

  const posts: BlogPost[] = await client.fetch(BLOG_POSTS_QUERY)
  const featuredPost = posts.find(p => p.featured) || posts[0]
  const gridPosts    = posts.filter(p => p._id !== featuredPost?._id)

  const title    = (p: BlogPost) => isSw && p.titleSw ? p.titleSw : p.titleEn
  const catLabel = (val: string) => { const c = categories.find(x => x.value === val); return isSw ? c?.labelSw : c?.labelEn }

  return (
    <>
      <EventBanner locale={locale} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-teal-700 py-14 px-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-teal-600 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
          <div className="max-w-7xl mx-auto relative">
            <div className="yellow-bar mb-4" />
            <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-3">
              {isSw ? 'Blogu ya Beyond Abroad' : 'Beyond Abroad Blog'}
            </h1>
            <p className="text-white/75 text-lg">
              {isSw ? 'Hadithi, mwongozo na vidokezo kwa wanafunzi wanaofuata elimu ya kimataifa' : 'Stories, guides and tips for students pursuing international education'}
            </p>
          </div>
        </section>

        {/* Search + filter — client component */}
        <BlogSearch posts={posts} locale={locale} categories={categories} />

        <div className="max-w-7xl mx-auto px-6">
          {/* Featured post */}
          {featuredPost && (
            <section className="py-10">
              <Link href={`/blog/${featuredPost.slug.current}`}
                className="group grid lg:grid-cols-2 bg-white border border-teal-100 rounded-2xl overflow-hidden hover:border-teal-300 transition-all">
                <div className="relative aspect-video bg-teal-100">
                  {getCoverUrl(featuredPost) ? (
                    <Image src={getCoverUrl(featuredPost)!} alt={title(featuredPost)} fill className="object-cover" priority />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center"><span className="text-5xl">📝</span></div>
                  )}
                  {featuredPost.coverVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-teal-700 ml-1" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-yellow-300 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">
                      {isSw ? 'Iliyoangaziwa' : 'Featured'}
                    </span>
                    {featuredPost.category && (
                      <span className="bg-teal-50 text-teal-600 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                        {catLabel(featuredPost.category) || featuredPost.category}
                      </span>
                    )}
                  </div>
                  <h2 className="text-teal-700 text-2xl font-extrabold mb-3 group-hover:text-teal-500 transition-colors">
                    {title(featuredPost)}
                  </h2>
                  {featuredPost.excerpt && <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{featuredPost.excerpt}</p>}
                  <div className="flex items-center gap-3 text-gray-400 text-xs">
                    <span>{isSw ? 'Na' : 'By'} {featuredPost.author}</span>
                    <span>·</span><span>{formatDate(featuredPost.publishedAt)}</span>
                    {featuredPost.readTime && <><span>·</span><span>{featuredPost.readTime} {isSw ? 'dak za kusoma' : 'min read'}</span></>}
                  </div>
                  <span className="mt-4 text-teal-500 text-sm font-bold group-hover:underline">
                    {isSw ? 'Soma Makala →' : 'Read Article →'}
                  </span>
                </div>
              </Link>
            </section>
          )}

          {/* Grid — first 3 */}
          {gridPosts.length > 0 && (
            <section className="pb-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {gridPosts.slice(0, 3).map(post => (
                  <BlogCard key={post._id} post={post} isSw={isSw} title={title} catLabel={catLabel} getCoverUrl={getCoverUrl} formatDate={formatDate} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Newsletter between rows */}
        {gridPosts.length > 3 && <NewsletterStrip variant="light" />}

        <div className="max-w-7xl mx-auto px-6 pb-16">
          {gridPosts.length > 3 && (
            <section className="pt-10">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {gridPosts.slice(3).map(post => (
                  <BlogCard key={post._id} post={post} isSw={isSw} title={title} catLabel={catLabel} getCoverUrl={getCoverUrl} formatDate={formatDate} />
                ))}
              </div>
            </section>
          )}
          {!posts.length && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">📝</p>
              <p>{isSw ? 'Hakuna machapisho bado.' : 'No posts yet. Check back soon.'}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

function BlogCard({ post, isSw, title, catLabel, getCoverUrl, formatDate }: {
  post: BlogPost; isSw: boolean
  title: (p: BlogPost) => string
  catLabel: (v: string) => string | undefined
  getCoverUrl: (p: BlogPost) => string | null
  formatDate: (d: string) => string
}) {
  const cover = getCoverUrl(post)
  return (
    <Link href={`/blog/${post.slug.current}`}
      className="group bg-white border border-teal-100 rounded-2xl overflow-hidden hover:border-teal-300 transition-all flex flex-col">
      <div className="relative aspect-video bg-teal-100 shrink-0">
        <div className="absolute top-0 left-0 right-0 h-1 bg-teal-500" />
        {cover
          ? <Image src={cover} alt={title(post)} fill className="object-cover" />
          : <div className="absolute inset-0 flex items-center justify-center"><span className="text-4xl">📝</span></div>
        }
        {post.coverVideo && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">▶ Video</div>
        )}
        {post.category && (
          <span className="absolute top-3 left-3 bg-yellow-300 text-teal-700 text-xs font-bold px-3 py-1 rounded-full capitalize">
            {catLabel(post.category) || post.category}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-teal-700 font-bold text-base mb-2 leading-snug group-hover:text-teal-500 transition-colors line-clamp-2">
          {title(post)}
        </h3>
        {post.excerpt && <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">{post.excerpt}</p>}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-teal-50">
          <span className="text-gray-400 text-xs">{formatDate(post.publishedAt)}</span>
          {post.readTime && <span className="text-gray-400 text-xs">{post.readTime} {isSw ? 'dak' : 'min read'}</span>}
        </div>
        <span className="text-teal-500 text-sm font-bold mt-2 group-hover:underline">
          {isSw ? 'Soma zaidi →' : 'Read more →'}
        </span>
      </div>
    </Link>
  )
}