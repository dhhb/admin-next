import Vue from 'vue';
import Vuex from 'vuex';
import cookies from 'cookies-js';
import config from 'c0nfig';
import api from '../utils/api';

Vue.use(Vuex);

const sessionTokenId = cookies.get(config.auth.cookieName);

if (sessionTokenId) {
  api.setSession(sessionTokenId);
}

const store = new Vuex.Store({
  state: {
    authenticated: false,
    articles: []
  },

  getters: {},

  actions: {
    authorize({ commit }, creds) {
      return new Promise((resolve, reject) => {
        api.authorize(creds)
          .then(token => {
            api.setSession(token.id);
            cookies.set(config.auth.cookieName, token.id, {
              expires: new Date(token.expireAt)
            });

            commit('setAuthenticated', true);
            resolve(token);
          })
          .catch(err => {
            commit('setAuthenticated', false);
            reject(err);
          });
      });
    },

    requestArticles({ commit }) {
      api.getArticles({author: true}).then(articles => {
        commit('setArticles', articles || []);
      });
    }
  },

  mutations: {
    setAuthenticated(state, value) {
      state.authenticated = value;
    },

    setArticles(state, articles) {
      state.articles = [ ...articles ];
    }
  }
});

export default store;
