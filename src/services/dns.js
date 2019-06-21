import deathnote from "@/ethereum/deathnotecontract.js";
// eslint-disable-next-line no-unused-vars
import * as web3 from "@/services/web3";
import store from "@/store/store";

export const getDeath = async _id => {
  let death = undefined;
  try {
    death = await deathnote.methods.getDeath(_id).call();
  } catch (err) {
    store.dispatch("toasters/snackBarError", err);
  }
  return death;
};

export const getDeathsLength = async () => {
  let length;
  try {
    length = await deathnote.methods.getDeathsLength().call();
  } catch (err) {
    store.dispatch("toasters/snackBarError", err);
  }
  return length;
};

export const getDeathFee = async () => {
  let fee;
  try {
    fee = await deathnote.methods.getDeathFee().call();
  } catch (err) {
    store.dispatch("toasters/snackBarError", err);
  }
  return web3.fromWei(fee, "ether");
};

export const setDeathFee = async _fee => {
  let fee;
  const account = await web3.getAccount();
  try {
    fee = await deathnote.methods.setDeathFee(web3.toWei(_fee, "ether")).send({
      from: account
    });
  } catch (err) {
    store.dispatch("toasters/snackBarError", err);
  }
  return fee;
};

export const getDeathsOwner = async _id => {
  let address;
  try {
    address = await deathnote.methods.deathsOwner(_id).call();
  } catch (err) {
    store.dispatch("toasters/snackBarError", err);
  }
  return address;
};

export const getDeathsCounterOwner = async _address => {
  let length;
  try {
    length = await deathnote.methods.deathsCounterOwner(_address).call();
  } catch (err) {
    store.dispatch("toasters/snackBarError", err);
  }
  return length;
};

export const addDeath = async (_name, _conditions, _date, _img, _value) => {
  store.dispatch("loading/lstart", "newdeath");
  const account = await web3.getAccount();
  let resp;
  try {
    resp = await deathnote.methods
      .addDeath(_name, _conditions, _date, _img)
      .send(
        {
          from: account,
          value: web3.toWei(_value, "ether")
        },
        // eslint-disable-next-line no-unused-vars
        (err, transactionHash) => {
          if (!err) {
            store.dispatch("loading/lend", "newdeath");
            store.dispatch("toasters/toastSuccess", {
              message: "The note has been written on the Blockchain!",
              duration: 6000
            });
          } else {
            store.dispatch("toasters/snackBarError", err);
            store.dispatch("loading/lend", "newdeath");
          }
        }
      );
  } catch (err) {
    store.dispatch("toasters/snackBarError", err);
    store.dispatch("loading/lend", "newdeath");
  }
  return resp;
};

export const getContractBalance = async () => {
  let balance;
  try {
    balance = await deathnote.methods.getBalance().call();
  } catch (err) {
    store.dispatch("toasters/snackBarError", err);
  }
  return web3.fromWei(balance, "ether");
};
