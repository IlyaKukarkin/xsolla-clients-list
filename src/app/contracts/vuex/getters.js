export default {
  getContractById: (state, getters) => (contractId) => {
    return state.contracts && contractId in state.contracts ? state.contracts[contractId] : false;
  },

  getClientFromId: (state, getters) => (clientId) => {
    return state.clients && clientId in state.clients ? state.clients[clientId] : false;
  },

  getCarFromId: (state, getters) => (carId) => {
    return state.cars && carId in state.cars ? state.cars[carId] : false;
  },

  getFlatFromId: (state, getters) => (flatId) => {
    return state.flats && flatId in state.flats ? state.flats[flatId] : false;
  }
};
