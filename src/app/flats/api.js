import localforage from 'localforage';
import { processAPIData } from '../../utils';

const FLAT_NAMESPACE = 'FLAT-';

export const fetchFlats = () => {
  return localforage.startsWith(FLAT_NAMESPACE).then((res) => {
    return processAPIData(res);
  });
};

export const saveFlat = (flat) => {
  return localforage.setItem(
    FLAT_NAMESPACE + flat.id,
    flat
  ).then((value) => {
    return value;
  }).catch((err) => {
    console.log('Error with saving flat ', err);
  });
};
export const deleteFlat = (flat) => {
  return localforage.removeItem(
    FLAT_NAMESPACE + flat.id
  ).then(() => {
    return true;
  }).catch((err) => {
    console.log(err);
    return false;
  });
};
