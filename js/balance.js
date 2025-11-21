window.App = window.App || {};

(function () {
  App.fetchAndRenderBalance = async function (address, targetEl) {
    try {
      const res = await fetch(`${App.API}/api/balance/${address}`);
      const data = await res.json();
      if (data.balance) {
        targetEl.textContent = `${data.balance} KAIA`;
      } else {
        targetEl.textContent = "조회 실패";
      }
    } catch (e) {
      console.warn("[잔액조회 실패]", e.message);
      targetEl.textContent = "조회 실패";
    }
  };
})();
