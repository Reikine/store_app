# 🛒 Riku Mart - Fullstack Marketplace Engineering

Proyek ini terdiri dari dua bagian utama: **Backend (Golang)** dan **Frontend (Next.js)**.

---

## 🖥️ BACKEND (Golang Version)
*Pusat kendali backend berperforma tinggi.*

### Teknologi Utama
- **Framework:** Gin Gonic
- **ORM:** GORM (PostgreSQL)
- **Security:** Bcrypt & JWT

### API Endpoints
| Method | Endpoint | Fungsi | Akses |
| :--- | :--- | :--- | :--- |
| GET | `/status` | Cek status kesehatan API | Public |
| POST | `/api/register` | Pendaftaran user baru | Public |
| POST | `/api/login` | Login & dapatkan Token JWT | Public |

---

## 🎨 FRONTEND (Next.js Version)
*Antarmuka pengguna yang modern dan responsif.*

### Sistem Otentikasi & Guard (Penting!)
Kami menggunakan sistem **Client-Side Guard** untuk memproteksi halaman berdasarkan Role user:

1. **Proteksi Seller (`/seller`)**: Hanya user dengan role `SELLER` yang diizinkan.
2. **Proteksi Admin (`/admin`)**: Hanya user dengan role `SUPERADMIN` yang diizinkan.

### Alur Kerja Session
- Data **token** dan **user** disimpan di `localStorage`.
- Menggunakan `setTimeout` (50-100ms) saat login untuk sinkronisasi data sebelum pindah halaman.
- `middleware.ts` dinonaktifkan sementara untuk menghindari konflik navigasi.

---

## 🛠️ Cara Menjalankan Project

### 1. Backend
```bash
cd marketplace-backend
go mod tidy
go run main.go

## 🚀 Update Log - [31 Desember 2025]

### Backend (Golang & Gin)
- **Middleware Auth**: Implementasi JWT Middleware untuk memproteksi endpoint sensitif.
- **Product Management**: 
  - Membuat model `Product` dengan relasi ke `User`.
  - Membuat endpoint `POST /api/products` untuk tambah barang (Protected).
  - Membuat endpoint `GET /api/products` dengan `Preload("User")` untuk mengambil semua produk beserta data penjualnya.
- **Database**: Sinkronisasi tabel otomatis menggunakan GORM AutoMigrate.

### Frontend (Next.js & Tailwind)
- **Seller Dashboard**: 
  - Implementasi *fetching* data produk secara dinamis menggunakan Axios.
  - Fitur filter produk agar seller hanya melihat barang miliknya sendiri.
  - Integrasi state management untuk *loading* dan *data display*.
- **Navigation**: Menghubungkan dashboard ke halaman tambah produk.