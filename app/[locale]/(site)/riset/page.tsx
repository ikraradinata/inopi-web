import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.research' })
  return { title: t('title'), description: t('description') }
}

// Tautan PDF Insight Brief. Isi (mis. '/publikasi/insight-brief-01.pdf')
// setelah berkas ada dan ketiga founder yang disebut di dalamnya setuju.
const INSIGHT_BRIEF_PDF: string | null = null

export default async function RisetPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Riset' })
  return (
    <div className="py-14">
      <div className="container max-w-3xl">
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          {t('title')}
        </h1>
        <p className="font-body text-[14px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('intro')}
        </p>

        <section className="mt-10">
          <h2 className="font-display font-bold text-[18px] mb-4" style={{ color: 'var(--inopi-espresso)' }}>
            {t('publications')}
          </h2>
          <article className="rounded-[12px] p-6 border bg-white" style={{ borderColor: 'var(--inopi-sand)' }}>
            <p className="font-body text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--inopi-teal-strong)' }}>
              {t('brief')}
            </p>
            <h3 className="font-display font-bold text-[18px] leading-snug mb-2" style={{ color: 'var(--inopi-espresso)' }}>
              {t('briefTitle')}
            </h3>
            <p className="font-body text-[12px] mb-3" style={{ color: 'var(--inopi-taupe-strong)' }}>
              {t('briefMeta')}
            </p>
            <p className="font-body text-[14px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
              {t('briefSummary')}
            </p>
            {INSIGHT_BRIEF_PDF && (
              <a
                href={INSIGHT_BRIEF_PDF}
                className="inline-flex items-center mt-5 px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
                style={{ background: 'var(--inopi-espresso)' }}
              >
                {t('download')}
              </a>
            )}
          </article>
        </section>
      </div>
    </div>
  )
}
