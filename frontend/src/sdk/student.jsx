import { normalize, schema } from 'normalizr';
import {CALL_API} from 'redux-api-middleware';
import qs from 'qs';
import * as cs from '../constants';
import wrapper from './utils';

export function updateStudent(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/student/update/`,
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(data),
      types: [
        cs.STUDENT_UPDATE_REQUEST,
        {
          type: cs.STUDENT_UPDATE_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.STUDENT_UPDATE_FAIL,
      ],
    },
  }, actionTypes);
}

export function updateSponsor(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/sponsor/update/`,
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(data),
      types: [
        cs.SPONSOR_UPDATE_REQUEST,
        {
          type: cs.SPONSOR_UPDATE_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.SPONSOR_UPDATE_FAIL,
      ],
    },
  }, actionTypes);
}

export function getStudentEvent(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/event/student/?${qs.stringify(data)}`,
      method: 'GET',
      credentials: 'same-origin',
      types: [
        cs.GET_STUDENT_EVENT_REQUEST,
        {
          type: cs.GET_STUDENT_EVENT_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.GET_STUDENT_EVENT_FAIL,
      ],
    },
  }, actionTypes);
}