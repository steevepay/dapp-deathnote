<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
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
            <b-button type="is-primary">
              <strong>The rules</strong>
            </b-button>
            <b-button
              v-show="!walletLinked"
              class="button is-light"
              icon-left="skull"
              to="/my-notes"
              tag="router-link"
            >
              My Notes
            </b-button>
          </div>
        </div>
        <a class="navbar-item" v-show="walletLinked">
          <b-icon
            icon="cloud-off-outline"
            size="is-small"
            type="is-warning"
            style="margin-right:10px"
          >
          </b-icon>
          <span> Wallet not connected</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      walletLinked: true
    };
  }
};
</script>

<style lang="scss" scoped></style>
