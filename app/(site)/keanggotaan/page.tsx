import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IconNetwork, IconCertificate, IconBook, IconStar, IconCalendar, IconChartBar,
} from '@tabler/icons-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'Keanggotaan',
  description: 'Jadilah bagian dari ekosistem inovasi pembelajaran Indonesia bersama INOPI.',
}

const benefits = [
  { icon: IconNetwork, title: 'Global Networking', desc: 'Terhubung dengan ribuan akademisi, peneliti, dan inovator dari seluruh Indonesia dan dunia.' },
  { icon: IconCertificate, title: 'Sertifikasi Eksklusif', desc: 'Dapatkan sertifikat profesional yang diakui secara nasional dari INOPI.' },
  { icon: IconBook, title: 'Akses Riset', desc: 'Nikmati akses penuh ke portal riset dan e-library premium INOPI.' },
  { icon: IconStar, title: 'Inkubasi Startup', desc: 'Dapatkan pendampingan dan mentoring untuk startup edtech Anda.' },
  { icon: IconCalendar, title: 'Undangan Event', desc: 'Prioritas undangan ke semua forum, konferensi, dan workshop nasional INOPI.' },
  { icon: IconChartBar, title: 'Analisis Pasar', desc: 'Laporan dan analisis tren industri pendidikan terkini secara eksklusif.' },
]

const plans = [
  {
    name: 'Individu',
    desc: 'Untuk peneliti, dosen, dan pelajar',
    price: 'Rp 500k',
    period: '/tahun',
    features: ['Akses Portal Riset', 'Sertifikasi Digital', 'E-Library Premium'],
    cta: 'Pilih Paket',
    featured: false,
  },
  {
    name: 'Institusi',
    desc: 'Untuk universitas dan lab riset.',
    price: 'Rp 5.5jt',
    period: '/tahun',
    badge: 'PALING POPULER',
    features: ['Semua Benefit Individu', 'Lisensi untuk 50 Orang', 'Priority Project Matching', 'Sponsor di Jurnal INOPI'],
    cta: 'Pilih Paket',
    featured: true,
  },
  {
    name: 'Korporat',
    desc: 'Untuk perusahaan skala besar.',
    price: 'Hubungi Kami',
    period: 'Custom pricing',
    features: ['Custom Partnership', 'Akses Talenta Global', 'Konsultasi Inovasi Dikaitif'],
    cta: 'Kontak Sales',
    featured: false,
  },
]

const faqs = [
  { q: 'Berapa lama masa aktif keanggotaan?', a: 'Keanggotaan INOPI aktif selama 1 tahun sejak tanggal aktivasi dan dapat diperpanjang.' },
  { q: 'Apakah saya bisa mengubah kategori membership di tengah jalan?', a: 'Ya, upgrade kategori dapat dilakukan kapan saja dengan membayar selisih biaya keanggotaan.' },
  { q: 'Bagaimana cara mendapatkan sertifikat INOPI?', a: 'Sertifikat diterbitkan setelah menyelesaikan program pelatihan yang diakui INOPI dan memenuhi syarat kehadiran minimal 80%.' },
  { q: 'Apakah ada uji coba gratis sebelum mendaftar?', a: 'Ya, tersedia akses trial 30 hari untuk kategori Individu dan Institusi.' },
  { q: 'Bagaimana cara membayar iuran keanggotaan?', a: 'Pembayaran dapat dilakukan melalui transfer bank atau payment gateway yang tersedia di halaman pendaftaran.' },
]

export default function KeanggotaanPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-14 bg-white">
        <div className="container text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal)' }}>
            Keanggotaan INOPI
          </div>
          <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
            Bergabung dengan Ekosistem Inovasi
          </h1>
          <p className="font-body text-[14px] leading-relaxed mb-7" style={{ color: 'var(--inopi-taupe-strong)' }}>
            Jadilah bagian dari komunitas pendidik dan inovator terdepan Indonesia. Akses sumber daya, jaringan, dan program eksklusif INOPI.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/keanggotaan/daftar"
              className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
              style={{ background: 'var(--inopi-espresso)' }}>
              Daftar Sekarang
            </Link>
            <Link href="/kontak"
              className="inline-flex items-center px-5 py-2.5 text-[14px] font-medium rounded-[8px] border transition-all hover:border-[var(--inopi-teal-strong)] hover:text-[var(--inopi-teal-strong)]"
              style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}>
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ background: 'var(--inopi-ivory)' }} className="py-14">
        <div className="container">
          <h2 className="font-display font-bold text-center mb-8" style={{ fontSize: 'clamp(20px,3vw,26px)', color: 'var(--inopi-espresso)' }}>
            Manfaat Keanggotaan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => {
              const Icon = b.icon
              return (
                <div key={b.title} className="bg-white rounded-[12px] p-5 border" style={{ borderColor: 'var(--inopi-sand)' }}>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-[8px] mb-3" style={{ background: 'var(--inopi-sand)' }}>
                    <Icon size={20} style={{ color: 'var(--inopi-teal-strong)' }} />
                  </div>
                  <h3 className="font-display font-semibold text-[14px] mb-1.5" style={{ color: 'var(--inopi-espresso)' }}>{b.title}</h3>
                  <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>{b.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-14 bg-white">
        <div className="container">
          <h2 className="font-display font-bold text-center mb-8" style={{ fontSize: 'clamp(20px,3vw,26px)', color: 'var(--inopi-espresso)' }}>
            Pilih Paket Keanggotaan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {plans.map((p) => (
              <div
                key={p.name}
                className="rounded-[12px] p-6 border relative flex flex-col"
                style={{
                  background: p.featured ? 'var(--inopi-espresso)' : 'var(--inopi-ivory)',
                  borderColor: p.featured ? 'var(--inopi-espresso)' : 'var(--inopi-sand)',
                }}
              >
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full text-white"
                      style={{ background: 'var(--inopi-teal-strong)' }}>
                      {p.badge}
                    </span>
                  </div>
                )}
                <h3 className="font-display font-bold text-[16px] mb-0.5" style={{ color: p.featured ? 'var(--inopi-ivory)' : 'var(--inopi-espresso)' }}>
                  {p.name}
                </h3>
                <p className="font-body text-[12px] mb-4" style={{ color: p.featured ? 'var(--inopi-sage-strong)' : 'var(--inopi-taupe-strong)' }}>
                  {p.desc}
                </p>
                <div className="mb-5">
                  <span className="font-display font-bold text-[24px]" style={{ color: p.featured ? 'var(--inopi-teal)' : 'var(--inopi-espresso)' }}>
                    {p.price}
                  </span>
                  <span className="font-body text-[12px] ml-1" style={{ color: p.featured ? 'var(--inopi-sage-strong)' : 'var(--inopi-taupe-strong)' }}>
                    {p.period}
                  </span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 font-body text-[13px]"
                      style={{ color: p.featured ? 'var(--inopi-sage-strong)' : 'var(--inopi-taupe-strong)' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--inopi-teal-strong)' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/keanggotaan/daftar"
                  className="block text-center px-4 py-2.5 text-[13px] font-semibold rounded-[8px] border transition-all hover:-translate-y-px"
                  style={p.featured
                    ? { background: 'var(--inopi-teal-strong)', color: 'var(--inopi-ivory)', borderColor: 'var(--inopi-teal-strong)' }
                    : { background: 'transparent', color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--inopi-ivory)' }} className="py-14">
        <div className="container max-w-2xl">
          <h2 className="font-display font-bold text-center mb-8" style={{ fontSize: 'clamp(20px,3vw,26px)', color: 'var(--inopi-espresso)' }}>
            Pertanyaan Umum
          </h2>
          <Accordion className="space-y-2">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={i} className="bg-white rounded-[12px] border px-5" style={{ borderColor: 'var(--inopi-sand)' }}>
                <AccordionTrigger className="font-body font-medium text-[14px] text-left" style={{ color: 'var(--inopi-espresso)' }}>
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-[13px] leading-relaxed pb-4" style={{ color: 'var(--inopi-taupe-strong)' }}>
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
