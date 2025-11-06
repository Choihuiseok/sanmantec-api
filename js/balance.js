window.App = window.App || {};

(function () {
  App.fetchAndRenderBalance = async function (address, targetEl) {
    const ethers = window.ethers;
    try {
      const provider = await App.getProvider();
      const bal = await provider.getBalance(address);
      targetEl.textContent = `${ethers.formatEther(bal)} ETH`;
    } catch (e) {
      console.warn("[잔액조회 실패]", e?.message || e);
      targetEl.textContent = "조회 실패";
    }
  };
})();
