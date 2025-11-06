window.App = window.App || {};

(function () {
  App.validatePassphrase = function (pp) {
    if (!pp) return false;
    const hasLength = pp.trim().length >= 16;
    const hasSpecial = /[^A-Za-z0-9\s]/.test(pp);
    return hasLength && hasSpecial;
  };
})();
