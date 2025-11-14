const { caver } = require("./caver");
const contractABI = require("../contractABI.json");

const contract = new caver.contract(
  contractABI,
  process.env.CONTRACT_ADDRESS
);

module.exports = contract;
