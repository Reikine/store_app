"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { logoutAction } from "./lib/auth";

export default function HomePage() {
  const router = useRouter();
  const goToDashboard = () => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      toast.error("Silahkan untuk login dulu")
      return router.push("/login");
    }
    const user = JSON.parse(savedUser);
    if (user.role === "SELLER") {
      router.push("/seller");
    } else if (user.role === "SUPERADMIN") {
      router.push("/admin");
    } else {
      toast.error("Kamu login sebagai Customer");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center px-10">
        <h1 className="text-2xl font-bold text-blue-600">Store's</h1>
        <div className="space-x-6 flex items-center">
          <span className="text-gray-600 cursor-pointer hover:text-blue-500">Kategori</span>
          <span className="text-gray-600 cursor-pointer hover:text-blue-500">Keranjang</span>
          <button
            onClick={goToDashboard}
            className="text-blue-600 font-semibold hover:underline"
          >Dashboard Saya</button>
          <button onClick={logoutAction}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >Logout</button>
        </div>
      </nav>

      <header className="py-10 text-center">
        <h2 className="text-4xl font-extrabold text-black">Selamat datang dan berbelanja</h2>
        <p className="text-gray-500 mt-2">Temukan produk terbaik dengan harga terjangkau</p>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <h3 className="text-xl font-bold mb-6 text-black">Produk Terbaru</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3].map((item) => (
            // PERBAIKAN: bg-white (tadi bg-wgite)
            <div key={item} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="h-40 bg-gray-200 rounded-xl flex items-center justify-center">
                <span className="text-gray-400 text-xs">Gambar Produk {item}</span>
              </div>
              <h4 className="font-semibold text-lg text-black">Nama Produk {item}</h4>
              <p className="text-blue-600 font-bold mt-2">Rp 150.000,00</p>
              <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                Masukan ke keranjang
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}