# Kuis Belajar Kelas 4 — Panduan Lengkap

## Isi folder ini
- `index.html` → **LINK SISWA** (halaman untuk siswa mengerjakan kuis)
- `guru.html` → **LINK GURU** (dashboard monitoring, dilindungi password)
- `data.js` → **satu-satunya file yang perlu Anda edit**: daftar nama siswa, password guru, konfigurasi backend
- `style.css` → tampilan (tidak perlu diedit)

## Kenapa perlu langkah tambahan (baca ini dulu, penting & jujur)
Anda meminta data siswa (skor, status, aktivitas) bisa dikirim dari HP siswa dan langsung
muncul di dashboard guru — dari perangkat manapun, tanpa siswa punya akun. Itu **butuh
database online sungguhan**, bukan sekadar file HTML. Saya memilih **Firebase Firestore**
(buatan Google) karena gratis untuk skala kelas (49 siswa jauh di bawah batas gratisnya),
tidak butuh siswa login, dan bisa disiapkan lewat halaman web tanpa coding.

Karena file HTML ini akan memanggil layanan Firebase, filenya perlu **dihosting** (diberi
alamat/link publik) di luar Claude, misalnya di **GitHub Pages** (gratis, resmi, dan cocok
untuk file statis seperti ini). Panduan lengkapnya ada di bagian F di bawah.

**Tentang keamanan (mohon dibaca):** agar siswa tidak perlu akun/login sama sekali, aturan
database dibuat "terbuka" (siapa pun yang tahu alamat aplikasinya bisa mengirim data). Ini
artinya: (1) password dashboard guru hanya mencegah siswa "kebetulan" membuka dashboard,
bukan pengaman tingkat tinggi; (2) secara teknis, siswa yang sangat mahir dan sengaja
membuka menu developer browser *mungkin* bisa melihat data siswa lain. Untuk kuis harian
kelas 4, risiko ini kecil, tapi saya wajib menyampaikannya dengan jujur sesuai permintaan
Anda. Jika suatu saat butuh keamanan lebih tinggi, beri tahu saya — bisa ditambahkan lapisan
Firebase Authentication.

---

## A. Cara memasukkan 49 nama siswa
Buka `data.js`, cari bagian `STUDENT_LIST`, lalu isi seperti ini:
```js
const STUDENT_LIST = [
  "Aisyah Putri",
  "Bima Saputra",
  "Citra Ayu",
  // ... lanjutkan sampai 49 nama
];
```
Hapus 5 nama contoh setelah selesai. Nama ini otomatis dipakai di halaman siswa (daftar
pilihan nama) **dan** dashboard guru (tabel monitoring) — cukup diedit di satu tempat ini.

## B. Cara mengatur password guru
Masih di `data.js`, ganti baris ini dengan password pilihan Anda:
```js
const GURU_PASSWORD = "gurukelas4-2026";
```

## C. Membuat backend online (Firebase) — sekali saja, ±10 menit
1. Buka https://console.firebase.google.com, login dengan akun Google Anda.
2. Klik **Tambahkan proyek** (Add project) → beri nama bebas, misalnya `kuis-kelas-4` →
   ikuti langkah sampai proyek selesai dibuat (Google Analytics boleh dimatikan).
3. Di menu kiri, klik **Build → Firestore Database** → **Create database** →
   pilih lokasi server terdekat (misalnya `asia-southeast2`) → mode **Start in test mode**.
4. Setelah database dibuat, buka tab **Rules**, hapus isinya, ganti dengan ini, lalu **Publish**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /kuis_kelas4/{docId} {
         allow read, write: if true;
       }
     }
   }
   ```
   (Ini yang memungkinkan HP siswa mengirim data tanpa login — lihat catatan keamanan di atas.)
5. Kembali ke halaman utama proyek (klik ikon gerigi ⚙️ → **Project settings**).
6. Di bagian **Your apps**, klik ikon **</>** (Web) → beri nama app bebas → **Register app**.
7. Firebase akan menampilkan kode berisi `firebaseConfig = {...}`. Salin nilai-nilainya
   (apiKey, authDomain, projectId, dst.) ke dalam `data.js`, menggantikan tulisan
   `"GANTI..."`. Ini **bukan** password rahasia — nilai ini memang dirancang untuk
   ditempel di kode web, keamanan diatur lewat Rules di langkah 4.

## D. Menjalankan/mengetes di komputer sebelum publikasi
Karena browser membatasi file lokal biasa, buka lewat server sederhana:
- Jika punya Python: buka folder ini di terminal, jalankan `python -m http.server 8000`,
  lalu buka `http://localhost:8000/index.html` (siswa) dan `http://localhost:8000/guru.html` (guru).
- Atau langsung ke bagian F untuk publikasi ke GitHub Pages lalu tes dari sana.

## E. Cara mengetes dengan 2 akun/siswa dulu
1. Isi `STUDENT_LIST` sementara dengan 2 nama saja, misalnya "Tes Siswa 1" dan "Tes Siswa 2".
2. Buka `index.html` di dua tab/perangkat berbeda, pilih nama berbeda di masing-masing, klik MULAI.
3. Buka `guru.html` di tab ketiga, login dengan password Anda.
4. Pastikan kedua nama muncul di tabel dengan status berubah (Sedang mengerjakan → Selesai)
   sesuai progres di tab siswa. Jika muncul dan berubah otomatis, berarti data benar-benar
   tersambung ke database (bukan tampilan palsu).
5. Setelah yakin berhasil, ganti `STUDENT_LIST` dengan 49 nama asli.

## F. Mempublikasikan agar siswa tinggal klik link dari HP (GitHub Pages, gratis)
1. Buat akun gratis di https://github.com jika belum punya.
2. Klik **+** di pojok kanan atas → **New repository** → beri nama misalnya `kuis-kelas-4` →
   pilih **Public** → **Create repository**.
3. Di halaman repo, klik **Add file → Upload files**, lalu unggah keempat file
   (`index.html`, `guru.html`, `data.js`, `style.css`) → **Commit changes**.
4. Buka menu **Settings → Pages** (di sidebar kiri repo).
5. Di bagian **Build and deployment → Source**, pilih **Deploy from a branch**,
   Branch pilih `main` folder `/ (root)` → **Save**.
6. Tunggu 1–2 menit, lalu muncul alamat seperti:
   `https://NAMA-AKUN-ANDA.github.io/kuis-kelas-4/`

## G. LINK SISWA dan LINK GURU Anda
Setelah langkah F, dua link Anda adalah:
- **LINK SISWA:** `https://NAMA-AKUN-ANDA.github.io/kuis-kelas-4/index.html`
- **LINK GURU:** `https://NAMA-AKUN-ANDA.github.io/kuis-kelas-4/guru.html`

Bagikan link siswa ke 49 siswa (lewat WhatsApp grup kelas, misalnya), dan simpan link guru
untuk Anda sendiri.

## H. Cara memastikan data siswa benar-benar masuk ke dashboard
Buka dashboard guru sebelum kuis dimulai. Saat seorang siswa menekan MULAI di HP-nya, dalam
beberapa detik namanya akan berubah status di tabel dashboard secara otomatis (tanpa perlu
menekan refresh) — itu tandanya data benar-benar tersimpan online, bukan hanya di HP siswa
itu sendiri.

## I. Mengembangkan lebih lanjut
Semua soal dan materi ada di `data.js` (bagian `SOAL_BINDO`, `SOAL_IPAS`, `MATERI_BINDO`,
`MATERI_IPAS`) dengan format yang sama untuk setiap soal — Anda (atau saya, jika diminta lagi)
bisa menambah/mengubah soal dengan mengikuti pola yang sudah ada.
