const { caver, serverWallet } = require("../config/caver");

exports.ping = async (req, res) => {
  return res.json({ ok: true, message: "Chain Alive" });
};

exports.getBlockNumber = async (req, res) => {
  try {
    const block = await caver.rpc.klay.getBlockNumber();
    res.json({ ok: true, block });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

exports.getServerBalance = async (req, res) => {
  try {
    const balance = await caver.rpc.klay.getBalance(serverWallet.address);
    res.json({
      ok: true,
      address: serverWallet.address,
      balance: caver.utils.fromPeb(balance, "KLAY"),
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};
