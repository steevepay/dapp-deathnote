// import dnc from "@/ethereum/deathnotecontract";
import web3 from "@/ethereum/web3";
import store from "@/store/store";

export const getAccounts = async () => {
  let accounts;
  try {
    accounts = await web3.eth.getAccounts();
  } catch (err) {
    store.dispatch("toasters/snackBarError", err);
  }
  return accounts;
};

export const getAccount = async () => {
  let accounts;
  try {
    accounts = await web3.eth.getAccounts();
  } catch (err) {
    store.dispatch("toasters/snackBarError", err);
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

export const donate = async (from, to, value) => {
  let resp;
  try {
    resp = await web3.eth.sendTransaction(
      {
        from: from,
        to: to,
        value: web3.utils.toWei(value, "ether")
      },
      // eslint-disable-next-line no-unused-vars
      (err, transactionHash) => {
        if (!err) {
          store.dispatch("toasters/toastSuccess", {
            message: "🎉 Transaction success 🎉"
          });
        } else {
          store.dispatch("toasters/snackBarError", err);
        }
      }
    );
  } catch (err) {
    store.dispatch("toasters/snackBarError", err);
  }
  return resp;
};

export const isEthAddress = address => {
  return web3.utils.isAddress(address);
};

export const getProvider = () => {
  if (!web3) return "unknown";
  if (web3.currentProvider.isMetaMask) return "metamask";
  if (
    web3.currentProvider.host &&
    web3.currentProvider.host.indexOf("infura") !== -1
  )
    return "infura";
  if (web3.currentProvider.isTrust) return "trust";
  if (web3.currentProvider.isGoWallet) return "goWallet";
  if (web3.currentProvider.isAlphaWallet) return "alphaWallet";
  if (web3.currentProvider.isStatus) return "status";
  if (web3.currentProvider.isToshi) return "coinbase";
  if (typeof window.__CIPHER__ !== "undefined") return "cipher";
  if (web3.currentProvider.constructor.name === "EthereumProvider")
    return "mist";
  if (web3.currentProvider.constructor.name === "Web3FrameProvider")
    return "parity";
  if (
    web3.currentProvider.host &&
    web3.currentProvider.host.indexOf("localhost") !== -1
  )
    return "localhost";
  return "unknown";
};
