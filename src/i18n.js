import Vue from 'vue';
import VueI18n from 'vue-i18n';

// load element-ui locales
import elEnLocale from 'element-ui/lib/locale/lang/en';
import elRuLocale from 'element-ui/lib/locale/lang/ru-RU';

// load moment locales (en is default)
import 'moment/locale/ru';
import moment from 'moment';

import enLocale from './locales/en';
import ruLocale from './locales/ru-RU';

Vue.use(VueI18n);

Vue.config.lang = 'ru-RU';

Vue.locale('en', Object.assign(enLocale, elEnLocale));
Vue.locale('ru-RU', Object.assign(ruLocale, elRuLocale));

moment.locale('ru');
