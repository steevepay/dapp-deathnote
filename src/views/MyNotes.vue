<template>
  <section id="mynotes" class="container">
    <div class="columns is-multiline is-vcentered is-centered is-variable is-2">
      <div class="column is-12"><span class="title is-1">My Notes</span></div>
      <div
        class="column is-6-tablet is-4-desktop is-3-widescreen is-3-fullhd"
        v-for="(note, $index) in myNotes"
        :key="'note' + $index"
      >
        <DeathCard
          :idnote="note.toNumber() - 1"
          v-show="$index < myNotesLength"
          :disabled-donation="true"
        />
      </div>
    </div>
  </section>
</template>

<script>
import DeathCard from "@/components/DeathCard.vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["myNotesLength", "myNotes"])
  },
  components: {
    DeathCard
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
