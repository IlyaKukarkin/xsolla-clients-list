import { createLocalVue } from '../node_modules/vue-test-utils';
import Vuex from 'vuex';
import storeConfig from '../config/flatStore-config';
import { cloneDeep } from 'lodash';

test('add flat into store', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));
  expect(store.state.flats).toEqual({});
  let flat = {addres: 'Lenina 50', area: 250, rooms: 4, flor: 15};
  store.commit('CREATE_FLAT', {flat: flat});
  expect(store.state.flats).toEqual({'undefined': {'addres': 'Lenina 50', 'area': 250, 'flor': 15, 'rooms': 4}});
});

test('add flat and change it', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));
  expect(store.state.flats).toEqual({});
  let flat = {addres: 'Lenina 50', area: 250, rooms: 4, flor: 15};
  let flatUpdate = {addres: 'Komsomolskiy pr 1', area: 60, rooms: 1, flor: 6};
  store.commit('CREATE_FLAT', {flat: flat});
  expect(store.state.flats).toEqual({'undefined': {'addres': 'Lenina 50', 'area': 250, 'flor': 15, 'rooms': 4}});
  store.commit('UPDATE_FLAT', {flat: flatUpdate});
  expect(store.state.flats).toEqual({'undefined': {'addres': 'Komsomolskiy pr 1', 'area': 60, 'flor': 6, 'rooms': 1}});
});

test('add flat and delete it from store', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));
  expect(store.state.flats).toEqual({});
  let flat = {addres: 'Lenina 50', area: 250, rooms: 4, flor: 15};
  store.commit('CREATE_FLAT', {flat: flat});
  expect(store.state.flats).toEqual({'undefined': {'addres': 'Lenina 50', 'area': 250, 'flor': 15, 'rooms': 4}});
  store.commit('DELETE_FLAT', {flat: flat});
  expect(store.state.flats).toEqual({});
});
