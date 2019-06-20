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
        <DeathCard :idnote="id" />
      </div>
    </div>
  </section>
</template>

<script>
// COMPONENTS
import DeathCard from "@/components/DeathCard.vue";

export default {
  components: {
    DeathCard
  },
  props: {
    id: {
      type: Number,
      required: true
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
