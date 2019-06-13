import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import * as web3 from "@/services/web3";
import * as dns from "@/services/dns";

export default new Vuex.Store({
  state: {
    deaths: []
  },
  mutations: {
    ADD_DEATH(state, death) {
      state.deaths.push(death);
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async fetchDeathNotes({ commit }) {
      const nbr = await dns.getDeathsLength();
      for (var id = 0; id < nbr; id++) {
        commit("ADD_DEATH", await dns.getDeath(id));
      }
    },
    addNewDeath({ commit }, death) {
      commit("ADD_DEATH", death);
    }
  },
  getters: {
    walletLinked() {
      return !!web3.getWeb3Instance();
    }
  }
});
