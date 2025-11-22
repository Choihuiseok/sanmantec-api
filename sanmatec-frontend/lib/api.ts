import axios from "axios";

export const api = axios.create({
  baseURL: "https://sanmantec-api.vercel.app/api",
  withCredentials: false,
});
