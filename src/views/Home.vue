<template>
  <div class="home">
    {{ deaths.length }}
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "home",
  components: {
    // HelloWorld
  },
  methods: {
    ...mapActions(["fetchDeathNotes"])
  },
  computed: {
    ...mapState(["deaths"])
  },
  async mounted() {
    await this.fetchDeathNotes();
  }
};
</script>
