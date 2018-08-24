export default {
  getClientById: (state, getters) => (clientId) => {
    return state.clients && clientId in state.clients ? state.clients[clientId] : false;
  }
};
