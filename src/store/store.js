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
    // IDS OF THE NOTES
    newNotes: [],
    // Max of notes per pages.
    maxPerPages: 16,
    // Number of notes has been written in the contract
    notesLength: 0,
    // filter - [latest, oldest]
    filter: "latest",
    // user public key
    account: null,
    // MY NOTES LENGTH
    myNotesLength: 0,
    // MY NOTES
    myNotes: []
  },
  mutations: {
    SET_NOTES(state, { start, end }) {
      // console.log(start, end);
      // if (start > 0 && end > 0) {
      state.notes = range(start, end);
      // }
    },
    ADD_NEW_NOTE(state, id) {
      state.newNotes.push({
        id: id,
        date: new Date()
      });
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
    },
    SET_ACCOUNT(state, key) {
      state.account = key;
    },
    SET_MY_NOTES_LENGTH(state, length) {
      state.myNotesLength = length;
    },
    SET_MY_NOTES(state, notes) {
      state.myNotes = notes;
    },
    ADD_MY_NOTES(state, note) {
      state.myNotes.push(note);
    }
  },
  actions: {
    async fetchMyNotes({ commit, dispatch }) {
      dispatch("loading/lstart", "main");
      let resp = await dns.getOwnerNotes();

      commit("SET_MY_NOTES", resp);
      dispatch("loading/lend", "main");
      return resp;
    },
    async fetchMyNotesLength({ commit, dispatch }) {
      await dispatch("fetchAccount");
      dispatch("loading/lstart", "main");
      let resp = await dns.getOwnerNotesLength();
      commit("SET_MY_NOTES_LENGTH", parseInt(resp));
      dispatch("loading/lend", "main");
      return resp;
    },
    async fetchAccount({ commit, getters }) {
      if (getters.walletLinked === true) {
        let resp = await web3.getAccount();
        commit("SET_ACCOUNT", resp);
      }
    },
    async fetchNotesLength({ commit, dispatch }) {
      await dispatch("fetchAccount");
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

      // console.log(begin, end, state.notesLength);
      commit("SET_NOTES", {
        start: begin,
        end: end
      });
      // console.log(state.notes);
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
    async addNewNote({ dispatch, commit, state }, note) {
      if (checkDeathObjectValid(note)) {
        let id = parseInt(note.id) - 1;
        if (
          state.filter === "latest" &&
          (router.currentRoute.params.page === undefined ||
            router.currentRoute.params.page === "1")
        ) {
          commit("ADD_NOTE_TOP", id);
        } else if (state.filter === "oldest") {
          commit("ADD_NOTE_BOTTOM", id);
        }
        commit("ADD_NEW_NOTE", id);
        commit("SET_NUMBER_OF_NOTES", state.notesLength + 1);
        await dispatch("fetchAccount");
        if (state.account === note.owner) {
          commit("ADD_MY_NOTES", id + 1);
          commit("SET_MY_NOTES_LENGTH", state.myNotesLength + 1);
        }
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
