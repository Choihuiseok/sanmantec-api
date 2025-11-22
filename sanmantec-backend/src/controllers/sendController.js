const axios = require("axios");
const { RPC_URL, KAS_ACCESS_KEY_ID, KAS_SECRET_ACCESS_KEY } = require("../config/env");

exports.sendKaia = async (req, res) => {
  try {
    const { to, amount } = req.body;

    if (!to || !amount)
      return res.status(400).json({ message: "to, amount 필요" });

    const auth = Buffer.from(`${KAS_ACCESS_KEY_ID}:${KAS_SECRET_ACCESS_KEY}`).toString("base64");

    const response = await axios.post(
      `${RPC_URL}/v2/tx/value`,
      {
        to,
        value: String(amount),
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "x-chain-id": "1001",
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ ok: true, txHash: response.data.transactionHash });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "송금 실패",
      error: e.response?.data || e.message,
    });
  }
};
