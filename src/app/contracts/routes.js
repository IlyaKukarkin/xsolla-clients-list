import * as components from './components';
export default [
  {
    path: '/',
    component: components.ContractsListView,
    name: 'contractsListView'
  },
  {
    path: '/contracts/create',
    component: components.CreateUpdateContract,
    name: 'createContract'
  },
  {
    path: '/contracts/:contractId/update',
    component: components.CreateUpdateContract,
    name: 'updateContract'
  }
];
