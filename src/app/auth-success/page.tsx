// atlist1f/src/app/auth-success/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    console.log("Autentikasi berhasil, mengarahkan ke halaman utama...");

    const timer = setTimeout(() => {
      router.push("/");
    }, 6000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Autentikasi Berhasil!
      </h1>
      <p className="mb-2">Anda akan diarahkan kembali ke halaman utama.</p>
      <p className="text-sm text-gray-600 mb-6">
        Jika tidak diarahkan otomatis, klik link di bawah.
      </p>
      <Link href="/" className="text-blue-500 hover:underline font-semibold">
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
}
