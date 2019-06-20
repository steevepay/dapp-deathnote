<template>
  <section id="home" class="container">
    <div class="columns is-multiline">
      <div class="column is-12" style="padding-bottom: 0;">
        <OrderComponent />
      </div>
    </div>
    <div class="columns is-multiline is-vcentered is-centered is-variable is-2">
      <div
        class="column is-6-tablet is-4-desktop is-3-widescreen is-3-fullhd"
        v-for="(note, $index) in notes"
        :key="$index"
      >
        <DeathCard
          v-show="$index < maxPerPages"
          :idnote="note"
          @donate="handleDonationEvents"
        />
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <Paginator :current-page="page" />
      </div>
    </div>
    <Donate
      :is-active="modalDonateActive"
      :addressToDonate="addressToDonate"
      @toggle-donate-modal="handleDonateModalEvents"
    />
  </section>
</template>

<script>
// VUEX STORE
import { mapActions, mapState } from "vuex";
// COMPONENTS
import DeathCard from "@/components/DeathCard.vue";
import Paginator from "@/components/Paginator.vue";
import OrderComponent from "@/components/Filter.vue";
import Donate from "@/components/Donate.vue";

export default {
  name: "home",
  components: {
    DeathCard,
    Paginator,
    OrderComponent,
    Donate
  },
  props: {
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      modalDonateActive: false,
      addressToDonate: ""
    };
  },
  methods: {
    ...mapActions(["fetchNotes"]),
    fetchData() {
      this.fetchNotes(this.page);
    },
    handleDonateModalEvents(value) {
      this.modalDonateActive = value;
    },
    handleDonationEvents(address) {
      this.addressToDonate = address;
      this.modalDonateActive = true;
    }
  },
  computed: {
    ...mapState([
      // "deaths",
      "filter",
      "nbrNotesFetching",
      "maxPerPages",
      "notes"
    ])
  },
  async mounted() {
    await this.fetchData();
  },
  watch: {
    page() {
      this.fetchData();
    },
    filter() {
      this.fetchData();
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
