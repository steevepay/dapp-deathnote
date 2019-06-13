<template>
  <section id="home" class="container">
    <div class="columns ">
      <Paginator class="column is-12" :current-page="page" />
    </div>
    <div
      class="columns is-multiline is-variable is-3-mobile is-3-tablet is-3-desktop is-3-widescreen is-3-fullhd is-centered"
    >
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

export default {
  name: "home",
  components: {
    DeathCard,
    Paginator
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
    ...mapState(["deaths"])
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
    page(newValue, oldValue) {
      console.log("FETCH - WATCHER");
      this.fetchNotes();
    }
  }
};
</script>
