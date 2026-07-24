# Panduan Setup Portfolio — VS Code

## 1. Buka project di VS Code
- `File > Open Folder` → pilih folder `portfolio-vonayt` ini.
- Install extension **Live Server** (ikon Extensions di sidebar kiri, cari "Live Server" by Ritwick Dey).

## 2. Jalankan preview
- Klik kanan pada `index.html` → **"Open with Live Server"**.
- Browser otomatis terbuka, dan setiap kamu save file, halaman auto-refresh.

## 3. Struktur folder
```
portfolio-vonayt/
├── index.html      ← struktur halaman & daftar karya
├── style.css       ← tampilan/desain
├── script.js       ← logic modal popup
├── videos/         ← video kualitas penuh (dipakai saat modal dibuka)
├── thumbnails/      ← video pendek/ringan untuk preview di grid (opsional tapi disarankan)
└── images/          ← foto, gif, gambar lainnya
```

## 4. Cara menambah 1 karya baru

Buka `index.html`, cari komentar `<!-- Tambahkan blok baru di bawah ini -->`, lalu copy-paste blok ini tepat di bawahnya:

```html
<div class="portfolio-item"
     onclick="openModal('videos/NAMA-FILE.mp4', 'Judul Karya', 'Deskripsi singkat')">
    <video class="lazy video-preview"
           data-src="thumbnails/NAMA-FILE.mp4"
           autoplay loop muted playsinline
           ontimeupdate="if(this.currentTime >= 4) this.currentTime = 0;"></video>
    <div class="overlay">
        <h3>Judul Proyek</h3>
        <p>Sub-judul</p>
    </div>
</div>
```

**Yang perlu kamu ganti:**
| Bagian | Keterangan |
|---|---|
| `videos/NAMA-FILE.mp4` (di `onclick`) | Path video kualitas penuh, dibuka saat modal diklik |
| `thumbnails/NAMA-FILE.mp4` (di `data-src`) | Path video preview ringan di grid (lihat langkah 6) |
| `'Judul Karya'`, `'Deskripsi singkat'` | Muncul di teks modal saat dibuka |
| `this.currentTime >= 4 ... = 0` | Atur video preview loop dari detik берapa ke detik berapa (opsional, boleh dihapus baris `ontimeupdate` kalau mau video preview loop dari awal sampai habis) |
| `<h3>` dan `<p>` di dalam `.overlay` | Teks yang muncul saat hover di grid |

Untuk gambar/GIF, pakai pola ini (tidak perlu `data-src`, cukup `loading="lazy"`):

```html
<div class="portfolio-item"
     onclick="openModal('images/NAMA-FILE.gif', 'Judul Karya', 'Deskripsi singkat')">
    <img src="images/NAMA-FILE.gif" loading="lazy" alt="Judul Karya">
    <div class="overlay">
        <h3>Judul Proyek</h3>
        <p>Sub-judul</p>
    </div>
</div>
```

## 5. WAJIB: Kompres video sebelum dimasukkan

Video mentah dari export animasi biasanya terlalu besar untuk web (bisa 5-10 MB per file).
Install **ffmpeg** dulu ([ffmpeg.org/download.html](https://ffmpeg.org/download.html)), lalu jalankan
di Terminal VS Code (`Terminal > New Terminal`):

```bash
ffmpeg -i "video-asli.mp4" -vcodec libx264 -crf 28 -preset slow -acodec aac -b:a 128k "videos/video-asli.mp4"
```

Target ukuran: usahakan di bawah 2-3 MB per video untuk web.

## 6. Membuat versi "thumbnail" (preview grid) yang lebih ringan

Ini opsional, tapi sangat disarankan kalau videomu banyak (puluhan+). Buat versi preview
yang durasinya pendek (3-6 detik) dan resolusi lebih kecil:

```bash
ffmpeg -i "videos/video-asli.mp4" -ss 00:00:01 -t 5 -vf "scale=640:-2" -vcodec libx264 -crf 30 -an "thumbnails/video-asli.mp4"
```

Penjelasan:
- `-ss 00:00:01` → mulai potong dari detik ke-1
- `-t 5` → durasi 5 detik saja
- `-vf "scale=640:-2"` → resize lebar ke 640px (lebih kecil dari original)
- `-an` → hapus audio (preview grid kan mute juga)

Hasilnya: video preview di grid jadi jauh lebih ringan dibanding video aslinya, tapi kualitas
tetap bagus untuk ukuran thumbnail kecil.

## 7. Cek performa sebelum upload

Setelah semua video masuk dan halaman jadi, upload ke GitHub Pages (atau hosting lain),
lalu test di [PageSpeed Insights](https://pagespeed.web.dev/). Target skor performance
di atas 90 untuk hasil optimal.

## Catatan penting
- Lazy loading (`class="lazy"` + `data-src`) membuat video **tidak otomatis download** sebelum
  user scroll sampai video itu terlihat di layar — jadi walau kamu punya puluhan video, halaman
  tetap ringan saat pertama dibuka.
- Kalau video sudah lebih dari ~30-40 item, pertimbangkan tambah fitur "Load More" / pagination
  supaya jumlah elemen di halaman tidak terlalu banyak sekaligus. Bisa tanya saya lagi kalau
  sudah sampai tahap itu.
