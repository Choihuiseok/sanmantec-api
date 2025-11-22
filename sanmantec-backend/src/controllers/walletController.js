const pool = require("../config/db");

/**
 * 지갑 저장
 */
exports.saveWallet = async (req, res) => {
  try {
    const { userId, address, keystore } = req.body;

    await pool.query(
      `INSERT INTO wallets (user_id, address, keystore) VALUES ($1, $2, $3)`,
      [userId, address, keystore]
    );

    res.json({ ok: true, message: "지갑 저장 완료" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "지갑 저장 실패" });
  }
};

/**
 * 지갑 리스트 조회
 */
exports.getWallets = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT * FROM wallets WHERE user_id=$1 ORDER BY id DESC`,
      [userId]
    );

    res.json({ ok: true, wallets: result.rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "지갑 조회 실패" });
  }
};

/**
 * 지갑 삭제
 */
exports.deleteWallet = async (req, res) => {
  try {
    const { walletId } = req.params;

    await pool.query(`DELETE FROM wallets WHERE id=$1`, [walletId]);

    res.json({ ok: true, message: "지갑 삭제 완료" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "지갑 삭제 실패" });
  }
};
