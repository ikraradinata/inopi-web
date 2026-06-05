import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Berita & Artikel',
  description: 'Berita terkini dan artikel opini seputar inovasi pembelajaran Indonesia.',
}

const articles = [
  { id: 1, category: 'Berita INOPI', title: 'INOPI Resmi Didirikan oleh 26 Tokoh Pendidikan Indonesia', date: '11 Apr 2026', excerpt: 'Pada 11 April 2026, sebanyak 26 tokoh terkemuka dari dunia akademik, industri, dan komunitas profesional resmi mendirikan INOPI.' },
  { id: 2, category: 'Artikel Opini', title: 'AI dalam Pendidikan: Peluang dan Tantangan di Era Industri 5.0', date: '15 Apr 2026', excerpt: 'Integrasi kecerdasan buatan dalam sistem pendidikan membuka peluang transformatif sekaligus menghadirkan tantangan yang perlu diantisipasi.' },
  { id: 3, category: 'Research Digest', title: 'Tren Adaptive Learning di Asia Tenggara 2025–2026', date: '20 Apr 2026', excerpt: 'Laporan terbaru menunjukkan adopsi sistem pembelajaran adaptif meningkat 47% di kawasan Asia Tenggara dalam dua tahun terakhir.' },
]

const categoryColors: Record<string, string> = {
  'Berita INOPI': '#0d9488',
  'Artikel Opini': '#0b7b8a',
  'Research Digest': '#083344',
  'Press Release': '#4a6070',
}

export default function BeritaPage() {
  return (
    <div className="py-14">
      <div className="container">
        <h1 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(24px,4vw,36px)', color: '#071422' }}>
          Berita & Artikel
        </h1>
        <p className="font-body text-[14px] mb-10" style={{ color: '#4a6070' }}>
          Kabar terbaru, artikel opini, dan publikasi dari ekosistem INOPI.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a) => (
            <div key={a.id} className="bg-white rounded-[12px] border overflow-hidden hover:border-[#0d9488] hover:shadow-hover transition-all" style={{ borderColor: '#e0e8ef' }}>
              {/* Image placeholder */}
              <div className="h-36" style={{ background: '#eef2f7' }} />
              <div className="p-4">
                <span
                  className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full mb-2 text-white"
                  style={{ background: categoryColors[a.category] ?? '#4a6070' }}
                >
                  {a.category}
                </span>
                <h2 className="font-display font-semibold text-[14px] leading-snug mb-2 line-clamp-2" style={{ color: '#071422' }}>
                  {a.title}
                </h2>
                <p className="font-body text-[12px] leading-relaxed line-clamp-3 mb-3" style={{ color: '#4a6070' }}>
                  {a.excerpt}
                </p>
                <p className="font-body text-[11px]" style={{ color: '#8fa5b5' }}>{a.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
