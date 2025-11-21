window.App = window.App || {};

(function () {
  App.show = function (viewEl, views) {
    views.forEach(v => v.classList.add('hidden'));
    viewEl.classList.remove('hidden');
  };
})();
