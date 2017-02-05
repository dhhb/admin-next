import Vue from 'vue';
import Vuex from 'vuex';
import api from '../utils/api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},

  getters: {},

  actions: {
    authorize({ commit }, creds) {
      api.authorize(creds)
        .then(() => {
          console.log(arguments);
        })
        .catch(() => {
          console.log(arguments);
        });
    }
  },

  mutations: {}
});

export default store;
