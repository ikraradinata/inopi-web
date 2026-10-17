import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import KemitraanForm from './KemitraanForm'
import { COLLAB_MODELS } from '@/lib/constants/kemitraan'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.partnership' })
  return { title: { absolute: t('title') }, description: t('description') }
}

const eyebrowClass = 'font-body text-[11px] font-semibold uppercase tracking-widest mb-3'
const h2Style = { fontSize: 'clamp(20px,3vw,26px)', color: 'var(--inopi-espresso)' }

export default async function KemitraanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Kemitraan' })
  const why = t.raw('why') as { title: string; desc: string }[]
  const types = t.raw('types') as { title: string; desc: string }[]
  return (
    <>
      {/* D1. Hero */}
      <section className="py-16" style={{ background: 'var(--inopi-espresso)' }}>
        <div className="container">
          <p className={eyebrowClass} style={{ color: 'var(--inopi-teal)' }}>
            {t('eyebrow')}
          </p>
          <h1 className="font-display font-bold mb-4 text-white" style={{ fontSize: 'clamp(26px,4.5vw,40px)' }}>
            {t('title')}
          </h1>
          <p className="font-body text-[15px] max-w-2xl mb-7 leading-relaxed" style={{ color: 'var(--inopi-sand)' }}>
            {t('intro')}
          </p>
          <a
            href="#formulir"
            className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
            style={{ background: 'var(--inopi-teal-strong)' }}
          >
            {t('apply')}
          </a>
        </div>
      </section>

      {/* D2. Mengapa bermitra dengan INOPI */}
      <section className="py-14" style={{ background: 'var(--inopi-ivory)' }}>
        <div className="container">
          <h2 className="font-display font-bold mb-8" style={h2Style}>
            {t('whyTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {why.map((w) => (
              <div
                key={w.title}
                className="rounded-[12px] border p-5 bg-white"
                style={{ borderColor: 'var(--inopi-sand)' }}
              >
                <h3 className="font-display font-semibold text-[15px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                  {w.title}
                </h3>
                <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D3. Jenis mitra */}
      <section className="py-14" style={{ background: 'var(--inopi-sand)' }}>
        <div className="container">
          <h2 className="font-display font-bold mb-8" style={h2Style}>
            {t('typesTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {types.map((ty) => (
              <div key={ty.title} className="rounded-[12px] p-5" style={{ background: 'var(--inopi-ivory)' }}>
                <h3 className="font-display font-semibold text-[15px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                  {ty.title}
                </h3>
                <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  {ty.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D4. Model kolaborasi */}
      <section className="py-14" style={{ background: 'var(--inopi-ivory)' }}>
        <div className="container">
          <h2 className="font-display font-bold mb-8" style={h2Style}>
            {t('modelsTitle')}
          </h2>
          <ol className="grid grid-cols-1 gap-4 max-w-3xl">
            {COLLAB_MODELS.map((m, i) => (
              <li key={m.value} className="flex items-start gap-4">
                <span
                  className="font-display font-bold text-[28px] leading-none w-8 flex-shrink-0"
                  style={{ color: 'var(--inopi-orange)' }}
                >
                  {i + 1}
                </span>
                <p className="font-body text-[14px] leading-relaxed pt-0.5" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  <strong style={{ color: 'var(--inopi-espresso)' }}>{t(`models.${m.value}.title`)}</strong> — {t(`models.${m.value}.desc`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* D5. Formulir */}
      <section id="formulir" className="py-14 scroll-mt-16" style={{ background: 'var(--inopi-sand)' }}>
        <div className="container">
          <div className="max-w-2xl mx-auto rounded-[16px] p-6 sm:p-8" style={{ background: 'var(--inopi-ivory)' }}>
            <h2 className="font-display font-bold mb-6" style={h2Style}>
              {t('formTitle')}
            </h2>
            <KemitraanForm />
          </div>
        </div>
      </section>
    </>
  )
}
