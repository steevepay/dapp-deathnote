<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
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
          <!-- <p class="subtitle is-6">@johnsmith</p> -->
        </div>
      </div>

      <div class="content">
        {{ death.conditions }}
        <!-- <a href="#">#css</a> <a href="#">#responsive</a> -->
        <br />
        <time datetime="2016-1-1">Time of death: {{ death.timeOfDeath }}</time>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    death: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
