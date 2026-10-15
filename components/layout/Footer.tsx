'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { IconWorld, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    toast.success('Terima kasih telah berlangganan!')
    setEmail('')
  }

  return (
    <footer style={{ background: 'var(--inopi-espresso)' }} className="pt-14 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Col 1 */}
          <div className="lg:col-span-1" style={{ flex: '1.5' }}>
            <div className="mb-3">
              <Logo light={true} />
            </div>
            <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--inopi-sage-strong)' }}>
              Asosiasi Inovasi Pembelajaran Indonesia. Membangun ekosistem inovasi pembelajaran berbasis AI dan kolaborasi nasional.
            </p>
            <div className="flex gap-3">
              <a href="#" className="transition-colors hover:text-[var(--inopi-teal)]" style={{ color: 'var(--inopi-sage-strong)' }} aria-label="Website">
                <IconWorld size={18} />
              </a>
              <a href="#" className="transition-colors hover:text-[var(--inopi-teal)]" style={{ color: 'var(--inopi-sage-strong)' }} aria-label="LinkedIn">
                <IconBrandLinkedin size={18} />
              </a>
              <a href="#" className="transition-colors hover:text-[var(--inopi-teal)]" style={{ color: 'var(--inopi-sage-strong)' }} aria-label="Twitter">
                <IconBrandTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white text-[13px] font-semibold mb-4 font-display">Navigasi</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Research Portal', href: '/riset' },
                { label: 'Strategic Programs', href: '/program' },
                { label: 'Membership Benefits', href: '/keanggotaan' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] transition-colors hover:text-[var(--inopi-teal)]" style={{ color: 'var(--inopi-sage-strong)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white text-[13px] font-semibold mb-4 font-display">Informasi</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'News & Insights', href: '/berita' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Contact Support', href: '/kontak' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] transition-colors hover:text-[var(--inopi-teal)]" style={{ color: 'var(--inopi-sage-strong)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h4 className="text-white text-[13px] font-semibold mb-4 font-display">Newsletter</h4>
            <p className="text-[12px] mb-3" style={{ color: 'var(--inopi-sage-strong)' }}>
              Dapatkan kabar terbaru INOPI langsung di inbox Anda.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                placeholder="Email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-[13px] text-white placeholder-[var(--inopi-taupe-strong)] px-3 py-2 rounded-l-[8px] outline-none"
                style={{ background: 'var(--inopi-espresso)' }}
              />
              <button
                type="submit"
                className="px-4 py-2 text-[13px] font-medium text-white rounded-r-[8px] transition-colors hover:opacity-90"
                style={{ background: 'var(--inopi-teal-strong)' }}
              >
                Langganan
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6" style={{ borderTop: '1px solid var(--inopi-espresso)' }}>
          <p className="text-[12px] text-center" style={{ color: 'var(--inopi-taupe-strong)' }}>
            © {new Date().getFullYear()} INOPI, Advancing Academic Excellence through Technology.
          </p>
        </div>
      </div>
    </footer>
  )
}
