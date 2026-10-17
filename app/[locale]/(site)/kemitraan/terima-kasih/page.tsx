import type { Metadata } from 'next'
import ThankYou from '@/components/sections/ThankYou'

export const metadata: Metadata = {
  title: { absolute: 'Terima Kasih — INOPI' },
  robots: { index: false },
}

export default function KemitraanTerimaKasihPage() {
  return (
    <ThankYou
      title="Terima kasih, pengajuan kemitraan Anda sudah kami terima."
      text="Divisi Kemitraan & Kerjasama akan menelaah pengajuan Anda dan menghubungi Anda melalui email."
      actions={[
        { label: 'Kembali ke Beranda', href: '/' },
        { label: 'Lihat Program', href: '/program' },
      ]}
    />
  )
}
