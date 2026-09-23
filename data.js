/* =====================================================================
   DATA.JS — SATU-SATUNYA TEMPAT UNTUK MENGEDIT:
   1) Daftar nama siswa
   2) Password dashboard guru
   3) Konfigurasi Firebase (backend online)
   File ini dipakai bersama oleh index.html (siswa) dan guru.html (guru).
   ===================================================================== */

// ---------------------------------------------------------------------
// 1) DAFTAR NAMA SISWA — masukkan 49 nama di sini SAJA.
//    Urutan boleh bebas. Jangan hapus tanda kutip dan koma.
// ---------------------------------------------------------------------
const STUDENT_LIST = [
  "ADILA NISA ARDHANI",
  "AENI AGUSTINA RAHAYU",
  "AL FAISAL VIRDAUSS",
  "ANNISA CHALYSTA PUTRI",
  "ANNISA RAHMA KOMARIAH",
  "ARKAN NAUFAL YUDISTIRA",
  "ARSINA DAMAYANTIKA",
  "ASRAF JALALUDIN",
  "AZMIRA PUTRI HUMAIROH",
  "BILQIS BINTANG RAMADANI",
  "CHAYRA NASHA AULI",
  "HERLINA ROSIANA",
  "MAURA SYAKIRA NURARJAQIYA",
  "MEGAN PUTU ISKANDAR",
  "MILKA MEIRISYA",
  "MUHAMAD ALFATIH",
  "MUHAMAD HAFIDZ AL FAIRUZ",
  "MUHAMAD RAIZAN",
  "MUHAMAD RIDWAN",
  "MUHAMMAD AZKA GHIFARI",
  "MUHAMMAD GHIFARI H",
  "MUHAMMAD IDRIS PERMANA",
  "MULYANI MAULINA PUTRI",
  "NOVI ZAHRA NURWATI",
  "NURUL MIRNA AMELIA",
  "QINAR SITI NUR AISYAH",
  "RAFFAINDRA RAMADINATA",
  "RAFFASYA DZAKKI ADINATA H",
  "RAJAA ZAHRAAN ALTHAF S",
  "REGA AGGAS",
  "RIZKO MAHBOBI ALDERO",
  "SAENA NURUL AZKIYA",
  "SALVIA DARA ANINDYA",
  "SATRIA BAYU ANGGARA",
  "SELVI",
  "SOFA MARWAH",
  "SYAUQI IBNU HAFIDZAN",
  "TRIANA PUTRI SYIFA FADILLAH",
  "YUSI YUSELA AZZAHRA",
  "ZAHIRA ANGGRAENI RAHMAWATI",
  "ELVA CAHAYA ZACHIRA",
  "SIFFA NURAENI",
  "ADREENA SYAHIRA",
  "KHAIRIEL ATTARIS ZIBRIL",
  "DHARMA PRAHASTA",
  "ADIANA RAFA FATINA",
  "ASYILA AZZAHRA FITRIANI",
  "NIZAM RAMADHAN",
  "KAYSHA KHOIRUNNISA"
];

// ---------------------------------------------------------------------
// 2) PASSWORD DASHBOARD GURU — ganti dengan password Anda sendiri.
//    CATATAN JUJUR: karena aplikasi ini adalah file statis (tanpa server
//    pribadi), password ini hanya mencegah siswa "kebetulan" membuka
//    dashboard. Ini bukan pengaman tingkat bank. Jangan pakai password
//    yang sama dengan email/akun penting Anda. Lihat README.md bagian
//    "Tentang Keamanan" untuk penjelasan lengkap.
// ---------------------------------------------------------------------
const GURU_PASSWORD = "gurukelas4-2026";

// ---------------------------------------------------------------------
// 3) KONFIGURASI FIREBASE — isi dengan data dari Firebase Console Anda.
//    Panduan lengkap cara mendapatkan nilai ini ada di README.md,
//    bagian "Membuat Backend Online (Firebase)".
// ---------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDDBEPdkHtmcrSmP75PM_gUlyU08xulw84",
  authDomain: "kuis-daring-kelas-4.firebaseapp.com",
  projectId: "kuis-daring-kelas-4",
  storageBucket: "kuis-daring-kelas-4.firebasestorage.app",
  messagingSenderId: "156400446215",
  appId: "1:156400446215:web:a296f4ab145dea1c2f33a2"
};

// Nama koleksi (folder data) di Firestore — boleh dibiarkan seperti ini.
const KOLEKSI = "kuis_kelas4";

// Batas "aktif" (detik). Jika aktivitas terakhir siswa melebihi ini,
// dashboard guru menandai siswa sebagai "Tidak aktif".
const BATAS_AKTIF_DETIK = 60;

/* =====================================================================
   MATERI SINGKAT
   ===================================================================== */
const MATERI_BINDO = {
  judul: "📍 Denah",
  isi: [
    "Denah adalah gambar sederhana yang menunjukkan letak suatu tempat, dilihat dari atas.",
    "Fungsi denah: membantu kita menemukan lokasi, arah, dan jarak suatu tempat.",
    "Arah mata angin utama: Utara, Timur, Selatan, Barat. Pada denah, bagian atas biasanya menunjukkan arah Utara.",
    "Ada juga arah gabungan: Timur Laut, Tenggara, Barat Daya, dan Barat Laut.",
    "Simbol pada denah: kotak biasanya berarti bangunan/rumah, garis panjang berarti jalan, dan simbol lain dijelaskan pada legenda.",
    "Cara membaca denah: lihat dulu judul dan legenda (keterangan simbol), lalu perhatikan arah mata angin, baru cari posisi tempat yang dimaksud.",
    "Posisi suatu tempat biasanya dijelaskan dengan kata seperti: di utara, di selatan, di depan, di antara, di sebelah kanan/kiri.",
    "Petunjuk arah adalah kalimat yang menjelaskan cara menuju suatu tempat, contohnya: \"Dari sekolah, jalan lurus ke utara, lalu belok kanan di pertigaan.\""
  ]
};

const MATERI_IPAS = {
  judul: "🏰 Sejarah Kerajaan di Indonesia",
  isi: [
    "Kerajaan Kutai (Kalimantan Timur) adalah kerajaan Hindu tertua di Indonesia. Buktinya adalah prasasti berbentuk tiang batu yang disebut Yupa.",
    "Kerajaan Tarumanegara (Jawa Barat) juga bercorak Hindu. Rajanya yang terkenal bernama Purnawarman, dengan bukti beberapa prasasti seperti Prasasti Ciaruteun.",
    "Kerajaan Sriwijaya (Sumatra, sekitar Palembang) bercorak Buddha dan terkenal sebagai pusat perdagangan sekaligus pusat belajar agama Buddha.",
    "Kerajaan Majapahit (Jawa Timur) adalah kerajaan Hindu terbesar di Indonesia. Rajanya yang terkenal adalah Hayam Wuruk, dibantu patihnya, Gajah Mada, yang terkenal dengan Sumpah Palapa.",
    "Kerajaan Samudra Pasai (Aceh) adalah kerajaan Islam pertama di Indonesia.",
    "Kerajaan Demak (Jawa Tengah) adalah kerajaan Islam yang didirikan oleh Raden Patah, dengan peninggalan terkenal Masjid Agung Demak."
  ]
};

/* =====================================================================
   BANK SOAL — 10 soal Bahasa Indonesia (Denah) + 10 soal IPAS (Sejarah Kerajaan)
   Setiap soal: teks, 4 pilihan (a-d), kunci jawaban, dan penjelasan singkat.
   ===================================================================== */
const SOAL_BINDO = [
  { soal: "Apa yang dimaksud dengan denah?", pilihan: { a: "Gambar sederhana yang menunjukkan letak suatu tempat dilihat dari atas", b: "Gambar pemandangan alam", c: "Daftar nama-nama tempat", d: "Peta dunia yang sangat lengkap" }, kunci: "a", penjelasan: "Denah adalah gambar sederhana suatu tempat yang dilihat dari atas, agar mudah dipahami." },
  { soal: "Denah berguna untuk...", pilihan: { a: "Menghias dinding kelas", b: "Membantu menemukan letak dan arah suatu tempat", c: "Mengetahui cuaca hari ini", d: "Menghitung jumlah penduduk" }, kunci: "b", penjelasan: "Fungsi utama denah adalah membantu kita menemukan lokasi dan arah suatu tempat." },
  { soal: "Pada denah, arah panah yang menunjuk ke atas biasanya menunjukkan arah...", pilihan: { a: "Selatan", b: "Timur", c: "Utara", d: "Barat" }, kunci: "c", penjelasan: "Secara umum, bagian atas pada denah menunjukkan arah Utara." },
  { soal: "Arah yang berlawanan dengan Utara adalah...", pilihan: { a: "Timur", b: "Selatan", c: "Barat", d: "Tenggara" }, kunci: "b", penjelasan: "Selatan adalah arah yang berlawanan (berhadapan) dengan Utara." },
  { soal: "Arah di antara Utara dan Timur disebut...", pilihan: { a: "Barat Laut", b: "Timur Laut", c: "Tenggara", d: "Barat Daya" }, kunci: "b", penjelasan: "Timur Laut adalah arah gabungan antara Utara dan Timur." },
  { soal: "Simbol berbentuk kotak pada denah biasanya menggambarkan...", pilihan: { a: "Sungai", b: "Jalan", c: "Bangunan atau rumah", d: "Gunung" }, kunci: "c", penjelasan: "Kotak pada denah umumnya melambangkan bangunan atau rumah." },
  { soal: "Garis panjang pada denah biasanya menggambarkan...", pilihan: { a: "Jalan", b: "Lapangan", c: "Pohon", d: "Kolam" }, kunci: "a", penjelasan: "Garis panjang pada denah umumnya menggambarkan jalan." },
  { soal: "Sebelum membaca denah, hal pertama yang perlu diperhatikan adalah...", pilihan: { a: "Warna denah", b: "Judul dan legenda (keterangan simbol) denah", c: "Ukuran kertas", d: "Nama pembuat denah" }, kunci: "b", penjelasan: "Judul dan legenda membantu kita memahami isi denah sebelum membacanya lebih lanjut." },
  { soal: "Jika sekolah berada di sebelah utara pasar, maka posisi pasar terhadap sekolah adalah di sebelah...", pilihan: { a: "Utara", b: "Selatan", c: "Timur", d: "Barat" }, kunci: "b", penjelasan: "Jika sekolah di utara pasar, maka pasar berada di selatan sekolah." },
  { soal: "Kalimat \"Dari rumah, jalan lurus ke timur lalu belok kiri di perempatan\" adalah contoh dari...", pilihan: { a: "Judul denah", b: "Petunjuk arah", c: "Legenda denah", d: "Skala denah" }, kunci: "b", penjelasan: "Kalimat tersebut menjelaskan cara menuju suatu tempat, sehingga disebut petunjuk arah." }
];

const SOAL_IPAS = [
  { soal: "Kerajaan Hindu tertua di Indonesia adalah...", pilihan: { a: "Majapahit", b: "Kutai", c: "Demak", d: "Sriwijaya" }, kunci: "b", penjelasan: "Kerajaan Kutai di Kalimantan Timur adalah kerajaan Hindu tertua, dibuktikan dengan prasasti Yupa." },
  { soal: "Kerajaan Kutai terletak di pulau...", pilihan: { a: "Jawa", b: "Sumatra", c: "Kalimantan", d: "Sulawesi" }, kunci: "c", penjelasan: "Kerajaan Kutai terletak di Kalimantan Timur." },
  { soal: "Bukti sejarah Kerajaan Kutai berupa...", pilihan: { a: "Candi", b: "Prasasti Yupa", c: "Masjid", d: "Kitab" }, kunci: "b", penjelasan: "Prasasti Yupa adalah bukti tertulis peninggalan Kerajaan Kutai." },
  { soal: "Raja terkenal dari Kerajaan Tarumanegara adalah...", pilihan: { a: "Hayam Wuruk", b: "Purnawarman", c: "Raden Patah", d: "Balaputradewa" }, kunci: "b", penjelasan: "Purnawarman adalah raja terkenal Kerajaan Tarumanegara." },
  { soal: "Kerajaan Tarumanegara berada di wilayah...", pilihan: { a: "Jawa Barat", b: "Jawa Timur", c: "Sumatra", d: "Bali" }, kunci: "a", penjelasan: "Kerajaan Tarumanegara terletak di wilayah Jawa Barat." },
  { soal: "Kerajaan Sriwijaya dikenal sebagai pusat...", pilihan: { a: "Perdagangan dan pembelajaran agama Buddha", b: "Peternakan", c: "Pertanian padi", d: "Pembuatan kapal perang saja" }, kunci: "a", penjelasan: "Sriwijaya terkenal sebagai pusat perdagangan sekaligus pusat belajar agama Buddha." },
  { soal: "Kerajaan Majapahit mencapai puncak kejayaan pada masa raja...", pilihan: { a: "Purnawarman", b: "Hayam Wuruk", c: "Raden Patah", d: "Balaputradewa" }, kunci: "b", penjelasan: "Hayam Wuruk memimpin Majapahit pada masa kejayaannya." },
  { soal: "Patih Majapahit yang terkenal dengan Sumpah Palapa adalah...", pilihan: { a: "Gajah Mada", b: "Raden Patah", c: "Purnawarman", d: "Ken Arok" }, kunci: "a", penjelasan: "Gajah Mada adalah patih Majapahit yang terkenal dengan Sumpah Palapa." },
  { soal: "Kerajaan Islam pertama di Indonesia adalah...", pilihan: { a: "Demak", b: "Samudra Pasai", c: "Majapahit", d: "Sriwijaya" }, kunci: "b", penjelasan: "Samudra Pasai di Aceh dikenal sebagai kerajaan Islam pertama di Indonesia." },
  { soal: "Kerajaan Demak terkenal dengan peninggalan...", pilihan: { a: "Candi Borobudur", b: "Masjid Agung Demak", c: "Prasasti Yupa", d: "Candi Prambanan" }, kunci: "b", penjelasan: "Masjid Agung Demak adalah peninggalan terkenal Kerajaan Demak." }
];
