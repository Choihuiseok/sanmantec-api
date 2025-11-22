"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Wallet {
  address: string;
  keystore?: any;
}

interface WalletState {
  wallets: Wallet[];
  setWallets: (w: Wallet[]) => void;
  addWallet: (w: Wallet) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      wallets: [],

      setWallets: (wallets) => set({ wallets }),

      addWallet: (wallet) =>
        set((state) => ({
          wallets: [...state.wallets, wallet],
        })),
    }),
    {
      name: "wallet-store",
    }
  )
);
