import Vue from 'vue';
import Vuex from 'vuex';
import cookies from 'cookies-js';
import config from 'c0nfig';
import api from '../utils/api';

Vue.use(Vuex);

let userId;
let sessionTokenId;

const authCookie = cookies.get(config.auth.cookieName);

if (authCookie) {
  const parsedSession = atob(authCookie).split('|');

  sessionTokenId = parsedSession[0];
  userId = parsedSession[1];

  api.setSession(sessionTokenId);
}

const store = new Vuex.Store({
  state: {
    loading: false,
    authenticated: userId,
    user: {},
    articles: []
  },

  getters: {},

  actions: {
    authorize({ commit }, creds) {
      return new Promise((resolve, reject) => {
        api.authorize(creds)
          .then(token => {
            api.setSession(token.id);
            cookies.set(config.auth.cookieName, btoa(`${token.id}|${token.userId}`), {
              expires: new Date(token.expireAt)
            });

            commit('setAuthenticated', token.userId);
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
    },

    requestUser({ commit, state }, id) {
      api.getUserById(id || state.authenticated).then(user => {
        commit('setUser', user || {});
      });
    }
  },

  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },

    setAuthenticated(state, value) {
      state.authenticated = value;
    },

    setArticles(state, articles) {
      state.articles = [ ...articles ];
    },

    setUser(state, user) {
      state.user = { ...user };
    }
  }
});

api.events.on('unauthorized', () => {
  store.commit('setAuthenticated', false);
});

api.events.on('request:start', () => {
  store.commit('setLoading', true);
});

api.events.on('request:end', () => {
  store.commit('setLoading', false);
});

export default store;
