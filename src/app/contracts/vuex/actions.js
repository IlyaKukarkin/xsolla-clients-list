import { deleteContract as deleteContractFromAPI, saveContract, fetchContracts } from '../api';
import { guid } from '../../../utils';
import {fetchClients} from '../../clients/api';
import {fetchFlats} from '../../flats/api';
import {fetchCars} from '../../cars/api';

const verifyUniqueContract = (contracts, contract) => {
  if (Object.values(contracts).find((cntr) =>
    cntr.summ === contract.summ &&
    cntr.prePaid === contract.prePaid &&
    cntr.startDate === contract.startDate &&
    cntr.finishDate === contract.finishDate &&
    cntr.clientId === contract.clientId &&
    cntr.objectId === contract.objectId)) { return false; }

  return true;
};

export const createContract = ({ commit, state }, data) => {
  let unique = verifyUniqueContract(state.contracts, data);

  if (!unique) {
    return Promise.reject(new Error('This contract already exists!'));
  }

  let id = guid();
  let contract = Object.assign({ id: id }, data);
  commit('CREATE_CONTRACT', {contract: contract});
  saveContract(contract).then((value) => {
    // we've saved the client, what now
  });
};

export const updateContract = ({ commit, state }, data) => {
  if (Date.parse(data.startDate) >= Date.parse(data.finishDate)) {
    return Promise.reject(new Error('Start Date must be before Finish Date!'));
  }

  let unique = verifyUniqueContract(state.contracts, data);

  if (!unique) {
    return Promise.reject(new Error('This contract already exists!'));
  }

  commit('UPDATE_CONTRACT', { contract: data });
  saveContract(data);
};

export const deleteContract = ({ commit }, data) => {
  commit('DELETE_CONTRACT', { contract: data });
  deleteContractFromAPI(data);
};

export const loadContracts = (state) => {
  // loads clients only if they are not already loaded
  // later we might want to be able to force reload them
  if (!state.contracts || Object.keys(state.contracts).length === 0) {
    return fetchContracts().then((res) => {
      state.commit('LOAD_CONTRACTS', res);
    });
  }
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

export const loadFlats = (state) => {
  // loads flats only if they are not already loaded
  // later we might want to be able to force reload them
  if (!state.flats || Object.keys(state.flats).length === 0) {
    return fetchFlats().then((res) => {
      state.commit('LOAD_FLATS', res);
    });
  }
};

export const loadCars = (state) => {
  // loads cars only if they are not already loaded
  // later we might want to be able to force reload them
  if (!state.cars || Object.keys(state.cars).length === 0) {
    return fetchCars().then((res) => {
      state.commit('LOAD_CARS', res);
    });
  }
};
