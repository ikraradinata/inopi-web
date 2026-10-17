import type { Metadata } from 'next'
import Link from 'next/link'
import { IconCheck, IconMinus, IconCalendarEvent } from '@tabler/icons-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PLAN_META, BENEFIT_TIERS, type Tier } from '@/lib/constants/membership'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.membership' })
  return { title: t('title'), description: t('description') }
}

function TierMark({ included, labels }: { included: boolean; labels: { yes: string; no: string } }) {
  return included ? (
    <IconCheck size={17} style={{ color: 'var(--inopi-teal-strong)' }} aria-label={labels.yes} />
  ) : (
    <IconMinus size={15} style={{ color: 'var(--inopi-sand)' }} aria-label={labels.no} />
  )
}

const tierOrder: Tier[] = ['student', 'professional', 'corporate']

export default async function KeanggotaanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Membership' })
  const tl = await getTranslations({ locale, namespace: 'Launch' })
  const launch = { eyebrow: tl('eyebrow'), dateLabel: tl('dateLabel'), venue: tl('venue') }
  const benefits = t.raw('benefits') as string[]
  const steps = t.raw('steps') as { title: string; desc: string }[]
  const faqs = t.raw('faqs') as { q: string; a: string }[]
  const totalValue = t('totalValue')
  const plans = PLAN_META.map((m) => ({
    ...m,
    name: t(`plans.${m.id}.name`),
    desc: t(`plans.${m.id}.desc`),
    price: t(`plans.${m.id}.price`),
    note: m.id === 'corporate' ? t('plans.corporate.note') : undefined,
  }))
  const BENEFITS = benefits.map((label, i) => ({ label, tiers: BENEFIT_TIERS[i] }))
  const markLabels = { yes: t('included'), no: t('notIncluded') }
  return (
    <>
      {/* Hero */}
      <section className="py-14 bg-white">
        <div className="container text-center max-w-2xl">
          <p className="inopi-eyebrow mb-4">{t('eyebrow')}</p>
          <h1
            className="font-display font-bold mb-3"
            style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}
          >
            {t('title')}
          </h1>
          <p className="font-body text-[14px] leading-relaxed mb-7" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t.rich('intro', { value: totalValue, b: (chunks) => <strong style={{ color: 'var(--inopi-espresso)' }}>{chunks}</strong> })}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/keanggotaan/daftar"
              className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
              style={{ background: 'var(--inopi-espresso)' }}
            >
              {t('register')}
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center px-5 py-2.5 text-[14px] font-medium rounded-[8px] border transition-all hover:border-[var(--inopi-teal-strong)] hover:text-[var(--inopi-teal-strong)]"
              style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </section>

      {/* Harga */}
      <section style={{ background: 'var(--inopi-ivory)' }} className="py-14">
        <div className="container">
          <h2
            className="font-display font-bold text-center mb-8"
            style={{ fontSize: 'clamp(20px,3vw,26px)', color: 'var(--inopi-espresso)' }}
          >
            {t('categoriesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {plans.map((p) => (
              <div
                key={p.id}
                className="rounded-[12px] p-6 border relative flex flex-col"
                style={{
                  background: p.featured ? 'var(--inopi-espresso)' : 'white',
                  borderColor: p.featured ? 'var(--inopi-espresso)' : 'var(--inopi-sand)',
                }}
              >
                <h3
                  className="font-display font-bold text-[16px] mb-0.5"
                  style={{ color: p.featured ? 'var(--inopi-ivory)' : 'var(--inopi-espresso)' }}
                >
                  {p.name}
                </h3>
                <p
                  className="font-body text-[12px] mb-4"
                  style={{ color: p.featured ? 'var(--inopi-sand)' : 'var(--inopi-taupe-strong)' }}
                >
                  {p.desc}
                </p>
                <div className="mb-5">
                  <span
                    className="font-display font-bold text-[26px] leading-none"
                    style={{ color: p.featured ? 'var(--inopi-gold)' : 'var(--inopi-orange)' }}
                  >
                    {p.price}
                  </span>
                  <p
                    className="font-body text-[12px] mt-1.5"
                    style={{ color: p.featured ? 'var(--inopi-sand)' : 'var(--inopi-taupe-strong)' }}
                  >
                    {p.note ? t('perYearNote', { note: p.note }) : t('perYear')}
                  </p>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {BENEFITS.filter((b) => b.tiers.includes(p.id)).map((b) => (
                    <li
                      key={b.label}
                      className="flex items-start gap-2 font-body text-[13px] leading-snug"
                      style={{ color: p.featured ? 'var(--inopi-sand)' : 'var(--inopi-taupe-strong)' }}
                    >
                      <IconCheck
                        size={15}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: p.featured ? 'var(--inopi-gold)' : 'var(--inopi-teal-strong)' }}
                      />
                      {b.label}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/keanggotaan/daftar"
                  className="block text-center px-4 py-2.5 text-[13px] font-semibold rounded-[8px] border transition-all hover:-translate-y-px"
                  style={
                    p.featured
                      ? { background: 'var(--inopi-gold)', color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-gold)' }
                      : { background: 'transparent', color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-espresso)' }
                  }
                >
                  {t('choose', { name: p.name })}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alur pendaftaran */}
      <section style={{ background: 'var(--inopi-sand)' }} className="py-14">
        <div className="container max-w-3xl">
          <h2
            className="font-display font-bold text-center mb-8"
            style={{ fontSize: 'clamp(20px,3vw,26px)', color: 'var(--inopi-espresso)' }}
          >
            {t('stepsTitle')}
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((st, i) => (
              <li
                key={st.title}
                className="rounded-[12px] p-5 border"
                style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}
              >
                <span className="font-display font-bold text-[28px] leading-none block mb-3" style={{ color: 'var(--inopi-orange)' }}>
                  {i + 1}
                </span>
                <h3 className="font-display font-semibold text-[15px] mb-1.5" style={{ color: 'var(--inopi-espresso)' }}>
                  {st.title}
                </h3>
                <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  {st.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Matriks manfaat */}
      <section className="py-14 bg-white">
        <div className="container max-w-3xl">
          <h2
            className="font-display font-bold text-center mb-2"
            style={{ fontSize: 'clamp(20px,3vw,26px)', color: 'var(--inopi-espresso)' }}
          >
            {t('comparisonTitle')}
          </h2>
          <p className="font-body text-[13px] text-center mb-8" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('comparisonIntro', { value: totalValue })}
          </p>

          <div className="overflow-x-auto rounded-[16px] border" style={{ borderColor: 'var(--inopi-sand)' }}>
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr style={{ background: 'var(--inopi-ivory)' }}>
                  <th
                    className="text-left font-body text-[12px] font-semibold uppercase tracking-wider px-5 py-3"
                    style={{ color: 'var(--inopi-taupe-strong)' }}
                  >
                    {t('benefitColumn')}
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      className="font-display text-[13px] font-bold px-4 py-3 w-[110px]"
                      style={{ color: 'var(--inopi-espresso)' }}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BENEFITS.map((b, i) => (
                  <tr key={b.label} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--inopi-sand)' }}>
                    <td
                      className="font-body text-[13px] px-5 py-3 leading-snug"
                      style={{ color: 'var(--inopi-espresso)' }}
                    >
                      {b.label}
                    </td>
                    {tierOrder.map((tier) => (
                      <td key={tier} className="px-4 py-3">
                        <span className="flex justify-center">
                          <TierMark included={b.tiers.includes(tier)} labels={markLabels} />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Daftar di lokasi */}
      <section style={{ background: 'var(--inopi-ivory)' }} className="py-14">
        <div className="container">
          <div
            className="relative overflow-hidden rounded-[16px] p-7 flex flex-col sm:flex-row sm:items-center gap-5"
            style={{ background: 'var(--inopi-espresso)' }}
          >
            <div className="inopi-dots absolute inset-y-0 right-0 hidden w-[280px] sm:block" aria-hidden />
            <div className="relative flex-1">
              <p
                className="font-body text-[11px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: 'var(--inopi-gold)' }}
              >
                {t('onsiteEyebrow')}
              </p>
              <h3 className="font-display font-bold text-[20px] mb-2" style={{ color: 'var(--inopi-ivory)' }}>
                {t('onsiteTitle')}
              </h3>
              <p className="font-body text-[14px] leading-relaxed" style={{ color: 'var(--inopi-sand)' }}>
                {t('onsiteBody', launch)}
              </p>
            </div>
            <Link
              href="/event/launching-2026"
              className="relative flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] font-semibold rounded-[8px] transition-all hover:-translate-y-px"
              style={{ background: 'var(--inopi-ivory)', color: 'var(--inopi-espresso)' }}
            >
              <IconCalendarEvent size={16} />
              {t('eventDetails')}
            </Link>
          </div>
        </div>
      </section>

      {/* Hak & kewajiban */}
      <section style={{ background: 'var(--inopi-sand)' }} className="py-14">
        <div className="container max-w-3xl">
          <h2
            className="font-display font-bold text-center mb-8"
            style={{ fontSize: 'clamp(20px,3vw,26px)', color: 'var(--inopi-espresso)' }}
          >
            {t('rightsTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: t('rights.title'), body: t('rights.body') },
              { title: t('duties.title'), body: t('duties.body') },
            ].map((b) => (
              <div key={b.title} className="rounded-[12px] p-5 bg-white border" style={{ borderColor: 'var(--inopi-sand)' }}>
                <h3 className="font-display font-semibold text-[15px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                  {b.title}
                </h3>
                <p className="font-body text-[13px] leading-relaxed first-letter:uppercase" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white">
        <div className="container max-w-2xl">
          <h2
            className="font-display font-bold text-center mb-8"
            style={{ fontSize: 'clamp(20px,3vw,26px)', color: 'var(--inopi-espresso)' }}
          >
            {t('faqTitle')}
          </h2>
          <Accordion className="space-y-2">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={i}
                className="rounded-[12px] border px-5"
                style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}
              >
                <AccordionTrigger
                  className="font-body font-medium text-[14px] text-left"
                  style={{ color: 'var(--inopi-espresso)' }}
                >
                  {f.q}
                </AccordionTrigger>
                <AccordionContent
                  className="font-body text-[13px] leading-relaxed pb-4"
                  style={{ color: 'var(--inopi-taupe-strong)' }}
                >
                  {t(`faqs.${i}.a`, launch)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  )
}
