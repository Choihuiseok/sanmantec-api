const express = require("express");
const cors = require("cors");
require("dotenv").config();

// --- CONFIG ---
const pool = require("./config/db");
const { caver, wallet } = require("./config/caver");
const contract = require("./config/contract");

// --- CONTROLLERS ---
const auth = require("./controllers/authController");
const walletCtrl = require("./controllers/walletController");
const chain = require("./controllers/chainController");
const contractCtrl = require("./controllers/contractController");
const test = require("./controllers/testController");

// ----------------------------------------
const app = express();
app.use(express.json());

// --- CORS ---
app.use(
  cors({
    origin: [
      "https://jhyeein.github.io",
      "https://sanmantec-api.vercel.app",
      "http://localhost:5500",
      "http://127.0.0.1:5500"
    ],
    methods: ["GET", "POST"]
  })
);

// ----------------------------------------
// 헬스체크
app.get("/api", test.health);
app.get("/api/test-kas", test.testKAS);

// ----------------------------------------
// Auth
app.post("/api/signup", auth.signup);
app.post("/api/login", auth.login);

// ----------------------------------------
// Wallet
app.post("/api/wallet/save", walletCtrl.saveWallet);
app.get("/api/wallets/:userId", walletCtrl.getWallets);
app.post("/api/wallet/delete", walletCtrl.deleteWallet);

// ----------------------------------------
// Chain (Balance)
app.get("/api/balance/:address", chain.getBalance);

// ----------------------------------------
// Contract
app.post("/api/contract/submit", contractCtrl.submitTx);
//send
app.use("/api", require("./routes/send"));
// ----------------------------------------
// Vercel Serverless Handler
module.exports = (req, res) => app(req, res);
