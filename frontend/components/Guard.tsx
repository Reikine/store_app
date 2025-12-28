"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function Guard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!token || !savedUser) {
            setIsVerified(false);
            router.push("/login");
            return;
        }

        try {
            const user = JSON.parse(savedUser);
            if (pathname.startsWith("/seller") && user.role !== "SELLER") {
                router.push("/");
                return;
            }
            if (pathname.startsWith("/admin") && user.role !== "SUPERADMIN") {
                router.push("/");
                return;
            }

            setIsVerified(true);

        } catch (error) {
            localStorage.clear();
            router.push("/login");
        }

    }, [pathname, router]);

    if (!isVerified) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="mt-4 text-slate-400">Memverivikasi Perijinan....</p>
                </div>
            </div>
        );
    }
    return <>{children}</>
}