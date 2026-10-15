# Panduan Menerapkan Palet Resmi INOPI dengan Claude Code

Untuk: website www.inopi.id (Next.js + TailwindCSS + shadcn/ui) · dikerjakan di VS Code dengan Claude Code.

## Isi paket
| Berkas | Fungsi |
|---|---|
| `CLAUDE.md` | Aturan desain yang otomatis dibaca Claude Code tiap sesi |
| `inopi-theme.css` | Token warna, font, dan elemen grafis siap tempel ke `app/globals.css` |
| `PANDUAN_TEMA_INOPI.md` | Berkas ini — urutan langkah dan prompt siap salin |

## Catatan penting sebelum mulai

**1. Empat warna resmi tidak terbaca bila dipakai untuk teks.** Hasil uji kontras (standar minimum 4,5:1):

| Kombinasi | Rasio | Status |
|---|---|---|
| Espresso di atas Ivory | 12,5 | Lolos |
| Teks putih di atas Taupe | 2,4 | Gagal |
| Taupe sebagai teks di Ivory | 2,1 | Gagal |
| Teks putih di atas Innovation Orange | 3,4 | Gagal untuk teks tombol |
| Gold sebagai teks di Ivory | 2,3 | Gagal |
| Sage sebagai teks di Ivory | 2,8 | Gagal |
| Teks putih di atas Teal | 4,9 | Lolos |

Karena itu paket ini menambahkan **varian "strong"** yang dihitung dari warna resmi (hue sama, hanya lebih gelap) khusus untuk teks dan tombol: Orange `#B24F27`, Teal `#377673`, Gold `#89662E`, Taupe `#7E685C`, Sage `#637065`. Warna resmi tetap dipakai untuk bidang, ikon, garis, dan angka besar. Varian ini sebaiknya dikonfirmasi ke pemilik palet sebagai bagian resmi palet.

**2. Palet resmi tidak menyebutkan font.** Font Barlow Semi Condensed (judul) dan Barlow (isi) adalah padanan terdekat dari tampilan dokumen palet, bukan font yang ditetapkan resmi. Perlu keputusan pengurus.

---

## Langkah 0 — Persiapan (manual, 5 menit)

1. Buka proyek website di VS Code, buka terminal, jalankan:
   ```bash
   git checkout -b tema-palet-resmi
   ```
2. Salin `CLAUDE.md` ke **root** proyek (sejajar `package.json`). Jika sudah ada `CLAUDE.md`, gabungkan isinya.
3. Salin `inopi-theme.css` ke folder `docs/` di proyek (sebagai referensi, belum ditempel).
4. Jalankan `claude` di terminal VS Code.

## Langkah 1 — Audit kondisi proyek

```
Baca CLAUDE.md dan docs/inopi-theme.css. Lalu audit proyek ini TANPA mengubah apa pun:
1. Versi Next.js, TailwindCSS (v3 atau v4), dan apakah shadcn/ui terpasang.
2. Di file mana token warna dan font didefinisikan sekarang.
3. Daftar semua kode hex yang ditulis langsung di komponen (hardcoded), per file.
4. Font apa yang dipakai sekarang dan dimuat di mana.
Laporkan dalam bentuk tabel, lalu usulkan urutan perubahan.
```

Tinjau laporannya sebelum lanjut. Kalau Tailwind ternyata v4, Claude Code akan menyesuaikan Langkah 3.

## Langkah 2 — Terapkan token warna

```
Terapkan token dari docs/inopi-theme.css ke app/globals.css:
- Ganti blok :root lama dengan blok :root dari file referensi.
- Tambahkan @layer components (elemen grafis) dari file referensi.
- Jangan sentuh komponen lain dulu.
Tampilkan diff, lalu commit dengan pesan "theme: token palet resmi INOPI".
```

## Langkah 3 — Hubungkan token ke Tailwind

Untuk Tailwind v3, tambahkan ini di `tailwind.config.ts` (Claude Code bisa melakukannya dengan prompt di bawah):

```ts
theme: {
  extend: {
    colors: {
      inopi: {
        ivory: 'var(--inopi-ivory)',
        sand: 'var(--inopi-sand)',
        taupe: 'var(--inopi-taupe)',
        espresso: 'var(--inopi-espresso)',
        sage: 'var(--inopi-sage)',
        orange: 'var(--inopi-orange)',
        gold: 'var(--inopi-gold)',
        teal: 'var(--inopi-teal)',
        'orange-strong': 'var(--inopi-orange-strong)',
        'teal-strong': 'var(--inopi-teal-strong)',
        'gold-strong': 'var(--inopi-gold-strong)',
        'taupe-strong': 'var(--inopi-taupe-strong)',
      },
    },
    fontFamily: {
      heading: ['var(--font-heading)'],
      body: ['var(--font-body)'],
    },
  },
},
```

```
Tambahkan warna inopi.* dan fontFamily heading/body ke konfigurasi Tailwind sesuai
bagian "Langkah 3" di PANDUAN_TEMA_INOPI.md. Jika proyek memakai Tailwind v4,
terjemahkan ke blok @theme di globals.css dengan nama token yang sama.
Commit: "theme: daftarkan token INOPI ke Tailwind".
```

## Langkah 4 — Pasang font

```
Di app/layout.tsx, muat font lewat next/font/google:
- Barlow_Semi_Condensed, weight 600, 700, 800, variable "--font-barlow-semi"
- Barlow, weight 400, 500, 600, 700, variable "--font-barlow"
Pasang kedua variable di <html>. Hapus font lama yang tidak dipakai lagi.
Commit: "theme: font Barlow".
```

## Langkah 5 — Bersihkan warna hardcoded

```
Berdasarkan daftar hex hardcoded dari audit Langkah 1, ganti setiap warna dengan
token inopi.* yang perannya paling sesuai menurut tabel di CLAUDE.md.
Patuhi aturan keterbacaan di CLAUDE.md (misalnya teks putih tidak boleh di atas taupe).
Kerjakan per folder, tampilkan diff per folder, commit tiap folder.
```

## Langkah 6 — Sesuaikan tampilan per section

Gunakan mockup "Mockup Website INOPI — Palet Resmi" sebagai acuan visual. Lampirkan tangkapan layar mockup ke prompt agar Claude Code bisa melihatnya. Satu prompt untuk satu section:

```
[lampirkan screenshot section Hero dari mockup]
Sesuaikan section Hero di homepage dengan screenshot ini:
- Latar ivory dengan satu bidang diagonal sand (kelas .inopi-diagonal) di sisi kanan
- Eyebrow huruf kapital berjarak (kelas .inopi-eyebrow)
- Judul font heading, warna espresso
- Tombol utama espresso, tombol kedua outline espresso
Jangan ubah teks. Tampilkan diff lalu commit.
```

Ulangi untuk: Navbar → Hero → Angka kunci → Tentang → Pita Launching → Program → Insight Brief → Keanggotaan → Footer.

## Langkah 7 — Pemeriksaan akhir

```
Periksa seluruh halaman yang sudah diubah:
1. Cari pasangan teks/latar yang kontrasnya di bawah 4,5:1 dan laporkan.
2. Pastikan tidak ada lagi kode hex di luar app/globals.css.
3. Jalankan build (npm run build) dan laporkan error.
Perbaiki temuan, lalu commit "theme: perbaikan kontras & build".
```

Lalu buka `localhost:3000`, cek tampilan di desktop dan di mode ponsel (DevTools → toggle device).

## Langkah 8 — Gabungkan

Jika semua sudah sesuai:
```bash
git checkout main
git merge tema-palet-resmi
```
Jika hasilnya tidak sesuai, cukup kembali ke `main` — perubahan di branch tidak memengaruhi website utama.
