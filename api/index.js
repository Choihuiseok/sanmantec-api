const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://sanmantec-api.vercel.app"
    ],
    methods: ["GET", "POST"]
  })
);

// 라우터 연결
app.use("/api", require("./routes/test"));                  // 헬스체크
app.use("/api/auth", require("./routes/auth"));             // 회원가입/로그인
app.use("/api/wallet", require("./routes/wallet"));         // 지갑 저장/조회/삭제
app.use("/api/chain", require("./routes/chain"));           // KAIA 잔액 조회
app.use("/api/contract", require("./routes/contract"));     // 컨트랙트 submit

// Vercel Serverless Handler
module.exports = (req, res) => app(req, res);
