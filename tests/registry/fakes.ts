/* eslint-disable @typescript-eslint/no-explicit-any */
// Layanan Google tiruan (di memori) untuk menjalankan apps-script/registry.js di Node.
// Hanya mengimplementasikan bagian API yang dipakai skrip. Dipakai oleh tes dan
// oleh scripts/mock-registry.ts (server tiruan untuk pengembangan lokal).

import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

type Cell = unknown

class FakeRange {
  constructor(
    private sh: FakeSheet,
    private r: number,
    private c: number,
    private nr: number,
    private nc: number,
  ) {}
  getValues(): Cell[][] {
    return Array.from({ length: this.nr }, (_, i) =>
      Array.from({ length: this.nc }, (_, j) => this.sh.rows[this.r - 1 + i]?.[this.c - 1 + j] ?? ''),
    )
  }
  setValues(vals: Cell[][]) {
    vals.forEach((row, i) => {
      const target = (this.sh.rows[this.r - 1 + i] ??= [])
      row.forEach((v, j) => (target[this.c - 1 + j] = v))
    })
    return this
  }
  setDataValidation() {
    return this
  }
}

class FakeSheet {
  rows: Cell[][] = []
  hidden = false
  frozen = 0
  constructor(private name: string) {}
  getName() {
    return this.name
  }
  setName(n: string) {
    this.name = n
    return this
  }
  getLastRow() {
    return this.rows.length
  }
  getRange(r: number, c: number, nr = 1, nc = 1) {
    return new FakeRange(this, r, c, nr, nc)
  }
  appendRow(values: Cell[]) {
    this.rows.push(Array.from(values, (v) => v ?? ''))
  }
  deleteRow(n: number) {
    this.rows.splice(n - 1, 1)
  }
  setFrozenRows(n: number) {
    this.frozen = n
  }
  hideSheet() {
    this.hidden = true
  }
}

class FakeSpreadsheet {
  sheets = new Map<string, FakeSheet>()
  getSheetByName(name: string) {
    for (const s of this.sheets.values()) if (s.getName() === name) return s
    return null
  }
  insertSheet(name: string) {
    const s = new FakeSheet(name)
    this.sheets.set(name + '#' + this.sheets.size, s)
    return s
  }
}

export class FakeFile {
  sharing = 'DEFAULT'
  description = ''
  constructor(
    public id: string,
    public name: string,
    public mime: string,
    public bytes: number[],
  ) {}
  getId() {
    return this.id
  }
  setName(n: string) {
    this.name = n
    return this
  }
  setDescription(d: string) {
    this.description = d
    return this
  }
  setSharing(access: string) {
    this.sharing = access
    return this
  }
}

export interface SentMail {
  to: string
  subject: string
  body: string
}

export interface RegistryEnv {
  ctx: vm.Context
  ss: FakeSpreadsheet
  files: Map<string, FakeFile>
  mails: SentMail[]
  props: Map<string, string>
  lock: { held: number; acquired: number; released: number }
  call: (body: Record<string, unknown>) => Record<string, any>
  /** Mengatur waktu sistem tiruan (untuk kedaluwarsa dan pergantian tahun). */
  setNow: (d: Date | null) => void
}

export const TEST_SECRET = 'rahasia-uji-0123456789'

export function createRegistryEnv(options: { secret?: string | null; starterSheet?: boolean } = {}): RegistryEnv {
  const ss = new FakeSpreadsheet()
  if (options.starterSheet) ss.insertSheet('Sheet1')
  const files = new Map<string, FakeFile>()
  const mails: SentMail[] = []
  const props = new Map<string, string>()
  const cache = new Map<string, string>()
  const lock = { held: 0, acquired: 0, released: 0 }
  let fixedNow: Date | null = null

  if (options.secret !== null) props.set('API_SECRET', options.secret ?? TEST_SECRET)

  const RealDate = Date
  class FakeDate extends RealDate {
    constructor(...args: any[]) {
      if (args.length === 0 && fixedNow) super(fixedNow.getTime())
      else super(...(args as [number]))
    }
    static now() {
      return fixedNow ? fixedNow.getTime() : RealDate.now()
    }
  }

  const folder = {
    createFile: (blob: { bytes: number[]; mime: string; name: string }) => {
      const f = new FakeFile(randomUUID(), blob.name, blob.mime, blob.bytes)
      files.set(f.id, f)
      return f
    },
    setSharing: () => folder,
    getId: () => 'folder-1',
  }

  const sandbox: Record<string, unknown> = {
    console,
    Date: FakeDate,
    Math,
    JSON,
    Number,
    String,
    Object,
    Array,
    Error,
    SpreadsheetApp: { getActiveSpreadsheet: () => ss },
    LockService: {
      getScriptLock: () => ({
        waitLock: () => {
          if (lock.held) throw new Error('kunci sudah dipegang')
          lock.held++
          lock.acquired++
        },
        releaseLock: () => {
          lock.held--
          lock.released++
        },
      }),
    },
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (k: string) => props.get(k) ?? null,
        setProperty: (k: string, v: string) => void props.set(k, v),
      }),
    },
    CacheService: {
      getScriptCache: () => ({
        get: (k: string) => cache.get(k) ?? null,
        put: (k: string, v: string) => void cache.set(k, v),
      }),
    },
    Utilities: {
      getUuid: () => randomUUID(),
      // Apps Script mengembalikan byte bertanda (-128..127).
      base64Decode: (s: string) => {
        if (!/^[A-Za-z0-9+/]*={0,2}$/.test(s)) throw new Error('base64 tidak sah')
        return Array.from(Buffer.from(s, 'base64'), (b) => (b > 127 ? b - 256 : b))
      },
      newBlob: (bytes: number[], mime: string, name: string) => ({ bytes, mime, name }),
      formatDate: (d: Date, tz: string, fmt: string) => {
        if (fmt !== 'yy') throw new Error('format tidak dikenal')
        return new Intl.DateTimeFormat('en-US', { timeZone: tz, year: '2-digit' }).format(d)
      },
    },
    DriveApp: {
      Access: { PRIVATE: 'PRIVATE' },
      Permission: { NONE: 'NONE' },
      createFolder: () => folder,
      getFolderById: () => folder,
      getFileById: (id: string) => {
        const f = files.get(id)
        if (!f) throw new Error('berkas tidak ada')
        return f
      },
    },
    MailApp: { sendEmail: (m: SentMail) => void mails.push(m) },
    Session: { getEffectiveUser: () => ({ getEmail: () => 'asosiasi.inopi@gmail.com' }) },
    ContentService: {
      MimeType: { JSON: 'JSON' },
      createTextOutput: (text: string) => ({ text, setMimeType() { return this }, getContent() { return text } }),
    },
  }

  const ctx = vm.createContext(sandbox)
  const source = fs.readFileSync(path.join(process.cwd(), 'apps-script', 'registry.js'), 'utf8')
  vm.runInContext(source, ctx, { filename: 'registry.js' })

  return {
    ctx,
    ss,
    files,
    mails,
    props,
    lock,
    call: (body) => JSON.parse(JSON.stringify((ctx as any).handleRequest({ secret: options.secret ?? TEST_SECRET, ...body }))),
    setNow: (d) => {
      fixedNow = d
    },
  }
}
