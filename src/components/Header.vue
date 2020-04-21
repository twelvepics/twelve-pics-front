<template>
  <div>
    <!-- NAV -->
    <nav
      class="navbar is-dark is-fixed-top box-shadow"
      role="navigation"
      aria-label="main navigation"
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
          <a class="navbar-item">First</a>
          <a class="navbar-item">Second</a>
          <a class="navbar-item">Third</a>
        </div>
        <div class="navbar-end">
          <!-- navbar items -->
          <div class="navbar-start">
            <!-- navbar items -->
            <!-- <a class="navbar-item">End</a> -->
          </div>
        </div>
      </div>
      <!-- ENDS NAVBAR MENU -->
    </nav>
    <!-- END NAV -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBurgerDropdown: false
    };
  },
  methods: {
    toggleBurgerDropdown() {
      this.showBurgerDropdown = !this.showBurgerDropdown;
      // console.log("TOGGLEBURGERDROPDOWN");
      // console.log(`showBurgerDropdown -> ${this.showBurgerDropdown}`);
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
@media screen and (max-width: 999px) {
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
  .navbar.is-dark .navbar-start > a.navbar-item:hover {
    background-color: #464646;
  }
  .navbar.is-dark .navbar-start > a.navbar-item {
    border-bottom: 1px solid #565656;
  }
  .navbar.is-dark .navbar-start > a.navbar-item:first-child {
    border-top: 1px solid #565656;
  }
}
</style>