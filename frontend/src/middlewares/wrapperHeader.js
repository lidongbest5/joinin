import { CALL_API } from 'redux-api-middleware';

export default store => next => action => {
  const ticket = action[CALL_API];
  if (ticket) {
    ticket.headers = Object.assign({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, ticket.headers);

    if (ticket.headers['Content-Type'] === 'multipart/form-data') {
      delete ticket.headers;
    }
  }

  return next(action);
};
