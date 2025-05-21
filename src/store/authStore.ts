/* eslint-disable @typescript-eslint/no-explicit-any */
// alis1f/src/store/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserProfile {
  id: string;
  email: string;
  name?: string | null;
  avatar_url?: string | null;
  youtube_channel_title?: string | null;
  created_at: string;
}

interface AuthState {
  alisApiToken: string | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  setAuthData: (token: string, profile: UserProfile) => void;
  clearAuthData: () => void;
  fetchUserProfile: (token: string) => Promise<UserProfile | null>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      alisApiToken: null,
      userProfile: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error, isLoading: false }),

      setAuthData: (token, profile) => {
        set({
          alisApiToken: token,
          userProfile: profile,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      clearAuthData: () => {
        set({
          alisApiToken: null,
          userProfile: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      fetchUserProfile: async (token: string): Promise<UserProfile | null> => {
        if (!token) return null;
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${BACKEND_URL}/api/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            if (response.status === 401) {
              get().clearAuthData();
              throw new Error(
                "Sesi tidak valid atau telah berakhir. Silakan login kembali."
              );
            }
            const errorData = await response
              .json()
              .catch(() => ({ error: "Gagal mengambil profil pengguna." }));
            throw new Error(
              errorData.error ||
                `Gagal mengambil profil: ${response.statusText}`
            );
          }

          const profile: UserProfile = await response.json();
          get().setAuthData(token, profile);
          return profile;
        } catch (e: any) {
          console.error("Fetch User Profile Error:", e);
          if (e.message.includes("Sesi tidak valid")) {
            set({ error: e.message, isLoading: false });
          } else {
            set({
              error: `Gagal memuat profil: ${e.message}`,
              isLoading: false,
            });
          }
          return null;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        // TODO: Idealnya, panggil endpoint logout di backend untuk invalidasi token jika ada
        // await fetch(`${BACKEND_URL}/auth/logout`, { method: 'POST', headers: { 'Authorization': `Bearer ${get().alisApiToken}` }});
        get().clearAuthData();
        console.log("User logged out");
      },

      initializeAuth: async () => {
        const token = get().alisApiToken;
        if (token) {
          console.log(
            "Token found in storage, attempting to fetch user profile..."
          );
          await get().fetchUserProfile(token);
        } else {
          set({ isLoading: false });
          console.log("No token found in storage.");
        }
      },
    }),
    {
      name: "alis-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ alisApiToken: state.alisApiToken }),
      // onRehydrateStorage: (state) => { // Dipanggil setelah state di-rehydrate
      //   console.log('AuthStore rehydrated from storage');
      //   // Tidak perlu panggil initializeAuth di sini jika partialize digunakan dengan benar,
      //   // karena kita akan memanggilnya secara manual dari komponen root.
      //   return (state, error) => {
      //     if (error) {
      //       console.error('An error occurred during auth store rehydration:', error)
      //     } else {
      //       // state?.initializeAuth?.(); // Panggil initializeAuth setelah rehydrate jika tidak dipanggil dari root
      //     }
      //   }
      // }
    }
  )
);

// Untuk mempermudah akses tanpa perlu `useAuthStore.getState()` di luar komponen React
// export const getAuthToken = () => useAuthStore.getState().alisApiToken;
// export const initializeAuthOnAppLoad = () = useAuthStore.getState().initializeAuth();
