import Vue from 'vue'
import Vuex from 'vuex'
import axiosBase from '../services/axiosBase'

import { setHomeLayout, resetHomeLayout } from '../utils/utils'

////////////////////////////////////////////////////////////
// modularize and namespace later when it's too messy
////////////////////////////////////////////////////////////

Vue.use(Vuex)

export default new Vuex.Store({
  // TODO filter user data in api
  state: {
    storyComponentMounted: false,
    jwtToken: null,
    user: null,
    categories: ['documentary', 'stillLife', 'wildLife', 'wedding', 'travel', 'dailyLife', 'fineArt', 'portrait', 'sport', 'archiecture']
  },
  getters: {
    isStoryComponentMounted: state => {
      return state.storyComponentMounted;
    },
    isAuthenticated: state => {
      return state.jwtToken != null;
    },
    authenticatedUser: state => {
      return state.user;
    },
    token: state => {
      return state.jwtToken;
    },
    getCategories: state => {
      if (state.isAuthenticated) {
        return state.user.categories;
      } else {
        return state.categories;
      }
    }
  },
  mutations: {
    // STORY
    setStoryComponentMounted: (state, payload) => {
      console.log('we can set the layout and show the story now');
      console.log(`Mounting story: ${payload.storyId}`)
      setHomeLayout();
      state.storyComponentMounted = true;
    },
    resetStoryComponentMounted: state => {
      console.log('Story unmounted, we must reset the layout to its initial state');
      resetHomeLayout();
      state.storyComponentMounted = false;
    },
    userToState: (state, userData) => {
      state.jwtToken = userData.token;
      state.user = userData.user;
    },
    clearAuthData: state => {
      state.jwtToken = null;
      state.user = null;
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
    },
    setCategories: (state, categories) => {
      if (state.isAuthenticated) {
        state.user.categories = categories;
      }
      state.categories = categories;
    }
  },
  actions: {
    setStoryComponentMounted: ({ commit }, payload) => {
      commit('setStoryComponentMounted', payload);
    },
    resetStoryComponentMounted: ({ commit }) => {
      commit('resetStoryComponentMounted');
    },
    // SIGNUP
    // eslint-disable-next-line
    signup: async ({ commit, dispatch }, userData) => {
      const response = await axiosBase.post('/users', {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        repeat_password: userData.repeat_password
      })
      const data = response.data;
      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('user', data.user);
      commit('userToState', { token: data.token, user: data.user })
    },

    login: async ({ commit }, userData) => {
      const response = await axiosBase.post('auth/login', {
        login: userData.login,
        password: userData.password,
        rememberMe: userData.rememberMe,
      })
      const data = response.data;
      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('user', data.user);
      commit('userToState', { token: data.token, user: data.user });
    },
    logout: async ({ commit }) => {
      // delete token server side
      const deleted = await axiosBase.post('auth/logout')
      console.log(deleted)
      await commit('clearAuthData');
    },
    // eslint-disable-next-line
    // categories: async ({ commit, getters }, categories) => {
    categories: async ({ commit, getters }, categories) => {
      await commit('setCategories', categories);
      // if user is authenticated update categories in db
      if (getters.isAuthenticated) {
        const update = await axiosBase.put(`users/${getters.authenticatedUser._key}`, {
          categories
        })
        console.log(update)
      }
    },
    // set credz at startup
    authInit({ commit }) {
      const token = localStorage.getItem('jwtToken')
      if (!token) {
        return
      }
      const user = localStorage.getItem('user')
      commit('userToState', {
        token,
        user,
      })
    },
  },
})
