import localforage from 'localforage';
import { processAPIData } from '../../utils';

const CLIENT_NAMESPACE = 'CLIENT-';

export const fetchClients = () => {
  return localforage.startsWith(CLIENT_NAMESPACE).then((res) => {
    return processAPIData(res);
  });
};

export const saveClient = (client) => {
  return localforage.setItem(
    CLIENT_NAMESPACE + client.id,
    client
  ).then((value) => {
    return value;
  }).catch((err) => {
    console.log('Error with saving client', err);
  });
};

export const deleteClient = (client) => {
  return localforage.removeItem(
    CLIENT_NAMESPACE + client.id
  ).then(() => {
    return true;
  }).catch((err) => {
    console.log(err);
    return false;
  });
};
