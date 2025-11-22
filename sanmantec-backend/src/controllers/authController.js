const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const pool = require("../config/db");

/**
 * 회원가입
 */
exports.signup = async (req, res) => {
  try {
    const { userId, password, name } = req.body;

    if (!userId || !password)
      return res.status(400).json({ message: "아이디/비밀번호 필요" });

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (user_id, password, name) VALUES ($1, $2, $3)`,
      [userId, hashed, name]
    );

    res.json({ ok: true, message: "회원가입 완료" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "회원가입 실패" });
  }
};

/**
 * 로그인
 */
exports.login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const result = await pool.query(
      `SELECT * FROM users WHERE user_id=$1 LIMIT 1`,
      [userId]
    );

    if (result.rows.length === 0)
      return res.status(400).json({ message: "유저 없음" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "비밀번호 불일치" });

    const token = jwt.sign({ userId: user.user_id });

    res.json({ ok: true, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "로그인 실패" });
  }
};

/**
 * 토큰 검증
 */
exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ ok: false, message: "토큰 필요" });

    const decoded = jwt.verify(token);

    res.json({ ok: true, userId: decoded.userId });
  } catch (e) {
    res.status(401).json({ ok: false, message: "토큰 검증 실패" });
  }
};
