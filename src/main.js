import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueMq from 'vue-mq'
import './validate.js'
import "./css/styles.scss"
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Vue.config.productionTip = false

process.env.NODE_ENV === "production" && Sentry.init({
  dsn: 'https://e5aafe7d6e8644eb99d7dbe08b4a58ab@sentry.io/1870672',
  integrations: [
    new Integrations.Vue({ Vue, attachProps: true }),
  ],
  release: process.env.VUE_APP_RELEASE
});

//////////////////////////////////////////////
// mobile: up to 768px
// tablet: from 769px
// desktop: from 1024px
// widescreen: from 1216px
// fullhd: from 1408px
//////////////////////////////////////////////
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
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  render: h => h(App)
}).$mount('#app')
