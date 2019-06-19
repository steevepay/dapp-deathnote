import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";
const Home = () => import("./views/Home.vue");
const Notes = () => import("./views/MyNotes.vue");
const ErrorPage = () => import("./views/Error.vue");
const Note = () => import("./views/Note.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/my-notes",
      name: "my-notes",
      component: Notes
    },
    {
      path: "/error/404",
      name: "404",
      component: ErrorPage
    },
    {
      path: "/note/:id?",
      name: "note",
      component: Note,
      props: route => {
        let props = {};
        if (route.params.hasOwnProperty("id") && route.params.id) {
          props["id"] = parseInt(route.params.id);
        }
        return props;
      },
      beforeEnter: async (to, from, next) => {
        await store.dispatch("fetchNumberOfDeathNotes").then(totalOfDeath => {
          if (
            !to.params.hasOwnProperty("id") ||
            !to.params.id ||
            to.params.id === null ||
            to.params.id === undefined ||
            parseInt(to.params.id) >= totalOfDeath ||
            parseInt(to.params.id) < 0
          ) {
            next("/error/404");
          }
        });
        next();
      }
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
      beforeEnter: async (to, from, next) => {
        await store.dispatch("fetchNumberOfDeathNotes").then(totalOfDeath => {
          if (
            parseInt(to.params.page) >
              Math.ceil(totalOfDeath / store.state.maxPerPages) ||
            parseInt(to.params.page) < 1
          ) {
            next("/error/404");
          }
        });
        next();
      }
    },
    {
      path: "*",
      redirect: "/error/404"
    }
  ]
});
