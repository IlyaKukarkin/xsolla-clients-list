import * as components from './components';
export default [
  {
    path: '/flats',
    component: components.FlatsListView,
    name: 'flatsListView'
  },
  {
    path: '/flats/create',
    component: components.CreateUpdateFlat,
    name: 'createFlat'
  },
  {
    path: '/flats/:flatId/update',
    component: components.CreateUpdateFlat,
    name: 'updateFlat'
  }
];
