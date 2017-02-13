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
    articles: [],
    selectedArticle: null
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

    requestArticles({ commit }, type) {
      let filter = type === 'drafts' ? {draft: true} :
        type === 'published' ? {draft: false} : {};

      api.getArticles({author: true, filter}).then(articles => {
        commit('setArticles', articles || []);
      });
    },

    requestUser({ commit, state }, id) {
      const userId = id || state.authenticated;

      if (!userId) {
        return;
      }

      api.getUser(userId).then(user => {
        commit('setUser', user || {});
      });
    },

    requestArticle({ commit }, id) {
      api.getArticle(id).then(article => {
        commit('setSelectedArticle', article);
      });
    },

    createArticle({ commit }, data) {
      api.createArticle(data).then(article => {
        commit('setSelectedArticle', article);
      });
    },

    updateArticle({ commit }, { data, id }) {
      api.updateArticle(data, id).then(article => {
        commit('setSelectedArticle', article);
      });
    },

    deleteArticle({ commit, state }, id) {
      commit('deleteArticle', id);
      api.deleteArticle(id);
    },

    resetSelectedArticle({ commit }) {
      commit('setSelectedArticle', {});
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
    },

    setSelectedArticle(state, article) {
      state.selectedArticle = { ...article };
    },

    deleteArticle(state, id) {
      const index = state.articles.findIndex(article => article.id === id);

      if (index > -1) {
        state.articles.splice(index, 1);
      }
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
