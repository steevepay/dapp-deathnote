<template>
  <div class="card">
    <div class="card-content">
      <b-dropdown
        aria-role="list"
        style="position: absolute;right: 19px;bottom: 19px;"
        position="is-bottom-left"
      >
        <b-button slot="trigger" type="is-text" class="btn-more">
          <b-icon icon="dots-vertical" size="is-small" class="btn-more-icon">
          </b-icon>
        </b-button>

        <b-dropdown-item
          v-show="walletLinked"
          aria-role="listitem"
          @click="$emit('donate', death.owner)"
          >Donate to the writer</b-dropdown-item
        >
        <b-dropdown-item aria-role="listitem" has-link>
          <a
            :href="
              `https://twitter.com/intent/tweet?text=${death.name} ${
                death.conditions
              } at ${dateDeath} from DDeathNote - Kira.`
            "
            target="_blank"
          >
            <b-icon size="is-small" icon="twitter"></b-icon>
            <span>
              Share on Twitter
            </span>
          </a>
        </b-dropdown-item>
      </b-dropdown>
      <div class="media" style="margin-bottom:15px">
        <div class="media-left">
          <figure class="image is-48x48">
            <img
              :src="
                `https://avatars.dicebear.com/v2/avataaars/${
                  death.name
                }.svg?options[topChance]=78&options[facialHair][]=medium&options[facialHairChance]=0&options[eyes][]=cry&options[eyes][]=surprised&options[eyes][]=squint&options[eyes][]=dizzy&options[mouth][]=vomit&options[mouth][]=twinkle&options[mouth][]=scream&options[mouth][]=sad&options[mouth][]=grimace&options[mouth][]=disbelief&options[mouth][]=concerned&options[mouth][]=serious`
              "
            />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4" style="margin:0">{{ death.name }}</p>
          <div class="is-6">
            <span
              v-if="death.hasOwnProperty('new') && death.new === true"
              class="tag is-danger"
            >
              New
            </span>
          </div>
        </div>
      </div>

      <div class="content">
        <p style="overflow-wrap: break-word;margin:0">{{ death.conditions }}</p>
        <a>{{ dateDeath }}</a>
        <!-- <a href="#">#css</a> <a href="#">#responsive</a> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    death: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["walletLinked"]),
    dateDeath() {
      return new Date(this.death.timeOfDeath).toLocaleString();
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-more {
  // padding: 12px;
}

.btn-more-icon {
  // margin-top: -7px !important;
}
</style>
