import type { Metadata } from 'next'
import { Barlow_Semi_Condensed, Barlow } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import '../globals.css'
import { routing } from '@/i18n/routing'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/sonner'

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-barlow-semi',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.inopi.id'),
  title: { default: 'INOPI — Asosiasi Inovasi Pembelajaran Indonesia', template: '%s | INOPI' },
  description: 'Membangun ekosistem inovasi pembelajaran berbasis AI dan kolaborasi nasional untuk mencetak generasi unggul di era Industri 5.0.',
  keywords: ['INOPI', 'inovasi pembelajaran', 'edtech indonesia', 'asosiasi pendidikan'],
  openGraph: { type: 'website', locale: 'id_ID', url: 'https://www.inopi.id', siteName: 'INOPI' },
  twitter: { card: 'summary_large_image', creator: '@inopi_id' },
  robots: { index: true, follow: true },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <html lang={locale} className={`${barlowSemiCondensed.variable} ${barlow.variable}`}>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
