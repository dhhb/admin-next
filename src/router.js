import Vue from 'vue';
import VueRouter from 'vue-router';
import cookies from 'cookies-js';
import config from 'c0nfig';

import Auth from './pages/Auth';
import Articles from './pages/Articles';
import ArticlesList from './pages/ArticlesList';
import ArticlesItem from './pages/ArticlesItem';

Vue.use(VueRouter);

function checkAuth (to, from, next) {
  if (cookies.get(config.auth.cookieName)) {
    next();
  } else {
    next('/');
  }
}

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: Auth },
    { path: '/articles', component: Articles, beforeEnter: checkAuth, children: [
      { path: '', component: ArticlesList },
      { path: ':id', component: ArticlesItem }
    ]}
  ]
});

export default router;
