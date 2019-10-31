import Vue from 'vue'
import Vuex from 'vuex'
import axiosBase from '../services/axiosBase'
////////////////////////////////////////////////////////////

import { setHomeLayout, resetHomeLayout } from '../utils/utils'

////////////////////////////////////////////////////////////
// modularize and namespace later when it's too messy

Vue.use(Vuex)

export default new Vuex.Store({
  // TODO filter user data in api
  state: {
    storyComponentMounted: false,
    jwtToken: null, // localStorage.getItem('token'),
    user: null, // JSON.parse(localStorage.getItem('user')),
    categories: ['documentary', 'stillLife', 'wildLife', 'wedding', 'travel', 'dailyLife', 'fineArt', 'portrait', 'sport', 'architecture', 'streetPhotography']
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
    getToken: state => {
      return state.jwtToken;
    },
    getCategories: (state, getters) => {
      // console.log("GET CATEGORIES STATE IS AUTH " + getters.isAuthenticated)
      // console.log("GET CATEGORIES GET AUTH USER " + getters.authenticatedUser)
      if (getters.isAuthenticated) {
        console.log(`CATEGORIES ${state.user.categories}`)
        return state.user.categories;
      } else {
        return state.categories;
      }
    },
    getProfile: (state, getters) => {
      // console.log("GET PROFILE STATE IS AUTH " + getters.isAuthenticated)
      // console.log("GET PROFILE GET AUTH USER " + getters.authenticatedUser)
      if (getters.isAuthenticated) {
        return state.user.profile;
      } else {
        return { profile: {} }
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
      if (state.user) {
        state.user.categories = categories;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
      state.categories = categories;
    },
    setProfile: (state, profile) => {
      if (state.user) {
        state.user.profile = profile;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    initialiseStore: state => {
      // console.log("INITIALIZING STORE")
      // console.log("JWT TOKEN => " + localStorage.getItem('jwtToken'));
      // console.log("USER => " + JSON.parse(localStorage.getItem('user')));
      if (localStorage.getItem('jwtToken')) {
        state.jwtToken = localStorage.getItem('jwtToken');
      }
      if (localStorage.getItem('user')) {
        state.user = JSON.parse(localStorage.getItem('user'));
      }
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
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log("USER LOGIN")
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
    save_categories: async ({ commit, getters }, categories) => {
      await commit('setCategories', categories);
      // if user is authenticated update categories in db
      if (getters.isAuthenticated) {
        console.log('User is authenticated, saving categories')
        // eslint-disable-next-line
        const update = await axiosBase.put(`users/${getters.authenticatedUser._key}`, {
          categories
        })
        // console.log(update)
      }
    },
    profile: async ({ commit, getters }, profile) => {
      await commit('setProfile', profile);
      // if user is authenticated update categories in db
      if (getters.isAuthenticated) {
        console.log('User is authenticated, saving profile')
        // eslint-disable-next-line
        const update = await axiosBase.put(`users/${getters.authenticatedUser._key}`, {
          profile
        })
        // console.log(update)
      }
    },
  },
})
