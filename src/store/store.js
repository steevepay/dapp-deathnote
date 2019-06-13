import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import * as web3 from "@/services/web3";
import * as dns from "@/services/dns";
// HELPERS
import { checkDeathObjectValid } from "@/store/helpers/deathhelper";

export default new Vuex.Store({
  state: {
    // Max of notes per pages.
    maxPerPages: 16,
    // Number of notes has been written in the contract
    numberOfDeaths: 0,
    // Deaths fetched
    deaths: []
  },
  mutations: {
    EMPTY_DEATHS_ARRAY(state) {
      state.deaths = [];
    },
    ADD_DEATH(state, death) {
      state.deaths.unshift(death);
    },
    SET_NUMBER_OF_DEATHS(state, nbr) {
      state.numberOfDeaths = nbr;
    }
  },
  actions: {
    async fetchNumberOfDeathNotes({ commit }) {
      return await dns.getDeathsLength().then(nbr => {
        nbr = parseFloat(nbr);
        commit("SET_NUMBER_OF_DEATHS", nbr);
        return nbr;
      });
    },
    async fetchDeathNotes({ commit, state, dispatch }, page) {
      let death;
      if (state.numberOfDeaths === 0) {
        await dispatch("fetchNumberOfDeathNotes");
      }
      if (
        page < 1 ||
        Math.ceil(state.numberOfDeaths / state.maxPerPages) < page
      ) {
        console.log("ERROR PAGE");
        return;
      }

      let end;
      let begin = (page - 1) * state.maxPerPages;
      if (begin + state.maxPerPages > state.numberOfDeaths) {
        end = state.numberOfDeaths;
      } else {
        end = begin + state.maxPerPages;
      }
      if (begin < end) {
        commit("EMPTY_DEATHS_ARRAY");
        for (var id = begin; id < end; id++) {
          death = await dns.getDeath(id);
          if (checkDeathObjectValid(death)) {
            commit("ADD_DEATH", death);
          }
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
