const router = require("express").Router();
const chainController = require("../controllers/chainController");

// 노드 연결 상태 테스트
router.get("/ping", chainController.ping);

// 블록 번호 조회
router.get("/blockNumber", chainController.getBlockNumber);

// 서버 지갑 잔액 조회
router.get("/balance", chainController.getServerBalance);

module.exports = router;
