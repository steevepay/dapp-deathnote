import deathnote from "@/ethereum/deathnotecontract.js";
// eslint-disable-next-line no-unused-vars
import * as web3 from "@/services/web3";

export const getDeath = async _id => {
  let death = undefined;
  try {
    death = await deathnote.methods.getDeath(_id).call();
  } catch (err) {
    console.log(err);
  }
  return death;
};

export const getDeathsLength = async () => {
  let length;
  try {
    length = await deathnote.methods.getDeathsLength().call();
  } catch (err) {
    console.log(err);
  }
  return length;
};

export const getDeathFee = async () => {
  let fee;
  try {
    fee = await deathnote.methods.getDeathFee().call();
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
  return fee;
};

export const getDeathsOwner = async _id => {
  let address;
  try {
    address = await deathnote.methods.deathsOwner(_id).call();
  } catch (err) {
    console.log(err);
  }
  return address;
};

export const getDeathsCounterOwner = async _address => {
  let length;
  try {
    length = await deathnote.methods.deathsCounterOwner(_address).call();
  } catch (err) {
    console.log(err);
  }
  return length;
};

export const addDeath = async (_name, _conditions, _date, _img, _value) => {
  const account = await web3.getAccount();
  try {
    await deathnote.methods.addDeath(_name, _conditions, _date, _img).send({
      from: account,
      value: _value
    });
  } catch (err) {
    console.log(err);
  }
};

export const getContractBalance = async () => {
  let balance;
  try {
    balance = await deathnote.methods.getBalance().call();
  } catch (err) {
    console.log(err);
  }
  return web3.fromWei(balance, "ether");
};
