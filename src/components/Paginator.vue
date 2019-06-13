<template>
  <section id="pagination">
    <b-pagination
      :total="numberOfDeaths"
      :current="currentPage"
      :order="order"
      :size="size"
      :simple="isSimple"
      :rounded="isRounded"
      :per-page="maxPerPages"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      icon-pack="mdi"
      @change="changePage"
    >
    </b-pagination>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      order: "is-centered",
      size: "",
      isSimple: false,
      isRounded: false
    };
  },
  computed: {
    ...mapState(["maxPerPages", "numberOfDeaths"])
  },
  methods: {
    changePage(page) {
      this.current = page;
      this.$router.push({ name: "home", params: { page: page } });
    }
  }
};
</script>
