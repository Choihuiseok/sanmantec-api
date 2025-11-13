window.App = window.App || {};

(function () {
  let _cachedProvider = null;

  App.getProvider = async function () {
    const ethers = window.ethers;
    if (_cachedProvider) return _cachedProvider;

    // Kaia RPC 후보 (KAS Node 포함)
    const urls = [
      "https://node-api.klaytnapi.com/v1/baobab",
      "https://public-en-baobab.kaia.io"
    ];

    for (const url of urls) {
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
