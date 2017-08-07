import {CALL_API} from 'redux-api-middleware';
import * as Constants from '../constants';
import {myHistory} from '../config';

export function login(data) {
  return async(dispatch, getState) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/api/login/',
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(data),
        types: [Constants.LOGIN_REQUEST, Constants.LOGIN_SUCCESS, Constants.LOGIN_FAIL],
      },
    });

    return action;
  };
}

export function logout() {
  return async(dispatch, getState) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/api/logout/',
        method: 'POST',
        credentials: 'same-origin',
        types: [Constants.LOGOUT_REQUEST, Constants.LOGOUT_SUCCESS, Constants.LOGOUT_FAIL],
      },
    });

    return action;
  };
}

export function requestAuth() {
  return {
    [CALL_API]: {
      endpoint: '/api/auth/',
      method: 'POST',
      credentials: 'same-origin',
      types: [Constants.AUTH_REQUEST, Constants.AUTH_SUCCESS, Constants.AUTH_FAIL],
    },
  };
}
