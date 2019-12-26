import Vue from 'vue'
import './plugins/fontawesome'
// import { MediaQueries, CommonBands } from 'vue-media-queries';
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueMq from 'vue-mq'
import './validate.js'
import './registerServiceWorker'
import "./css/styles.scss"

Vue.config.productionTip = false

// const mediaQueries = new MediaQueries({
//   bands: CommonBands.Bulma
// });
// Vue.use(mediaQueries);

// mobile: up to 768px
// tablet: from 769px
// desktop: from 1024px
// widescreen: from 1216px
// fullhd: from 1408px

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    mobile: 768,
    tablet: 1023,
    desktop: 1215,
    widescreen: 1407,
    fullhd: Infinity,
  }
  // defaultBreakpoint: 'sm' // customize this for SSR
})

new Vue({
  router,
  store,
  // mediaQueries,
  beforeCreate() {
    this.$store.commit('initialiseStore');
    this.$store.dispatch('initUser');
  },
  render: h => h(App)
}).$mount('#app')
