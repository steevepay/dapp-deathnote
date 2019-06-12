import web3 from "./web3";
import DeathNote from "@/../build/contracts/Deathnote.json";

const dnc = new web3.eth.Contract(
  DeathNote.abi,
  process.env.VUE_APP_CONTRACT_ADDRESS
);

dnc.events
  .NewDeath(
    {
      // filter: {
      //   myIndexedParam: [20, 23],
      //   myOtherIndexedParam: "0x123456789..."
      // }, // Using an array means OR: e.g. 20 or 23
      // fromBlock: 0
    },
    // eslint-disable-next-line no-unused-vars
    (error, event) => {
      // console.log(event);
    }
  )
  // eslint-disable-next-line no-unused-vars
  .on("data", event => {
    console.log(event); // same results as the optional callback above
  })
  // eslint-disable-next-line no-unused-vars
  .on("changed", event => {
    // remove event from local database
    // console.log(event);
  })
  .on("error", console.error);

export default dnc;
