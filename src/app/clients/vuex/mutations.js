import Vue from 'vue';
import { guid } from '../../../utils';

export default {
  ADD_CLIENT (state, payload) {
    let id = guid();
    state.clients[id] = Object.assign({ id: id }, payload.client);
  },

  UPDATE_CLIENT (state, payload) {
    state.clients[payload.client.id] = payload.client;
  },

  DELETE_CLIENT (state, payload) {
    Vue.delete(state.clients, payload.client.id);
  }
};
