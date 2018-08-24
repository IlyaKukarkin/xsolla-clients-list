export const addClient = ({ commit }, data) => {
  commit('ADD_CLIENT', { client: data });
};
