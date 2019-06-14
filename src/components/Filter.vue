<template>
  <section>
    <b-field>
      <b-radio-button
        v-model="filt"
        native-value="latest"
        type="is-dark"
        @input="triggered"
      >
        <b-icon icon="new-box" style="color:red;"></b-icon>
        <span>Latest</span>
      </b-radio-button>
      <b-radio-button
        v-model="filt"
        native-value="oldest"
        type="is-dark"
        @input="triggered"
      >
        <span>Oldest</span>
      </b-radio-button>
    </b-field>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      filt: "latest"
    };
  },
  computed: {
    ...mapState(["filter"])
  },
  methods: {
    ...mapActions(["changeFilter", "fetchDeathNotes"]),
    triggered(data) {
      this.changeFilter(data);
    }
  }
};
</script>
