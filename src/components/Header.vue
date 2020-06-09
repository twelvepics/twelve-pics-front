<template>
  <div>
    <toast v-show="showToast" :closeToast="closeToast" :toastType="toastType">
      <template v-slot:default>
        <div v-html="toastMessageJoined"></div>
      </template>
    </toast>
    <component
      @signup="showModal('signup')"
      @signin="showModal('signin')"
      @selectCategories="showModal('selectCategories')"
      @newStory="goToCreateStory"
      @searchStories="searchSubmit"
      @logout="logout"
      :is="navbar"
      :is-authenticated="isAuthenticated"
      :authenticatedUser="authenticatedUser"
    />
    <component
      :isActive="modal !== null"
      :is="modal"
      @closeModal="closeModal"
      @showToast="toastIt"
      @openRecoverPasswordModal="openRecoverPasswordModal"
    ></component>
  </div>
</template>

<script>
import MobileNavbar from "./navbar/MobileNavbar";
import FullNavbar from "./navbar/FullNavbar";

import Toast from "./Toast.vue";

import LoginModal from "./LoginModal.vue";
import SignupModal from "./SignupModal.vue";
import CategoriesModal from "./CategoriesModal.vue";
import RecoverModal from "./RecoverModal.vue";

import { mapGetters } from "vuex";
import { EventBus } from "../event-bus.js";
import { lockBgScroll, unlockBgScroll } from "../utils/utils";
// import * as Sentry from "@sentry/browser";

let _mql = null;
const LAYOUT_FULL = 0;
const LAYOUT_MOBILE = 1;

export default {
  components: {
    MobileNavbar,
    FullNavbar,
    LoginModal,
    SignupModal,
    CategoriesModal,
    RecoverModal,
    Toast
  },
  data() {
    return {
      showBurgerDropdown: false,
      layout: null,
      navbar: null,
      modal: null,
      // toast
      showToast: false,
      showToastTimeout: null,
      toastMessage: [],
      toastType: ""
    };
  },
  computed: {
    // style scrollbar hidden when story is mounted
    ...mapGetters([
      "isStoryComponentMounted",
      "isAuthenticated",
      "authenticatedUser"
    ]),
    toastMessageJoined() {
      return this.toastMessage.join("<br />");
    }
  },
  methods: {
    handleWindowChange(event) {
      if (event.matches) {
        // < 999
        console.log("CHANGE < 999");
        this.layout = LAYOUT_MOBILE;
        this.navbar = MobileNavbar;
      } else {
        // >= 999
        console.log("CHANGE >= 999");
        this.layout = LAYOUT_FULL;
        this.navbar = FullNavbar;
      }
    },
    isLayoutMobile() {
      return this.layout === LAYOUT_MOBILE;
    },
    isLayoutFull() {
      return this.layout == LAYOUT_FULL;
    },
    // --
    showModal: function(modal) {
      console.log(`Show modal ${modal}`);
      lockBgScroll();
      if (modal === "signup") {
        this.modal = SignupModal;
      } else if (modal === "signin") {
        this.modal = LoginModal;
      } else if (modal === "selectCategories") {
        this.modal = CategoriesModal;
      }
    },
    closeModal: function() {
      console.log("Close modal");
      this.modal = null;
      unlockBgScroll();
    },
    openRecoverPasswordModal: function() {
      console.log("openRecoverPasswordModal");
      this.modal = RecoverModal;
    },
    goToCreateStory: async function() {
      console.log("goToCreateStory");
      this.$router.push({
        name: "create-story"
      });
    },
    async searchSubmit(searchTerms) {
      // sent to either home or search page
      if (searchTerms.trim().length) {
        EventBus.$emit("searchTriggered", searchTerms.trim());
      }
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.toastIt({
        message: ["You are now signed out"],
        messageType: "toast-bottom is-success"
      });
      if (this.$router.currentRoute.name !== "home") {
        this.$router.push({ name: "home" });
      }
    },
    toastIt(messageObj, duration = 3000) {
      // console.log("toastIt I was called");
      // console.log(messageObj.message.join('<br />'));
      this.showToast = true;
      this.toastMessage = messageObj.message;
      this.toastType = messageObj.messageType;
      this.showToastTimeout = setTimeout(() => {
        this.closeToast();
      }, duration);
    },
    closeToast() {
      if (this.showToastTimeout) {
        clearTimeout(this.showToastTimeout);
      }
      this.showToast = false;
      this.toastMessageType = "";
      this.toastMessage = [];
    }
  },
  created: function() {
    console.log(process.env.NODE_ENV);
    console.log("#--- created ---#");
    _mql = window.matchMedia("(max-width: 999px)");
    console.log(_mql.matches);
    if (_mql.matches) {
      // < 999
      console.log("INITIAL < 999");
      this.layout = LAYOUT_MOBILE;
      this.navbar = MobileNavbar;
    } else {
      // >= 999
      console.log("INITIAL >= 999");
      this.layout = LAYOUT_FULL;
      this.navbar = FullNavbar;
    }
    console.log(_mql);
    // initial state here
    _mql.addListener(this.handleWindowChange);
  },
  mounted: function() {
    console.log("#--- mounted ---#");
  },
  beforeUpdate: function() {
    console.log("#--- beforeUpdate ---#");
  },
  updated: function() {
    console.log("#--- updated ---#");
  },
  beforeDestroy: function() {
    console.log("#--- HEADER beforeDestroy ---#");
    _mql.removeListener(this.handleWindowChange);
    // _mql = null; // ?
  },
  watch: {
    // if back button while a modal is open
    // TO BE TESTED -> TOMORROW MORNING
    // IS THIS
    $route(to, from) {
      console.log("HEADER ROUTE WATCHER");
      console.log(to);
      console.log(from);
      console.log(this.modal);
      if (from.name === "home" && this.modal !== null) {
        console.log("HEADER ROUTE WATCHER - PLEASE CLOSE MODAL");
        this.closeModal();
      }
    }
  }
};
</script>

