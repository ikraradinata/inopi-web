import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Riset & Publikasi',
  description: 'Database publikasi dan hasil riset INOPI.',
}

// Tautan PDF Insight Brief. Isi (mis. '/publikasi/insight-brief-01.pdf')
// setelah berkas ada dan ketiga founder yang disebut di dalamnya setuju.
const INSIGHT_BRIEF_PDF: string | null = null

export default function RisetPage() {
  return (
    <div className="py-14">
      <div className="container max-w-3xl">
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          Riset & Publikasi
        </h1>
        <p className="font-body text-[14px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
          Portal riset dan database publikasi INOPI akan segera tersedia. Konten akan dikelola melalui Sanity CMS.
        </p>

        <section className="mt-10">
          <h2 className="font-display font-bold text-[18px] mb-4" style={{ color: 'var(--inopi-espresso)' }}>
            Publikasi
          </h2>
          <article className="rounded-[12px] p-6 border bg-white" style={{ borderColor: 'var(--inopi-sand)' }}>
            <p className="font-body text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--inopi-teal-strong)' }}>
              INOPI Insight Brief No. 01
            </p>
            <h3 className="font-display font-bold text-[18px] leading-snug mb-2" style={{ color: 'var(--inopi-espresso)' }}>
              Peta Kompetensi 26 Founder INOPI: Modal SDM di Balik Ekosistem Inovasi Pembelajaran Indonesia
            </h3>
            <p className="font-body text-[12px] mb-3" style={{ color: 'var(--inopi-taupe-strong)' }}>
              Divisi Riset &amp; Inovasi · Juli 2026
            </p>
            <p className="font-body text-[14px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
              Survei terhadap seluruh 26 founder (19–27 Juni 2026) menunjukkan rata-rata pengalaman profesional 22,8
              tahun, 69% telah menjalankan program pelatihan, dan lebih dari sepuluh memiliki keahlian langsung di
              bidang AI.
            </p>
            {INSIGHT_BRIEF_PDF && (
              <a
                href={INSIGHT_BRIEF_PDF}
                className="inline-flex items-center mt-5 px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
                style={{ background: 'var(--inopi-espresso)' }}
              >
                Unduh PDF
              </a>
            )}
          </article>
        </section>
      </div>
    </div>
  )
}
