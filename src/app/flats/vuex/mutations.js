import Vue from 'vue';

export default {
  CREATE_FLAT (state, payload) {
    state.flats[payload.flat.id] = payload.flat;
  },

  UPDATE_FLAT (state, payload) {
    state.flats[payload.flat.id] = payload.flat;
  },

  DELETE_FLAT (state, payload) {
    Vue.delete(state.flats, payload.flat.id);
  },

  LOAD_FLATS (state, payload) {
    state.flats = payload;
  }
};
