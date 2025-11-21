window.App = window.App || {};

(function () {
  const NAMES_KEY = "walletNames:v1";

  function loadNames() {
    try { return JSON.parse(localStorage.getItem(NAMES_KEY) || "{}"); }
    catch { return {}; }
  }

  function saveNames(obj) {
    try { localStorage.setItem(NAMES_KEY, JSON.stringify(obj)); } catch {}
  }

  App.getWalletName = function (address) {
    const map = loadNames();
    return map[address] || null;
  };

  App.setWalletName = function (address, name) {
    const map = loadNames();
    if (name && name.trim()) map[address] = name.trim();
    else delete map[address];
    saveNames(map);
  };

  App.deleteWalletName = function (address) {
    const map = loadNames();
    if (address in map) { delete map[address]; saveNames(map); }
  };

  App.escapeHtml = function (s) {
    return String(s).replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  };
})();
