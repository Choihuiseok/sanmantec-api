const router = require("express").Router();
const sendController = require("../controllers/sendController");

// KAIA 송금
router.post("/kaia", sendController.sendKaia);

// ERC-20 토큰 송금 (필요 시)
router.post("/token", sendController.sendToken);

module.exports = router;
