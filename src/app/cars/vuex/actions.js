import { deleteCar as deleteCarFromAPI, saveCar, fetchCars } from '../api';
import { guid } from '../../../utils';

const verifyUniqueCar = (cars, car) => {
  if (Object.values(cars).find((cr) =>
    cr.mark === car.mark &&
    cr.model === car.model &&
    cr.year === car.year &&
    cr.number === car.number)) { return false; }

  return true;
};

export const createCar = ({ commit, state }, data) => {
  let unique = verifyUniqueCar(state.cars, data);

  if (!unique) {
    return Promise.reject(new Error('This car already exists!'));
  }

  let id = guid();
  let car = Object.assign({ id: id }, data);
  commit('CREATE_CAR', {car: car});
  saveCar(car).then((value) => {
    // we've saved the car, what now
  });
};

export const updateCar = ({ commit, state }, data) => {
  let unique = verifyUniqueCar(state.cars, data);

  if (!unique) {
    return Promise.reject(new Error('This car already exists!'));
  }

  commit('UPDATE_CAR', { car: data });
  saveCar(data);
};

export const deleteCar = ({ commit }, data) => {
  commit('DELETE_CAR', { car: data });
  deleteCarFromAPI(data);
};

export const loadCars = (state) => {
  // loads cars only if they are not already loaded
  // later we might want to be able to force reload them
  if (!state.cars || Object.keys(state.cars).length === 0) {
    return fetchCars().then((res) => {
      state.commit('LOAD_CARS', res);
    });
  }
};
