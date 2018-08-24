import * as components from './components';
export default [
  {
    path: '/',
    component: components.ClientsListView,
    name: 'clientsListView'
  },
  {
    path: '/clients/create',
    component: components.CreateEditClient,
    name: 'createEditClient'
  }
];
