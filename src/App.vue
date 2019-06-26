<template>
  <div id="app">
    <Navbar
      @toggle-rules-modal="handleRulesModalEvents"
      @toggle-write-modal="handleWriteNewDeathModalEvents"
    />
    <router-view
      style="margin-top:12px"
      @toggle-write-modal="handleWriteNewDeathModalEvents"
    />
    <Rules
      :is-active="modalRulesActive"
      @toggle-rules-modal="handleRulesModalEvents"
    />
    <WriteNewDeath
      :is-active="modalWriteActive"
      @toggle-write-modal="handleWriteNewDeathModalEvents"
    />
  </div>
</template>

<script>
/* Components */
import Navbar from "@/components/Navbar.vue";
import Rules from "@/components/Rules.vue";
import WriteNewDeath from "@/components/WriteNewDeath.vue";

// eslint-disable-next-line no-unused-vars
import * as web3 from "@/services/web3.js";
// eslint-disable-next-line no-unused-vars
import * as dns from "@/services/dns";

export default {
  components: {
    Navbar,
    Rules,
    WriteNewDeath
  },
  data() {
    return {
      modalRulesActive: false,
      modalWriteActive: false
    };
  },
  methods: {
    handleRulesModalEvents(data) {
      this.modalRulesActive = data;
    },
    handleWriteNewDeathModalEvents(data) {
      // console.log(data);
      this.modalWriteActive = data;
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
