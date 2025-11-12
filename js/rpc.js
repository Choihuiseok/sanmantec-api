window.App = window.App || {};

(function () {
  let _cachedProvider = null;

  App.getProvider = async function () {
    const ethers = window.ethers;
    if (_cachedProvider) return _cachedProvider;

    for (const url of App.KAIA_RPCS) {
      try {
        const prov = new ethers.JsonRpcProvider(url, {
          name: "kaia-testnet",
          chainId: 1001,
        });
        const ok = await Promise.race([
          prov.getBlockNumber(),
          new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 3000)),
        ]);
        if (typeof ok === "number") {
          _cachedProvider = prov;
          return prov;
        }
      } catch (e) {
        console.warn("[RPC 실패]", url, e?.message || e);
      }
    }
    throw new Error("모든 Kaia RPC 연결 실패");
  };
})();
