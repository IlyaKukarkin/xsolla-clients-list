import localforage from 'localforage';

const CLIENT_NAMESPACE = 'CLIENT-';

export const fetchClients = () => {
  return localforage.startsWith(CLIENT_NAMESPACE).then((res) => {
    return res;
  });
};

export const saveClient = (client) => {
  return localforage.setItem(
    CLIENT_NAMESPACE + client.id,
    client
  ).then((value) => {
    return value;
  }).catch((err) => {
    console.log('oops! the client was too far gone, there was nothing we could do to save him ', err);
  });
};
export const removeClient = (client) => {
  return localforage.removeItem(
    CLIENT_NAMESPACE + client.id
  ).then(() => {
    return true;
  }).catch((err) => {
    console.log(err);
    return false;
  });
};
