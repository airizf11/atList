// src/auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import type { Adapter } from "next-auth/adapters";
// import type { Session } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

console.log("--- Loading auth.ts ---");
console.log(
  "GOOGLE_CLIENT_ID:",
  !!process.env.GOOGLE_CLIENT_ID ? "Loaded" : "MISSING!"
);
console.log(
  "GOOGLE_CLIENT_SECRET:",
  !!process.env.GOOGLE_CLIENT_SECRET ? "Loaded" : "MISSING!"
);
console.log(
  "DATABASE_URL:",
  !!process.env.DATABASE_URL ? "Loaded" : "MISSING!"
);
console.log(
  "SUPABASE_URL:",
  !!process.env.SUPABASE_URL ? "Loaded" : "MISSING!"
);
console.log(
  "SUPABASE_SERVICE_ROLE_KEY:",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY ? "Loaded" : "MISSING!"
);
console.log("AUTH_SECRET:", !!process.env.AUTH_SECRET ? "Loaded" : "MISSING!");
console.log("------------------------");

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }) as Adapter,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
