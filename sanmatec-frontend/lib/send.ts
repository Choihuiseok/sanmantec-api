import { api } from "./api";

export const sendKaia = (to: string, amount: string) =>
  api.post("/send/kaia", {
    to,
    amount,
  });
