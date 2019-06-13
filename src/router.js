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
      path: "/:page?",
      name: "home",
      component: Home,
      props: route => {
        let props = {};
        if (route.params.hasOwnProperty("page") && route.params.page) {
          props["page"] = parseInt(route.params.page);
        } else {
          props["page"] = 1;
        }
        return props;
      }
    },
    {
      path: "/my-notes",
      name: "my-notes",
      component: MyNotes
    }
  ]
});
