'use client'

import { Suspense } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { Link, usePathname } from '@/i18n/navigation'
import { routing, type AppPathname } from '@/i18n/routing'

// Berpindah bahasa tetap di halaman yang sama (termasuk query, mis. nomor
// registrasi di halaman terima kasih). Berupa tautan biasa agar bisa diikuti
// mesin pencari dan tetap berfungsi tanpa JavaScript.
function Switcher({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useTranslations('Nav')
  const names = useTranslations('Locale')
  const pathname = usePathname() as AppPathname
  const search = useSearchParams()
  const query = Object.fromEntries(search.entries())

  return (
    <div role="group" aria-label={t('language')} className={`flex items-center gap-1.5 font-body text-[13px] ${className ?? ''}`}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden style={{ color: 'var(--inopi-sand)' }}>
              |
            </span>
          )}
          {l === locale ? (
            <span aria-current="true" className="font-semibold" style={{ color: 'var(--inopi-espresso)' }}>
              {l.toUpperCase()}
            </span>
          ) : (
            <Link
              href={{ pathname, query } as React.ComponentProps<typeof Link>['href']}
              locale={l}
              hrefLang={l}
              lang={l}
              aria-label={names(l)}
              className="font-medium transition-colors hover:text-[var(--inopi-teal-strong)]"
              style={{ color: 'var(--inopi-taupe-strong)' }}
            >
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  )
}

export default function LanguageSwitcher({ className }: { className?: string }) {
  return (
    <Suspense fallback={null}>
      <Switcher className={className} />
    </Suspense>
  )
}
