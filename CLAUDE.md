# CLAUDE.md — Website INOPI (www.inopi.id)

Berkas ini dibaca otomatis oleh Claude Code di setiap sesi. Aturan di bawah WAJIB diikuti untuk semua perubahan tampilan.

## Proyek
- Website resmi Asosiasi Inovasi Pembelajaran Indonesia (INOPI).
- Stack: Next.js (App Router) + TypeScript + TailwindCSS + shadcn/ui.
- Bahasa konten: Bahasa Indonesia, nada formal-institusional.

## Sumber kebenaran desain
- Palet: "Palet Warna Resmi INOPI" (Oktober 2026).
- Token warna HANYA didefinisikan di `app/globals.css` (variabel `--inopi-*` dan token shadcn). Komponen tidak boleh menulis kode hex sendiri — selalu pakai token/kelas Tailwind.
- Font: Barlow Semi Condensed (judul), Barlow (isi), dimuat lewat `next/font/google` di `app/layout.tsx`.

## Palet & peran
| Token | Hex | Boleh dipakai untuk |
|---|---|---|
| ivory | #F6F1EC | Latar utama halaman (≈60%) |
| sand | #E4D6CC | Kartu, box, latar section, divider |
| taupe | #B5A49A | Shape, ikon, garis, latar section. BUKAN untuk teks |
| espresso | #35292A | Judul, teks utama, tombol utama, kontras |
| sage | #87958A | Dekoratif saja |
| orange | #D66F45 | Angka besar (≥24px tebal), ikon, highlight dekoratif |
| gold | #C69A55 | Badge/award dengan teks espresso di atasnya |
| teal | #397B78 | Elemen teknologi/AI, fill berteks putih, fokus keyboard |

Proporsi: 60% ivory · 30% taupe + espresso · 10% aksen (orange, gold, teal).

## Aturan keterbacaan (tidak boleh dilanggar)
- Teks putih TIDAK BOLEH di atas taupe, gold, sand, atau orange asli.
- Tombol CTA berwarna oranye memakai `--inopi-orange-strong` (#B24F27) dengan teks putih.
- Teks sekunder/caption memakai `--inopi-taupe-strong` (#7E685C), bukan taupe asli.
- Teks teal kecil di atas ivory memakai `--inopi-teal-strong` (#377673).
- Teks emas kecil memakai `--inopi-gold-strong` (#89662E).
- Target minimum kontras 4,5:1 untuk teks normal.

## Aturan tata letak
- Satu section = satu fokus.
- Satu CTA dominan per section.
- Maksimal satu elemen grafis (garis geometris, bidang diagonal, gelombang, atau grid titik) per section, opasitas 20–40%.
- Gradien hanya untuk latar, tidak di bawah teks berukuran kecil.
- Gunakan foto asli kegiatan/founder INOPI, bukan foto stok atau hasil AI.
- Tidak memakai emoji sebagai ikon; gunakan ikon garis (lucide-react).

## Cara bekerja
- Ubah per section, bukan per halaman sekaligus.
- Setelah satu section selesai: tampilkan daftar file yang berubah, lalu commit.
- Jangan mengubah konten/teks kecuali diminta.
