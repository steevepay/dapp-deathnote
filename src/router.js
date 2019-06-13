import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";
const Home = () => import("./views/Home.vue");
const MyNotes = () => import("./views/MyNotes.vue");
const ErrorPage = () => import("./views/Error.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/my-notes",
      name: "my-notes",
      component: MyNotes
    },
    {
      path: "/error/404",
      name: "404",
      component: ErrorPage
    },
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
      },
      beforeEnter: (to, from, next) => {
        store.dispatch("fetchNumberOfDeathNotes").then(totalOfDeath => {
          if (
            to.params.page >
              Math.ceil(totalOfDeath / store.state.maxPerPages) ||
            to.params.page < 1
          ) {
            next("/error/404");
          }
        });
        next();
      }
    }
  ]
});
