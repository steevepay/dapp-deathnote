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
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
/* ================== */

/* _____ SKELETON ______ */
import VueSkeletonLoading from "vue-skeleton-loading";
Vue.use(VueSkeletonLoading);
/* ================== */

/* _____ CLIPBOARD ______ */
import Clipboard from "v-clipboard";
Vue.use(Clipboard);
/* ================== */

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
