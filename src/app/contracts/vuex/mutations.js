import Vue from 'vue';

export default {
  CREATE_CONTRACT (state, payload) {
    state.contracts[payload.contract.id] = payload.contract;
  },

  UPDATE_CONTRACT (state, payload) {
    state.contracts[payload.contract.id] = payload.contract;
  },

  DELETE_CONTRACT (state, payload) {
    Vue.delete(state.contracts, payload.contract.id);
  },

  LOAD_CONTRACTS (state, payload) {
    state.contracts = payload;
  },

  LOAD_CLIENTS (state, payload) {
    state.clients = payload;
  }
};
