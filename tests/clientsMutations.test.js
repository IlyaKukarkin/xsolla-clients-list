import { createLocalVue } from '../node_modules/vue-test-utils';
import Vuex from 'vuex';
import storeConfig from '../config/clientStore-config';
import { cloneDeep } from 'lodash';

test('add client into store', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));
  expect(store.state.clients).toEqual({});
  let client = {surname: 'Ivanov', name: 'Ivan', patronymic: 'Ivanovich', email: 'ivan777@gmail.com', phone: '89194651456', address: 'Lenina 50', series: 1638, number: 164162, birthDate: '18-11-1970'};
  store.commit('CREATE_CLIENT', {client: client});
  expect(store.state.clients).toEqual({'undefined': {'address': 'Lenina 50', 'birthDate': '18-11-1970', 'email': 'ivan777@gmail.com', 'name': 'Ivan', 'number': 164162, 'patronymic': 'Ivanovich', 'phone': '89194651456', 'series': 1638, 'surname': 'Ivanov'}});
});

test('add client and change it', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));
  expect(store.state.clients).toEqual({});
  let client = {surname: 'Ivanov', name: 'Ivan', patronymic: 'Ivanovich', email: 'ivan777@gmail.com', phone: '89194651456', address: 'Lenina 50', series: 1638, number: 164162, birthDate: '18-11-1970'};
  let clientUpdate = {surname: 'Lebedev', name: 'Vicktor', patronymic: 'Valerievich', email: 'lebedevvv@gmail.com', phone: '89191914464', address: 'Popova 14', series: 3516, number: 912161, birthDate: '13-07-1965'};
  store.commit('CREATE_CLIENT', {client: client});
  expect(store.state.clients).toEqual({'undefined': {'address': 'Lenina 50', 'birthDate': '18-11-1970', 'email': 'ivan777@gmail.com', 'name': 'Ivan', 'number': 164162, 'patronymic': 'Ivanovich', 'phone': '89194651456', 'series': 1638, 'surname': 'Ivanov'}});
  store.commit('UPDATE_CLIENT', {client: clientUpdate});
  expect(store.state.clients).toEqual({'undefined': {'address': 'Popova 14', 'birthDate': '13-07-1965', 'email': 'lebedevvv@gmail.com', 'name': 'Vicktor', 'number': 912161, 'patronymic': 'Valerievich', 'phone': '89191914464', 'series': 3516, 'surname': 'Lebedev'}});
});

test('add client and delete it from store', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));
  expect(store.state.clients).toEqual({});
  let client = {surname: 'Ivanov', name: 'Ivan', patronymic: 'Ivanovich', email: 'ivan777@gmail.com', phone: '89194651456', address: 'Lenina 50', series: 1638, number: 164162, birthDate: '18-11-1970'};
  store.commit('CREATE_CLIENT', {client: client});
  expect(store.state.clients).toEqual({'undefined': {'address': 'Lenina 50', 'birthDate': '18-11-1970', 'email': 'ivan777@gmail.com', 'name': 'Ivan', 'number': 164162, 'patronymic': 'Ivanovich', 'phone': '89194651456', 'series': 1638, 'surname': 'Ivanov'}});
  store.commit('DELETE_CLIENT', {client: client});
  expect(store.state.clients).toEqual({});
});
