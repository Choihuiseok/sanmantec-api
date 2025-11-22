const router = require("express").Router();
const walletController = require("../controllers/walletController");

// 지갑 생성 → (프론트에서 생성 후 저장)
router.post("/save", walletController.saveWallet);

// 유저 지갑 전체 조회
router.get("/list/:userId", walletController.getWallets);

// 특정 지갑 삭제
router.delete("/:walletId", walletController.deleteWallet);

module.exports = router;
