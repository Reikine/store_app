"use client";
import React, { useEffect, useState } from 'react';
import { Package, Plus, LayoutDashboard, LogOut, User } from 'lucide-react';
import { logoutAction } from '../lib/auth';
import axios from 'axios';
import Link from 'next/link';

export default function SellerPage() {

    const [sellerName, setSellerName] = useState("Penjual");
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            setSellerName(user.name);
            fetchProducts(user.id);
        }
    }, []);

    const fetchProducts = async (userId: string) => {
        try {
            const res = await axios.get("http://localhost:8080/api/products");
            const myProducts = res.data.filter((p: any) => p.user_id === userId);
            setProducts(myProducts);
        } catch (error) {
            console.log("Gagal mengambil produk", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            {/* Sidebar tetap sama ... */}
            <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col space-y-8">
                <h2 className="text-2xl font-bold text-blue-600">Seller Store's</h2>
                <nav className="flex flex-col space-y-2">
                    <button className="flex items-center p-3 bg-blue-50 text-blue-600 rounded-xl font-semibold">
                        <LayoutDashboard className="mr-3" size={20} /> Dashboard
                    </button>
                    <button className="flex items-center p-3 text-gray-500 hover:bg-gray-50 rounded-xl transition">
                        <Package className="mr-3" size={20} /> Produk Saya
                    </button>
                </nav>
                <button onClick={logoutAction} className="mt-auto flex items-center p-3 text-red-500 hover:bg-red-50 rounded-xl transition">
                    <LogOut className="mr-3" size={20} /> Keluar
                </button>
            </div>

            <div className="flex-1 p-10">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold">{sellerName}</h1>
                        <p className="text-gray-500">Pantau perkembangan tokomu hari ini.</p>
                    </div>

                    {/* 4. Bungkus tombol dengan Link ke halaman yang kita buat tadi */}
                    <Link href="/seller/add-product">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:bg-blue-700 transition">
                            <Plus className="mr-2" size={20} /> Tambah Produk
                        </button>
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-400 text-sm font-medium">Total Produk</p>
                        <h3 className="text-2xl font-bold mt-1">{products.length}</h3>
                    </div>
                    {/* ... Card lainnya ... */}
                </div>

                {/* 5. Logic Tampilan Produk */}
                <div className="mt-10">
                    {loading ? (
                        <p className="text-center text-gray-400">Memuat produk...</p>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((p: any) => (
                                <div key={p.ID} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                    <h4 className="font-bold text-lg">{p.name}</h4>
                                    <p className="text-gray-500 text-sm line-clamp-2">{p.description}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-blue-600 font-bold">Rp {p.price.toLocaleString()}</span>
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Stok: {p.stock}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-10 rounded-2xl border border-dashed border-gray-300 text-center">
                            <p className="text-gray-400">Belum ada produk yang dijual. Klik tombol "Tambah Produk" untuk memulai.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}