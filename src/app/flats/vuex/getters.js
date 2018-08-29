export default {
  getFlatById: (state, getters) => (flatId) => {
    return state.flats && flatId in state.flats ? state.flats[flatId] : false;
  }
};
