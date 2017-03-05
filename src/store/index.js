import Vue from 'vue';
import Vuex from 'vuex';
import cookies from 'cookies-js';
import config from 'c0nfig';
import api from '../utils/api';
import analytics from '../utils/analytics';

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
    selectedArticle: null,
    categories: [],
    connectedUsers: []
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

      api.getArticles({include: 'author', filter}).then(articles => {
        commit('setArticles', articles || []);
      });
    },

    requestUser({ commit, state }, id) {
      const userId = id || state.authenticated;

      if (!userId) {
        return;
      }

      api.getUser(userId).then(user => {
        commit('setUser', user);
      });
    },

    updateUser({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        api.updateUser(data, state.authenticated).then(user => {
          commit('setUser', user);
          resolve(user);
        }).catch(err => {
          reject(err);
        });
      });
    },

    requestArticle({ commit }, id) {
      api.getArticle(id).then(article => {
        commit('setSelectedArticle', article);
      });
    },

    createArticle({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.createArticle(data).then(article => {
          commit('setSelectedArticle', article);
          resolve(article);
        }).catch(err => {
          reject(err);
        });
      });
    },

    updateArticle({ commit }, { data, id }) {
      return new Promise((resolve, reject) => {
        api.updateArticle(data, id).then(article => {
          commit('setSelectedArticle', article);
          resolve(article);
        }).catch(err => {
          reject(err);
        });
      });
    },

    deleteArticle({ commit, state }, id) {
      commit('deleteArticle', id);
      api.deleteArticle(id);
    },

    publishArticle({ dispatch }, id) {
      return dispatch('updateArticle', {data: {publish: true}, id});
    },

    unpublishArticle({ dispatch }, id) {
      return dispatch('updateArticle', {data: {publish: false}, id});
    },

    resetSelectedArticle({ commit }) {
      commit('setSelectedArticle', {});
    },

    requestCategories({ commit }) {
      api.getCategories().then(categories => {
        commit('setCategories', categories || []);
      });
    },

    createCategory({ commit }, title) {
      return new Promise((resolve, reject) => {
        api.createCategory({ title }).then(category => {
          commit('addCategory', category);
          resolve(category);
        }).catch(err => {
          reject(err);
        });
      });
    },

    deleteCategory({ commit }, id) {
      commit('deleteCategory', id);
      api.deleteCategory(id);
    },

    connectUser({ state }) {
      analytics.sendAdminUser({id: state.authenticated});
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
    },

    setCategories(state, categories) {
      state.categories = [ ...categories ];
    },

    addCategory(state, category) {
      state.categories = [ ...state.categories, category ];
    },

    deleteCategory(state, id) {
      const index = state.categories.findIndex(category => category.id === id);

      if (index > -1) {
        state.categories.splice(index, 1);
      }
    },

    addConnectedUser(state, id) {
      state.connectedUsers = [ ...state.connectedUsers, id ];
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

analytics.events.on('connected-admin-user', user => {
  console.log('user', user);
  store.commit('addConnectedUser', user.id);
});

export default store;
