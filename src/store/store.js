import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import * as web3 from "@/services/web3";
import * as dns from "@/services/dns";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    async fetchDeathNotes({ commit }) {
      let deaths = [];
      const nbr = await dns.getDeathsLength();
      for (var id = 0; id < nbr; id++) {
        deaths.push((await dns.getDeath(id))[0]);
      }
      console.log(deaths);
    }
  },
  getters: {
    walletLinked() {
      return !!web3.getWeb3Instance();
    }
  }
});
