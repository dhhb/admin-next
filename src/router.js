import Vue from 'vue';
import VueRouter from 'vue-router';

import Auth from './pages/Auth';
import Articles from './pages/Articles';
import ArticlesList from './pages/ArticlesList';
import ArticlesItem from './pages/ArticlesItem';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: Auth },
    { path: '/articles', component: Articles, children: [
      { path: '', component: ArticlesList },
      { path: ':id', component: ArticlesItem }
    ]}
  ]
});

export default router;
