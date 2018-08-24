import Vue from 'vue';
import { App } from './app';
import router from './router';
import store from './store';
import 'bulma/css/bulma.css';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
