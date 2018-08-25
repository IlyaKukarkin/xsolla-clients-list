import { deleteClient as deleteClientFromAPI, saveClient, fetchClients } from '../api';
import { guid } from '../../../utils';

export const createClient = ({ commit }, data) => {
  let id = guid();
  let client = Object.assign({ id: id }, data);
  commit('CREATE_CLIENT', {client: client});
  saveClient(client).then((value) => {
    // we've saved the client, what now
  });
};

export const updateClient = ({ commit }, data) => {
  commit('UPDATE_CLIENT', { client: data });
  saveClient(data);
};

export const deleteClient = ({ commit }, data) => {
  commit('DELETE_CLIENT', { client: data });
  deleteClientFromAPI(data);
};

export const loadClients = (state) => {
  // loads clients only if they are not already loaded
  // later we might want to be able to force reload them
  if (!state.clients || Object.keys(state.clients).length === 0) {
    return fetchClients().then((res) => {
      state.commit('LOAD_CLIENTS', res);
    });
  }
};
