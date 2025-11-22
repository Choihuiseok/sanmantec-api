const { caver, serverWallet } = require("../config/caver");

exports.getState = async (req, res) => {
  try {
    const { vaultAddress } = req.params;

    const contract = new caver.contract(
      require("../../abi/SanmantecVault.json"),
      vaultAddress
    );

    const state = await contract.methods.currentState().call();

    res.json({ ok: true, state });
  } catch (e) {
    res.status(500).json({ message: "컨트랙트 상태 조회 실패", error: e.message });
  }
};

exports.submitTx = async (req, res) => {
  try {
    const { contractAddress, method, params } = req.body;

    const contract = new caver.contract(
      require("../../abi/SanmantecVault.json"),
      contractAddress
    );

    const tx = await contract.methods[method](...params).send({
      from: serverWallet.address,
      gas: 500000,
    });

    res.json({ ok: true, tx });
  } catch (e) {
    res.status(500).json({ message: "컨트랙트 호출 실패", error: e.message });
  }
};

exports.approveTx = exports.submitTx;
exports.unlockAsset = exports.submitTx;
