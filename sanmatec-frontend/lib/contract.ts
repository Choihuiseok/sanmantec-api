import { api } from "./api";

export const submitTx = (data: any) =>
  api.post("/contract/submit", data);

export const approveTx = (data: any) =>
  api.post("/contract/approve", data);

export const unlockAsset = (data: any) =>
  api.post("/contract/unlock", data);

export const getVaultState = (vaultAddress: string) =>
  api.get(`/contract/state/${vaultAddress}`);
