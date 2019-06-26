<template>
  <nav
    class="navbar is-fixed-top is-dark"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img
          :src="require('@/assets/logo/dappdeathnote.png')"
          style="margin-top:-5px;"
        />
        <h1
          style="font-weight: 500;!important;margin-left:10px;margin-top:0px;"
        >
          Decentralized Death Note
        </h1>
      </router-link>

      <!-- <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a> -->
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <!-- <router-link class="navbar-item" to="/">
          Home
        </router-link>
        <router-link class="navbar-item" to="/about">
          About
        </router-link> -->

        <!-- <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div> -->
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <b-tooltip
              label="Write a new note"
              position="is-bottom"
              animated
              v-show="walletLinked"
              style="margin-right: 8px;"
              type="is-dark"
            >
              <b-button
                type="is-success"
                @click="$emit('toggle-write-modal', true)"
              >
                <b-icon icon="plus"></b-icon>
              </b-button>
            </b-tooltip>

            <b-button
              icon-left="library-books"
              type="is-primary"
              @click="$emit('toggle-rules-modal', true)"
            >
              The rules
            </b-button>
            <b-button
              v-show="walletLinked"
              class="button is-light"
              icon-left="skull"
              to="/my-notes"
              tag="router-link"
            >
              My Notes
            </b-button>
          </div>
          <!-- </div> -->
        </div>

        <b-tooltip
          class="navbar-item"
          label="Looks like you don't have a wallet yet."
          type="is-warning"
          position="is-left"
          animated
          v-show="!walletLinked"
        >
          <!-- <a > -->
          <b-icon
            icon="cloud-off-outline"
            size="is-small"
            type="is-warning"
            style="margin-right:10px"
          >
          </b-icon>

          <span> Wallet not connected</span>
          <!-- </a> -->
        </b-tooltip>
      </div>
    </div>
    <progress
      class="progress is-primary"
      max="100"
      v-show="isLoading"
      style="margin:0 !important;height:3px; position:fixed;top:51px"
      >15%</progress
    >
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["walletLinked"]),
    ...mapGetters("loading", ["isLoading"])
  }
};
</script>

<style lang="scss" scoped></style>
