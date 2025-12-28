"use client";
import { User, Seller, SuperAdmin } from "@/lib/userClasses";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserResponse {
    id: string,
    name: string,
    role: "CUSTOMER" | "SELLER" | "SUPERADMIN";
}

export default function LoginPage() {
    const [data, setData] = useState({ email: "", password: "" });
    const router = useRouter();

    const onLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/login", {
                email: data.email,
                password: data.password
            });

            if (response.status === 200) {
                const { user, token } = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                toast.success(`Selamat datang, ${user.name} `);
                if (user.role === "SUPERADMIN") {
                    router.push("/admin");
                } else if (user.role === "SELLER") {
                    router.push("/seller");
                } else {
                    router.push("/");
                }

            }
        } catch (err: any) {
            toast.error("Gagal Login: " + (err.response?.data?.error || "Error"));
        }
    };
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 text-black">
            <form onSubmit={onLogin} className="bg-white p-8 rounded shadow-xl space-y-4 w-96 border border-gray-200">
                <h1 className="text-2xl font-bold text-center mb-6">Login Marketplace</h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={e => setData({ ...data, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={e => setData({ ...data, password: e.target.value })}
                    required
                />
                <button type="submit" className="bg-blue-600 text-white p-3 w-full rounded font-bold hover:bg-blue-700 transition duration-200">
                    Masuk
                </button>
                <div className="mt-6 text-center text-sm text-gray-600">
                    Belum punya akun?{" "}
                    <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                        Daftar di sini
                    </Link>
                </div>
            </form>
        </div>
    );
}