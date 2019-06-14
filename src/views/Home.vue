<template>
  <section id="home" class="container">
    <div class="columns is-multiline">
      <div class="column is-12">
        <Paginator :current-page="page" />
      </div>
      <div
        class="column is-12"
        style="padding-top: 0;
    padding-bottom: 0;"
      >
        <OrderComponent />
      </div>
    </div>
    <div class="columns is-multiline  is-centered is-variable is-2">
      <div
        class="column is-6-tablet is-4-desktop is-3-widescreen is-3-fullhd"
        v-for="(death, $index) in deaths"
        :key="$index"
      >
        <DeathCard :death="death" class="has-text-left" />
      </div>
    </div>
  </section>
</template>

<script>
// VUEX STORE
import { mapActions, mapState } from "vuex";
// COMPONENTS
import DeathCard from "@/components/DeathCard.vue";
import Paginator from "@/components/Paginator.vue";
import OrderComponent from "@/components/Filter.vue";

export default {
  name: "home",
  components: {
    DeathCard,
    // eslint-disable-next-line vue/no-unused-components
    Paginator,
    OrderComponent
  },
  props: {
    page: {
      type: Number,
      default: 1
    }
  },

  methods: {
    ...mapActions(["fetchDeathNotes"]),
    fetchNotes() {
      this.fetchDeathNotes(this.page);
    }
  },
  computed: {
    ...mapState(["deaths", "filter"])
  },
  async mounted() {
    // await this.fetchNumberOfDeathNotes().then(() => {
    //   if (this.page > Math.ceil(this.numberOfDeaths / 12) || this.page < 1) {
    //     this.$router.push({ name: "404" });
    //     // ERROR PAGE
    //   } else {
    //   }
    // });
    // console.log(this.page);
  },
  created() {
    console.log("FETCH - CREATED");
    this.fetchNotes();
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    page(n, o) {
      console.log("FETCH - WATCHER");
      this.fetchNotes();
    },
    // eslint-disable-next-line no-unused-vars
    filter(n, o) {
      this.fetchNotes();
    }
  }
};
</script>

<style lang="scss">
.columns {
  margin-left: 0rem !important;
  margin-right: 0rem !important;
}
</style>
