const Caver = require("caver-js");
const {
  RPC_URL,
  KAS_ACCESS_KEY_ID,
  KAS_SECRET_ACCESS_KEY,
  SERVER_PRIVATE_KEY
} = require("./env");

// KAS 인증 헤더 생성
const auth = Buffer.from(
  `${KAS_ACCESS_KEY_ID}:${KAS_SECRET_ACCESS_KEY}`
).toString("base64");

const caver = new Caver(
  new Caver.providers.HttpProvider(RPC_URL, {
    headers: [
      { name: "Authorization", value: `Basic ${auth}` },
      { name: "x-chain-id", value: "1001" }
    ]
  })
);

// 서버 지갑 등록 (컨트랙트 서명용)
let serverWallet;

try {
  serverWallet = caver.wallet.keyring.createFromPrivateKey(SERVER_PRIVATE_KEY);
  caver.wallet.add(serverWallet);
  console.log("🔑 Server wallet loaded:", serverWallet.address);
} catch (err) {
  console.error("❌ Server wallet load failed:", err);
}

module.exports = {
  caver,
  serverWallet
};
