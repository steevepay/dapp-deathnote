import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import * as web3 from "@/services/web3";
import * as dns from "@/services/dns";
// HELPERS
import { checkDeathObjectValid } from "@/store/helpers/deathhelper";

export default new Vuex.Store({
  state: {
    numberOfDeaths: 0,
    deaths: []
  },
  mutations: {
    ADD_DEATH(state, death) {
      state.deaths.unshift(death);
    },
    SET_NUMBER_OF_DEATHS(state, nbr) {
      state.numberOfDeaths = nbr;
    }
  },
  actions: {
    async fetchNumberOfDeathNotes({ commit, state }) {
      return await dns.getDeathsLength().then(nbr => {
        commit("SET_NUMBER_OF_DEATHS", nbr);
        console.log(state.numberOfDeaths);
        return nbr;
      });
    },
    async fetchDeathNotes({ commit, state, dispatch }) {
      let death;
      await dispatch("fetchNumberOfDeathNotes");
      for (var id = 0; id < state.numberOfDeaths; id++) {
        death = await dns.getDeath(id);
        if (checkDeathObjectValid(death)) {
          commit("ADD_DEATH", death);
        }
      }
    },
    addNewDeath({ commit, state }, death) {
      death["new"] = true;
      if (checkDeathObjectValid(death)) {
        commit("ADD_DEATH", death);
        commit("SET_NUMBER_OF_DEATHS", state.numberOfDeaths + 1);
      }
    }
  },
  getters: {
    walletLinked() {
      return !!web3.getWeb3Instance();
    }
  }
});
