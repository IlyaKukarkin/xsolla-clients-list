import Vue from 'vue';
import localforage from 'localforage';

export default {
  CREATE_CONTRACT (state, payload) {
    state.contracts[payload.contract.id] = payload.contract;
    let client = state.clients[payload.contract.clientId];
    if (payload.contract.id) {
      client.contractId = payload.contract.id;
      state.clients[client.id] = client;
      localforage.setItem('CLIENT-' + client.id, client).then((value) => {
        return value;
      });

      let selectedObject = state.cars[payload.contract.objectId];
      if (typeof selectedObject === 'object') {
        selectedObject.contractId = payload.contract.id;
        localforage.setItem('CAR-' + selectedObject.id, selectedObject).then((value) => {
          return value;
        });
      } else {
        selectedObject = state.flats[payload.contract.objectId];
        selectedObject.contractId = payload.contract.id;
        state.flats[selectedObject.id] = selectedObject;
        localforage.setItem('FLAT-' + selectedObject.id, selectedObject).then((value) => {
          return value;
        });
      }
    }
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
  },

  LOAD_FLATS (state, payload) {
    state.flats = payload;
  },

  LOAD_CARS (state, payload) {
    state.cars = payload;
  },

  UPDATE_CLIENT (state, payload) {
    state.clients[payload.client.id] = payload.client;
  },

  UPDATE_CAR (state, payload) {
    state.cars[payload.car.id] = payload.car;
  },

  UPDATE_FLAT (state, payload) {
    state.flats[payload.flat.id] = payload.flat;
  }
};
