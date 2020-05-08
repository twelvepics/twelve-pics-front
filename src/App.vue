<template>
  <div id="app">
    <app-header></app-header>
    <!-- <router-view :key="$route.fullPath" /> -->
    <router-view />
    <router-view name="footer"></router-view>
    <!-- <router-view name="storyModal" :key="$route.fullPath"></router-view> -->
    <router-view name="storyModal"></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: {
    appHeader: Header
  }
};
</script>

<style lang="scss">
/**** layout ****/
main {
  margin-top: 85px;
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
/*************** errors  *************/
.isError {
  color: red;
}
/* limit max width **/
.max-container {
  max-width: 1248px !important;
}

@media only screen and (max-width: 600px) {
  main {
    margin-top: 70px;
  }
}
</style>
