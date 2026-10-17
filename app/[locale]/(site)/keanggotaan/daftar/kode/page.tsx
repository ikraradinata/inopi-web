import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export const metadata: Metadata = { robots: { index: false, follow: false } }

// Halaman sementara: diganti oleh prompt R5.
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'MembershipSoon' })
  return (
    <div className="py-16">
      <div className="container max-w-xl text-center">
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(22px,4vw,30px)', color: 'var(--inopi-espresso)' }}>
          {t('codeTitle')}
        </h1>
        <p className="font-body text-[14px] mb-8" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('text')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/kontak" className="inline-flex items-center justify-center h-12 px-5 text-[14px] font-semibold text-white rounded-[10px]" style={{ background: 'var(--inopi-espresso)' }}>
            {t('contact')}
          </Link>
          <Link href="/keanggotaan/daftar" className="inline-flex items-center justify-center h-12 px-5 text-[14px] font-medium rounded-[10px] border" style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-taupe-strong)' }}>
            {t('back')}
          </Link>
        </div>
      </div>
    </div>
  )
}
