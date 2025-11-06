window.App = window.App || {};

(function () {
  const API = () => App.API;

  App.apiSignup = async function (userId, password) {
    const res = await fetch(`${API()}/api/signup`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ userId, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "회원가입 실패");
    return data;
  };

  App.apiLogin = async function (userId, password) {
    const res = await fetch(`${API()}/api/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ userId, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "로그인 실패");
    return data;
  };

  App.apiGetWallets = async function (userId) {
    const res = await fetch(`${API()}/api/wallets/${encodeURIComponent(userId)}`);
    const data = await res.json();
    return data.wallets || [];
  };

  App.apiSaveWallet = async function (userId, address, keystore) {
    const res = await fetch(`${API()}/api/wallet/save`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ userId, address, keystore })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "지갑 저장 실패");
    return data; // { address, message? }
  };

  App.apiDeleteWallet = async function (userId, password, address) {
    const res = await fetch(`${API()}/api/wallet/delete`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ userId, password, address })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "삭제 실패");
    return data;
  };
})();
