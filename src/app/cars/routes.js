import * as components from './components';
export default [
  {
    path: '/cars',
    component: components.CarsListView,
    name: 'carsListView'
  },
  {
    path: '/cars/create',
    component: components.CreateUpdateCar,
    name: 'createCar'
  },
  {
    path: '/cars/:carId/update',
    component: components.CreateUpdateCar,
    name: 'updateCar'
  }
];
