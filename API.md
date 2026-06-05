# API & CMS SCHEMA — INOPI Website

> Referensi untuk API routes Next.js dan schema Sanity CMS.

---

## Sanity CMS Schemas

### `schemas/berita.ts`
```typescript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'berita',
  title: 'Berita & Artikel',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Judul', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'publishedAt', title: 'Tanggal Publikasi', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'category', title: 'Kategori', type: 'string', options: { list: [
      { title: 'Berita INOPI', value: 'berita' },
      { title: 'Artikel Opini', value: 'opini' },
      { title: 'Press Release', value: 'press-release' },
      { title: 'Research Digest', value: 'research' },
    ]}},
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Gambar Cover', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'author', title: 'Penulis', type: 'string' }),
    defineField({ name: 'content', title: 'Konten', type: 'array', of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true } },
    ]}),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, group: 'seo' }),
  ],
  groups: [
    { name: 'seo', title: 'SEO', icon: () => '🔍' },
  ],
  preview: {
    select: { title: 'title', media: 'image', date: 'publishedAt' },
    prepare({ title, media, date }) {
      return { title, media, subtitle: date ? new Date(date).toLocaleDateString('id-ID') : 'Draft' }
    }
  }
})
```

### `schemas/event.ts`
```typescript
export default defineType({
  name: 'event',
  title: 'Event & Kegiatan',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'type', type: 'string', options: { list: [
      'conference', 'webinar', 'workshop', 'networking', 'seminar'
    ]}},
    defineField({ name: 'date', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'endDate', type: 'datetime' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'isOnline', type: 'boolean', initialValue: false }),
    defineField({ name: 'price', type: 'number', description: '0 = Gratis' }),
    defineField({ name: 'registrationLink', type: 'url' }),
    defineField({ name: 'registrationDeadline', type: 'datetime' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'speakers', type: 'array', of: [{ type: 'object', fields: [
      { name: 'name', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'photo', type: 'image' },
    ]}]}),
  ],
})
```

### `schemas/publikasi.ts`
```typescript
export default defineType({
  name: 'publikasi',
  title: 'Riset & Publikasi',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'authors', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'year', type: 'number', validation: r => r.required().min(2020).max(2035) }),
    defineField({ name: 'category', type: 'string', options: { list: [
      'ai-education', 'adaptive-learning', 'smart-classroom',
      'policy-brief', 'white-paper', 'journal', 'proceedings'
    ]}},
    defineField({ name: 'abstract', type: 'text', rows: 5 }),
    defineField({ name: 'doi', type: 'string' }),
    defineField({ name: 'fileUrl', type: 'url', title: 'PDF URL' }),
    defineField({ name: 'keywords', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'journal', type: 'string' }),
    defineField({ name: 'volume', type: 'string' }),
    defineField({ name: 'pages', type: 'string' }),
  ],
})
```

### `schemas/founder.ts`
```typescript
export default defineType({
  name: 'founder',
  title: 'Founders INOPI',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'role', type: 'string', title: 'Jabatan di INOPI' }),
    defineField({ name: 'institution', type: 'string', title: 'Institusi/Afiliasi' }),
    defineField({ name: 'bio', type: 'text', rows: 4 }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'linkedIn', type: 'url' }),
    defineField({ name: 'order', type: 'number', title: 'Urutan tampil' }),
  ],
  orderings: [{ title: 'Urutan', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
```

---

## GROQ Queries — `lib/sanity/queries.ts`

```typescript
// Homepage: Latest 3 berita
export const HOME_BERITA = `
  *[_type == "berita"] | order(publishedAt desc) [0...3] {
    _id, title, slug, publishedAt, excerpt, category,
    "imageUrl": image.asset->url
  }
`

// Homepage: Upcoming 2 events
export const HOME_EVENTS = `
  *[_type == "event" && date >= now()] | order(date asc) [0...2] {
    _id, title, slug, date, time, location, isOnline, type, price
  }
`

// Berita listing (paginated)
export const BERITA_LIST = `
  *[_type == "berita" && ($category == "semua" || category == $category)]
  | order(publishedAt desc) [$start...$end] {
    _id, title, slug, publishedAt, excerpt, category,
    "imageUrl": image.asset->url, author
  }
`

// Berita detail
export const BERITA_DETAIL = `
  *[_type == "berita" && slug.current == $slug][0] {
    ...,
    "imageUrl": image.asset->url
  }
`

// Event listing
export const EVENT_LIST = `
  *[_type == "event" && ($type == "semua" || type == $type)]
  | order(date asc) {
    _id, title, slug, date, location, isOnline, type, price,
    "imageUrl": image.asset->url
  }
`

// Publikasi
export const PUBLIKASI_LIST = `
  *[_type == "publikasi" && ($category == "semua" || category == $category)]
  | order(year desc) {
    _id, title, slug, authors, year, category, abstract, doi, fileUrl, keywords
  }
`

// Founders
export const FOUNDERS_ALL = `
  *[_type == "founder"] | order(order asc) {
    _id, name, slug, role, institution, bio,
    "photoUrl": photo.asset->url
  }
`

// Total counts
export const COUNTS = `{
  "berita": count(*[_type == "berita"]),
  "event": count(*[_type == "event"]),
  "publikasi": count(*[_type == "publikasi"]),
  "founders": count(*[_type == "founder"]),
}`
```

---

## API Routes

### `/api/contact` — POST
```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
  recaptchaToken: z.string(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = contactSchema.safeParse(body)
  
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validasi gagal', details: parsed.error }, { status: 400 })
  }
  
  // Verify reCAPTCHA
  const captchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${parsed.data.recaptchaToken}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  const captcha = await captchaRes.json()
  if (!captcha.success || captcha.score < 0.5) {
    return NextResponse.json({ error: 'Captcha verification failed' }, { status: 403 })
  }
  
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'noreply@inopi.id',
    to: process.env.NOTIFICATION_EMAIL!,
    subject: `[INOPI Kontak] ${parsed.data.subject}`,
    html: `<p>Dari: ${parsed.data.name} &lt;${parsed.data.email}&gt;</p><p>${parsed.data.message}</p>`,
  })
  
  return NextResponse.json({ success: true })
}
```

### `/api/membership` — POST
```typescript
// app/api/membership/route.ts
const membershipSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  institution: z.string().optional(),
  type: z.enum(['individu', 'institusi', 'korporat']),
  phone: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = membershipSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  
  // Kirim konfirmasi ke pendaftar
  await resend.emails.send({
    from: 'no-reply@inopi.id',
    to: parsed.data.email,
    subject: 'Konfirmasi Pendaftaran Keanggotaan INOPI',
    html: `
      <h1>Terima kasih telah mendaftar, ${parsed.data.name}!</h1>
      <p>Pendaftaran keanggotaan INOPI Anda (kategori: ${parsed.data.type}) telah kami terima.</p>
      <p>Tim kami akan memvalidasi data Anda dalam 1×24 jam dan menghubungi melalui email ini.</p>
      <p>Salam,<br>Tim INOPI</p>
    `,
  })
  
  // Notifikasi internal
  await resend.emails.send({
    from: 'system@inopi.id',
    to: process.env.NOTIFICATION_EMAIL!,
    subject: `[INOPI] Pendaftaran Baru: ${parsed.data.name} (${parsed.data.type})`,
    html: `<pre>${JSON.stringify(parsed.data, null, 2)}</pre>`,
  })
  
  return NextResponse.json({ success: true })
}
```

### `/api/newsletter` — POST
```typescript
// app/api/newsletter/route.ts
const newsletterSchema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  const { email } = newsletterSchema.parse(await req.json())
  
  // Add to Resend audience
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.contacts.create({
    email,
    audienceId: process.env.RESEND_AUDIENCE_ID!,
    unsubscribed: false,
  })
  
  return NextResponse.json({ success: true })
}
```

### `/api/health` — GET
```typescript
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  })
}
```

---

## Revalidation Webhook

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-webhook-secret')
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { type } = await req.json()
  
  const pathMap: Record<string, string[]> = {
    berita:    ['/berita', '/berita/[slug]'],
    event:     ['/event', '/event/[slug]'],
    publikasi: ['/riset', '/riset/[slug]'],
    founder:   ['/tentang/founders'],
  }
  
  const paths = pathMap[type] || ['/']
  paths.forEach(p => revalidatePath(p))
  
  return NextResponse.json({ revalidated: true, paths })
}
```

---

## Rate Limiting

```typescript
// lib/rate-limit.ts (menggunakan Redis via Upstash)
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

const redis = Redis.fromEnv()

export const contactRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),   // 5 submit per jam per IP
  prefix: 'inopi:contact',
})

export const newsletterRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 d'),   // 3 subscribe per hari per IP
  prefix: 'inopi:newsletter',
})

// Gunakan di API route:
const { success } = await contactRateLimit.limit(req.ip ?? 'anonymous')
if (!success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
```
