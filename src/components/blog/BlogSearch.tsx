// FILE: src/components/blog/BlogSearch.tsx
// PURPOSE: Client-side search bar + category filter tabs for the blog listing
// USED BY: src/app/[locale]/blog/page.tsx

'use client'

import { useState } from 'react'
import type { BlogPost } from '@/types'

interface Category { value: string; labelEn: string; labelSw: string }

export default function BlogSearch({ posts, locale, categories }: {
  posts: BlogPost[]; locale: string; categories: Category[]
}) {
  const isSw = locale === 'sw'
  const [search,         setSearch]         = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="bg-white border-b border-teal-100 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder={isSw ? 'Tafuta makala...' : 'Search articles, destinations, guides...'}
            className="w-full pl-10 pr-4 py-2.5 border-2 border-teal-100 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors placeholder:text-gray-400 bg-teal-50"
          />
          <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-nowrap sm:flex-wrap">
          {categories.map(cat => (
            <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all shrink-0 ${activeCategory === cat.value ? 'bg-teal-500 text-white' : 'bg-teal-50 text-teal-600 hover:bg-teal-100'}`}
            >
              {isSw ? cat.labelSw : cat.labelEn}
            </button>
          ))}
        </div>
      </div>
      {(search || activeCategory !== 'all') && (
        <div className="max-w-7xl mx-auto px-6 pb-2 text-xs text-gray-400">
          {isSw ? 'Unaona matokeo yaliyochujwa' : 'Showing filtered results'}{' · '}
          <button onClick={() => { setSearch(''); setActiveCategory('all') }} className="text-teal-500 hover:underline font-semibold">
            {isSw ? 'Futa vichujio' : 'Clear filters'}
          </button>
        </div>
      )}
    </div>
  )
}