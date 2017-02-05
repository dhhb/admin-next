import Vue from 'vue';
import Vuex from 'vuex';
import api from '../utils/api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authenticated: false
  },

  getters: {},

  actions: {
    authorize({ commit }, creds) {
      return new Promise((resolve, reject) => {
        api.authorize(creds)
          .then(data => {
            commit('setAuthenticated', true);
            resolve(data);
          })
          .catch(err => {
            commit('setAuthenticated', false);
            reject(err);
          });
      });
    }
  },

  mutations: {
    setAuthenticated(state, value) {
      state.authenticated = value;
    }
  }
});

export default store;
