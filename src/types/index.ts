// FILE: src/types/index.ts
// PURPOSE: Shared TypeScript interfaces for all Sanity data models
// IMPORT:  import type { BlogPost, Event, FeaturedEvent } from '@/types'

export type Locale = 'en' | 'sw'

export interface SanityImage {
  asset: { _ref: string; url: string }
  alt?: string
  caption?: string
}

export interface FeaturedEvent {
  titleEn: string
  titleSw?: string
  subtitleEn?: string
  subtitleSw?: string
  deadline?: string
  requirementsEn?: string
  requirementsSw?: string
  image: SanityImage
  ctaLabelEn: string
  ctaLabelSw?: string
  ctaLink: string
  learnMoreLink?: string
  bannerTextEn?: string
  bannerTextSw?: string
}

export interface Event {
  _id: string
  titleEn: string
  titleSw?: string
  status: 'open' | 'upcoming' | 'closing-soon' | 'live' | 'closed'
  eventType?: 'intake' | 'webinar' | 'workshop' | 'info-session' | 'scholarship'
  country?: string
  deadline?: string
  requirements?: string
  shortText?: string
  descriptionEn?: string
  descriptionSw?: string
  photo?: SanityImage
  registrationLink?: string
  learnMoreLink?: string
  featured?: boolean
}

export interface BlogPost {
  _id: string
  titleEn: string
  titleSw?: string
  slug: { current: string }
  category: string
  author: string
  publishedAt: string
  readTime?: number
  featured?: boolean
  excerpt?: string
  coverImage?: SanityImage
  coverVideo?: string
  bodyEn?: PortableTextBlock[]
  bodySw?: PortableTextBlock[]
}

export type PortableTextBlock = { _type: string; [key: string]: unknown }

export interface Testimonial {
  _id: string
  name: string
  country?: string
  countryFlag?: string
  quote: string
  rating: number
  photo?: SanityImage
}

export interface FaqItem {
  _id: string
  questionEn: string
  questionSw?: string
  answerEn: string
  answerSw?: string
  category?: string
}

export interface SiteSettings {
  taglineEn?: string
  taglineSw?: string
  phone1: string
  phone2: string
  email: string
  whatsappNumber: string
  addressNairobi?: string
  addressKampala?: string
  linkedin?: string
  tiktok?: string
  instagram?: string
  facebook?: string
}