"use client";

import { useState } from "react";
import { signup } from "@/lib/auth";

export default function SignUp() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async () => {
    try {
      await signup(userId, password, name);
      alert("회원가입 완료");
      window.location.href = "/login";
    } catch (err) {
      alert("회원가입 실패");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-32">
      <h1 className="text-2xl font-bold">회원가입</h1>
      <input className="border p-2" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input className="border p-2" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
      <input className="border p-2" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-green-600 text-white p-2 rounded" onClick={handleSignup}>
        회원가입하기
      </button>
    </div>
  );
}
