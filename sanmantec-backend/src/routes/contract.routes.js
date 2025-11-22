const router = require("express").Router();
const contractController = require("../controllers/contractController");

// 컨트랙트 상태 조회
router.get("/state/:vaultAddress", contractController.getState);

// 컨트랙트 트랜잭션 submit
router.post("/submit", contractController.submitTx);

// 승인 (approve)
router.post("/approve", contractController.approveTx);

// 상속 unlock
router.post("/unlock", contractController.unlockAsset);

module.exports = router;
