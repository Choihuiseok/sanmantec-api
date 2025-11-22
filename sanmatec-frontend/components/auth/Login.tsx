"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useUserStore } from "@/store/userStore";

export default function Login() {
  const { setToken } = useUserStore();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(userId, password);
      setToken(res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("로그인 실패");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-32">
      <h1 className="text-2xl font-bold">로그인</h1>
      <input
        className="border p-2"
        placeholder="User ID"
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white p-2 rounded"
        onClick={handleLogin}
      >
        로그인하기
      </button>
    </div>
  );
}
