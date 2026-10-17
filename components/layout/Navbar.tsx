'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { IconMenu2, IconX } from '@tabler/icons-react'
import Logo from '@/components/ui/Logo'

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const navLinks: NavItem[] = [
  { label: 'Tentang', href: '/tentang' },
  { label: 'Program', href: '/program' },
  { label: 'Kemitraan', href: '/kemitraan' },
  {
    label: 'Wawasan',
    href: '/riset',
    children: [
      { label: 'Riset & Publikasi', href: '/riset' },
      { label: 'Berita & Artikel', href: '/berita' },
    ],
  },
  { label: 'Acara', href: '/acara' },
]

const isActive = (pathname: string, item: NavItem) =>
  [item, ...(item.children ?? [])].some(
    (l) => pathname === l.href || pathname.startsWith(l.href + '/'),
  )

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
          borderBottom: '1px solid var(--inopi-sand)',
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
                const active = isActive(pathname, link)
                const linkClass =
                  'font-body text-[13px] font-medium transition-colors hover:text-[var(--inopi-teal-strong)]'
                const linkStyle = {
                  color: active ? 'var(--inopi-teal-strong)' : 'var(--inopi-taupe-strong)',
                  borderBottom: active ? '2px solid var(--inopi-teal-strong)' : '2px solid transparent',
                  paddingBottom: '2px',
                }
                if (!link.children) {
                  return (
                    <Link key={link.href} href={link.href} className={linkClass} style={linkStyle}>
                      {link.label}
                    </Link>
                  )
                }
                return (
                  <div key={link.label} className="relative group">
                    <Link href={link.href} className={linkClass} style={linkStyle}>
                      {link.label}
                    </Link>
                    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 hidden group-hover:block group-focus-within:block">
                      <div
                        className="min-w-[180px] rounded-[8px] border bg-white py-1.5 shadow-sm"
                        style={{ borderColor: 'var(--inopi-sand)' }}
                      >
                        {link.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="block px-4 py-2 font-body text-[13px] hover:bg-[var(--inopi-ivory)] hover:text-[var(--inopi-teal-strong)]"
                            style={{ color: 'var(--inopi-espresso)' }}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/keanggotaan/daftar"
                className="hidden md:inline-flex items-center px-4 py-2 text-[13px] font-medium text-white rounded-[8px] transition-all hover:-translate-y-px"
                style={{ background: 'var(--inopi-espresso)' }}
              >
                Gabung INOPI
              </Link>
              <button
                className="md:hidden p-1.5 text-[var(--inopi-taupe-strong)]"
                onClick={() => setOpen(true)}
                aria-label="Buka menu"
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
                <button onClick={() => setOpen(false)} className="p-1 text-[var(--inopi-taupe-strong)]" aria-label="Tutup menu">
                  <IconX size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-4 flex-1">
                {navLinks.map((link) => {
                  const active = isActive(pathname, link)
                  const items = link.children ?? [link]
                  return (
                    <div key={link.label} className="border-b border-[var(--inopi-sand)]">
                      {link.children ? (
                        <p
                          className="font-body text-[15px] font-medium py-1"
                          style={{ color: active ? 'var(--inopi-teal-strong)' : 'var(--inopi-espresso)' }}
                        >
                          {link.label}
                        </p>
                      ) : null}
                      {items.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className={
                            link.children
                              ? 'block font-body text-[14px] py-1.5 pl-3'
                              : 'block font-body text-[15px] font-medium py-1'
                          }
                          style={{
                            color:
                              !link.children && active
                                ? 'var(--inopi-teal-strong)'
                                : link.children
                                  ? 'var(--inopi-taupe-strong)'
                                  : 'var(--inopi-espresso)',
                          }}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )
                })}
              </nav>
              <Link
                href="/keanggotaan/daftar"
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-center px-4 py-3 text-[13px] font-medium text-white rounded-[8px]"
                style={{ background: 'var(--inopi-espresso)' }}
              >
                Gabung INOPI
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
