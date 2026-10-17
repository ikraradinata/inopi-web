// Format kode kursi Corporate: CORP-<no. urut perusahaan>-<kursi 1-9>-<4 karakter acak>.
// Alfabet acak tanpa 0/O/1/I/L; harus sama dengan CFG.CODE_ALPHABET di apps-script/registry.js.

export const SEAT_CODE_RE = /^CORP-\d{4,}-[1-9]-[A-HJKMNP-Z2-9]{4}$/

/** Huruf besar tanpa spasi, agar "corp-0007-2-k7qf " tetap diterima. */
export function normalizeSeatCode(value: string): string {
  return value.replace(/\s+/g, '').toUpperCase().slice(0, 40)
}

export const isSeatCode = (value: string): boolean => SEAT_CODE_RE.test(normalizeSeatCode(value))
