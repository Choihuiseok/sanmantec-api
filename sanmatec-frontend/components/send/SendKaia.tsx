"use client";

import { useState } from "react";
import { sendKaia } from "@/lib/send";

export default function SendKaia() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async () => {
    try {
      await sendKaia(to, amount);
      alert("송금 완료");
    } catch {
      alert("송금 실패");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold">KAIA 송금</h1>
      <input className="border p-2 w-full mt-4" placeholder="받는 주소" onChange={(e) => setTo(e.target.value)} />
      <input className="border p-2 w-full mt-4" placeholder="금액" onChange={(e) => setAmount(e.target.value)} />
      <button className="bg-green-600 text-white px-4 py-2 rounded mt-4" onClick={handleSend}>
        송금하기
      </button>
    </div>
  );
}
