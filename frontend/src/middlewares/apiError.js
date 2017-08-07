import {ApiError} from 'redux-api-middleware';
import {myHistory} from '../config';

export default store => next => action => {
  if (action.payload && action.payload.code) {
    switch (action.payload.code) {
      case '100005':
        localStorage.removeItem('session');
        myHistory.push('/login');
        break;
      default:
    }
  }

  // if (action.payload instanceof ApiError) {
  //   // ApiError action
  //   switch (action.payload.status) {
  //     case 401:
  //       myHistory.push('/login');
  //       break;
  //
  //     case 404:
  //       location.href = '/404.html';
  //       break;
  //
  //     case 500:
  //     case 501:
  //     case 502:
  //     case 503:
  //     case 504:
  //     case 505:
  //       location.href = '/500.html';
  //       break;
  //
  //     default:
  //   }
  // }

  return next(action);
};
