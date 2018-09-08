import * as actions from '../src/app/contracts/vuex/actions';
import mutations from '../src/app/contracts/vuex/mutations';
import getters from '../src/app/contracts/vuex/getters';

export default {
  state: {
    contracts: {},
    clients: {},
    cars: {},
    flats: {},
  },
  mutations,
  getters,
  actions
};
