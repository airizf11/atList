// alis1f/src/app/auth/callback/page.tsx
"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fetchUserProfile = useAuthStore((state) => state.fetchUserProfile);
  const setAuthError = useAuthStore((state) => state.setError);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    async function handleAuth() {
      if (error) {
        console.error("Authentication Error from Backend:", error);
        setAuthError(`Gagal login: ${error}`);
        router.replace("/");
        return;
      }

      if (token) {
        console.log("Token received from backend, fetching user profile...");
        setLoading(true);
        const profile = await fetchUserProfile(token);
        if (profile) {
          console.log(
            "User profile fetched successfully, redirecting to home."
          );
          router.replace("/");
        } else {
          console.error(
            "Failed to fetch profile even with token, redirecting to home."
          );
          router.replace("/");
        }
      } else {
        console.warn("Auth callback called without token or error.");
        setAuthError("Terjadi kesalahan tak terduga saat proses login.");
        router.replace("/");
      }
    }

    handleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, searchParams, fetchUserProfile, setAuthError, setLoading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-xl font-semibold mb-4">Memproses login Anda...</h1>
      <p className="text-gray-600">Mohon tunggu sebentar.</p>
      {/* Bisa tambah spinner*/}
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <h1 className="text-xl font-semibold mb-4">Loading...</h1>
        </div>
      }
    >
      <AuthCallbackHandler />
    </Suspense>
  );
}
