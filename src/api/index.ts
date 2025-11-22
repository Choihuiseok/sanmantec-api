import axios from "axios";

export const api = axios.create({
  baseURL: "https://sanmantec-backend-production.up.railway.app/api",
  withCredentials: false
});

// 공용 요청 함수 (예: GET)
export const get = async (url: string) => {
  const res = await api.get(url);
  return res.data;
};

// POST 요청 함수
export const post = async (url: string, body: any) => {
  const res = await api.post(url, body);
  return res.data;
};
