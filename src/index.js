import './index.css';
import './index.scss';
import 'element-ui/lib/theme-default/index.css';

import 'babel-polyfill';
import Vue from 'vue';
import VueMoment from 'vue-moment';
import { sync } from 'vuex-router-sync';
import ElementUI from 'element-ui';

import './i18n';
import store from './store';
import router from './router';
import App from './App';

Vue.use(ElementUI);
Vue.use(VueMoment);

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

const app = new Vue({
  router,
  store,
  ...App
});

app.$mount('#app');
