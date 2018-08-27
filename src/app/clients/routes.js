import * as components from './components';
export default [
  {
    path: '/clients',
    component: components.ClientsListView,
    name: 'clientsListView'
  },
  {
    path: '/clients/create',
    component: components.CreateUpdateClient,
    name: 'createClient'
  },
  {
    path: '/clients/:clientId/update',
    component: components.CreateUpdateClient,
    name: 'updateClient'
  }
];
