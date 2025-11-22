// src/api/client.ts

// ==============================
// 🚀 Railway Backend Base URL
// ==============================
export const BASE_URL =
  "https://sanmantec-backend-production.up.railway.app/api";

// ==============================
// 🌐 공용 fetch 래퍼
// ==============================
export async function api(path: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      console.error(`❌ API Error: ${res.status} ${res.statusText}`);
      let errText = await res.text().catch(() => null);
      throw new Error(errText || "API 요청 실패");
    }

    return res.json();
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    throw err;
  }
}

/* ============================
      AUTH APIs
============================ */

// 회원가입
export function register(email: string, password: string) {
  return api("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// 로그인
export function login(email: string, password: string) {
  return api("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/* ============================
      WALLET APIs
============================ */

// 지갑 잔액 조회 (백엔드에 실제 라우트 없으면 제거해야 함!)
export function getBalance(address: string) {
  return api(`/wallet/balance/${address}`, {
    method: "GET",
  });
}

/* ============================
      SEND KAIA APIs
============================ */

// 카이아 전송 — 백엔드 경로 정확히 맞춤
export function sendKaia(from: string, to: string, amount: string) {
  return api("/send/kaia", {
    method: "POST",
    body: JSON.stringify({ from, to, amount }),
  });
}

/* ============================
      CHAIN APIs
============================ */

export function getBlockNumber() {
  return api("/chain/blockNumber", { method: "GET" });
}

/* ============================
      CONTRACT APIs
============================ */

// 컨트랙트 서류 제출
export function submitContract(data: any) {
  return api("/contract/submit", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 서류 승인(필요 시)
export function approveContract(data: any) {
  return api("/contract/approve", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
