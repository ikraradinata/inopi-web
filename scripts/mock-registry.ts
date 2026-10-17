// Server tiruan Apps Script "INOPI Registry" untuk pengembangan lokal dan uji E2E:
// menjalankan apps-script/registry.js sungguhan dengan layanan Google tiruan di memori.
//
//   APPS_SCRIPT_SECRET=rahasia npx tsx scripts/mock-registry.ts   (port 4020)
//   lalu di .env.local: APPS_SCRIPT_URL=http://localhost:4020  APPS_SCRIPT_SECRET=rahasia
//
// Data hilang saat server dimatikan. Endpoint tambahan untuk pemeriksaan:
//   GET /__dump    isi semua tab, daftar surel terkirim, dan berkas Drive
//   POST /__reset  mengosongkan semuanya
//   POST /__status {"reg":"INP-26-C-0001","status":"Aktif","reason":""}
//                  meniru Bendahara mengubah kolom Status di Sheet, lalu menjalankan pemicu onEdit

import http from 'node:http'
import { createRegistryEnv, type RegistryEnv } from '../tests/registry/fakes'

const secret = process.env.APPS_SCRIPT_SECRET || 'rahasia-lokal'
const port = Number(process.env.MOCK_REGISTRY_PORT || 4020)
let env: RegistryEnv = createRegistryEnv({ secret, starterSheet: true })

function dump() {
  const sheets: Record<string, unknown[][]> = {}
  for (const name of ['Pendaftaran', 'Reservasi', 'Unggahan', 'Perusahaan', 'Kursi', 'Anggota', 'Log']) {
    const sh = env.ss.getSheetByName(name)
    if (sh) sheets[name] = sh.rows
  }
  return {
    sheets,
    mails: env.mails,
    files: [...env.files.values()].map((f) => ({ id: f.id, name: f.name, mime: f.mime, size: f.bytes.length, sharing: f.sharing })),
    props: Object.fromEntries(env.props),
  }
}

http
  .createServer((req, res) => {
    const chunks: Buffer[] = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      const send = (status: number, body: unknown) => {
        res.writeHead(status, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(body))
      }
      if (req.method === 'GET' && req.url === '/__dump') return send(200, dump())
      if (req.method === 'POST' && req.url === '/__reset') {
        env = createRegistryEnv({ secret, starterSheet: true })
        return send(200, { ok: true })
      }
      if (req.method === 'POST' && req.url === '/__status') {
        const { reg, status, reason } = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
        const sh = env.ss.getSheetByName('Pendaftaran')
        const head = (sh?.rows[0] ?? []) as string[]
        const row = sh?.rows.find((r, i) => i > 0 && r[head.indexOf('No. Pendaftaran')] === reg)
        if (!sh || !row) return send(404, { ok: false, error: 'not_found' })
        row[head.indexOf('Status')] = status
        if (reason !== undefined) row[head.indexOf('Alasan Penolakan')] = reason
        const changed = (env.ctx as unknown as { processStatusChanges: () => number }).processStatusChanges()
        return send(200, { ok: true, changed, status: row[head.indexOf('Status')] })
      }
      if (req.method === 'GET') return send(200, { ok: true, service: 'inopi-registry-mock' })
      try {
        const body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
        send(200, (env.ctx as unknown as { handleRequest: (b: unknown) => unknown }).handleRequest(body))
      } catch {
        send(200, { ok: false, error: 'bad_request' })
      }
    })
  })
  .listen(port, () => console.log(`Mock registry di http://localhost:${port}`))
