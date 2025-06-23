// src/store/authStore.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

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
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  setMobileSidebarOpen: (isOpen: boolean) => void;

  setAuthData: (token: string, profile: UserProfile) => void;
  clearAuthData: () => void;
  fetchUserProfile: (token: string) => Promise<UserProfile | null>;
  logout: () => Promise<void>;
  initializeAuth: () => void;
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
      isMobileSidebarOpen: false,
      toggleMobileSidebar: () =>
        set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
      setMobileSidebarOpen: (isOpen) => set({ isMobileSidebarOpen: isOpen }),

      /**
       * @param {string | null} error
       */
      setError: (error: string | null) => set({ error, isLoading: false }),

      /**
       * @param {string} token
       * @param {UserProfile} profile
       */
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

      /**
       * @param {string} token
       * @returns {Promise<UserProfile | null>}
       */
      fetchUserProfile: async (token) => {
        if (!token) {
          set({ isLoading: false });
          return null;
        }

        try {
          const response = await fetch(`${BACKEND_URL}/api/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorData = await response
              .json()
              .catch(() => ({ error: "Failed to parse error response" }));
            throw new Error(
              errorData.error ||
                `Failed to fetch profile: ${response.statusText}`
            );
          }

          const profile: UserProfile = await response.json();
          get().setAuthData(token, profile);
          return profile;
        } catch (error: any) {
          console.error("Fetch User Profile Error:", error.message);
          get().clearAuthData();
          set({
            error: "Your session has expired. Please log in again.",
            isLoading: false,
          });
          return null;
        }
      },

      logout: async () => {
        // TODO: In a real-world scenario, you might want to call a backend endpoint
        // to invalidate the token on the server side.
        // e.g., await fetch(`${BACKEND_URL}/auth/logout`, { method: 'POST', headers: { ... } });

        const userName = get().userProfile?.name?.split(" ")[0] || "there";
        toast.success(`See you later, ${userName}!`);

        get().clearAuthData();
        console.log("User logged out.");
      },

      initializeAuth: () => {
        const token = get().alisApiToken;
        if (token) {
          console.log(
            "Auth Initializer: Token found, attempting to fetch user profile..."
          );
          get().fetchUserProfile(token);
        } else {
          set({ isLoading: false });
          console.log(
            "Auth Initializer: No token found. Initialization complete."
          );
        }
      },
    }),
    {
      name: "atlist-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ alisApiToken: state.alisApiToken }),
    }
  )
);
