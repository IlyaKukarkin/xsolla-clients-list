import Vue from 'vue';

export default {
  ADD_CLIENT (state, payload) {
    state.clients[payload.client.id] = payload.client;
  },

  UPDATE_CLIENT (state, payload) {
    state.clients[payload.client.id] = payload.client;
  },

  DELETE_CLIENT (state, payload) {
    Vue.delete(state.clients, payload.client.id);
  },

  LOAD_CLIENTS (state, payload) {
    state.clients = payload;
  }
};
