"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"; // Pastikan sudah npm install lucide-react

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "CUSTOMER"
    });

    const onSubmit = async (e: any) => {
        e.preventDefault();

        // Validasi: Cek apakah password cocok
        if (data.password !== data.confirmPassword) {
            return toast.error("Password dan Konfirmasi tidak cocok!");
        }

        try {
            // Kita kirim data (termasuk role) ke backend
            const response = await axios.post("http://localhost:8080/api/register", data);
            if (response.status === 200) {
                toast.success('Selamat! Akun anda berhasil dibuat');
                router.push('/login');
            }
        } catch (err) {
            toast.error('Waduh, terjadi kesalahan saat pendaftaran akun');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50 text-black px-4">
            <form
                onSubmit={onSubmit}
                className="bg-white p-10 rounded-2xl shadow-2xl space-y-5 w-full max-w-md border border-gray-100"
            >
                <div className="text-center mb-2">
                    <h1 className="text-2xl font-bold text-blue-600">Daftar Akun</h1>
                    <p className="text-gray-400 text-sm">Silahkan lengkapi data diri anda</p>
                </div>

                <div className="space-y-4">
                    {/* Input Nama */}
                    <input
                        type="text"
                        placeholder="Nama Lengkap"
                        className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        onChange={e => setData({ ...data, name: e.target.value })}
                        required
                    />

                    {/* Input Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        onChange={e => setData({ ...data, email: e.target.value })}
                        required
                    />

                    {/* Input Password dengan Tombol Mata */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            onChange={e => setData({ ...data, password: e.target.value })}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Input Konfirmasi Password */}
                    <div className="space-y-1">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Ulangi Password"
                            className={`border p-3 w-full rounded-xl outline-none transition-all ${data.confirmPassword && data.password !== data.confirmPassword
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                                }`}
                            onChange={e => setData({ ...data, confirmPassword: e.target.value })}
                            required
                        />
                        {data.confirmPassword && data.password !== data.confirmPassword && (
                            <p className="text-xs text-red-500 ml-1">Password tidak cocok</p>
                        )}
                    </div>

                    {/* Dropdown Role */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-semibold text-gray-500 ml-1">Daftar sebagai:</label>
                        <select
                            className="border border-gray-300 p-3 w-full rounded-xl bg-white cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={data.role}
                            onChange={e => setData({ ...data, role: e.target.value })}
                        >
                            <option value="CUSTOMER">Pembeli (Customer)</option>
                            <option value="SELLER">Penjual (Seller)</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-3 w-full rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg"
                >
                    Daftar Sekarang
                </button>

                <div className="mt-4 text-center text-sm text-gray-500">
                    Sudah punya akun?{" "}
                    <Link href="/login" className="text-blue-600 font-bold hover:underline">
                        Login Disini
                    </Link>
                </div>
            </form>
        </div>
    );
}