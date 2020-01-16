import Vue from 'vue'
import Router from 'vue-router'
// Lazy load some
import Home from './views/Home.vue'
import StoryStandalone from './views/StoryStandalone.vue'
import StoryModal from './components/StoryModal.vue'

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
        meta: {
          isModalView: true
        }
      },
      {
        path: '/search',
        name: 'search',
        components: {
          default: () => import(/* webpackChunkName: "search-stories" */ './views/Search.vue'),
        },
        meta: {
          isModalView: true
        }
      },
      // list my stories
      {
        path: '/user/:username/stories',
        name: 'user-stories',
        components: {
          default: () => import(/* webpackChunkName: "user-stories" */ './views/UserStoriesList.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        },
        meta: {
          isModalView: true
        }
      },
      {
        path: '/user/:username/starred',
        name: 'starred',
        components: {
          default: () => import(/* webpackChunkName: "starred-stories" */ './views/Starred.vue'),
        },
        meta: {
          isModalView: true
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
          // default: () => import(/* webpackChunkName: "story" */ './views/StoryStandalone.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        },
        beforeEnter: (to, from, next) => {
          const isModalView = from.matched.some(view => view.meta && view.meta.isModalView);
          // console.log(from.matched);
          if (!isModalView) {
            // For direct access
            to.matched[0].components = {
              default: StoryStandalone,
              modal: false
            }
          }
          if (isModalView) {
            // For isModalView access
            if (to.matched[0].components) {
              // Rewrite components for `default`
              to.matched[0].components.default = from.matched[0].components.default
              // Rewrite components for `modal`
              to.matched[0].components.storyModal = StoryModal;
            }
          }
          next();
        },
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
        meta: {
          isModalView: true
        },
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
        path: '/auth/reset-password/:reset_id',
        name: 'resetPassword',
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
        path: '/users/validate-email/:validate_id',
        name: 'validateEmail',
        // route level code-splitting
        // this generates a separate chunk (validate-email.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
          default: () => import(/* webpackChunkName: "validate-email" */ './views/ValidateEmail.vue'),
          footer: () => import(/* webpackChunkName: "footer" */ './views/Footer.vue'),
        }
      },
      // validate email feedback
      {
        path: '/test',
        name: 'test',
        components: {
          default: () => import(/* webpackChunkName: "validate-email" */ './views/Test.vue'),
        }
      },
      {
        path: '*',
        name: 'error',
        component: Error
      }

    ],
    // eslint-disable-next-line
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })
