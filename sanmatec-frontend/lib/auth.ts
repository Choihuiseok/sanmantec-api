import { api } from "./api";

export const login = (userId: string, password: string) =>
  api.post("/auth/login", { userId, password });

export const signup = (userId: string, password: string, name: string) =>
  api.post("/auth/signup", { userId, password, name });
