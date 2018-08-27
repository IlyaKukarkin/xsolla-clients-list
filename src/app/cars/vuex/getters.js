export default {
  getCarById: (state, getters) => (carId) => {
    return state.cars && carId in state.cars ? state.cars[carId] : false;
  }
};
