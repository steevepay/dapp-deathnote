// import dnc from "@/ethereum/deathnotecontract";
import web3 from "@/ethereum/web3";

export const getAccounts = async () => {
  let accounts;
  try {
    accounts = await web3.eth.getAccounts();
  } catch (err) {
    console.log(err);
  }
  return accounts;
};

export const getAccount = async () => {
  let accounts;
  try {
    accounts = await web3.eth.getAccounts();
  } catch (err) {
    console.log(err);
  }
  return accounts[0];
};

export const toWei = (value, type) => {
  return web3.utils.toWei(value, type);
};

export const fromWei = (value, type) => {
  return web3.utils.fromWei(value, type);
};

export const getWeb3Instance = () => {
  return web3;
};
