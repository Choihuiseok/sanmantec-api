"use client";

import { getWallets } from "@/lib/wallet";
import { useEffect, useState } from "react";

export default function WalletList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getWallets("USER_ID_REPLACE");
      setList(res.data);
    })();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">내 지갑 목록</h1>
      {list.map((w: any) => (
        <div className="border p-3 rounded mb-2" key={w.address}>
          {w.address}
        </div>
      ))}
    </div>
  );
}
