import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: { absolute: 'Halaman tidak ditemukan — INOPI' },
}

export default async function NotFound() {
  const t = await getTranslations('NotFound')
  return (
    <div className="py-24">
      <div className="container max-w-xl text-center">
        <p className="font-display font-bold text-[48px] leading-none mb-4" style={{ color: 'var(--inopi-orange)' }}>
          404
        </p>
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(22px,3.5vw,30px)', color: 'var(--inopi-espresso)' }}>
          {t('title')}
        </h1>
        <p className="font-body text-[14px] mb-8" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('text')}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
            style={{ background: 'var(--inopi-espresso)' }}
          >
            {t('home')}
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center px-5 py-2.5 text-[14px] font-medium rounded-[8px] border transition-all hover:border-[var(--inopi-teal-strong)]"
            style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-taupe-strong)' }}
          >
            {t('contact')}
          </Link>
        </div>
      </div>
    </div>
  )
}
