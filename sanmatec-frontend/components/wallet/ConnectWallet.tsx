"use client";

import { useState } from "react";
import { saveWallet } from "@/lib/wallet";
import { useUserStore } from "@/store/userStore";

export default function ConnectWallet() {
  const { token } = useUserStore();
  const [address, setAddress] = useState("");

  const handleSave = async () => {
    try {
      await saveWallet("USER_ID_REPLACE", address, "{}");
      alert("지갑 저장 완료");
      window.location.href = "/dashboard";
    } catch (e) {
      alert("저장 실패");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-20">
      <h2 className="text-xl font-bold">지갑 등록</h2>
      <input className="border p-2 w-full mt-4" placeholder="주소" onChange={(e) => setAddress(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4" onClick={handleSave}>
        저장하기
      </button>
    </div>
  );
}
