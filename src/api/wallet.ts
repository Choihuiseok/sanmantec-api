import { get, post } from "./index";

// 지갑 잔액 조회
export const getBalance = (address: string) => {
  return get(`/wallet/balance/${address}`);
};

// KAIA 전송
export const sendKaia = (to: string, amount: string) => {
  return post("/send/sendKaia", { to, amount });
};
