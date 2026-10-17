import type { Metadata } from 'next'
import Link from 'next/link'
import { IconCheck } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: { absolute: 'Terima Kasih — INOPI' },
  robots: { index: false },
}

export default function KemitraanTerimaKasihPage() {
  return (
    <div className="py-20">
      <div className="container max-w-xl text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: 'var(--inopi-sand)' }}
        >
          <IconCheck size={24} style={{ color: 'var(--inopi-teal-strong)' }} />
        </div>
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(22px,3.5vw,30px)', color: 'var(--inopi-espresso)' }}>
          Terima kasih, pengajuan kemitraan Anda sudah kami terima.
        </h1>
        <p className="font-body text-[14px] mb-8" style={{ color: 'var(--inopi-taupe-strong)' }}>
          Divisi Kemitraan &amp; Kerjasama akan menelaah pengajuan Anda dan menghubungi Anda melalui email.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
            style={{ background: 'var(--inopi-espresso)' }}
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/program"
            className="inline-flex items-center px-5 py-2.5 text-[14px] font-medium rounded-[8px] border transition-all hover:border-[var(--inopi-teal-strong)]"
            style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-taupe-strong)' }}
          >
            Lihat Program
          </Link>
        </div>
      </div>
    </div>
  )
}
