'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { IconMenu2, IconX } from '@tabler/icons-react'
import Logo from '@/components/ui/Logo'

const navLinks = [
  { label: 'Riset', href: '/riset' },
  { label: 'Program', href: '/program' },
  { label: 'Keanggotaan', href: '/keanggotaan' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Berita', href: '/berita' },
]

interface NavbarProps {
  transparent?: boolean
}

export default function Navbar({ transparent }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header
        className="sticky top-0 z-50 h-14 flex items-center"
        style={{
          background: transparent ? 'transparent' : 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #e0e8ef',
        }}
      >
        <div className="container flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="transition-transform hover:opacity-90 duration-200">
            <Logo light={transparent} />
          </Link>

          {/* Right Section (Nav Links + CTA) */}
          <div className="flex items-center gap-10">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const active = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-body text-[13px] font-medium transition-colors hover:text-[#0d9488]"
                    style={{
                      color: active ? '#0d9488' : '#4a6070',
                      borderBottom: active ? '2px solid #0d9488' : '2px solid transparent',
                      paddingBottom: '2px',
                    }}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/keanggotaan/daftar"
                className="hidden md:inline-flex items-center px-4 py-2 text-[13px] font-medium text-white rounded-[8px] transition-all hover:-translate-y-px"
                style={{ background: '#083344' }}
              >
                Join Membership
              </Link>
              <button
                className="md:hidden p-1.5 text-[#4a6070]"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <IconMenu2 size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 flex flex-col p-6 md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <button onClick={() => setOpen(false)} className="p-1 text-[#4a6070]">
                  <IconX size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-4 flex-1">
                {navLinks.map((link) => {
                  const active = pathname === link.href || pathname.startsWith(link.href + '/')
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-body text-[15px] font-medium py-1 border-b border-[#e0e8ef]"
                      style={{ color: active ? '#0d9488' : '#0d1e2e' }}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
              <Link
                href="/keanggotaan/daftar"
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-center px-4 py-3 text-[13px] font-medium text-white rounded-[8px]"
                style={{ background: '#083344' }}
              >
                Join Membership
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
