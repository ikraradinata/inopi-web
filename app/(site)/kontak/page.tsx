import type { Metadata } from 'next'
import ContactForm from './ContactForm'
import { IconMapPin, IconMail, IconPhone, IconClock } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi tim INOPI untuk pertanyaan dan kolaborasi.',
}

export default function KontakPage() {
  return (
    <div className="py-14">
      <div className="container">
        <h1 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(24px,4vw,36px)', color: '#071422' }}>
          Hubungi Kami
        </h1>
        <p className="font-body text-[14px] mb-10" style={{ color: '#4a6070' }}>
          Tim INOPI siap membantu Anda. Isi formulir di bawah dan kami akan merespons dalam 1×24 jam.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <div className="space-y-5">
              {[
                { icon: IconMapPin, label: 'Alamat', value: 'Jakarta Innovation District, Level 14 (placeholder)' },
                { icon: IconMail, label: 'Email', value: 'info@inopi.id' },
                { icon: IconPhone, label: 'Telepon', value: '+62 21 555 1234 (placeholder)' },
                { icon: IconClock, label: 'Jam Operasional', value: 'Senin–Jumat 09:00–17:00 WIB' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ background: '#e0f7f5' }}>
                      <Icon size={18} style={{ color: '#0d9488' }} />
                    </div>
                    <div>
                      <p className="font-body text-[12px] font-medium mb-0.5" style={{ color: '#8fa5b5' }}>{item.label}</p>
                      <p className="font-body text-[14px]" style={{ color: '#071422' }}>{item.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
