import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import * as web3 from "@/services/web3.js";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {
    walletLinked() {
      return !!web3.getWeb3();
    }
  }
});
