const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const Caver = require("caver-js");
const contractABI = require("./contractABI.json");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://jhyeein.github.io",
      "https://sanmantec-api.vercel.app",
      "http://localhost:5500",
      "http://127.0.0.1:5500",
    ],
    methods: ["GET", "POST"],
  })
);

// --- DB 연결 ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// --- Kaia(KAS) Provider + Wallet 설정 ---
const caver = new Caver(
  new Caver.providers.HttpProvider(process.env.RPC_URL, {
    headers: [
      {
        name: "Authorization",
        value:
          "Basic " +
          Buffer.from(
            process.env.KAS_ACCESS_KEY_ID + ":" + process.env.KAS_SECRET_ACCESS_KEY
          ).toString("base64"),
      },
      { name: "x-chain-id", value: "1001" },
    ],
  })
);

const wallet = caver.wallet.keyring.createFromPrivateKey(process.env.SERVER_PRIVATE_KEY);
caver.wallet.add(wallet);

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const contract = new caver.contract(contractABI, CONTRACT_ADDRESS);

// --- 헬스체크 ---
app.get("/api", (req, res) => {
  res.json({ ok: true, message: "Kaia Testnet API connected!" });
});

// --- 회원가입 ---
app.post("/api/signup", async (req, res) => {
  const { userId, password } = req.body;
  if (!userId || !password)
    return res.status(400).json({ message: "입력값 확인 필요" });
  try {
    const hash = await bcrypt.hash(password, 12);
    await pool.query("INSERT INTO users (user_id, password_hash) VALUES ($1,$2)", [
      userId,
      hash,
    ]);
    res.status(201).json({ message: "회원가입 성공" });
  } catch (e) {
    if (e.code === "23505")
      return res.status(409).json({ message: "이미 존재하는 아이디입니다." });
    console.error(e);
    res.status(500).json({ message: "서버 오류" });
  }
});

// --- 로그인 ---
app.post("/api/login", async (req, res) => {
  const { userId, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE user_id=$1", [userId]);
    const row = result.rows[0];
    if (!row)
      return res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
    const ok = await bcrypt.compare(password, row.password_hash);
    if (!ok)
      return res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
    res.json({ message: "로그인 성공", user: { userId: row.user_id } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "서버 오류" });
  }
});

// --- 지갑 저장 ---
app.post("/api/wallet/save", async (req, res) => {
  const { userId, address, keystore } = req.body;
  if (!userId || !address || !keystore)
    return res.status(400).json({ message: "userId, address, keystore 필요" });
  try {
    await pool.query("INSERT INTO wallets (user_id, address, keystore_json) VALUES ($1,$2,$3)", [
      userId,
      address,
      keystore,
    ]);
    res.json({ message: "지갑 저장 성공", address });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "지갑 저장 실패" });
  }
});

// --- 지갑 목록 조회 ---
app.get("/api/wallets/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: "userId 필요" });
  try {
    const result = await pool.query(
      `SELECT address, keystore_json FROM wallets WHERE user_id = $1 ORDER BY id DESC`,
      [userId]
    );
    res.json({ wallets: result.rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "지갑 목록 조회 실패" });
  }
});

// --- 지갑 삭제 ---
app.post("/api/wallet/delete", async (req, res) => {
  const { userId, password, address } = req.body;
  if (!userId || !password || !address)
    return res.status(400).json({ message: "userId, password, address 필요" });
  try {
    const u = await pool.query("SELECT password_hash FROM users WHERE user_id=$1", [userId]);
    const user = u.rows[0];
    if (!user) return res.status(401).json({ message: "인증 실패" });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: "인증 실패" });
    await pool.query("DELETE FROM wallets WHERE user_id=$1 AND address=$2", [
      userId,
      address,
    ]);
    res.json({ message: "지갑 삭제 완료" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "지갑 삭제 실패" });
  }
});

// --- KAS 기반 잔액 조회 ---
app.get("/api/balance/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const balance = await caver.rpc.klay.getBalance(address);
    const kaia = caver.utils.fromPeb(balance, "KAIA");
    res.json({ balance: kaia });
  } catch (e) {
    console.error("[잔액조회 실패]", e.message);
    res.status(500).json({ message: "잔액조회 실패", error: e.message });
  }
});

// --- 상속지갑 컨트랙트 예시 호출 ---
app.post("/api/contract/submit", async (req, res) => {
  try {
    const { to, value, data } = req.body;
    const receipt = await contract.methods
      .submit(to, value, data)
      .send({ from: wallet.address, gas: 500000 });
    res.json({
      message: "트랜잭션 성공",
      txHash: receipt.transactionHash,
      explorer: `https://kairos.kaiascan.io/tx/${receipt.transactionHash}`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "컨트랙트 호출 실패", error: e.message });
  }
});

// --- Vercel 핸들러 ---
module.exports = (req, res) => app(req, res);
