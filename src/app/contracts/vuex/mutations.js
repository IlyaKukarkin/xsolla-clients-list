import Vue from 'vue';
import localforage from 'localforage';
import {processAPIData} from '../../../utils';

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
    let oldClient = {};
    let oldObject = {};
    let resClients = processAPIData(state.clients);
    for (let key in resClients) {
      if (resClients[key].contractId === payload.contract.id) {
        oldClient = resClients[key];
        break;
      }
    }
    let resObject = processAPIData(state.cars);
    for (let key in resObject) {
      if (resObject[key].contractId === payload.contract.id) {
        oldObject = resObject[key];
        break;
      }
    }
    if (!oldObject.hasOwnProperty('id')) {
      resObject = processAPIData(state.flats);
      for (let key in resObject) {
        if (resObject[key].contractId === payload.contract.id) {
          oldObject = resObject[key];
          break;
        }
      }
      oldObject.contractId = undefined;
      state.flats[oldObject.id] = oldObject;
      localforage.setItem('FLAT-' + oldObject.id, oldObject).then((value) => {
        return value;
      });
    } else {
      oldObject.contractId = undefined;
      state.cars[oldObject.id] = oldObject;
      localforage.setItem('CAR-' + oldObject.id, oldObject).then((value) => {
        return value;
      });
    }

    oldClient.contractId = undefined;
    state.clients[oldClient.id] = oldClient;
    localforage.setItem('CLIENT-' + oldClient.id, oldClient).then((value) => {
      return value;
    });

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
        state.cars[selectedObject.id] = selectedObject;
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

  DELETE_CONTRACT (state, payload) {
    let client = state.clients[payload.contract.clientId];
    if (payload.contract.id) {
      client.contractId = undefined;
      state.clients[client.id] = client;
      localforage.setItem('CLIENT-' + client.id, client).then((value) => {
        return value;
      });

      let selectedObject = state.cars[payload.contract.objectId];
      if (typeof selectedObject === 'object') {
        selectedObject.contractId = undefined;
        localforage.setItem('CAR-' + selectedObject.id, selectedObject).then((value) => {
          return value;
        });
      } else {
        selectedObject = state.flats[payload.contract.objectId];
        selectedObject.contractId = undefined;
        state.flats[selectedObject.id] = selectedObject;
        localforage.setItem('FLAT-' + selectedObject.id, selectedObject).then((value) => {
          return value;
        });
      }
    }
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
