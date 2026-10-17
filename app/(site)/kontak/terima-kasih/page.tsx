import type { Metadata } from 'next'
import ThankYou from '@/components/sections/ThankYou'

export const metadata: Metadata = {
  title: { absolute: 'Terima Kasih — INOPI' },
  robots: { index: false },
}

export default function KontakTerimaKasihPage() {
  return (
    <ThankYou
      title="Pesan Anda sudah terkirim."
      text="Terima kasih telah menghubungi INOPI. Kami akan membalas melalui email."
      actions={[{ label: 'Kembali ke Beranda', href: '/' }]}
    />
  )
}
