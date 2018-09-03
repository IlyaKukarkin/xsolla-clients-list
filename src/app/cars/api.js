import localforage from 'localforage';
import { processAPIData } from '../../utils';

const CAR_NAMESPACE = 'CAR-';

export const fetchCars = () => {
  return localforage.startsWith(CAR_NAMESPACE).then((res) => {
    return processAPIData(res);
  });
};

export const saveCar = (car) => {
  return localforage.setItem(
    CAR_NAMESPACE + car.id,
    car
  ).then((value) => {
    return value;
  }).catch((err) => {
    console.log('oops! the car was too far gone, there was nothing we could do to save him ', err);
  });
};

export const deleteCar = (car) => {
  return localforage.removeItem(
    CAR_NAMESPACE + car.id
  ).then(() => {
    return true;
  }).catch((err) => {
    console.log(err);
    return false;
  });
};
