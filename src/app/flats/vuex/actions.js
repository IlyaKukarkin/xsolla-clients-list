import { deleteFlat as deleteFlatFromAPI, saveFlat, fetchFlats } from '../api';
import { guid } from '../../../utils';

const verifyUniqueFlat = (flats, flat) => {
  if (Object.values(flats).find((flt) =>
    flt.address === flat.address &&
    flt.rooms === flat.rooms &&
    flt.area === flat.area &&
    flt.floor === flat.floor)) { return false; }

  return true;
};

export const createFlat = ({ commit, state }, data) => {
  let unique = verifyUniqueFlat(state.flats, data);

  if (!unique) {
    return Promise.reject(new Error('This flat already exists!'));
  }

  let id = guid();
  let flat = Object.assign({ id: id }, data);
  commit('CREATE_FLAT', {flat: flat});
  saveFlat(flat);
};

export const updateFlat = ({ commit, state }, data) => {
  let unique = verifyUniqueFlat(state.flats, data);

  if (!unique) {
    return Promise.reject(new Error('This flat already exists!'));
  }

  commit('UPDATE_FLAT', { flat: data });
  saveFlat(data);
};

export const deleteFlat = ({ commit }, data) => {
  commit('DELETE_FLAT', { flat: data });
  deleteFlatFromAPI(data);
};

export const loadFlats = (state) => {
  if (!state.flats || Object.keys(state.flats).length === 0) {
    return fetchFlats().then((res) => {
      state.commit('LOAD_FLATS', res);
    });
  }
};
