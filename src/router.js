import Vue from "vue";
import Router from "vue-router";
const Home = () => import("./views/Home.vue");
const MyNotes = () => import("./views/MyNotes.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/my-notes",
      name: "my-notes",
      component: MyNotes
    }
  ]
});
