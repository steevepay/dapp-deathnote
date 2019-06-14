import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

/* _____ BUEFY ______ */
import "buefy/dist/buefy.css";
import Buefy from "buefy";
Vue.use(Buefy);
/* ================== */

/* _____ VUELIDATE ______ */
// import Vuelidate from "vuelidate";
// Vue.use(Vuelidate);
/* ================== */

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
