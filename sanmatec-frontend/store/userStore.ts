"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  token: string | null;
  userId: string | null;
  name: string | null;
  setToken: (token: string) => void;
  setUser: (userId: string, name: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      name: null,

      setToken: (token) => set({ token }),
      setUser: (userId, name) => set({ userId, name }),

      logout: () =>
        set({
          token: null,
          userId: null,
          name: null,
        }),
    }),
    {
      name: "user-store", // localStorage key
    }
  )
);
