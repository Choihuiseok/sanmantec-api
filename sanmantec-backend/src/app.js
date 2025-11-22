const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const walletRoutes = require("./routes/wallet.routes");
const contractRoutes = require("./routes/contract.routes");
const sendRoutes = require("./routes/send.routes");
const chainRoutes = require("./routes/chain.routes");

const app = express();

// 공통 미들웨어
app.use(cors());
app.use(express.json());

// 라우터 엔드포인트
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/contract", contractRoutes);
app.use("/api/send", sendRoutes);
app.use("/api/chain", chainRoutes);

// 기본 healthcheck (Railway/Render 정상 동작 테스트용)
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Sanmantec Backend API OK" });
});

module.exports = app;
