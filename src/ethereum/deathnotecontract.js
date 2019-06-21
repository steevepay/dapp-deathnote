import web3 from "./web3";
import DeathNote from "@/../build/contracts/Deathnote.json";
import store from "@/store/store";

const dnc = new web3.eth.Contract(
  DeathNote.abi,
  process.env.VUE_APP_CONTRACT_ADDRESS
);

if (
  !web3.currentProvider.host ||
  web3.currentProvider.host.indexOf("infura") === -1
) {
  try {
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
          if (event && event.hasOwnProperty("returnValues")) {
            store.dispatch("addNewNote", event.returnValues);
          }
        }
      )
      // eslint-disable-next-line no-unused-vars
      .on("data", event => {
        // console.log(event);
      })
      // eslint-disable-next-line no-unused-vars
      .on("changed", event => {
        // remove event from local database
        // console.log(event);
      })
      .on("error", console.error);
  } catch (err) {
    console.error(err);
  }
}

export default dnc;
