export default {
  getContractById: (state, getters) => (contractId) => {
    return state.contracts && contractId in state.contracts ? state.contracts[contractId] : false;
  },

  getClientFromId: (state, getters) => (clientId) => {
    return state.clients && clientId in state.clients ? state.clients[clientId] : false;
  }
};
