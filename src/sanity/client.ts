import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

type SanityImageSource = any

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = projectId
  ? createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: process.env.NODE_ENV === 'production', token: process.env.SANITY_API_TOKEN })
  : null as any

const builder = projectId ? createImageUrlBuilder(client) : null

export const urlFor = (source: SanityImageSource) =>
  builder ? builder.image(source) : { url: () => '' } as any

export const FEATURED_EVENT_QUERY = `*[_type == "featuredEvent" && active == true][0] { titleEn, titleSw, subtitleEn, subtitleSw, deadline, requirementsEn, requirementsSw, image { asset->, alt }, ctaLabelEn, ctaLabelSw, ctaLink, learnMoreLink, bannerTextEn, bannerTextSw }`
export const EVENTS_QUERY = `*[_type == "event" && status != "closed"] | order(deadline asc) { _id, titleEn, titleSw, status, eventType, country, deadline, requirements, shortText, descriptionEn, descriptionSw, photo { asset->, alt }, registrationLink, learnMoreLink, featured }`
export const BLOG_POSTS_QUERY = `*[_type == "blogPost" && published == true] | order(publishedAt desc) { _id, titleEn, titleSw, slug, category, author, publishedAt, readTime, featured, excerpt, coverImage { asset->, alt }, coverVideo }`
export const BLOG_POST_QUERY = `*[_type == "blogPost" && slug.current == $slug && published == true][0] { _id, titleEn, titleSw, slug, category, author, publishedAt, readTime, excerpt, coverImage { asset->, alt }, coverVideo, bodyEn[] { ..., _type == "image" => { asset->, alt, caption }, _type == "videoEmbed" => { url, caption } }, bodySw[] { ..., _type == "image" => { asset->, alt, caption }, _type == "videoEmbed" => { url, caption } } }`
export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc) { _id, name, country, countryFlag, quote, rating, photo { asset->, alt } }`
export const FAQ_QUERY = `*[_type == "faqItem"] | order(order asc) { _id, questionEn, questionSw, answerEn, answerSw, category }`
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] { taglineEn, taglineSw, phone1, phone2, email, whatsappNumber, addressNairobi, addressKampala, linkedin, tiktok, instagram, facebook }`
export const RELATED_POSTS_QUERY = `*[_type == "blogPost" && published == true && slug.current != $slug && category == $category] | order(publishedAt desc) [0..2] { _id, titleEn, titleSw, slug, category, publishedAt, readTime, excerpt, coverImage { asset->, alt } }`
