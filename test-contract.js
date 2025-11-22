const Caver = require("caver-js");
require("dotenv").config();
const contractABI = require("./api/contractABI.json");

(async () => {
  console.log("🟡 환경변수 확인 시작...");
  console.log("RPC_URL:", process.env.RPC_URL);
  console.log("ACCESS_KEY:", process.env.KAS_ACCESS_KEY_ID);
  console.log("SECRET_KEY:", process.env.KAS_SECRET_ACCESS_KEY ? "(있음)" : "(없음)");
  console.log("PRIVATE_KEY:", process.env.SERVER_PRIVATE_KEY ? "(있음)" : "(없음)");
  console.log("CONTRACT_ADDRESS:", process.env.CONTRACT_ADDRESS);
  console.log("------------------------------------");

  try {
    console.log("🚀 Kaia Testnet 연결 테스트 중...");

    const auth =
      "Basic " +
      Buffer.from(
        process.env.KAS_ACCESS_KEY_ID + ":" + process.env.KAS_SECRET_ACCESS_KEY
      ).toString("base64");

    const caver = new Caver(
      new Caver.providers.HttpProvider(process.env.RPC_URL, {
        headers: [
          { name: "Authorization", value: auth },
          { name: "x-chain-id", value: "1001" },
        ],
      })
    );

    const wallet = caver.wallet.keyring.createFromPrivateKey(process.env.SERVER_PRIVATE_KEY);
    caver.wallet.add(wallet);

    const contract = new caver.contract(contractABI, process.env.CONTRACT_ADDRESS);

    const blockNumber = await caver.rpc.klay.getBlockNumber();
    console.log(`✅ 연결 성공! 현재 블록번호: ${blockNumber}`);
    console.log("✅ 컨트랙트 주소:", contract._address);
    console.log("✅ 지갑 주소:", wallet.address);
    console.log("함수 목록:", Object.keys(contract.methods));
  } catch (err) {
    console.error("❌ 에러 발생:", err);
  }
})();
