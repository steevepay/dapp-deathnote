<template>
  <section id="note" class="container">
    <div class="columns is-multiline" style="margin-top:40px!important">
      <div class="column is-4 is-offset-4 has-text-left">
        <router-link to="/">
          <b-icon icon="chevron-left" size="is-small"> </b-icon>
          <span style="position: absolute;margin-top: -2px;">
            return to the death note</span
          >
        </router-link>
      </div>
      <div class="column is-4 is-offset-4">
        <DeathCard :death="note" v-if="!isLoading" />
        <SkeletonCard v-else />
      </div>
    </div>
  </section>
</template>

<script>
import DeathCard from "@/components/DeathCard.vue";
import SkeletonCard from "@/components/SkeletonCard.vue";
import { mapActions } from "vuex";
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    DeathCard,
    SkeletonCard
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      note: {},
      isLoading: false
    };
  },
  methods: {
    ...mapActions(["fetchNote"])
  },
  async mounted() {
    this.isLoading = true;
    this.note = await this.fetchNote("" + this.id);
    this.isLoading = false;
  }
};
</script>

<style lang="scss">
.columns {
  margin-left: 0rem !important;
  margin-right: 0rem !important;
}
</style>
