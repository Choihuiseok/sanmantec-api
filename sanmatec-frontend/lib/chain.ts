import { api } from "./api";

export const getBlockNumber = () => api.get("/chain/blockNumber");
