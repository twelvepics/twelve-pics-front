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
        <router-link to="/">
          <img src="/img/logo.png" alt="12 pics logo" />
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
        <div class="navbar-item buttons">
          <a href class="button is-dark is-inverted is-outlined">Sign-up</a>
          <a href class="button is-dark is-inverted is-outlined">Sign-in</a>
        </div>
        <div class="navbar-item">
          <div class="field">
            <div class="control">
              <input class="input is-dark" type="text" placeholder="Search stories" />
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <!-- navbar items -->
        <a class="navbar-item">Filter categories</a>
        <a class="navbar-item">My profile</a>
        <a class="navbar-item">My stories</a>
        <a class="navbar-item">Starred</a>
      </div>
    </div>
    <!-- ENDS NAVBAR MENU -->
  </nav>
  <!-- END NAV -->
</template>
<script>
import vClickOutside from "v-click-outside";

export default {
  name: "NavbarMobile",
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      showBurgerDropdown: false
    };
  },
  methods: {
    onClickOutside() {
      this.hideBurgerDropdown();
    },
    navbarMenuClicked() {
      console.log("navbar-menu clicked");
    },
    toggleBurgerDropdown() {
      this.showBurgerDropdown = !this.showBurgerDropdown;
      // console.log("TOGGLEBURGERDROPDOWN");
      // console.log(`showBurgerDropdown -> ${this.showBurgerDropdown}`);
    },
    hideBurgerDropdown() {
      if (this.showBurgerDropdown === true) {
        this.showBurgerDropdown = false;
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
  max-height: none;
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
.navbar-item:hover,
.navbar-link:hover {
  color: #fff;
}
.navbar.is-dark .navbar-start > a.navbar-item:hover,
.navbar.is-dark .navbar-end > a.navbar-item:hover {
  background-color: #464646;
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
</style>