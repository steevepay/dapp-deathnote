<template>
  <section>
    <b-field>
      <b-radio-button
        v-model="filt"
        native-value="latest"
        type="is-dark"
        @input="triggered"
        :disabled="isLoading && filter === 'oldest'"
      >
        <b-icon icon="new-box" style="color:red;"></b-icon>
        <span>Latest</span>
      </b-radio-button>
      <b-radio-button
        v-model="filt"
        native-value="oldest"
        type="is-dark"
        @input="triggered"
        :disabled="isLoading && filter === 'latest'"
      >
        <span>Oldest</span>
      </b-radio-button>
    </b-field>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      filt: "latest"
    };
  },
  computed: {
    ...mapState(["filter"]),
    ...mapGetters("loading", ["isLoading"])
  },
  methods: {
    ...mapActions(["changeFilter"]),
    triggered(data) {
      this.changeFilter(data);
    }
  }
};
</script>
