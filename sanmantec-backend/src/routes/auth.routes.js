const router = require("express").Router();
const authController = require("../controllers/authController");

// 회원가입
router.post("/signup", authController.signup);

// 로그인
router.post("/login", authController.login);

// 토큰 검증
router.get("/verify", authController.verifyToken);

module.exports = router;
