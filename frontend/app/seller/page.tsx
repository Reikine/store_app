"use client";
import React, { useEffect, useState } from 'react';
import { Package, Plus, LayoutDashboard, LogOut, User } from 'lucide-react';
import { logoutAction } from '../lib/auth';

export default function SellerPage() {

    const [sellerName, setSellerName] = useState("Penjual");
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            setSellerName(user.name);
        }
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col space-y-8">
                <h2 className="text-2xl font-bold text-blue-600">Seller Store's</h2>

                <nav className="flex flex-col space-y-2">
                    <button className="flex items-center space-y-2 p-3 bg-blue-50 text-blue-600 rounded-xl font-semibold">
                        <LayoutDashboard className="mr-3" size={20} /> Dashboard
                    </button>
                    <button className="flex items-center space-y-2 p-3 text-gray-500 hover:bg-gray-50 rounded-xl transition">
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

                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:bg-blue-700 transition">
                        <Plus className="mr-2" size={20} /> Tambah Produk
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-400 text-sm font-medium">Total Produk</p>
                        <h3 className="text-2xl font-bold mt-1">0</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-400 text-sm font-medium">Pesanan Baru</p>
                        <h3 className="text-2xl font-bold mt-1 text-orange-500">0</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-400 text-sm font-medium">Total Penjualan</p>
                        <h3 className="text-2xl font-bold mt-1 text-green-500">Rp 0</h3>
                    </div>
                </div>

                <div className="mt-10 bg-white p-10 rounded-2xl border border-dashed border-gray-300 text-center">
                    <p className="text-gray-400">Belum ada produk yang dijual. Klik tombol "Tambah Produk" untuk memulai.</p>
                </div>
            </div>
        </div>
    );
}