import { api } from "./api";

export const saveWallet = (userId: string, address: string, keystore: any) =>
  api.post("/wallet/save", {
    userId,
    address,
    keystore,
  });

export const getWallets = (userId: string) =>
  api.get(`/wallet/list/${userId}`);
