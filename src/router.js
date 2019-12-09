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
      // list my stories
      {
        path: '/:username/stories',
        name: 'user-stories',
        components: {
          default: () => import(/* webpackChunkName: "create-story" */ './views/UserStoriesList.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        }
      },
      // create a story
      {
        path: '/story/create',
        name: 'create-story',
        components: {
          default: () => import(/* webpackChunkName: "create-story" */ './views/CreateUpdateStory.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        },

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
        path: '/story/:key/edit',
        name: 'edit-story',
        components: {
          default: () => import(/* webpackChunkName: "create-story" */ './views/CreateUpdateStory.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        },
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
        // this generates a separate chunk (contact.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
          default: () => import(/* webpackChunkName: "contact" */ './views/Contact.vue'),
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
        // this generates a separate chunk (recover-password.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
          default: () => import(/* webpackChunkName: "recover-password" */ './views/RecoverPassword.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        }
      },
      // validate email feedback
      {
        path: '/validate-email/:validate_id',
        name: 'validateEmail',
        // route level code-splitting
        // this generates a separate chunk (validate-email.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
          default: () => import(/* webpackChunkName: "validate-email" */ './views/ValidateEmail.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        }
      },
      {
        path: '/test-init',
        name: 'testInit',
        // route level code-splitting
        // this generates a separate chunk (validate-email.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
          default: () => import(/* webpackChunkName: "validate-email" */ './views/TestInit.vue'),
        }
      },

      // TODO
      // error page? -> unauthorized, server error etc...
      // generic slotted page?

    ],
    // eslint-disable-next-line
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })
