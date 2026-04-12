// FILE: sanity.config.ts
// PURPOSE: Sanity Studio config — sidebar layout for Caroline's admin at /studio
// USED BY: src/app/studio/[[...tool]]/page.tsx

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas/index'

export default defineConfig({
  name:    'beyond-abroad',
  title:   'Beyond Abroad CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Beyond Abroad')
          .items([
            S.listItem()
              .title('🌟 Featured Event (Homepage Banner)')
              .child(S.document().schemaType('featuredEvent').documentId('featuredEvent')),
            S.listItem()
              .title('⚙️ Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.documentTypeListItem('event').title('📅 Events'),
            S.documentTypeListItem('blogPost').title('📝 Blog Posts'),
            S.divider(),
            S.documentTypeListItem('testimonial').title('💬 Testimonials'),
            S.documentTypeListItem('faqItem').title('❓ FAQ Items'),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})