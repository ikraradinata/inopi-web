import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import MembershipForm from './MembershipForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.membershipApply' })
  return { title: t('title'), description: t('description') }
}

export default async function DaftarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'MembershipApply' })
  return (
    <div className="py-14">
      <div className="container max-w-xl">
        <h1 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(22px,4vw,32px)', color: 'var(--inopi-espresso)' }}>
          {t('title')}
        </h1>
        <p className="font-body text-[14px] mb-8" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('intro')}
        </p>
        <MembershipForm />
      </div>
    </div>
  )
}
