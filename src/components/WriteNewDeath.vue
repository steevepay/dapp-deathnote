<template>
  <section id="writeNameContainer">
    <!-- has-modal-card -->
    <b-modal
      :active="modalActive"
      :width="400"
      scroll="keep"
      @close="closeModal()"
    >
      <form action="" ref="form" @submit.prevent="sendTheNote()">
        <div class="card">
          <div class="card-content columns is-multiline">
            <div class="column is-12">
              <div class="media-center">
                <figure class="image is-128x128" style="margin:auto">
                  <img
                    :src="
                      `https://avatars.dicebear.com/v2/avataaars/${
                        model.name
                      }.svg?options[topChance]=78&options[facialHair][]=medium&options[facialHairChance]=0&options[eyes][]=cry&options[eyes][]=surprised&options[eyes][]=squint&options[eyes][]=dizzy&options[mouth][]=vomit&options[mouth][]=twinkle&options[mouth][]=scream&options[mouth][]=sad&options[mouth][]=grimace&options[mouth][]=disbelief&options[mouth][]=concerned&options[mouth][]=serious`
                    "
                    alt="Placeholder image"
                    class="is-rounded"
                  />
                </figure>
              </div>
            </div>
            <div class="column is-12">
              <b-field label="Name">
                <b-input
                  @input="checkFormValid()"
                  icon="account-circle"
                  rounded
                  v-model="model.name"
                  required
                  validation-message="This note will not take effect unless you write the subject's name."
                ></b-input>
              </b-field>
              <b-field
                label="Conditions"
                message="without conditions, it will die of a heart attack"
              >
                <b-input
                  rounded
                  type="textarea"
                  maxlength="100"
                  v-model="model.conditions"
                ></b-input>
              </b-field>
              <b-field label="Select a date">
                <b-datepicker
                  rounded
                  icon="calendar-today"
                  :min-date="minDate"
                  position="is-top-left"
                  v-model="model.date"
                >
                </b-datepicker>
              </b-field>
              <b-field label="Select time">
                <b-timepicker
                  rounded
                  icon="clock"
                  :min-time="minTime"
                  v-model="model.time"
                  position="is-top-right"
                >
                  <b-field>
                    <p class="control">
                      <button
                        class="button is-primary"
                        @click.prevent="model.time = new Date()"
                      >
                        <b-icon icon="clock"></b-icon>
                        <span>Now</span>
                      </button>
                    </p>
                    <p class="control">
                      <button
                        class="button is-danger"
                        @click.prevent="model.time = null"
                      >
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
                  placeholder="0.001"
                  icon="currency-eth"
                  pattern="^[0-9]*([.][0-9]+)?$"
                  required
                  tep="0.0000000001"
                  validation-message="Minimum of 0.001 ether"
                  v-model="model.value"
                  @input="checkFormValid()"
                >
                </b-input>
              </b-field>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" @click.prevent="closeModal()">
              Cancel
            </a>
            <!-- :disabled="formValid" -->
            <a
              href="#"
              class="card-footer-item"
              :class="{ 'btn-disabled': !formValid }"
              @click.prevent="checkFormValidBeforeSubmit()"
            >
              Send
            </a>
          </footer>
        </div>
      </form>
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
  data() {
    return {
      modalActive: false,
      isComponentModalActive: true,
      model: {
        name: "",
        conditions: "",
        date: null,
        time: null,
        value: null
      },
      minDate: null,
      minTime: null,
      formValid: false
    };
  },
  computed: {
    //.;
  },
  methods: {
    closeModal() {
      this.$emit("toggle-write-modal", false);
    },
    checkFormValidBeforeSubmit() {
      console.log(this.$refs.form.checkValidity());
      console.log(this.formValid());
      if (this.formValid) {
        this.$refs.form.submit();
      }
    },
    sendTheNote() {
      console.log("call vuex action dispatch");
    },
    checkFormValid() {
      this.formValid = false;
      if (this.$refs.hasOwnProperty("form")) {
        this.formValid = this.$refs.form.checkValidity();
      }
    }
  },
  created() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.model.date = new Date();
    // this.minTime = "01:32";
    this.minTime = new Date();
    // this.minTime.setMinutes(0);
    this.model.time = new Date();

    this.model.conditions = "dies of a heart attack";
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

<style lang="scss">
.btn-disabled,
.btn-disabled:visited,
.btn-disabled:visited,
.btn-disabled:visited,
.btn-disabled:visited {
  cursor: not-allowed;
  color: grey;
}
</style>
