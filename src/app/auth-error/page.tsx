// alis1f/src/app/auth-error/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const message =
    searchParams.get("message") || "Terjadi kesalahan saat otentikasi.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Autentikasi Gagal
      </h1>
      <p className="mb-6 text-gray-700">{message}</p>
      <Link href="/" className="text-blue-500 hover:underline font-semibold">
        Kembali ke Halaman Utama dan Coba Lagi
      </Link>
    </div>
  );
}
