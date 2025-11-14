const Caver = require("caver-js");

const caver = new Caver(
  new Caver.providers.HttpProvider(process.env.RPC_URL, {
    headers: [
      {
        name: "Authorization",
        value:
          "Basic " +
          Buffer.from(
            process.env.KAS_ACCESS_KEY_ID + ":" + process.env.KAS_SECRET_ACCESS_KEY
          ).toString("base64"),
      },
      { name: "x-chain-id", value: "1001" }
    ],
  })
);

const wallet = caver.wallet.keyring.createFromPrivateKey(
  process.env.SERVER_PRIVATE_KEY
);
caver.wallet.add(wallet);

module.exports = { caver, wallet };
