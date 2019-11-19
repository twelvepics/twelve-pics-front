import Vue from 'vue'
import './plugins/fontawesome'
// import { MediaQueries, CommonBands } from 'vue-media-queries';
import App from './App.vue'
import router from './router'
import store from './store/store'
import './validate.js'
import './registerServiceWorker'
import "./css/styles.scss"

Vue.config.productionTip = false

// const mediaQueries = new MediaQueries({
//   bands: CommonBands.Bulma
// });
// Vue.use(mediaQueries);

new Vue({
  router,
  store,
  // mediaQueries,
  beforeCreate() {
    this.$store.commit('initialiseStore');
    this.$store.dispatch('refreshUser');
  },
  render: h => h(App)
}).$mount('#app')
