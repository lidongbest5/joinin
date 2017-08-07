import { normalize, schema } from 'normalizr';
import {CALL_API} from 'redux-api-middleware';
import qs from 'qs';
import * as cs from '../constants';
import wrapper from './utils';

export function sessionRegister(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: ` /api/register/`,
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(data),
      types: [
        cs.SESSION_REGISTER_REQUEST,
        {
          type: cs.SESSION_REGISTER_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.SESSION_REGISTER_FAIL,
      ],
    },
  }, actionTypes);
}

export function sessionRegister1(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: ` /api/register`,
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(data),
      types: [
        cs.SESSION_REGISTER_REQUEST,
        {
          type: cs.SESSION_REGISTER_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.SESSION_REGISTER_FAIL,
      ],
    },
  }, actionTypes);
}