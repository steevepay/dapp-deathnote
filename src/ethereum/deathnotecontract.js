import web3 from "./web3";
import DeathNote from "@/../build/contracts/Deathnote.json";

export default new web3.eth.Contract(
  DeathNote.abi,
  process.env.VUE_APP_CONTRACT_ADDRESS
);
