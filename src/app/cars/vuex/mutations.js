import Vue from 'vue';

export default {
  CREATE_CAR (state, payload) {
    state.cars[payload.car.id] = payload.car;
  },

  UPDATE_CAR (state, payload) {
    state.cars[payload.car.id] = payload.car;
  },

  DELETE_CAR (state, payload) {
    Vue.delete(state.cars, payload.car.id);
  },

  LOAD_CARS (state, payload) {
    state.cars = payload;
  }
};
