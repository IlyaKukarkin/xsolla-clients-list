import { guid } from '../../../utils';

export default {
  ADD_CLIENT (state, payload) {
    let id = guid();
    state.clients[id] = Object.assign({ id: id }, payload.client);
  }
};
