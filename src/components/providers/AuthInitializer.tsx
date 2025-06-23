// src/components/providers/AuthInitializer.tsx
"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useRef } from "react";

export default function AuthInitializer() {
  const initialized = useRef(false);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    if (!initialized.current) {
      initializeAuth();
      initialized.current = true;
    }
  }, [initializeAuth]);

  return null;
}
