<template>
  <section id="donateContainer">
    <!-- has-modal-card -->
    <b-modal
      :active="modalActive"
      :width="400"
      scroll="keep"
      @close="closeModal()"
    >
      <form ref="form">
        <div class="card">
          <div class="card-content columns is-multiline" style="margin:0">
            <div class="column is-12">
              <b-field
                label="Donate to"
                :type="errors.has('to') ? 'is-danger' : ''"
                :message="
                  errors.has('to') ? 'Please provide an Ethereum Address.' : ''
                "
              >
                <!-- @input="checkFormValid()" -->
                <b-input
                  icon="security-account"
                  rounded
                  v-model.lazy="addressToDonate"
                  v-validate="'required|isEthAddress'"
                  placeholder="0x..."
                  name="to"
                  id="to"
                  disabled
                ></b-input>
              </b-field>
              <b-field
                label="Value (ETH)"
                :type="errors.has('value') ? 'is-danger' : ''"
                :message="
                  errors.has('value') ? 'A minimum value is required.' : ''
                "
              >
                <b-input
                  rounded
                  id="value"
                  name="value"
                  v-validate="'required|notZero'"
                  placeholder="0.001"
                  icon="currency-eth"
                  v-model.lazy="value"
                >
                  <!-- required| -->
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
              :class="{ 'btn-disabled': errors.any() || !formCompleted }"
              @click.prevent="checkFormValidBeforeSubmit()"
            >
              Send
            </a>
          </footer>
          <b-loading :is-full-page="false" :active="isLoading"></b-loading>
        </div>
      </form>
    </b-modal>
  </section>
</template>

<script>
// VUEX
import { mapActions } from "vuex";
// UTILITY
import * as web3 from "@/services/web3";

export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    addressToDonate: {
      type: String
    }
  },
  data() {
    return {
      modalActive: false,
      value: null,
      isLoading: false
    };
  },
  computed: {
    formCompleted() {
      return this.addressToDonate && this.value;
    }
  },
  methods: {
    ...mapActions(["donateToWriter"]),
    ...mapActions("toasters", ["toastSuccess"]),
    closeModal() {
      this.$emit("toggle-donate-modal", false);
    },
    checkFormValidBeforeSubmit() {
      this.$validator.validate().then(valid => {
        if (valid === true) {
          this.submitForm();
        }
      });
    },
    async submitForm() {
      this.isLoading = true;
      let account = await web3.getAccount();
      await this.donateToWriter({
        from: account,
        to: this.addressToDonate,
        value: this.value
      });
      this.isLoading = false;
      this.closeModal();
    }
  },
  created() {
    this.$validator.extend("notZero", value => {
      return parseFloat(value) > 0;
    });

    this.$validator.extend("isEthAddress", address => {
      return web3.isEthAddress(address);
    });
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
