<template>
  <div id="app" v-if="!is_mobile">
    <app-header></app-header>
    <router-view />
    <router-view name="footer"></router-view>
    <router-view name="storyModal"></router-view>
  </div>
  <div id="app" v-else>
    <if-mobile />
  </div>
</template>

<script>
import UAParser from "ua-parser-js";
import Header from "./components/Header.vue";
import IfMobile from "./components/IfMobile.vue";
export default {
  components: {
    appHeader: Header,
    IfMobile: IfMobile
  },
  computed: {
    // a computed getter
    is_mobile: function() {
      const result = UAParser(window.navigator.userAgent);
      // console.log(`device type -> ${result.device.type}`);
      const is_mobile = [
        "console",
        "mobile",
        "tablet",
        "smarttv",
        "wearable",
        "embedded"
      ].includes(result.device.type);
      // console.log(`is mobile -> ${is_mobile}`);
      return is_mobile;
    }
  }
};
</script>

<style lang="scss">
/**** layout ****/
main {
  margin-top: 100px;
}
/**** spacing  ****/
.mt20 {
  margin-top: 20px;
}
.mt10p20 {
  margin-top: 10px;
  padding-bottom: 20px;
}
.fa-icon-pr4 {
  padding-right: 4px;
}
.fa-icon-pr7 {
  padding-right: 7px;
}
.mr15 {
  margin-right: 15px;
}
.ml10 {
  margin-left: 10px;
}
.pb5 {
  padding-bottom: 5px;
}
.m-30-0-15-0 {
  margin: 30px 0 15px 0;
}
.pb-05 {
  padding-bottom: 0.5rem;
}
.pb-03 {
  padding-bottom: 0.3rem;
}
.pt-0 {
  padding-top: 0;
}
.message-header {
  font-weight: 400 !important;
}
/*********** Toast  *********/
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.3s;
}
.fade-leave-active {
  transition-duration: 0s;
}
/* .fade-enter-active {
  transition-delay: 0.25s;
} */
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
/*************** errors  *************/
.isError {
  color: red;
}
</style>
