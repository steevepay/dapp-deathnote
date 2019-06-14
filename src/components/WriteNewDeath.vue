<template>
  <section id="writeNameContainer">
    <!-- has-modal-card -->
    <b-modal
      :active="modalActive"
      :width="400"
      scroll="keep"
      @close="closeModal()"
    >
      <div class="card">
        <div class="card-content columns is-multiline">
          <div class="column is-12">
            <div class="media-center">
              <figure class="image is-128x128" style="margin:auto">
                <img
                  :src="
                    `https://avatars.dicebear.com/v2/avataaars/${name}.svg?options[topChance]=78&options[facialHair][]=medium&options[facialHairChance]=0&options[eyes][]=cry&options[eyes][]=surprised&options[eyes][]=squint&options[eyes][]=dizzy&options[mouth][]=vomit&options[mouth][]=twinkle&options[mouth][]=scream&options[mouth][]=sad&options[mouth][]=grimace&options[mouth][]=disbelief&options[mouth][]=concerned&options[mouth][]=serious`
                  "
                  alt="Placeholder image"
                  class="is-rounded"
                />
              </figure>
            </div>
          </div>
          <div class="column is-12">
            <form action="">
              <b-field label="Name">
                <b-input icon="account-circle" rounded v-model="name"></b-input>
              </b-field>
              <b-field label="Conditions">
                <b-input rounded type="textarea" v-model="conditions"></b-input>
              </b-field>
              <b-field label="Select a date">
                <b-datepicker
                  rounded
                  icon="calendar-today"
                  :min-date="minDate"
                  position="is-top-left"
                  v-model="date"
                >
                </b-datepicker>
              </b-field>
              <b-field label="Select time">
                <b-timepicker
                  rounded
                  icon="clock"
                  :min-time="minTime"
                  v-model="time"
                  position="is-top-right"
                >
                  <b-field>
                    <p class="control">
                      <button
                        class="button is-primary"
                        @click.prevent="time = new Date()"
                      >
                        <b-icon icon="clock"></b-icon>
                        <span>Now</span>
                      </button>
                    </p>
                    <p class="control">
                      <button class="button is-danger" @click="time = null">
                        <b-icon icon="close"></b-icon>
                        <span>Clear</span>
                      </button>
                    </p>
                  </b-field>
                </b-timepicker>
              </b-field>
              <b-field label="Value (ETH)">
                <b-input
                  rounded
                  type="number"
                  placeholder="0.001"
                  icon="currency-eth"
                >
                </b-input>
              </b-field>
            </form>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item" @click="closeModal()">
            Cancel
          </a>
          <a href="#" class="card-footer-item">
            Send
          </a>
        </footer>
      </div>
    </b-modal>
  </section>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      this.$emit("toggle-write-modal", false);
    }
  },
  data() {
    return {
      modalActive: false,
      isComponentModalActive: true,
      name: "",
      conditions: "",
      date: "",
      time: "",
      price: 0,
      minDate: null,
      minTime: null
    };
  },
  created() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.date = new Date();

    this.minTime = new Date();
    this.minTime.setMinutes(0);
    this.time = new Date();
  },
  watch: {
    isActive: {
      immediate: true,
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal) {
        this.modalActive = val;
      }
    }
  }
};
</script>

<style lang="scss"></style>
