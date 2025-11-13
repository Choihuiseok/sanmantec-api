import { ethers } from "ethers";
import fs from "fs";

// Kaia Kairos (Testnet)
const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io", {
  name: "kairos",
  chainId: 1001
});

// 컨트랙트 주소 (네 배포 주소)
const CONTRACT_ADDRESS = "0xc4039f1f1e6f0f3c1edd07b37a9e525ccd4b6e6c";

// ABI 파일 불러오기 (InheritanceWallet.sol을 Remix에서 compile하면 나오는 ABI)
const abi = JSON.parse(fs.readFileSync("./contractABI.json", "utf8"));

// provider 연결
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

async function main() {
  console.log("🔍 Checking contract state...");

  const owner = await contract.owner();
  const state = await contract.state();
  console.log("✅ Owner:", owner);
  console.log("✅ State:", state.toString());
}

main().catch(console.error);
