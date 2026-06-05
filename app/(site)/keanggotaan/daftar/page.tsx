import type { Metadata } from 'next'
import MembershipForm from './MembershipForm'

export const metadata: Metadata = {
  title: 'Daftar Keanggotaan',
  description: 'Lengkapi formulir pendaftaran keanggotaan INOPI.',
}

export default function DaftarPage() {
  return (
    <div className="py-14">
      <div className="container max-w-xl">
        <h1 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(22px,4vw,32px)', color: '#071422' }}>
          Pendaftaran Keanggotaan
        </h1>
        <p className="font-body text-[14px] mb-8" style={{ color: '#4a6070' }}>
          Lengkapi formulir berikut untuk memulai proses pendaftaran keanggotaan INOPI.
        </p>
        <MembershipForm />
      </div>
    </div>
  )
}
