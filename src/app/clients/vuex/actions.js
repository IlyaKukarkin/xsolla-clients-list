export const addClient = ({ commit }, data) => {
  commit('ADD_CLIENT', { client: data });
};

export const updateClient = ({ commit }, data) => {
  commit('UPDATE_CLIENT', { client: data });
};

export const deleteClient = ({ commit }, data) => {
  commit('DELETE_CLIENT', { client: data });
};
