<template>
  <!-- DESKTOP NAVBAR -->
  <!--  -->
  <nav
    class="navbar is-dark is-fixed-top box-shadow"
    :style="[isStoryComponentMounted ? {paddingRight: '15px'} : {paddingRight: '0'}]"
  >
    <div class="navbar-brand">
      <div class="navbar-item" style="padding-bottom:0">
        <router-link to="/">
          <img src="/img/logo.png" alt="12 pics logo" />
        </router-link>
      </div>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="12PicsHomeNavBarDesktop"
        is-active
        @click="toggleBurgerDropdown"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div
      id="12PicsHomeNavBarDesktop"
      class="navbar-menu"
      :class="{'is-active': showBurgerDropdown}"
    >
      <div class="navbar-start" style="flex-grow:1; justify-content: center;">
        <div class="navbar-item" style="flex-grow: 1;justify-content: flex-end;margin-right:18px;">
          <div id="filter-categories-lnk" class="nav-lnk" @click="openModal('categories')">
            <a>
              <span class="fa-icon-pr4">
                <font-awesome-icon icon="list"></font-awesome-icon>
              </span>
              Filter categories
            </a>
          </div>
        </div>
        <div class="navbar-item" style="flex-grow:2;">
          <div class="field-body">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="text"
                  placeholder="Search"
                  style="flex-grow: 1;max-width:350px;"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="search" color="#666"></font-awesome-icon>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <!-- BUTTONS-->
        <div class="navbar-item">
          <div class="buttons">
            <router-link
              class="button is-primary"
              id="post-story-btn"
              to="/story/create"
              v-if="isAuthenticated"
            >
              <strong>Post a story</strong>
            </router-link>
            <a
              class="button is-primary"
              id="signup-btn"
              @click="openModal('signup')"
              v-if="!isAuthenticated"
            >
              <strong>Sign up</strong>
            </a>
            <a
              class="button is-light"
              id="login-btn"
              @click="openModal('login')"
              v-if="!isAuthenticated"
            >Sign in</a>
          </div>
        </div>
        <!-- END BUTTONS-->
        <!-- DROP DOWN-->
        <div
          class="navbar-item has-dropdown mr15 ml10"
          :class="{'is-active': dropdownVisible}"
          id="navbar-dropdown"
        >
          <a class="navbar-link" id="navbar-link" @click="toggleDropdown">
            <span v-if="isAuthenticated">Hi {{ authenticatedUser.username }}</span>
            <span v-else>Hi there</span>
          </a>
          <div class="navbar-dropdown is-right is-boxed" @mouseleave="hideDropdown()">
            <router-link
              v-if="isAuthenticated"
              class="navbar-item"
              :to="`/user/${authenticatedUser.username}`"
              exact
              active-class="is-active"
              @click.native="hideDropdown()"
            >
              <span class="fa-icon-pr7">
                <font-awesome-icon icon="user"></font-awesome-icon>
              </span>
              <span>My profile</span>
            </router-link>
            <router-link
              v-if="isAuthenticated"
              class="navbar-item"
              :to="`/user/${authenticatedUser.username}/settings`"
              active-class="is-active"
              exact
              @click.native="hideDropdown()"
            >
              <span class="fa-icon-pr7">
                <font-awesome-icon icon="cog"></font-awesome-icon>
              </span>
              <span>Settings</span>
            </router-link>
            <a v-if="isAuthenticated" class="navbar-item" @click.prevent="logout()">
              <span class="fa-icon-pr7">
                <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
              </span>
              <span>Logout</span>
            </a>
            <hr class="navbar-divider" v-if="isAuthenticated" />
            <router-link
              class="navbar-item"
              to="/contact"
              active-class="is-active"
              @click.native="hideDropdown()"
            >
              <span class="fa-icon-pr7">
                <font-awesome-icon icon="envelope"></font-awesome-icon>
              </span>
              <span>Contact us</span>
            </router-link>
            <router-link
              class="navbar-item"
              to="/about"
              active-class="is-active"
              @click.native="hideDropdown()"
            >
              <span class="fa-icon-pr7">
                <font-awesome-icon icon="question"></font-awesome-icon>
              </span>
              <span>About 12 pics</span>
            </router-link>
            <hr class="navbar-divider" />
            <div class="navbar-item">Version 0.0.1</div>
          </div>
        </div>
        <!-- END DROP DOWN-->
      </div>
    </div>
    <login-modal
      :isActive="currentModal === 'login'"
      @loginModalClosed="closeModal"
      @openRecoverPasswordModal="closeLoginModalAndOpenRecoverModal"
    ></login-modal>
    <signup-modal :isActive="currentModal === 'signup'" @signupModalClosed="closeModal"></signup-modal>
    <categories-modal :isActive="currentModal === 'categories'" @categoriesModalClosed="closeModal"></categories-modal>
    <recover-modal :isActive="currentModal === 'recover'" @recoverModalClosed="closeModal"></recover-modal>
  </nav>
  <!-- END DESKTOP NAVBAR -->
</template>

<script>
//////////////////////////////////////////////////////////////////////////
// A lot happens in this navbar
// * Modals:
//     - login modal X
//        - recover password modal
//     - signup modal X
//     - categories modal
// * Search
// * Buttons
//     - login button X
//     - signup button X
//     - post story button X
// * Menu
//     - View profile X
//     - Settings view/edit X
//     - logout X
//     - contact us X
//     - About page X
////////////////////////////////////////////////////////////////////////////

// import { CommonBands } from "vue-media-queries";
// const bulmaBands = CommonBands.Bulma;
import { mapGetters } from "vuex";

import LoginModal from "./LoginModal.vue";
import SignupModal from "./SignupModal.vue";
import RecoverModal from "./RecoverModal.vue";
import CategoriesModal from "./CategoriesModal.vue";

import { lockBgScroll, unlockBgScroll } from "../utils/utils";

export default {
  name: "Header",
  // mixins: [bulmaBands.mixin]
  components: {
    LoginModal,
    SignupModal,
    RecoverModal,
    CategoriesModal
  },
  data: function() {
    return {
      dropdownVisible: false,
      showBurgerDropdown: false,
      currentModal: null
    };
  },
  methods: {
    // dropdown
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    hideDropdown() {
      if (this.dropdownVisible === true) {
        this.dropdownVisible = false;
      }
    },
    // burger - mobile
    toggleBurgerDropdown() {
      this.showBurgerDropdown = !this.showBurgerDropdown;
    },
    openModal(modal) {
      lockBgScroll();
      this.currentModal = modal;
    },
    closeModal() {
      unlockBgScroll();
      this.currentModal = null;
    },
    closeLoginModalAndOpenRecoverModal() {
      this.currentModal = null;
      this.currentModal = "recover";
    },
    // logout - call store logout
    async logout() {
      await this.$store.dispatch("logout");
      this.hideDropdown();
    }
  },
  computed: {
    // style scrollbar hidden when story is mounted
    ...mapGetters([
      "isStoryComponentMounted",
      "isAuthenticated",
      "authenticatedUser"
    ])
  }
};
</script>

<style scoped>
/** NAVBAR **/
.navbar-item img {
  max-height: none;
}

.nav-lnk a {
  color: #ddd;
}

.nav-lnk a:hover {
  color: #fff;
}

.box-shadow {
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.5);
  width: 100%;
}

.navbar.is-dark .navbar-dropdown a.navbar-item.is-active {
  background-color: #bbb;
}
/** END NAVBAR **/
</style>
