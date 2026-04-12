// FILE: i18n.ts
// PURPOSE: next-intl config — registers EN and SW locales, loads message JSON files
// USED BY: middleware.ts + all pages via getTranslations() / useTranslations()

import { getRequestConfig } from 'next-intl/server'

export const locales       = ['en', 'sw'] as const
export const defaultLocale = 'en'         as const

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}))