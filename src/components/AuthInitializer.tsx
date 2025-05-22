// atlist1f/src/components/AuthInitializer.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer() {
  const [initialized, setInitialized] = useState(false);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    if (!initialized) {
      initializeAuth();
      setInitialized(true);
      console.log(
        "AuthInitializer: Authentication state initialization triggered."
      );
    }
  }, [initializeAuth, initialized]);

  return null;
}
