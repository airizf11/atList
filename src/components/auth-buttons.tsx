// src/components/auth-buttons.tsx
"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";

export function SignInButton() {
  return (
    <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
      <LogIn className="mr-2 h-4 w-4" />
      Login with Google
    </Button>
  );
}

export function SignOutButton() {
  return (
    <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
}
