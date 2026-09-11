# 📱 FinanceFlow - Dasbor Dompet Digital & Laporan Mutasi Rekening

Aplikasi pengelolaan keuangan personal (*fintech app*) modern berbasis web yang mengintegrasikan sistem **Double-Entry Dynamic Math** untuk kalkulasi arus kas secara *real-time*. Proyek ini dirancang dengan antarmuka **Dark Premium Fintech UI** dan dilengkapi fitur pelacakan waktu otomatis layaknya aplikasi perbankan digital profesional.

## ✨ Fitur Utama
- **Real-Time Balance Calculation:** Otomatis menghitung Sisa Saldo, Uang Masuk (Pemasukan), dan Uang Keluar (Pengeluaran) menggunakan metode kalkulasi array yang ketat.
- **Dynamic State Coloring:** Sistem cerdas yang mendeteksi status keuangan. Jika pengeluaran lebih besar dari pemasukan (saldo minus/tekor), teks saldo utama akan otomatis berubah menjadi warna **merah peringatan**.
- **Automated Timestamp Detection:** Mengubah ID unik transaksi (*timestamp milidetik*) secara otomatis menjadi nama tanggal dan bulan lokal Indonesia (contoh: "7 September") tanpa membebani pengguna untuk mengetik manual.
- **Advanced Array Filtering Mutasi:** Menyediakan tombol filter cepat (*Semua, Masuk, Keluar*) untuk menyaring riwayat mutasi rekening secara kilat menggunakan metode `.filter()` tanpa merusak data asli.
- **Persistent Financial Vault:** Mengintegrasikan enkapsulasi *Local Storage* agar seluruh catatan transaksi tetap aman tersimpan meskipun peramban web ditutup atau laptop dimatikan.

## 🛠️ Konsep IT & Logika Kode yang Diterapkan
1. **Array Methods Chaining (`filter` & `reduce`):** Menggabungkan dua metode array sekaligus untuk menyaring jenis transaksi tertentu lalu menjumlahkan total nominalnya secara bersih dan efisien.
2. **Template Literals Multiline (` `):** Memanfaatkan sintaksis *backtick* untuk memproduksi struktur komponen HTML `<li>` mutasi yang kompleks secara dinamis dan menyisipkan variabel data via `${}`.
3. **Internationalization Formatting (`Intl.NumberFormat`):** Mengubah angka mentah menjadi format mata uang Rupiah resmi (`Rp`) dan memanfaatkan `maximumFractionDigits: 0` untuk membuang angka desimal nol sen di belakang koma.
4. **Array Front-Insertion (`unshift`):** Menggunakan `.unshift()` agar setiap transaksi terbaru yang dicatat otomatis menempati baris paling atas pada riwayat mutasi pengguna.

## 📁 Struktur Folder Proyek
```text
financeflow-app/
│
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
│
├── index.html
└── README.md
```

## 🚀 Cara Menjalankan Proyek
1. Unduh atau kloning repositori ini ke komputer lokal Anda.
2. Buka berkas `index.html` menggunakan peramban web (*browser*) pilihan Anda.
3. Catat pemasukan pertama Anda, kelola pengeluaran Anda dengan bijak, dan pantau kesehatan finansial Anda secara presisi!
