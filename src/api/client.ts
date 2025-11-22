// src/api/client.ts

// ==============================
// 🚀 Railway Backend Base URL
// ==============================
export const BASE_URL =
  'https://sanmantec-backend-production.up.railway.app/api';

// ==============================
// 🌐 공용 fetch 래퍼
// ==============================
export async function api(path: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      console.error(`❌ API Error: ${res.status} ${res.statusText}`);
      let errText = await res.text().catch(() => null);
      throw new Error(errText || 'API 요청 실패');
    }

    return res.json();
  } catch (err) {
    console.error('❌ Fetch Error:', err);
    throw err;
  }
}

/* ============================
      AUTH APIs
============================ */

// 회원가입
export function register(email: string, password: string) {
  return api('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// 로그인
export function login(email: string, password: string) {
  return api('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

/* ============================
      WALLET APIs
============================ */

// 지갑 잔액 조회
export function getBalance(address: string) {
  return api(`/wallet/balance/${address}`, {
    method: 'GET',
  });
}

/* ============================
      SEND KAIA APIs
============================ */

// 🔥 백엔드 명세에 맞게 정확하게 수정!
// 백엔드에서는 from을 받지 않음.
export function sendKaia(to: string, amount: string) {
  return api('/send/sendKaia', {
    method: 'POST',
    body: JSON.stringify({ to, amount }),
  });
}

/* ============================
      CHAIN APIs
============================ */

export function getBlockNumber() {
  return api('/chain/blockNumber', { method: 'GET' });
}

/* ============================
      CONTRACT APIs
============================ */

// 컨트랙트 함수 호출
// 백엔드 명세: { functionName, params: [] }
export function submitContract(functionName: string, params: any[]) {
  return api('/contract/submit', {
    method: 'POST',
    body: JSON.stringify({ functionName, params }),
  });
}

/*  ⚠️ 삭제된 API (백엔드에 없음!)
    approveContract 제거
*/
