import Vue from 'vue';
import Vuex from 'vuex';
import axiosBase from '../services/axiosBase';
////////////////////////////////////////////////////////////

import { setHomeLayout, resetHomeLayout } from '../utils/utils';
import { categoriesList } from '../utils/categories';

////////////////////////////////////////////////////////////
// modularize and namespace later when it's too messy

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    storyComponentMounted: false,
    jwtToken: null, // localStorage.getItem('token'),
    user: null, // JSON.parse(localStorage.getItem('user')),
    categories: categoriesList.map((cat) => cat.key),
    userInited: false,
  },
  getters: {
    isStoryComponentMounted: (state) => {
      return state.isStoryComponentMounted;
    },
    isAuthenticated: (state) => {
      return state.jwtToken != null;
    },
    isUserInited: (state) => {
      return state.userInited;
    },
    authenticatedUser: (state) => {
      return state.user;
    },
    getToken: (state) => {
      return state.jwtToken;
    },
    getCategories: (state, getters) => {
      if (getters.isAuthenticated) {
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
        return { profile: {} };
      }
    },
  },
  mutations: {
    // STORY
    setStoryComponentMounted: (state) => {
      // console.log('we can set the layout and show the story now');
      // console.log(`Mounting story: ${payload.storyId}`)
      setHomeLayout();
      state.storyComponentMounted = true;
    },
    resetStoryComponentHomeLayout: (state) => {
      // console.log('Story unmounted, we must reset the layout to its initial state');
      resetHomeLayout();
      state.storyComponentMounted = false;
    },
    userToState: (state, userData) => {
      state.jwtToken = userData.token;
      state.user = userData.user;
      state.userInited = true;
    },
    initUserState: (state, userData) => {
      state.user = userData.user;
      state.userInited = true;
    },
    clearAuthData: (state) => {
      state.jwtToken = null;
      state.user = null;
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
      state.userInited = false;
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
    setAvatar: (state, avatar_path) => {
      if (state.user) {
        state.user.profile.avatar_path = avatar_path;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    setEmailConfirmed: (state) => {
      if (state.user) {
        state.user.email_confirmed = true;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    initialiseStore: (state) => {
      console.log('INITIALIZING STORE');
      // console.log("JWT TOKEN => " + localStorage.getItem('jwtToken'));
      // console.log("USER => " + JSON.parse(localStorage.getItem('user')));
      if (localStorage.getItem('jwtToken')) {
        state.jwtToken = localStorage.getItem('jwtToken');
      }
      if (localStorage.getItem('user')) {
        state.user = JSON.parse(localStorage.getItem('user'));
      }
    },
  },
  actions: {
    ///////////////////////////////////////////////////////////////////
    // SETS an userRefreshDone in data too
    ///////////////////////////////////////////////////////////////////
    initUser: async ({ commit, getters }) => {
      //////////////////////////////////////////////////////////////
      // refetch user in case he was updated from smwhere else
      //////////////////////////////////////////////////////////////
      if (getters.isAuthenticated) {
        console.log('REFRESHING USER');
        const user_key = getters.authenticatedUser._key;
        // console.log(user_key)
        const user = await axiosBase.get(`users/${user_key}`);
        const user_data = user.data;
        // console.log(user_data)
        localStorage.setItem('user', JSON.stringify(user_data.user));
        commit('initUserState', user_data);
      }
    },
    setStoryComponentMounted: ({ commit }, payload) => {
      commit('setStoryComponentMounted', payload);
    },
    resetStoryComponentHomeLayout: ({ commit }) => {
      commit('resetStoryComponentHomeLayout');
    },
    // SIGNUP
    // eslint-disable-next-line
    signup: async ({ commit, dispatch }, userData) => {
      const response = await axiosBase.post('/users', {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        repeat_password: userData.repeat_password,
      });
      const data = response.data;
      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      commit('userToState', { token: data.token, user: data.user });
    },

    login: async ({ commit }, userData) => {
      const response = await axiosBase.post('auth/login', {
        login: userData.login,
        password: userData.password,
        rememberMe: userData.rememberMe,
      });
      const data = response.data;
      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      // console.log("USER LOGIN")
      commit('userToState', { token: data.token, user: data.user });
    },
    logout: async ({ commit }) => {
      // delete token server side
      await axiosBase.post('auth/logout');
      // console.log(deleted);
      await commit('clearAuthData');
    },
    // eslint-disable-next-line
    // categories: async ({ commit, getters }, categories) => {
    save_categories: async ({ commit, getters }, categories) => {
      await commit('setCategories', categories);
      // if user is authenticated update categories in db
      if (getters.isAuthenticated) {
        // console.log('User is authenticated, saving categories')
        // eslint-disable-next-line
        const update = await axiosBase.put(
          `users/${getters.authenticatedUser._key}`,
          {
            categories,
          }
        );
        // console.log(update)
      }
    },
    save_profile: async ({ commit, getters }, profile) => {
      // if user is authenticated update categories in db
      if (getters.isAuthenticated) {
        // console.log('User is authenticated, saving profile')
        const updated = await axiosBase.put(
          `users/${getters.authenticatedUser._key}`,
          {
            profile,
          }
        );
        const newProfile = updated.data.user.profile;
        // console.log(newProfile);
        await commit('setProfile', newProfile);
      }
    },
    save_avatar: async ({ commit, getters }, avatar_path) => {
      await commit('setAvatar', avatar_path);
      // if user is authenticated update categories in db
      if (getters.isAuthenticated) {
        // console.log('User is authenticated, saving avatar')
        // eslint-disable-next-line
        const update = await axiosBase.put(
          `users/${getters.authenticatedUser._key}/avatar`,
          {
            avatar_path,
          }
        );
        // console.log(update)
      }
    },
  },
});
