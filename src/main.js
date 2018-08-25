import Vue from 'vue';
import { App } from './app';
import router from './router';
import store from './store';
import 'bulma/css/bulma.css';
import localforage from 'localforage';
require('localforage-startswith');

Vue.config.productionTip = false;

localforage.config({
  name: 'clients-list'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
