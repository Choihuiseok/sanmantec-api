const { caver, wallet } = require("../config/caver");

exports.sendKaia = async (req, res) => {
  try {
    const { to, amount } = req.body;

    if (!to || !amount) {
      return res.status(400).json({ message: "to, amount 필요" });
    }

    const peb = caver.utils.toPeb(amount.toString(), "KAIA");

    const receipt = await caver.rpc.klay.sendTransaction({
      from: wallet.address,
      to,
      value: peb,
      gas: 300000
    });

    res.json({
      ok: true,
      message: "송금 성공",
      txHash: receipt.transactionHash,
      explorer: `https://kairos.kaiascan.io/tx/${receipt.transactionHash}`
    });

  } catch (e) {
    console.error("[송금 실패]", e.message);
    res.status(500).json({ ok: false, error: e.message });
  }
};
