import 'element-ui/lib/theme-default/index.css'
import './index.css';

import 'babel-polyfill';

import Vue from 'vue';
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU';

import router from './router';
import App from './App';

Vue.use(ElementUI, { locale });

const app = new Vue({
  router,
  ...App
});

app.$mount('#app');
