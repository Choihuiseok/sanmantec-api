import { post } from "./index";

// 컨트랙트 함수 실행 (예: deposit, approve, changeHeir)
export const contractSubmit = (functionName: string, params: any[]) => {
  return post("/contract/submit", {
    functionName,
    params
  });
};
