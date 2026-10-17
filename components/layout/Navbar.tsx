'use client'

import { useEffect, useRef, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { IconChevronDown, IconMenu2, IconX } from '@tabler/icons-react'
import Logo from '@/components/ui/Logo'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'
import type { AppPathname } from '@/i18n/routing'

interface NavItem {
  /** Kunci di namespace "Nav". */
  label: string
  href: AppPathname
  children?: { label: string; href: AppPathname }[]
}

const navLinks: NavItem[] = [
  { label: 'about', href: '/tentang' },
  { label: 'programs', href: '/program' },
  { label: 'partnerships', href: '/kemitraan' },
  {
    label: 'insights',
    href: '/riset',
    children: [
      { label: 'research', href: '/riset' },
      { label: 'news', href: '/berita' },
    ],
  },
  { label: 'events', href: '/acara' },
]

const isActive = (pathname: string, item: NavItem) =>
  [item, ...(item.children ?? [])].some(
    (l) => pathname === l.href || pathname.startsWith(l.href + '/'),
  )

const navLinkClass =
  'inline-flex items-center gap-1 font-body text-[13px] font-medium leading-none transition-colors hover:text-[var(--inopi-teal-strong)]'

/**
 * Menu desktop dengan submenu. Terbuka saat kursor masuk atau fokus keyboard,
 * menutup dengan jeda singkat (agar tidak berkedip saat kursor melintas celah),
 * dan menutup dengan Escape. Pemicu tetap tautan biasa ke halaman induk.
 */
function NavDropdown({
  item,
  pathname,
  t,
}: {
  item: NavItem
  pathname: string
  t: (key: string) => string
}) {
  // Disimpan bersama pathname: berpindah halaman otomatis menutup menu tanpa efek tambahan.
  const [openAt, setOpenAt] = useState<string | null>(null)
  const open = openAt === pathname
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const active = isActive(pathname, item)

  const show = () => {
    clearTimeout(timer.current)
    setOpenAt(pathname)
  }
  const hide = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpenAt(null), 140)
  }
  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hide()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          clearTimeout(timer.current)
          setOpenAt(null)
        }
      }}
    >
      <Link
        href={item.href}
        className={navLinkClass}
        aria-haspopup="menu"
        aria-expanded={open}
        style={{
          color: active ? 'var(--inopi-teal-strong)' : 'var(--inopi-taupe-strong)',
          borderBottom: active ? '2px solid var(--inopi-teal-strong)' : '2px solid transparent',
          paddingBottom: '2px',
        }}
      >
        {t(item.label)}
        <IconChevronDown
          size={13}
          aria-hidden
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </Link>

      {/* pt-3 menjembatani celah antara pemicu dan panel agar hover tidak terputus */}
      <div
        role="menu"
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-150 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="min-w-[200px] rounded-[10px] border bg-white p-1.5 shadow-lg"
          style={{ borderColor: 'var(--inopi-sand)' }}
        >
          {item.children!.map((c) => {
            const childActive = pathname === c.href || pathname.startsWith(c.href + '/')
            return (
              <Link
                key={c.href}
                href={c.href}
                role="menuitem"
                tabIndex={open ? 0 : -1}
                aria-current={childActive ? 'page' : undefined}
                className="block rounded-[6px] px-3.5 py-2 font-body text-[13px] transition-colors hover:bg-[var(--inopi-ivory)] hover:text-[var(--inopi-teal-strong)] focus-visible:bg-[var(--inopi-ivory)] focus-visible:outline-none"
                style={{
                  color: childActive ? 'var(--inopi-teal-strong)' : 'var(--inopi-espresso)',
                  fontWeight: childActive ? 600 : 400,
                }}
              >
                {t(c.label)}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

interface NavbarProps {
  transparent?: boolean
}

export default function Navbar({ transparent }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('Nav')

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
              {navLinks.map((link) =>
                link.children ? (
                  <NavDropdown key={link.label} item={link} pathname={pathname} t={t} />
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={navLinkClass}
                    style={{
                      color: isActive(pathname, link) ? 'var(--inopi-teal-strong)' : 'var(--inopi-taupe-strong)',
                      borderBottom: isActive(pathname, link)
                        ? '2px solid var(--inopi-teal-strong)'
                        : '2px solid transparent',
                      paddingBottom: '2px',
                    }}
                  >
                    {t(link.label)}
                  </Link>
                ),
              )}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher className="hidden md:flex mr-1" />
              <Link
                href="/keanggotaan/daftar"
                className="hidden md:inline-flex items-center px-4 py-2 text-[13px] font-medium text-white rounded-[8px] transition-all hover:-translate-y-px"
                style={{ background: 'var(--inopi-espresso)' }}
              >
                {t('join')}
              </Link>
              <button
                className="md:hidden p-1.5 text-[var(--inopi-taupe-strong)]"
                onClick={() => setOpen(true)}
                aria-label={t('openMenu')}
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
                <button onClick={() => setOpen(false)} className="p-1 text-[var(--inopi-taupe-strong)]" aria-label={t('closeMenu')}>
                  <IconX size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-4 flex-1">
                {navLinks.map((link) => {
                  const active = isActive(pathname, link)
                  const items = link.children ?? [link]
                  return (
                    <div key={t(link.label)} className="border-b border-[var(--inopi-sand)]">
                      {link.children ? (
                        <p
                          className="font-body text-[15px] font-medium py-1"
                          style={{ color: active ? 'var(--inopi-teal-strong)' : 'var(--inopi-espresso)' }}
                        >
                          {t(link.label)}
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
                          {t(c.label)}
                        </Link>
                      ))}
                    </div>
                  )
                })}
              </nav>
              <LanguageSwitcher className="mt-4 justify-center" />
              <Link
                href="/keanggotaan/daftar"
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-center px-4 py-3 text-[13px] font-medium text-white rounded-[8px]"
                style={{ background: 'var(--inopi-espresso)' }}
              >
                {t('join')}
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
