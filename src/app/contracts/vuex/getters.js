export default {
  getContractById: (state, getters) => (contractId) => {
    return state.contracts && contractId in state.contracts ? state.contracts[contractId] : false;
  }
};
