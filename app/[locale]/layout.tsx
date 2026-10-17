import type { Metadata } from 'next'
import { Barlow_Semi_Condensed, Barlow } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import '../globals.css'
import { routing } from '@/i18n/routing'
import { CLIENT_NAMESPACES } from '@/i18n/clientNamespaces'
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.site' })
  return {
    metadataBase: new URL('https://www.inopi.id'),
    title: { default: t('title'), template: '%s | INOPI' },
    description: t('description'),
    keywords: t.raw('keywords') as string[],
    openGraph: { type: 'website', locale: 'id_ID', url: 'https://www.inopi.id', siteName: 'INOPI' },
    twitter: { card: 'summary_large_image', creator: '@inopi_id' },
    robots: { index: true, follow: true },
  }
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
  const allMessages = await getMessages()
  const clientMessages = Object.fromEntries(
    CLIENT_NAMESPACES.filter((ns) => ns in allMessages).map((ns) => [ns, allMessages[ns as keyof typeof allMessages]]),
  )

  return (
    <html lang={locale} className={`${barlowSemiCondensed.variable} ${barlow.variable}`}>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider messages={clientMessages}>
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
