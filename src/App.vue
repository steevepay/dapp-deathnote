<template>
  <div id="app">
    <Navbar @toggle-rules-modal="handleRulesModalEvents" />
    <router-view class="container" />
    <Rules
      :is-active="modalRulesActive"
      @toggle-rules-modal="handleRulesModalEvents"
    />
  </div>
</template>

<script>
/* Components */
import Navbar from "@/components/Navbar.vue";
import Rules from "@/components/Rules.vue";

// eslint-disable-next-line no-unused-vars
import * as web3 from "@/services/web3.js";
// eslint-disable-next-line no-unused-vars
import * as dns from "@/services/dns";

export default {
  components: {
    Navbar,
    Rules
  },
  data() {
    return {
      modalRulesActive: false
    };
  },
  methods: {
    handleRulesModalEvents(data) {
      this.modalRulesActive = data;
    }
  },
  async created() {},
  async mounted() {}
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
