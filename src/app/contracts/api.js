import localforage from 'localforage';
import { processAPIData } from '../../utils';

const CONTRACT_NAMESPACE = 'CONTRACT-';

export const fetchContracts = () => {
  return localforage.startsWith(CONTRACT_NAMESPACE).then((res) => {
    return processAPIData(res);
  });
};

export const saveContract = (contract) => {
  return localforage.setItem(
    CONTRACT_NAMESPACE + contract.id,
    contract
  ).then((value) => {
    return value;
  }).catch((err) => {
    console.log('oops! the contract was too far gone, there was nothing we could do to save him ', err);
  });
};

export const deleteContract = (contract) => {
  return localforage.removeItem(
    CONTRACT_NAMESPACE + contract.id
  ).then(() => {
    return true;
  }).catch((err) => {
    console.log(err);
    return false;
  });
};
