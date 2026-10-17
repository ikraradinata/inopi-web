import { getPathname } from '@/i18n/navigation'
import { routing, type AppPathname } from '@/i18n/routing'

export const SITE_URL = 'https://www.inopi.id'

type Locale = (typeof routing.locales)[number]

/** URL mutlak sebuah halaman untuk bahasa tertentu (mengikuti peta pathnames). */
export function absoluteUrl(locale: Locale, pathname: AppPathname): string {
  const path = getPathname({ locale, href: pathname })
  return `${SITE_URL}${path === '/' ? '' : path}`.replace(/^(https:\/\/www\.inopi\.id)$/, '$1/')
}

/** Canonical + hreflang antar versi bahasa (termasuk x-default = Bahasa Indonesia). */
export function pageAlternates(locale: string, pathname: AppPathname) {
  const current = (routing.locales as readonly string[]).includes(locale) ? (locale as Locale) : routing.defaultLocale
  return {
    canonical: absoluteUrl(current, pathname),
    languages: {
      id: absoluteUrl('id', pathname),
      en: absoluteUrl('en', pathname),
      'x-default': absoluteUrl(routing.defaultLocale, pathname),
    },
  }
}
