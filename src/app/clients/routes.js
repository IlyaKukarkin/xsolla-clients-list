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
    name: 'createClient'
  },
  {
    path: '/clients/:clientId/edit',
    component: components.CreateEditClient,
    name: 'editClient'
  }
];
