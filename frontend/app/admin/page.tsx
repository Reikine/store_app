"use client";
import { logoutAction } from "../lib/auth";
export default function AdminPage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="border-b border-slate-700 pb-4 mb-8">
                    <h1 className="text-3xl font-extrabold text-purple-400">Control Panel Admin</h1>
                    <p className="text-slate-400">Mode SuperUser Aktif</p>
                </div>
                <button
                    onClick={logoutAction}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold transition duration-200 shadow-lg shadow-red-900/20"
                >Logout</button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <h3 className="font-bold text-xl mb-4 text-purple-300">Daftar Pengguna</h3>
                        <div className="space-y-3">
                            <p className="text-slate-500 italic text-sm text-center py-10">
                                Memuat data seluruh pengguna marketplace......
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <h3 className="font-bold text-xl mb-4 text-purple-300">Log Aktivitas Sistem</h3>
                        <ul className="text-sm space-y-2 text-slate-400">
                            <li>[15:14] User 'Indra' melakukan login</li>
                            <li>[15:14] User 'Lethaa' melakukan login</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}