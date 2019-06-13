import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import * as web3 from "@/services/web3";
import * as dns from "@/services/dns";
// HELPERS
import { checkDeathObjectValid } from "@/store/helpers/deathhelper";

export default new Vuex.Store({
  state: {
    deaths: []
  },
  mutations: {
    ADD_DEATH(state, death) {
      state.deaths.unshift(death);
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async fetchDeathNotes({ commit, state }) {
      let death;
      if (state.deaths.length === 0) {
        const nbr = await dns.getDeathsLength();
        for (var id = 0; id < nbr; id++) {
          death = await dns.getDeath(id);
          if (checkDeathObjectValid(death)) {
            commit("ADD_DEATH", death);
          }
        }
      }
    },
    addNewDeath({ commit }, death) {
      death["new"] = true;
      if (checkDeathObjectValid(death)) {
        commit("ADD_DEATH", death);
      }
    }
  },
  getters: {
    walletLinked() {
      return !!web3.getWeb3Instance();
    }
  }
});
