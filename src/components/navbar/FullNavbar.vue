<template>
  <nav
    class="navbar is-dark is-fixed-top box-shadow"
    role="navigation"
    aria-label="main navigation"
    v-click-outside="onClickOutside"
  >
    <!-- BRAND  -->
    <div class="navbar-brand">
      <div class="navbar-item" style="padding-bottom:0">
        <router-link to="/">
          <img src="/img/logo_v2.png" alt="12 pics logo" />
        </router-link>
      </div>
    </div>

    <!-- MENU -->
    <div class="navbar-menu">
      <!-- START -->
      <div class="navbar-start" style="flex-grow:1; justify-content: center;">
        <!-- CATEGORIES-->
        <div
          class="navbar-item"
          v-show="showCatsSelectButton"
          style="flex-grow: 1;justify-content: flex-end;margin-right:18px;"
        >
          <div id="filter-categories-lnk" class="nav-lnk">
            <a class="categoriesBtnColor" @click.prevent="selectCategories">
              <span class="fa-icon-pr4">
                <font-awesome-icon icon="list"></font-awesome-icon>
              </span>
              Filter categories
            </a>
          </div>
        </div>
        <!-- END CATEGROIES -->
        <!-- SEARCH INPUT -->
        <div class="navbar-item" v-show="showSearchBox" style="flex-grow:2;">
          <div class="field has-addons">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Search stories"
                style="flex-grow: 1;min-width:300px;max-width:350px;"
                @keydown.enter.prevent="searchSubmit"
                v-model="searchTerms"
              />
            </div>
            <div class="control">
              <a class="button is-primary" @click="searchSubmit">
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="search"></font-awesome-icon>
                </span>
              </a>
            </div>
          </div>
        </div>
        <!-- END SEARCH INPUT -->
      </div>
      <!-- END START -->
      <!-- END -->
      <div class="navbar-end">
        <!-- BUTTONS -->
        <div class="navbar-item">
          <div class="buttons">
            <!-- SIGNUP -->
            <a
              class="button is-primary"
              id="signup-btn"
              @click.prevent="signup"
              v-if="!isAuthenticated"
            >
              <strong>Sign up</strong>
            </a>
            <!-- SIGNIN -->
            <a
              class="button is-light"
              id="login-btn"
              @click.prevent="signin"
              v-if="!isAuthenticated"
            >
              <strong>Sign in</strong>
            </a>
            <!-- NEW STORY -->
            <button
              class="button is-primary"
              id="post-story-btn"
              @click="newStory"
              v-if="isAuthenticated"
              :disabled="disablePostStoryButton"
            >
              <strong>Post a story</strong>
            </button>
          </div>
        </div>
        <!-- BUTTONS -->
        <!-- DROP DOWN-->
        <div
          class="navbar-item has-dropdown dropdown-spacing"
          :class="{ 'is-active': showDropdown }"
          id="navbar-dropdown"
        >
          <a class="navbar-link" id="navbar-link" @click="toggleDropdown()">
            <span v-if="isAuthenticated">Hi {{ authenticatedUser.username }}</span>
            <span v-else>Hi there</span>
          </a>
          <!-- DROP DOWN ITEMS -->
          <div class="navbar-dropdown is-right is-boxed">
            <!-- PROFILE LINK -->
            <router-link
              class="navbar-item"
              :to="{ name: 'user', params: { username: authenticatedUser.username } }"
              exact
              exact-active-class="is-active"
              @click.native="hideDropdown()"
              v-if="isAuthenticated"
            >
              <span class="fa-icon-pr7">
                <font-awesome-icon icon="user"></font-awesome-icon>
              </span>
              <span>My profile</span>
            </router-link>
            <!-- STORIES LINK -->
            <router-link
              class="navbar-item"
              :to="{ name: 'user-stories', params: { username: authenticatedUser.username } }"
              exact
              exact-active-class="is-active"
              @click.native="hideDropdown()"
              v-if="isAuthenticated"
            >
              <span class="fa-icon-pr7">
                <font-awesome-icon icon="camera"></font-awesome-icon>
              </span>
              <span>My stories</span>
            </router-link>
            <!-- STARRED  -->
            <router-link
              v-if="isAuthenticated"
              class="navbar-item"
              :to="{ name: 'starred', params: { username: authenticatedUser.username } }"
              exact
              exact-active-class="is-active"
              @click.native="hideDropdown()"
            >
              <span class="fa-icon-pr7">
                <font-awesome-icon icon="star"></font-awesome-icon>
              </span>
              <span>Stories I starred</span>
            </router-link>
            <hr class="navbar-divider" />
            <!-- LOGOUT LINK -->
            <a v-if="isAuthenticated" class="navbar-item" @click.prevent="logout">
              <span class="fa-icon-pr7">
                <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
              </span>
              <span>Logout</span>
            </a>
            <!-- CONTACT US LINK -->
            <router-link
              class="navbar-item"
              to="/contact"
              @click.native="hideDropdown()"
              active-class="is-active"
            >
              <span class="fa-icon-pr7">
                <font-awesome-icon icon="envelope"></font-awesome-icon>
              </span>
              <span>Contact us</span>
            </router-link>
            <!-- ABOUT LINK -->
            <router-link
              class="navbar-item"
              to="/about"
              @click.native="hideDropdown()"
              active-class="is-active"
            >
              <span class="fa-icon-pr7">
                <font-awesome-icon icon="question"></font-awesome-icon>
              </span>
              <span>About 12 pics</span>
            </router-link>
            <hr class="navbar-divider" />
            <div class="navbar-item">Version 0.0.2</div>
          </div>
          <!-- END  DROP DOWN ITEMS -->
        </div>
        <!-- END DROP DOWN-->
      </div>
      <!-- END END -->
    </div>
    <!-- END MENU -->
  </nav>
</template>

<script>
import vClickOutside from "v-click-outside";
import { headerDisplayMixin } from "../../mixins/headerDisplayMixin";

export default {
  name: "NavbarFull",
  props: { isAuthenticated: Boolean, authenticatedUser: Object },
  directives: {
    clickOutside: vClickOutside.directive
  },
  mixins: [headerDisplayMixin],
  data: function() {
    return {
      showDropdown: false,
      searchTerms: ""
    };
  },
  methods: {
    onClickOutside() {
      this.hideDropdown();
    },
    // dropdown
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    hideDropdown() {
      if (this.showDropdown === true) {
        this.showDropdown = false;
      }
    },
    signin() {
      this.$emit("signin");
      this.hideDropdown();
    },
    signup() {
      this.$emit("signup");
      this.hideDropdown();
    },
    logout() {
      this.$emit("logout");
      this.hideDropdown();
    },
    newStory() {
      this.$emit("newStory");
      this.hideDropdown();
    },
    selectCategories() {
      this.$emit("selectCategories");
      this.hideDropdown();
    },
    searchSubmit() {
      this.$emit("searchStories", this.searchTerms);
    }
  },
  created() {
    console.log(`Full navbar onCreated => ${this.isAuthenticated}`);
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
.navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link {
  background-color: #363636;
}
.navbar .button[disabled] {
  opacity: 0.7;
  cursor: default;
}

.dropdown-spacing {
  margin-right: 15px;
  margin-left: 10px;
}

// more ---------------------- .button,
.button,
.input {
  height: 2.25rem;
}
.navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link,
.navbar.is-dark .navbar-end .navbar-link:hover,
.navbar-link:focus,
.navbar.is-dark .navbar-end .navbar-link:focus,
.navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link {
  background-color: #363636;
}
.navbar.is-dark .navbar-end .navbar-link {
  color: #ddd;
}
.hide-me {
  visibility: hidden;
}
</style>