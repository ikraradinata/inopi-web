import type { Metadata } from 'next'
import Link from 'next/link'
import { IconCheck, IconMinus, IconCalendarEvent } from '@tabler/icons-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PLANS, BENEFITS, TOTAL_BENEFIT_VALUE, type Tier } from '@/lib/constants/membership'
import { LAUNCH } from '@/lib/constants/launch'

export const metadata: Metadata = {
  title: 'Keanggotaan',
  description:
    'Kategori dan manfaat keanggotaan INOPI: Student Rp 250.000, Profesional Rp 500.000, dan Corporate Rp 5.000.000 per tahun.',
}

const faqs = [
  {
    q: 'Apa saja kategori keanggotaan INOPI?',
    a: 'Tersedia tiga kategori: Student untuk mahasiswa dan pelajar, Profesional untuk dosen dan praktisi, serta Corporate untuk perusahaan dan institusi dengan kuota tiga orang.',
  },
  {
    q: 'Apa itu Molen dan NEXT EDU?',
    a: 'Molen adalah monthly online learning event berskala nasional yang diadakan setiap bulan. NEXT EDU adalah annual gathering atau summit tahunan INOPI. Keduanya dapat diikuti seluruh kategori anggota.',
  },
  {
    q: 'Bagaimana cara mendaftar?',
    a: `Pendaftaran dapat dilakukan melalui formulir di situs ini, atau langsung di lokasi pada acara ${LAUNCH.eyebrow}, ${LAUNCH.dateLabel} di ${LAUNCH.venue}.`,
  },
  {
    q: 'Apa yang membedakan kategori Corporate?',
    a: 'Selain seluruh manfaat dasar, anggota Corporate memperoleh harga khusus layanan EdTech dari sesama anggota, konsultasi EdTech lab oleh PPOTD, serta annual industry outlook.',
  },
]

function TierMark({ included }: { included: boolean }) {
  return included ? (
    <IconCheck size={17} style={{ color: 'var(--inopi-teal-strong)' }} aria-label="Termasuk" />
  ) : (
    <IconMinus size={15} style={{ color: 'var(--inopi-sand)' }} aria-label="Tidak termasuk" />
  )
}

const tierOrder: Tier[] = ['student', 'professional', 'corporate']

export default function KeanggotaanPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-14 bg-white">
        <div className="container text-center max-w-2xl">
          <p className="inopi-eyebrow mb-4">Keanggotaan INOPI</p>
          <h1
            className="font-display font-bold mb-3"
            style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}
          >
            Bergabung dengan Ekosistem Inovasi
          </h1>
          <p className="font-body text-[14px] leading-relaxed mb-7" style={{ color: 'var(--inopi-taupe-strong)' }}>
            Jadilah bagian dari komunitas pendidik, praktisi, dan inovator pembelajaran Indonesia. Total nilai manfaat
            keanggotaan mencapai <strong style={{ color: 'var(--inopi-espresso)' }}>{TOTAL_BENEFIT_VALUE}</strong> per tahun.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/keanggotaan/daftar"
              className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
              style={{ background: 'var(--inopi-espresso)' }}
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center px-5 py-2.5 text-[14px] font-medium rounded-[8px] border transition-all hover:border-[var(--inopi-teal-strong)] hover:text-[var(--inopi-teal-strong)]"
              style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}
            >
              Hubungi Kami
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
            Kategori Keanggotaan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {PLANS.map((p) => (
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
                    per tahun{p.note ? ` · ${p.note}` : ''}
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
                  Pilih {p.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Matriks manfaat */}
      <section className="py-14 bg-white">
        <div className="container max-w-3xl">
          <h2
            className="font-display font-bold text-center mb-2"
            style={{ fontSize: 'clamp(20px,3vw,26px)', color: 'var(--inopi-espresso)' }}
          >
            Perbandingan Manfaat
          </h2>
          <p className="font-body text-[13px] text-center mb-8" style={{ color: 'var(--inopi-taupe-strong)' }}>
            Total nilai manfaat keanggotaan {TOTAL_BENEFIT_VALUE} per tahun.
          </p>

          <div className="overflow-x-auto rounded-[16px] border" style={{ borderColor: 'var(--inopi-sand)' }}>
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr style={{ background: 'var(--inopi-ivory)' }}>
                  <th
                    className="text-left font-body text-[12px] font-semibold uppercase tracking-wider px-5 py-3"
                    style={{ color: 'var(--inopi-taupe-strong)' }}
                  >
                    Manfaat
                  </th>
                  {PLANS.map((p) => (
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
                    {tierOrder.map((t) => (
                      <td key={t} className="px-4 py-3">
                        <span className="flex justify-center">
                          <TierMark included={b.tiers.includes(t)} />
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
                Pendaftaran di Lokasi
              </p>
              <h3 className="font-display font-bold text-[20px] mb-2" style={{ color: 'var(--inopi-ivory)' }}>
                Daftar langsung saat peluncuran
              </h3>
              <p className="font-body text-[14px] leading-relaxed" style={{ color: 'var(--inopi-sand)' }}>
                Meja pendaftaran keanggotaan tersedia di {LAUNCH.eyebrow}, {LAUNCH.dateLabel} di {LAUNCH.venue}.
              </p>
            </div>
            <Link
              href={LAUNCH.href}
              className="relative flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] font-semibold rounded-[8px] transition-all hover:-translate-y-px"
              style={{ background: 'var(--inopi-ivory)', color: 'var(--inopi-espresso)' }}
            >
              <IconCalendarEvent size={16} />
              Detail Acara
            </Link>
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
            Pertanyaan Umum
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
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  )
}
