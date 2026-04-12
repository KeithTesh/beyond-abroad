// FILE: src/sanity/schemas/index.ts
// PURPOSE: All Sanity CMS content schemas — defines what Caroline edits in /studio
// USED BY: sanity.config.ts
// SCHEMAS: blogPost · event · featuredEvent · testimonial · faqItem · siteSettings

import { defineType, defineField } from 'sanity'

// ── Blog Post ─────────────────────────────────────────────
export const blogPost = defineType({
  name: 'blogPost', title: 'Blog Post', type: 'document',
  fields: [
    defineField({ name: 'titleEn',    title: 'Title (English)',    type: 'string',   validation: R => R.required() }),
    defineField({ name: 'titleSw',    title: 'Title (Kiswahili)',  type: 'string' }),
    defineField({ name: 'slug',       title: 'Slug (URL)',         type: 'slug',     options: { source: 'titleEn', maxLength: 96 }, validation: R => R.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['canada','uk','australia','germany','scholarships','visa-tips','student-life','applications','guides'].map(v => ({ title: v.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()), value: v })) },
      validation: R => R.required(),
    }),
    defineField({ name: 'author',      title: 'Author',            type: 'string',   initialValue: 'Caroline Kangai' }),
    defineField({ name: 'publishedAt', title: 'Published At',      type: 'datetime', validation: R => R.required() }),
    defineField({ name: 'published',   title: 'Published (visible on site)', type: 'boolean', initialValue: false }),
    defineField({ name: 'featured',    title: 'Featured Post',     type: 'boolean',  initialValue: false }),
    defineField({ name: 'readTime',    title: 'Read Time (minutes)',type: 'number' }),
    defineField({ name: 'excerpt',     title: 'Excerpt (max 200 chars)', type: 'text', rows: 3, validation: R => R.max(200) }),
    defineField({ name: 'coverImage',  title: 'Cover Image',       type: 'image',    options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }),
    defineField({ name: 'coverVideo',  title: 'Cover Video URL (YouTube or Vimeo — overrides image if set)', type: 'url', description: 'Paste a YouTube or Vimeo URL to use a video as cover instead of a photo.' }),
    defineField({
      name: 'bodyEn', title: 'Body Content (English)', type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' }), defineField({ name: 'caption', title: 'Caption', type: 'string' })] },
        { name: 'videoEmbed', title: 'Embed Video', type: 'object', fields: [defineField({ name: 'url', title: 'YouTube or Vimeo URL', type: 'url' }), defineField({ name: 'caption', title: 'Caption', type: 'string' })] },
      ],
    }),
    defineField({
      name: 'bodySw', title: 'Body Content (Kiswahili)', type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' }), defineField({ name: 'caption', title: 'Caption', type: 'string' })] },
        { name: 'videoEmbed', title: 'Embed Video', type: 'object', fields: [defineField({ name: 'url', title: 'YouTube or Vimeo URL', type: 'url' }), defineField({ name: 'caption', title: 'Caption', type: 'string' })] },
      ],
    }),
  ],
  preview: { select: { title: 'titleEn', media: 'coverImage', subtitle: 'category' } },
  orderings: [{ title: 'Published (newest)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
})

// ── Event ──────────────────────────────────────────────────
export const event = defineType({
  name: 'event', title: 'Event', type: 'document',
  fields: [
    defineField({ name: 'titleEn', title: 'Title (English)',   type: 'string', validation: R => R.required() }),
    defineField({ name: 'titleSw', title: 'Title (Kiswahili)', type: 'string' }),
    defineField({
      name: 'status', title: 'Status', type: 'string',
      options: { list: [{ title:'Open',value:'open'},{ title:'Upcoming',value:'upcoming'},{ title:'Closing Soon',value:'closing-soon'},{ title:'🔴 Live',value:'live'},{ title:'Closed',value:'closed'}], layout: 'radio' },
      validation: R => R.required(),
    }),
    defineField({
      name: 'eventType', title: 'Event Type', type: 'string',
      options: { list: [{ title:'Intake',value:'intake'},{ title:'Webinar',value:'webinar'},{ title:'Workshop',value:'workshop'},{ title:'Info Session',value:'info-session'},{ title:'Scholarship',value:'scholarship'}] },
    }),
    defineField({ name: 'country',  title: 'Country (e.g. Canada)',                   type: 'string' }),
    defineField({ name: 'deadline', title: 'Deadline / Date (e.g. June 30, 2026)',     type: 'string' }),
    defineField({ name: 'photo',    title: 'Event Photo',  type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }),
    defineField({ name: 'shortText',     title: 'Short Description (shown on card — 1–2 sentences)', type: 'text', rows: 3 }),
    defineField({ name: 'descriptionEn', title: 'Full Description (English)',   type: 'text', rows: 5 }),
    defineField({ name: 'descriptionSw', title: 'Full Description (Kiswahili)', type: 'text', rows: 5 }),
    defineField({ name: 'requirements',  title: 'Requirements (e.g. IELTS 6.0+, transcripts)', type: 'text', rows: 3 }),
    defineField({ name: 'registrationLink', title: 'Apply / Register Link', type: 'url' }),
    defineField({ name: 'learnMoreLink',    title: 'Learn More Link',       type: 'url' }),
    defineField({ name: 'featured',         title: 'Show in Homepage Events Section', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'titleEn', subtitle: 'status', media: 'photo' } },
})

// ── Featured Event (Homepage Banner) ─────────────────────
export const featuredEvent = defineType({
  name: 'featuredEvent', title: 'Featured Event (Homepage Banner)', type: 'document',
  fields: [
    defineField({ name: 'titleEn',        title: 'Banner Title (English)',            type: 'string', validation: R => R.required() }),
    defineField({ name: 'titleSw',        title: 'Banner Title (Kiswahili)',          type: 'string' }),
    defineField({ name: 'subtitleEn',     title: 'Subtitle (English)',                type: 'string' }),
    defineField({ name: 'subtitleSw',     title: 'Subtitle (Kiswahili)',              type: 'string' }),
    defineField({ name: 'deadline',       title: 'Deadline Text (e.g. Deadline: June 30, 2026)', type: 'string' }),
    defineField({ name: 'requirementsEn', title: 'Requirements (English)',            type: 'text', rows: 2 }),
    defineField({ name: 'requirementsSw', title: 'Requirements (Kiswahili)',          type: 'text', rows: 2 }),
    defineField({ name: 'image',          title: 'Event Image (recommended 1200×600)', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })], validation: R => R.required() }),
    defineField({ name: 'ctaLabelEn',    title: 'CTA Button Label (English)',         type: 'string', initialValue: 'Apply Now' }),
    defineField({ name: 'ctaLabelSw',    title: 'CTA Button Label (Kiswahili)',       type: 'string', initialValue: 'Omba Sasa' }),
    defineField({ name: 'ctaLink',       title: 'CTA Button Link',                   type: 'url',    validation: R => R.required() }),
    defineField({ name: 'learnMoreLink', title: 'Learn More Link',                   type: 'url' }),
    defineField({ name: 'bannerTextEn',  title: 'Top Yellow Strip Text (English)',   type: 'string', description: 'e.g. "Canada 2026 Intake — Now Open!"' }),
    defineField({ name: 'bannerTextSw',  title: 'Top Yellow Strip Text (Kiswahili)', type: 'string' }),
    defineField({ name: 'active',        title: 'Active (show on site)',             type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'titleEn', media: 'image' } },
})

// ── Testimonial ───────────────────────────────────────────
export const testimonial = defineType({
  name: 'testimonial', title: 'Testimonial', type: 'document',
  fields: [
    defineField({ name: 'name',        title: 'Student Name',                          type: 'string',  validation: R => R.required() }),
    defineField({ name: 'country',     title: 'Currently (e.g. Now studying in Canada)', type: 'string' }),
    defineField({ name: 'countryFlag', title: 'Country Flag Emoji (e.g. 🇨🇦)',          type: 'string' }),
    defineField({ name: 'quote',       title: 'Quote',                                 type: 'text',    rows: 4, validation: R => R.required() }),
    defineField({ name: 'photo',       title: 'Student Photo', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }),
    defineField({ name: 'rating',      title: 'Star Rating (1–5)',                     type: 'number',  initialValue: 5, validation: R => R.min(1).max(5) }),
    defineField({ name: 'order',       title: 'Display Order (lower = shown first)',   type: 'number' }),
  ],
  preview: { select: { title: 'name', subtitle: 'country', media: 'photo' } },
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})

// ── FAQ Item ──────────────────────────────────────────────
export const faqItem = defineType({
  name: 'faqItem', title: 'FAQ Item', type: 'document',
  fields: [
    defineField({ name: 'questionEn', title: 'Question (English)',   type: 'string', validation: R => R.required() }),
    defineField({ name: 'questionSw', title: 'Question (Kiswahili)', type: 'string' }),
    defineField({ name: 'answerEn',   title: 'Answer (English)',     type: 'text',   rows: 5, validation: R => R.required() }),
    defineField({ name: 'answerSw',   title: 'Answer (Kiswahili)',   type: 'text',   rows: 5 }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: [{ title:'Services',value:'services'},{ title:'Cost & Funding',value:'cost'},{ title:'Visa',value:'visa'},{ title:'Courses & Grades',value:'courses'},{ title:'Life Abroad',value:'life-abroad'},{ title:'After Graduation',value:'after-graduation'}] },
    }),
    defineField({ name: 'order', title: 'Display Order (lower = shown first)', type: 'number' }),
  ],
  preview: { select: { title: 'questionEn', subtitle: 'category' } },
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})

// ── Site Settings ─────────────────────────────────────────
export const siteSettings = defineType({
  name: 'siteSettings', title: 'Site Settings', type: 'document',
  fields: [
    defineField({ name: 'taglineEn',      title: 'Tagline (English)',                    type: 'string' }),
    defineField({ name: 'taglineSw',      title: 'Tagline (Kiswahili)',                  type: 'string' }),
    defineField({ name: 'phone1',         title: 'Phone — Kenya',                        type: 'string', initialValue: '+254 743456817' }),
    defineField({ name: 'phone2',         title: 'Phone — Uganda',                       type: 'string', initialValue: '+256 751173929' }),
    defineField({ name: 'email',          title: 'Contact Email',                        type: 'string', initialValue: 'carolmwenda09@gmail.com' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp (digits + country code only)',type: 'string', initialValue: '254743456817' }),
    defineField({ name: 'addressNairobi', title: 'Address — Nairobi',                    type: 'text',   rows: 2 }),
    defineField({ name: 'addressKampala', title: 'Address — Kampala',                    type: 'text',   rows: 2 }),
    defineField({ name: 'linkedin',   title: 'LinkedIn URL',  type: 'url' }),
    defineField({ name: 'tiktok',     title: 'TikTok URL',    type: 'url' }),
    defineField({ name: 'instagram',  title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'facebook',   title: 'Facebook URL',  type: 'url' }),
  ],
  preview: { select: { title: 'taglineEn' } },
})

export const schemaTypes = [blogPost, event, featuredEvent, testimonial, faqItem, siteSettings]