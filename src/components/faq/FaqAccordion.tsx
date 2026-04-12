// FILE: src/components/faq/FaqAccordion.tsx
// PURPOSE: Client-side FAQ accordion with live search filtering
//          Items expand/collapse on click. Search filters by question text in real time.
// STYLING: Tailwind v4 inline classes only
// USED BY: src/app/[locale]/faq/page.tsx

'use client'

import { useState } from 'react'
import type { FaqItem } from '@/types'

const categoryLabels: Record<string, { en: string; sw: string }> = {
  services:         { en: 'Services',        sw: 'Huduma' },
  cost:             { en: 'Cost & Funding',   sw: 'Gharama na Ufadhili' },
  visa:             { en: 'Visa',             sw: 'Visa' },
  courses:          { en: 'Courses & Grades', sw: 'Kozi na Alama' },
  'life-abroad':    { en: 'Life Abroad',      sw: 'Maisha Nje' },
  'after-graduation':{ en: 'After Graduation',sw: 'Baada ya Kuhitimu' },
}

export default function FaqAccordion({ items, locale }: { items: FaqItem[]; locale: string }) {
  const isSw = locale === 'sw'
  const [openId, setOpenId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = items.filter(item => {
    const q = isSw && item.questionSw ? item.questionSw : item.questionEn
    return q.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <>
      {/* Search */}
      <div className="relative mb-8">
        <input
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder={isSw ? 'Tafuta maswali...' : 'Search questions...'}
          className="w-full pl-10 pr-10 py-3 border-2 border-teal-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors bg-white"
        />
        <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        )}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-8">
          {isSw ? 'Hakuna maswali yanayolingana.' : 'No matching questions found.'}{' '}
          <button onClick={() => setSearch('')} className="text-teal-500 hover:underline">
            {isSw ? 'Futa utafutaji' : 'Clear search'}
          </button>
        </p>
      )}

      {/* Accordion items */}
      <div className="space-y-2">
        {filtered.map(item => {
          const question = isSw && item.questionSw ? item.questionSw : item.questionEn
          const answer   = isSw && item.answerSw   ? item.answerSw   : item.answerEn
          const catLabel = item.category
            ? (isSw ? categoryLabels[item.category]?.sw : categoryLabels[item.category]?.en)
            : undefined
          const isOpen = openId === item._id

          return (
            <div key={item._id}
              className={`bg-white rounded-xl overflow-hidden border transition-colors ${isOpen ? 'border-teal-300' : 'border-teal-100 hover:border-teal-200'}`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : item._id)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
              >
                <span className="text-teal-700 font-semibold text-sm leading-snug flex-1">{question}</span>
                <div className="flex items-center gap-2 shrink-0">
                  {catLabel && (
                    <span className="hidden sm:inline bg-teal-50 text-teal-500 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {catLabel}
                    </span>
                  )}
                  <span className={`text-teal-500 font-bold text-xl leading-none transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 border-t border-teal-100 pt-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}