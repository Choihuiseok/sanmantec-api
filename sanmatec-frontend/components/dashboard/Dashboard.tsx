"use client";

import { useWalletStore } from "@/store/walletStore";
import Link from "next/link";

export default function Dashboard() {
  const { wallets } = useWalletStore();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">대시보드</h1>

      <div className="flex gap-4 mt-6">
        <Link href="/wallet/create" className="bg-blue-600 text-white px-4 py-2 rounded">
          지갑 생성
        </Link>

        <Link href="/wallet/list" className="bg-gray-600 text-white px-4 py-2 rounded">
          내 지갑 목록
        </Link>

        <Link href="/send/kaia" className="bg-green-600 text-white px-4 py-2 rounded">
          KAIA 송금
        </Link>
      </div>

      <h2 className="text-lg font-bold mt-10">보유 지갑</h2>
      <div className="mt-4">
        {wallets.length === 0 && <p>지갑이 없습니다.</p>}
        {wallets.map((w) => (
          <div key={w.address} className="border p-3 my-2 rounded">
            {w.address}
          </div>
        ))}
      </div>
    </div>
  );
}
