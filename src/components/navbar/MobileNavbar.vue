<template>
  <nav
    class="navbar is-dark is-fixed-top box-shadow"
    role="navigation"
    aria-label="main navigation"
    v-click-outside="onClickOutside"
  >
    <!-- NAVBAR-BRAND -->
    <div class="navbar-brand">
      <div class="navbar-item" style="padding-bottom:0">
        <router-link to="/" @click.native="hideBurgerDropdown()">
          <img src="/img/logo_v2.png" alt="12 pics logo" />
        </router-link>
      </div>
      <!-- BURGER -->
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        @click="toggleBurgerDropdown"
        :class="{ 'is-active': showBurgerDropdown }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <!-- ENDS BURGER -->
    </div>
    <!-- ENDS NAVBAR BRAND -->

    <!-- START NAVBAR MENU -->
    <!-- hidden on mobile -->
    <div class="navbar-menu" :class="{ 'is-active': showBurgerDropdown }">
      <div class="navbar-start">
        <!-- navbar items -->
        <div class="navbar-item buttons" v-if="!isAuthenticated">
          <a class="button is-dark is-inverted is-outlined" @click.prevent="signup">Sign-up</a>
          <a class="button is-dark is-inverted is-outlined" @click.prevent="signin">Sign-in</a>
        </div>
        <div class="navbar-item buttons" v-else>
          <a
            class="button is-dark is-inverted is-outlined"
            @click.prevent="newStory"
            :disabled="disablePostStoryButton"
          >Post a story</a>
        </div>
        <div class="navbar-item" v-show="showSearchBox">
          <div class="field">
            <div class="control">
              <input
                class="input is-dark"
                type="text"
                placeholder="Search stories"
                @keydown.enter.prevent="searchSubmit"
                v-model="searchTerms"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <!-- navbar items -->

        <!-- CATEGORIES -->
        <a class="navbar-item" @click.prevent="selectCategories" v-show="showCatsSelectButton">
          <span class="fa-icon-pr7">
            <font-awesome-icon icon="list"></font-awesome-icon>
          </span>
          <span>Filter categories</span>
        </a>
        <!-- -->

        <!-- MY PROFILE -->
        <router-link
          v-if="isAuthenticated"
          class="navbar-item"
          :to="{ name: 'user', params: { username: authenticatedUser.username } }"
          exact
          exact-active-class="is-active"
          @click.native="hideBurgerDropdown()"
        >
          <span class="fa-icon-pr7">
            <font-awesome-icon icon="user"></font-awesome-icon>
          </span>
          <span>My profile</span>
        </router-link>
        <!-- -->

        <!-- MY STORIES -->
        <router-link
          v-if="isAuthenticated"
          class="navbar-item"
          :to="{ name: 'user-stories', params: { username: authenticatedUser.username } }"
          exact
          exact-active-class="is-active"
          @click.native="hideBurgerDropdown()"
        >
          <span class="fa-icon-pr7">
            <font-awesome-icon icon="camera"></font-awesome-icon>
          </span>
          <span>My stories</span>
        </router-link>
        <!-- -->

        <!-- STARRED -->
        <router-link
          v-if="isAuthenticated"
          class="navbar-item"
          :to="{ name: 'starred', params: { username: authenticatedUser.username } }"
          exact
          exact-active-class="is-active"
          @click.native="hideBurgerDropdown()"
        >
          <span class="fa-icon-pr7">
            <font-awesome-icon icon="star"></font-awesome-icon>
          </span>
          <span>Stories I starred</span>
        </router-link>
        <!-- -->

        <!-- LOGOUT -->
        <a v-if="isAuthenticated" class="navbar-item" @click.prevent="logout">
          <span class="fa-icon-pr7">
            <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
          </span>
          <span>Logout</span>
        </a>
        <!-- -->

        <!-- CONTACT -->
        <router-link
          class="navbar-item"
          to="/contact"
          @click.native="hideBurgerDropdown()"
          active-class="is-active"
        >
          <span class="fa-icon-pr7">
            <font-awesome-icon icon="envelope"></font-awesome-icon>
          </span>
          <span>Contact us</span>
        </router-link>
        <!-- -->

        <!-- ABOUT -->
        <router-link
          class="navbar-item"
          to="/about"
          @click.native="hideBurgerDropdown()"
          active-class="is-active"
        >
          <span class="fa-icon-pr7">
            <font-awesome-icon icon="question"></font-awesome-icon>
          </span>
          <span>About 12 pics</span>
        </router-link>
        <!-- -->
      </div>
    </div>
    <!-- ENDS NAVBAR MENU -->
  </nav>
  <!-- END NAV -->
</template>
<script>
import vClickOutside from "v-click-outside";
import { headerDisplayMixin } from "../../mixins/headerDisplayMixin";

export default {
  name: "NavbarMobile",
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: { isAuthenticated: Boolean, authenticatedUser: Object },
  mixins: [headerDisplayMixin],
  data() {
    return {
      showBurgerDropdown: false,
      searchTerms: ""
    };
  },
  methods: {
    onClickOutside() {
      this.hideBurgerDropdown();
    },
    toggleBurgerDropdown() {
      this.showBurgerDropdown = !this.showBurgerDropdown;
    },
    hideBurgerDropdown() {
      if (this.showBurgerDropdown === true) {
        this.showBurgerDropdown = false;
      }
    },
    signin() {
      this.$emit("signin");
      this.hideBurgerDropdown();
    },
    signup() {
      this.$emit("signup");
      this.hideBurgerDropdown();
    },
    selectCategories() {
      this.$emit("selectCategories");
      this.hideBurgerDropdown();
    },
    logout() {
      this.$emit("logout");
      this.hideBurgerDropdown();
    },
    newStory() {
      this.$emit("newStory");
      this.hideBurgerDropdown();
    },
    searchSubmit() {
      this.$emit("searchStories", this.searchTerms);
      this.hideBurgerDropdown();
    },
    resetSearch() {
      this.searchTerms = "";
    }
  },
  created() {
    console.log(`Mobile navbar onCreated => ${this.isAuthenticated}`);
  },
  watch: {
    // if back button while a modal is open
    // TO BE TESTED MORE
    $route(to, from) {
      if (to.name === "home") {
        console.log("Reset search");
        this.resetSearch();
      } else if (to.name === "search" && from.name === null) {
        console.log("YOLO");
        this.searchTerms = this.$route.query.q;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.box-shadow {
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.5);
  width: 100%;
}
.navbar-item img {
  max-height: 2.25rem;
}
// .navbar.is-fixed-top-touch .navbar-menu:hover,
// .navbar.is-fixed-top .navbar-menu:hover {
//   background-color: pink;
// }
.navbar.is-dark .navbar-start > a.navbar-item:hover {
  background-color: #363636;
}

.navbar.is-fixed-top .navbar-menu.is-active,
.navbar.is-fixed-top .navbar-menu,
.navbar.is-fixed-top-touch .navbar-menu.is-active,
.navbar.is-fixed-top-touch .navbar-menu {
  background-color: #363636;
}
.navbar-item,
.navbar-link {
  background-color: #363636;
  color: #ddd;
}
// .navbar-item:hover,
// .navbar-link:hover {
//   color: #ddd;
// }

a.navbar-item:focus,
a.navbar-item:focus-within,
// a.navbar-item:hover,
a.navbar-item.is-active,
.navbar-link:focus,
.navbar-link:focus-within,
// .navbar-link:hover,
.navbar-link.is-active {
  background-color: #505050;
  color: #ddd;
}
.navbar.is-dark .navbar-start > a.navbar-item:hover,
.navbar.is-dark .navbar-end > a.navbar-item:hover {
  background-color: #464646;
  color: #ddd;
}
.navbar.is-dark .navbar-start > a.navbar-item,
.navbar.is-dark .navbar-end > a.navbar-item,
.navbar.is-dark .navbar-start > .navbar-item.buttons {
  border-bottom: 1px solid #565656;
}
.navbar.is-dark .navbar-start > .navbar-item:first-child,
.navbar.is-dark .navbar-end > a.navbar-item:first-child {
  border-top: 1px solid #565656;
}
.navbar .navbar-menu .navbar-item .button {
  color: #ddd;
  border-color: #ddd;
}
.navbar .navbar-menu .navbar-item .button:hover,
.navbar .navbar-menu .navbar-item .button:focus {
  background-color: #565656;
  color: white;
}

.buttons,
.buttons:last-child {
  margin-bottom: 0 !important;
  padding-bottom: 0.2rem !important;
}
.buttons.button {
  margin-bottom: 0.3rem;
}
.is-dark.input {
  background-color: #363636;
  border-color: #dddddd;
  color: #ddd;
  margin-bottom: 0.3rem;
}
.is-dark.input:focus {
  background-color: #565656;
  border-color: #dddddd;
  color: #ddd;
}

// more ----------------------

.button,
.input {
  height: 2.25rem;
}
.navbar-burger:hover {
  background-color: #363636;
}
.button.is-dark.is-inverted.is-outlined[disabled] {
  color: #8f8686;
  border-color: #8f8686;
}
</style>