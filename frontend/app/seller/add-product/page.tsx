"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddProductPage() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
    });

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await axios.post("http://localhost:8080/api/products", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Produk Berhasil Ditambahkan");
            router.push("/seller");
        } catch (error) {
            toast.error("Produk gagal ditambahkan!!");
        }

    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-[#1e293b] rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-slate-400">Tambah Produk Baru</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nama Produk</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Harga</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Stok</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Deskripsi</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-slate-400 py-2 rounded hover:bg-blue-700">
                    Simpan Produk
                </button>
            </form>
        </div>
    );



}