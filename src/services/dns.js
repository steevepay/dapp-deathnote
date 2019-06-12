import deathnote from "@/ethereum/deathnotecontract.js";
// eslint-disable-next-line no-unused-vars
import * as web3 from "@/services/web3";

export const getDeath = async id => {
  let death = undefined;
  try {
    death = await deathnote.methods.deaths(id).call();
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
