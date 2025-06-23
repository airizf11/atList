// src/app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Suspense } from "react";

function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fetchUserProfile = useAuthStore((state) => state.fetchUserProfile);
  const setError = useAuthStore((state) => state.setError);

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    async function handleAuthCallback() {
      if (error) {
        console.error("Authentication Error from Backend:", error);
        const errorMessage = "Login failed. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage);
        router.replace("/");
        return;
      }

      if (token) {
        console.log("Token received, fetching user profile...");
        toast.loading("Authenticating your session...", { id: "auth-toast" });

        const profile = await fetchUserProfile(token);

        if (profile) {
          console.log(
            "User profile fetched successfully, redirecting to dashboard."
          );
          toast.success(`Welcome back, ${profile.name?.split(" ")[0]}!`, {
            id: "auth-toast",
          });
          router.replace("/dashboard");
        } else {
          console.error(
            "Failed to fetch profile with token, redirecting to home."
          );
          toast.error("Could not verify your session. Please log in again.", {
            id: "auth-toast",
          });
          router.replace("/");
        }
      } else {
        console.warn("Auth callback page accessed without token or error.");
        const errorMessage = "Invalid authentication callback.";
        setError(errorMessage);
        toast.error(errorMessage);
        router.replace("/");
      }
    }

    handleAuthCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <h1 className="text-xl font-semibold text-foreground">
        Verifying your session...
      </h1>
      <p className="text-muted-foreground">Please wait a moment.</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<CallbackLoadingFallback />}>
      <AuthCallbackHandler />
    </Suspense>
  );
}

function CallbackLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <h1 className="text-xl font-semibold text-foreground">Loading...</h1>
    </div>
  );
}
