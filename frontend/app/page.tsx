"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { logoutAction } from "./lib/auth";

export default function HomePage() {
  interface Product {
    ID: number;
    name: string;
    price: number;
    user?: {
      name: string;
      role: string;
    };
  }

  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ambilDataDariGo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/api/products", {
        cache: "no-store"
      });
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      toast.error("Gagal memuat data...");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    ambilDataDariGo();
  }, []);

  const goToDashboard = () => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      toast.error("Silahkan untuk login dulu");
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
          <button onClick={goToDashboard} className="text-blue-600 font-semibold hover:underline">
            Dashboard Saya
          </button>
          <button onClick={logoutAction} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <h3 className="text-xl font-bold mb-6 text-black">Produk Terbaru</h3>
        {isLoading ? (
          <div className="text-center py-20 text-blue-600 font-bold">Sedang memuat produk...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div key={item.ID} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 ">
                <div className="h-40 bg-gray-200 rounded-xl flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Gambar {item.name}</span>
                </div>
                <h4 className="font-semibold text-lg text-black">{item.name}</h4>
                <p className="text-xs text-gray-500">Penjual: <span className="font-semibold text-blue-500">{item.user?.name || "Setya Store's"}</span></p>
                <p className="text-blue-600 font-bold mt-2">
                  Rp {item.price?.toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}