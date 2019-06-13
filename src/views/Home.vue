<template>
  <section id="home" class="container">
    <div
      class="columns is-variable is-3-mobile is-3-tablet is-6-desktop is-8-widescreen is-8-fullhd is-centered"
    >
      <div
        class="column is-6-tablet is-4-desktop is-3-widescreen is-3-fullhd"
        v-for="(death, $index) in deaths"
        :key="$index"
      >
        <DeathCard :death="death" class="has-text-left" />
      </div>
    </div>
    <div class="columns ">
      <Paginator class="column is-12" :current-page="page" />
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
    ...mapActions(["fetchDeathNotes"])
  },
  computed: {
    ...mapState(["deaths"])
  },
  async mounted() {
    await this.fetchDeathNotes();
    console.log(this.page);
  }
};
</script>
