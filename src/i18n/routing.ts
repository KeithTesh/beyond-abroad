import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'sw'],
  defaultLocale: 'en',
  localePrefix: 'always',
})

const ignoredPrefixes = ['//', '/api', '/studio', '/_next', '/_vercel']

export function localePath(href: string, locale: string) {
  if (!href.startsWith('/')) return href
  if (ignoredPrefixes.some((prefix) => href.startsWith(prefix))) return href

  const segments = href.split('/').filter(Boolean)
  const firstSegment = segments[0]
  if (firstSegment && routing.locales.includes(firstSegment as typeof routing.locales[number])) {
    segments.shift()
    const normalized = segments.length ? `/${segments.join('/')}` : '/'
    return `/${locale}${normalized === '/' ? '' : normalized}`
  }

  const normalized = href === '/' ? '' : href
  return `/${locale}${normalized}`
}

export function switchLocalePath(pathname: string, locale: string) {
  if (!pathname.startsWith('/')) return localePath(pathname, locale)

  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  if (firstSegment && routing.locales.includes(firstSegment as typeof routing.locales[number])) segments.shift()
  const normalized = segments.length ? `/${segments.join('/')}` : '/'
  return localePath(normalized, locale)
}
