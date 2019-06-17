import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import * as toasters from "@/store/modules/toaster";
import * as web3 from "@/services/web3";
import * as dns from "@/services/dns";
// HELPERS
import {
  checkDeathObjectValid,
  checkPageNumber
} from "@/store/helpers/deathhelper";

export default new Vuex.Store({
  strict: true,
  modules: {
    toasters
  },
  state: {
    // Max of notes per pages.
    maxPerPages: 16,
    // Number of notes has been written in the contract
    numberOfDeaths: 0,
    // Deaths fetched
    deaths: [],
    // filter - [latest, oldest]
    filter: "latest",
    // loading on fetching
    loadingStack: [],
    nbrNotesFetching: 0
  },
  mutations: {
    EMPTY_DEATHS_ARRAY(state) {
      state.deaths = [];
    },
    ADD_DEATH_BOTTOM(state, death) {
      state.deaths.push(death);
    },
    ADD_DEATH_TOP(state, death) {
      state.deaths.unshift(death);
    },
    SET_NUMBER_OF_DEATHS(state, nbr) {
      state.numberOfDeaths = nbr;
    },
    SET_FILTER(state, filter) {
      state.filter = filter;
    },
    LOADING_START(state) {
      state.loadingStack.push(0);
    },
    LOADING_END(state) {
      state.loadingStack.pop();
    },
    SET_NUMBER_NOTES_FETCHING(state, nbr) {
      if (nbr !== undefined && nbr !== null && nbr >= 0) {
        state.nbrNotesFetching = nbr;
      }
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

      commit("LOADING_START");
      await dispatch("fetchNumberOfDeathNotes");
      if (checkPageNumber(page, state.numberOfDeaths, state.maxPerPages)) {
        return;
      }

      let end;
      let begin;

      if (state.filter === "oldest") {
        begin = (page - 1) * state.maxPerPages;
        if (begin + state.maxPerPages > state.numberOfDeaths) {
          end = state.numberOfDeaths;
        } else {
          end = begin + state.maxPerPages;
        }

        if (begin < end) {
          commit("SET_NUMBER_NOTES_FETCHING", end - begin);
          commit("EMPTY_DEATHS_ARRAY");
          for (let id = begin; id < end; id++) {
            death = await dns.getDeath(id);
            if (checkDeathObjectValid(death)) {
              commit("ADD_DEATH_BOTTOM", death);
              commit("SET_NUMBER_NOTES_FETCHING", state.nbrNotesFetching - 1);
            }
          }
        }
      } else if (state.filter === "latest") {
        begin = state.numberOfDeaths - 1 - (page - 1) * state.maxPerPages;
        if (begin - state.maxPerPages > -1) end = begin - state.maxPerPages;
        else end = -1;
        commit("SET_NUMBER_NOTES_FETCHING", begin - end);
        commit("EMPTY_DEATHS_ARRAY");
        for (let id = begin; id > end; id--) {
          death = await dns.getDeath(id);
          if (checkDeathObjectValid(death)) {
            commit("ADD_DEATH_BOTTOM", death);
            commit("SET_NUMBER_NOTES_FETCHING", state.nbrNotesFetching - 1);
          }
        }
      }

      commit("SET_NUMBER_NOTES_FETCHING", 0);
      commit("LOADING_END");
    },

    // eslint-disable-next-line no-unused-vars
    async submitNewDeath({ commit }, { name, conditions, date, img, value }) {
      return await dns.addDeath(name, conditions, date, img, value);
    },
    addNewDeath({ commit, state }, death) {
      death["new"] = true;
      if (checkDeathObjectValid(death)) {
        if (state.filter === "latest") {
          commit("ADD_DEATH_TOP", death);
        } else if (state.filter === "oldest") {
          commit("ADD_DEATH_BOTTOM", death);
        }
        commit("SET_NUMBER_OF_DEATHS", state.numberOfDeaths + 1);
      }
    },
    changeFilter({ commit }, filter) {
      if (["latest", "oldest"].includes(filter)) {
        commit("SET_FILTER", filter);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async donateToWriter({ commit }, { from, to, value }) {
      return web3.donate(from, to, value);
    }
  },
  getters: {
    walletLinked: () => {
      return !!web3.getWeb3Instance() && web3.getProvider() !== "infura";
    },
    isLoading: state => {
      return !!state.loadingStack.length;
    }
  }
});
