import { post } from "./index";

// 회원가입
export const register = (email: string, password: string) => {
  return post("/auth/register", { email, password });
};

// 로그인
export const login = (email: string, password: string) => {
  return post("/auth/login", { email, password });
};
