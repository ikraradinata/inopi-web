import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Kebijakan Privasi — INOPI' },
  description: 'Cara INOPI mengumpulkan, menggunakan, dan melindungi data pribadi pengguna website.',
}

// DRAF dari docs/02_KONTEN_BARU_P0.md bagian L, disusun mengikuti prinsip UU
// No. 27 Tahun 2022 (PDP). Wajib ditinjau pengurus/penasihat hukum sebelum
// tayang. Tanggal berlaku dan periode penyimpanan data belum diputuskan,
// sehingga belum dicantumkan.
const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: '1. Siapa kami',
    body: 'Website ini dikelola oleh Perkumpulan Asosiasi Inovasi Pembelajaran Indonesia (INOPI). INOPI bertanggung jawab atas data pribadi yang dikumpulkan melalui website ini.',
  },
  {
    title: '2. Data yang kami kumpulkan',
    body: (
      <>
        <p className="mb-3">Kami hanya mengumpulkan data yang Anda berikan secara langsung melalui formulir:</p>
        <ul className="list-disc pl-5 space-y-1.5 mb-3">
          <li>Formulir keanggotaan: nama, email, nomor WhatsApp, institusi, jabatan, bidang minat, dan kategori keanggotaan.</li>
          <li>Formulir kemitraan: nama, email, nomor telepon (opsional), organisasi, dan informasi kolaborasi.</li>
          <li>Formulir kontak: nama, email, topik, dan isi pesan.</li>
        </ul>
        <p>
          Kami juga dapat mengumpulkan data penggunaan website secara anonim (misalnya halaman yang dikunjungi) untuk
          memahami cara website digunakan. Data ini tidak dipakai untuk mengenali Anda secara pribadi.
        </p>
      </>
    ),
  },
  {
    title: '3. Tujuan penggunaan data',
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Memproses pendaftaran keanggotaan dan iuran.</li>
        <li>Menindaklanjuti pengajuan kemitraan dan pertanyaan.</li>
        <li>Mengirim informasi kegiatan INOPI, hanya jika Anda menyetujuinya.</li>
        <li>Meningkatkan kualitas website dan layanan.</li>
      </ul>
    ),
  },
  {
    title: '4. Siapa yang dapat mengakses data',
    body: 'Data hanya diakses oleh pengurus INOPI yang bertugas menangani permintaan terkait. Kami tidak menjual data pribadi Anda. Kami dapat menggunakan penyedia layanan teknologi (misalnya layanan email dan hosting) yang terikat kewajiban menjaga kerahasiaan data.',
  },
  {
    title: '5. Penyimpanan dan keamanan',
    body: 'Data disimpan dengan akses terbatas dan perlindungan teknis yang wajar, selama diperlukan untuk tujuan di atas.',
  },
  {
    title: '6. Hak Anda',
    body: 'Anda berhak meminta akses, perbaikan, atau penghapusan data pribadi Anda, serta menarik persetujuan menerima informasi kegiatan kapan saja.',
  },
  {
    title: '7. Hubungi kami',
    body: 'Permintaan terkait data pribadi dapat dikirim ke asosiasi.inopi@gmail.com dengan subjek "Data Pribadi".',
  },
  {
    title: '8. Perubahan kebijakan',
    body: 'Kebijakan ini dapat diperbarui. Versi terbaru selalu tersedia di halaman ini.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="py-14">
      <div className="container max-w-3xl">
        <h1 className="font-display font-bold mb-8" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          Kebijakan Privasi INOPI
        </h1>
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display font-semibold text-[17px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                {s.title}
              </h2>
              <div className="font-body text-[14px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                {typeof s.body === 'string' ? <p>{s.body}</p> : s.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
