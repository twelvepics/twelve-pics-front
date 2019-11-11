import Vue from 'vue'
import Router from 'vue-router'
// Lazy load some
import Home from './views/Home.vue'
// import Footer from './views/Footer.vue'

Vue.use(Router)

export default new Router(
  {
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      // home page
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      // create a story
      {
        path: '/story/create',
        name: 'create-story',
        components: {
          default: () => import(/* webpackChunkName: "create-story" */ './views/CreateStory.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        }
      },
      // view a story
      {
        path: '/story/:slug',
        name: 'view-story',
        components: {
          default: () => import(/* webpackChunkName: "story" */ './views/Story.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        }
      },
      {
        path: '/story/:id/edit',
        name: 'edit-story',
        components: {
          default: () => import(/* webpackChunkName: "create-story" */ './views/EditStory.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        }
      },

      // view user profile
      {
        path: '/user/:username',
        name: 'user',
        components: {
          default: () => import(/* webpackChunkName: "user" */ './views/UserProfile.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        },
        props: true
      },
      // edit user profile
      {
        path: '/user/:user_key/edit',
        name: 'edit-user',
        components: {
          default: () => import(/* webpackChunkName: "edit-user" */ './views/UserProfileEdit.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        }
      },
      // view / edit user settings
      {
        path: '/user/:id/settings',
        name: 'user-settings',
        components: {
          default: () => import(/* webpackChunkName: "user-settings" */ './views/Settings.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        }
      },
      // contact us
      {
        path: '/contact',
        name: 'contact',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
          default: () => import(/* webpackChunkName: "about" */ './views/Contact.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        }
      },
      // about us
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
          default: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        }
      },
      // recover password
      {
        path: '/auth/recoverPassword/:reset_id',
        name: 'recoverPassword',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
          default: () => import(/* webpackChunkName: "about" */ './views/RecoverPassword.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        }
      },

      // TODO
      // recover / new password page
      // email has been validated thank you page
      // error page -> unauthorized, server error etc...

    ],
    // eslint-disable-next-line
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })
