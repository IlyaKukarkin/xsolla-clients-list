import { createLocalVue } from '../node_modules/vue-test-utils'
import Vuex from 'vuex'
import storeConfig from '../config/carStore-config'
import { cloneDeep } from 'lodash'

test('add car into store', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));
  expect(store.state.cars).toEqual({});
  let car = {model: 'Vaz', mark: '2105', number: 'xa195y', year: 2007};
  store.commit('CREATE_CAR', {car: car});
  expect(store.state.cars).toEqual({"undefined": {"mark": '2105', "model": 'Vaz', "number": 'xa195y', "year": 2007}});
});

test('add car and change it', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));
  expect(store.state.cars).toEqual({});
  let car = {model: 'Vaz', mark: '2105', number: 'xa195y', year: 2007};
  let carUpdate = {model: 'Lada', mark: 'Priora', number: 'xx495x', year: 2009};
  store.commit('CREATE_CAR', {car: car});
  expect(store.state.cars).toEqual({"undefined": {"mark": '2105', "model": 'Vaz', "number": 'xa195y', "year": 2007}});
  store.commit('UPDATE_CAR', {car: carUpdate});
  expect(store.state.cars).toEqual({"undefined": {"mark": 'Priora', "model": 'Lada', "number": 'xx495x', "year": 2009}});
});

test('add car and delete it from store', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));
  expect(store.state.cars).toEqual({});
  let car = {model: 'Vaz', mark: '2105', number: 'xa195y', year: 2007};
  store.commit('CREATE_CAR', {car: car});
  expect(store.state.cars).toEqual({"undefined": {"mark": '2105', "model": 'Vaz', "number": 'xa195y', "year": 2007}});
  store.commit('DELETE_CAR', {car: car});
  expect(store.state.cars).toEqual({});
});
