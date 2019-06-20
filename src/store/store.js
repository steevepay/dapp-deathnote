import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);
import * as toasters from "@/store/modules/toasters";
import * as loading from "@/store/modules/loading";
import * as web3 from "@/services/web3";
import * as dns from "@/services/dns";
// HELPERS
import { checkDeathObjectValid, range } from "@/store/helpers/deathhelper";

export default new Vuex.Store({
  strict: true,
  modules: {
    toasters,
    loading
  },
  state: {
    // IDS OF THE NOTES
    notes: [],
    // Max of notes per pages.
    maxPerPages: 16,
    // Number of notes has been written in the contract
    notesLength: 0,
    // filter - [latest, oldest]
    filter: "latest"
  },
  mutations: {
    SET_NOTES(state, { start, end }) {
      state.notes = range(start, end);
    },
    ADD_NOTE_BOTTOM(state, id) {
      state.notes.push(id);
    },
    ADD_NOTE_TOP(state, id) {
      state.notes.unshift(id);
    },
    SET_NUMBER_OF_NOTES(state, nbr) {
      state.notesLength = nbr;
    },
    SET_FILTER(state, filter) {
      state.filter = filter;
    }
  },
  actions: {
    async fetchNotesLength({ commit }) {
      return await dns.getDeathsLength().then(nbr => {
        nbr = parseFloat(nbr);
        commit("SET_NUMBER_OF_NOTES", nbr);
        return nbr;
      });
    },
    async fetchNotes({ commit, state }, page) {
      let end;
      let begin;

      if (state.filter === "oldest") {
        begin = (page - 1) * state.maxPerPages;
        if (begin + state.maxPerPages > state.notesLength) {
          end = state.notesLength - 1;
        } else {
          end = begin + state.maxPerPages;
        }
      } else if (state.filter === "latest") {
        begin = state.notesLength - 1 - (page - 1) * state.maxPerPages;
        if (begin - state.maxPerPages > -1) end = begin - state.maxPerPages;
        else end = 0;
      }
      // console.log(begin, end);
      commit("SET_NOTES", {
        start: begin,
        end: end
      });
    },
    // eslint-disable-next-line no-unused-vars
    async fetchNote(context, id) {
      context.dispatch("loading/lstart", "main");
      let resp = await dns.getDeath(id);
      if (resp) {
        resp["idnote"] = id;
      }
      context.dispatch("loading/lend", "main");
      return resp;
    },
    // eslint-disable-next-line no-unused-vars
    async submitNewDeath(context, { name, conditions, date, img, value }) {
      return await dns.addDeath(name, conditions, date, img, value);
    },
    addNewNote({ commit, state }, note) {
      if (checkDeathObjectValid(note)) {
        let id = parseInt(note.id) - 1;
        console.log(router.currentRoute.params);
        if (
          state.filter === "latest" &&
          (router.currentRoute.params.page === undefined ||
            router.currentRoute.params.page === "1")
        ) {
          commit("ADD_NOTE_TOP", id);
        } else if (state.filter === "oldest") {
          commit("ADD_NOTE_BOTTOM", id);
        }
        commit("SET_NUMBER_OF_NOTES", state.notesLength + 1);
      }
    },
    changeFilter({ commit }, filter) {
      if (["latest", "oldest"].includes(filter)) {
        commit("SET_FILTER", filter);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async donateToWriter({ commit }, { to, value }) {
      return await web3.donate(to, value);
    }
  },
  getters: {
    walletLinked: () => {
      return !!web3.getWeb3Instance() && web3.getProvider() !== "infura";
    }
  }
});
