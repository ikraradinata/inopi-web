import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import idMessages from '../messages/id.json'

type Messages = Record<string, unknown>

// Gabungan rekursif: nilai `override` menimpa `base`, kunci yang belum
// diterjemahkan jatuh kembali ke Bahasa Indonesia.
function merge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base }
  for (const [key, value] of Object.entries(override)) {
    const current = out[key]
    out[key] =
      value && typeof value === 'object' && !Array.isArray(value) && current && typeof current === 'object' && !Array.isArray(current)
        ? merge(current as Messages, value as Messages)
        : value
  }
  return out
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  const messages =
    locale === routing.defaultLocale
      ? (idMessages as Messages)
      : merge(idMessages as Messages, (await import(`../messages/${locale}.json`)).default)

  return { locale, messages }
})
