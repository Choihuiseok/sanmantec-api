// 전역 네임스페이스 보장
window.App = window.App || {};

(function () {
  App.API = "https://sanmantec-api.vercel.app";
  App.SEPOLIA_RPCS = [
    "https://eth-sepolia.public.blastapi.io",
    "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
    "https://rpc.ankr.com/eth_sepolia"
  ];
})();
