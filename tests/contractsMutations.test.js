import { createLocalVue } from '../node_modules/vue-test-utils';
import Vuex from 'vuex';
import storeConfig from '../config/contractStore-config';
import { cloneDeep } from 'lodash';

test('add contract into store', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));
  expect(store.state.contracts).toEqual({});
  let contract = {summ: 150000, prePaid: 75000, startDate: '15-09-2018', finishDate: '25-09-2018', clientId: '7', objectId: '1'};
  store.commit('CREATE_CONTRACT', {contract: contract});
  expect(store.state.contracts).toEqual({'undefined': {'clientId': '7', 'finishDate': '25-09-2018', 'objectId': '1', 'prePaid': 75000, 'startDate': '15-09-2018', 'summ': 150000}});
});

test('add contract and change it', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));
  expect(store.state.contracts).toEqual({});
  let contract = {summ: 150000, prePaid: 75000, startDate: '15-09-2018', finishDate: '25-09-2018', clientId: '7', objectId: '1'};
  let contractUpdate = {summ: 500000, prePaid: 200000, startDate: '30-09-2018', finishDate: '30-10-2018', clientId: '10', objectId: '2'};
  store.commit('CREATE_CONTRACT', {contract: contract});
  expect(store.state.contracts).toEqual({'undefined': {'clientId': '7', 'finishDate': '25-09-2018', 'objectId': '1', 'prePaid': 75000, 'startDate': '15-09-2018', 'summ': 150000}});
  store.commit('UPDATE_CONTRACT', {contract: contractUpdate});
  expect(store.state.contracts).toEqual({'undefined': {'clientId': '10', 'finishDate': '30-10-2018', 'objectId': '2', 'prePaid': 200000, 'startDate': '30-09-2018', 'summ': 500000}});
});

test('add contract and delete it from store', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));
  expect(store.state.contracts).toEqual({});
  let contract = {summ: 150000, prePaid: 75000, startDate: '15-09-2018', finishDate: '25-09-2018', clientId: '7', objectId: '1'};
  store.commit('CREATE_CONTRACT', {contract: contract});
  expect(store.state.contracts).toEqual({'undefined': {'clientId': '7', 'finishDate': '25-09-2018', 'objectId': '1', 'prePaid': 75000, 'startDate': '15-09-2018', 'summ': 150000}});
  store.commit('DELETE_CONTRACT', {contract: contract});
  expect(store.state.contracts).toEqual({});
});
