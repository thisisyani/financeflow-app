// ==========================================================================
// 1. STATE & DATA INITIALIZATION (Memori Aplikasi)
// ==========================================================================

// Mengambil data dari brankas browser, jika kosong buat array baru []
let listTransaksi = JSON.parse(localStorage.getItem("finance_flow_data")) || [];
let filterAktif = "semua"; // Status filter yang sedang aktif: semua/pemasukan/pengeluaran

// Ambil elemen HTML (DOM) untuk dimanipulasi
const totalSaldoElement = document.getElementById("total-saldo");
const totalPemasukanElement = document.getElementById("total-pemasukan");
const totalPengeluaranElement = document.getElementById("total-pengeluaran");
const formTransaksi = document.getElementById("form-transaksi");
const daftarTransaksiElement = document.getElementById("daftar-transaksi");

// Jalankan fungsi render pertama kali saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    hitungDanPerbaruiDasbor();
});

// ==========================================================================
// 2. LOGIKA MATEMATIKA KEUANGAN (Kalkulator Otomatis)
// ==========================================================================

function hitungDanPerbaruiDasbor() {
    // 💡 Rumus Akuntansi: Pisahkan dan jumlahkan masing-masing kategori
    
    // Hitung Total Pemasukan menggunakan array method filter dan reduce
    const totalPemasukan = listTransaksi
        .filter(t => t.jenis === "pemasukan")
        .reduce((sum, item) => sum + item.jumlah, 0);

    // Hitung Total Pengeluaran
    const totalPengeluaran = listTransaksi
        .filter(t => t.jenis === "pengeluaran")
        .reduce((sum, item) => sum + item.jumlah, 0);

    // Rumus Akhir: Saldo = Pemasukan - Pengeluaran
    const saldoAkhir = totalPemasukan - totalPengeluaran;

    // 🎨 FORMAT RUPIAH INTERNASIONAL: Mengubah angka 50000 menjadi Rp 50.000
    totalPemasukanElement.innerText = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalPemasukan);
    totalPengeluaranElement.innerText = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalPengeluaran);
    
    const formatSaldo = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(saldoAkhir);
    totalSaldoElement.innerText = formatSaldo;

    // 🔴 DYNAMIC STATE COLORING: Jika saldo minus (tekor), ubah teks jadi merah
    if (saldoAkhir < 0) {
        totalSaldoElement.style.color = "#ef4444"; // Merah Peringatan
    } else {
        totalSaldoElement.style.color = "#ffffff"; // Putih Normal (Nanti disesuaikan di CSS)
    }

    // Gambar ulang tabel mutasi sesuai filter yang sedang dipilih
    tampilkanRiwayatMutasi();
}

// ==========================================================================
// 3. MANIPULASI DOM: MENAMPILKAN MUTASI TRANSAKSI
// ==========================================================================

function tampilkanRiwayatMutasi() {
    // 1. Bersihkan area daftar mutasi agar tidak menumpuk
    daftarTransaksiElement.innerHTML = "";

    // 2. Saring data berdasarkan filter yang aktif
    let transaksiDisaring = listTransaksi;
    if (filterAktif !== "semua") {
        transaksiDisaring = listTransaksi.filter(t => t.jenis === filterAktif);
    }

    // 3. Jika kosong, tampilkan pesan informatif
    if (transaksiDisaring.length === 0) {
        daftarTransaksiElement.innerHTML = `<li class="pesan-kosong">Belum ada mutasi transaksi untuk kategori ini.</li>`;
        return;
    }

    // 4. KODE TUNGGAL FOREACH (Sudah bersih dari duplikasi)
    transaksiDisaring.forEach(item => {
        const li = document.createElement("li");
        li.className = `item-mutasi ${item.jenis}`;

        // Mengubah ID (Timestamp) menjadi nama Bulan & Tanggal otomatis
        const waktuSelesai = new Date(item.id);
        const opsiWaktu = { day: 'numeric', month: 'long' }; 
        const tanggalDanBulan = new Intl.DateTimeFormat('id-ID', opsiWaktu).format(waktuSelesai);

        // Format angka jumlah mata uang
        const formatJumlah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(item.jumlah);
        const simbol = item.jenis === "pemasukan" ? "+" : "-";

        // Menggabungkan struktur HTML ke dalam li
        li.innerHTML = `
            <div class="info-mutasi">
                <span class="deskripsi-item">${item.deskripsi}</span>
                <span class="tanggal-item">${tanggalDanBulan}</span>
            </div>
            <div class="angka-mutasi">
                <span class="nominal-item">${simbol} ${formatJumlah}</span>
                <button class="btn-hapus-transaksi" onclick="hapusTransaksi(${item.id})">❌</button>
            </div>
        `;
        
        // Kirim li yang sudah jadi ke dalam element ul di HTML
        daftarTransaksiElement.appendChild(li);
    });
}

// ==========================================================================
// 4. OPERASI DATA (TAMBAH & HAPUS TRANSAKSI)
// ==========================================================================

function tambahTransaksi(event) {
    event.preventDefault(); // Cegah halaman reload saat submit form

    // Ambil nilai mentah dari input formulir
    const deskripsi = document.getElementById("input-deskripsi").value.trim();
    const jumlah = parseInt(document.getElementById("input-jumlah").value);
    const jenis = document.getElementById("input-jenis").value;

    // 🔒 SMART VALIDATION: Validasi keamanan data angka
    if (!deskripsi || isNaN(jumlah) || jumlah <= 0 || !jenis) {
        alert("Mohon isi seluruh formulir dengan data yang valid ya, Mita!");
        return;
    }

    // Bungkus data ke dalam objek terstruktur
    const transaksiBaru = {
        id: Date.now(), // Generate ID unik berbasis timestamp milidetik
        deskripsi: deskripsi,
        jumlah: jumlah,
        jenis: jenis
    };

    // Masukkan ke array utama di baris paling depan (terbaru muncul di atas)
    listTransaksi.unshift(transaksiBaru);

    // Amankan ke Local Storage
    localStorage.setItem("finance_flow_data", JSON.stringify(listTransaksi));

    // Reset formulir input agar bersih kembali
    formTransaksi.reset();

    // Hitung ulang saldo dan perbarui layar dasbor
    hitungDanPerbaruiDasbor();
}

function hapusTransaksi(id) {
    // Saring array: Buang data yang ID-nya cocok dengan yang ingin dihapus
    listTransaksi = listTransaksi.filter(item => item.id !== id);

    // Update Local Storage
    localStorage.setItem("finance_flow_data", JSON.stringify(listTransaksi));

    // Hitung ulang saldo dan perbarui layar dasbor
    hitungDanPerbaruiDasbor();
}

// ==========================================================================
// 5. FITUR TOMBOL FILTER MUTASI PINTAR
// ==========================================================================

function filterMutasi(kategori, event) {
    filterAktif = kategori;

    // Atur visual tombol aktif
    const semuaTombolFilter = document.querySelectorAll(".btn-filter");
    semuaTombolFilter.forEach(btn => btn.classList.remove("aktif"));
    event.target.classList.add("aktif");

    // Gambar ulang riwayat mutasi berdasarkan filter baru
    tampilkanRiwayatMutasi();
}
