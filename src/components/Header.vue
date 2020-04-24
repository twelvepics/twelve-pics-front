<template>
  <div>
    <component :is="navbar"></component>
  </div>
</template>

<script>
import MobileNavbar from "./navbar/MobileNavbar";
import FullNavbar from "./navbar/FullNavbar";

let _mql = null;
const LAYOUT_FULL = 0;
const LAYOUT_MOBILE = 1;

export default {
  components: { MobileNavbar, FullNavbar },
  data() {
    return {
      showBurgerDropdown: false,
      layout: null,
      navbar: null
    };
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
    }
  },
  created: function() {
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
    console.log("#--- beforeDestroy ---#");
    _mql.removeListener(_mql);
  }
};
</script>

