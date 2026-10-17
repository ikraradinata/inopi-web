import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Lewati /api, aset Next.js, tautan pendek /daftar (app/daftar/route.ts), dan berkas statis
  // (sitemap.xml, robots.txt, gambar, dll).
  matcher: '/((?!api|trpc|_next|_vercel|daftar$|.*\\..*).*)',
}
