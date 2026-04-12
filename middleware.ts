// FILE: middleware.ts
// PURPOSE: Intercepts every request, detects locale, redirects to /en or /sw
// EXCLUDES: /api  /studio  /_next  static files

import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
})

export const config = {
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
}