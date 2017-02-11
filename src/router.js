import Vue from 'vue';
import VueRouter from 'vue-router';
import cookies from 'cookies-js';
import config from 'c0nfig';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import ArticlesList from './pages/ArticlesList';
import ArticlesItem from './pages/ArticlesItem';
import Settings from './pages/Settings';

Vue.use(VueRouter);

function checkAuth (to, from, next) {
  if (cookies.get(config.auth.cookieName)) {
    next();
  } else {
    next('/login');
  }
}

const router = new VueRouter({
  mode: 'history',

  scrollBehavior: () => ({ y: 0 }),

  routes: [{
    path: '/login',
    component: Auth
  }, {
    path: '/',
    component: Dashboard,
    beforeEnter: checkAuth,
    children: [{
      path: '',
      redirect: 'articles/all'
    }, {
      path: 'articles',
      redirect: 'articles/all'
    }, {
      path: 'articles/:type',
      component: ArticlesList
    }, {
      path: 'articles/:type/:id',
      component: ArticlesItem
    }, {
      path: 'settings',
      component: Settings
    }]
  }]
});

export default router;
