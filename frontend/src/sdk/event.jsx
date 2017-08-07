import { normalize, schema } from 'normalizr';
import {CALL_API} from 'redux-api-middleware';
import qs from 'qs';
import * as cs from '../constants';
import wrapper from './utils';

export function createEvent(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/event/create/`,
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(data),
      types: [
        cs.EVENT_CREATE_REQUEST,
        {
          type: cs.EVENT_CREATE_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.EVENT_CREATE_FAIL,
      ],
    },
  }, actionTypes);
}

export function updateEvent(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/event/update/`,
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(data),
      types: [
        cs.EVENT_UPDATE_REQUEST,
        {
          type: cs.EVENT_UPDATE_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.EVENT_UPDATE_FAIL,
      ],
    },
  }, actionTypes);
}

export function deleteEvent(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/event/delete/`,
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(data),
      types: [
        cs.EVENT_DELETE_REQUEST,
        {
          type: cs.EVENT_DELETE_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.EVENT_DELETE_FAIL,
      ],
    },
  }, actionTypes);
}

export function registerEvent(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/event/register/`,
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(data),
      types: [
        cs.EVENT_REGISTER_REQUEST,
        {
          type: cs.EVENT_REGISTER_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.EVENT_REGISTER_FAIL,
      ],
    },
  }, actionTypes);
}

export function getUserEvent(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/events/user/?${qs.stringify(data)}`,
      method: 'GET',
      credentials: 'same-origin',
      types: [
        cs.GET_USER_EVENT_REQUEST,
        {
          type: cs.GET_USER_EVENT_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.GET_USER_EVENT_FAIL,
      ],
    },
  }, actionTypes);
}

export function getRecomentEvent(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/events/recoment/`,
      method: 'GET',
      credentials: 'same-origin',
      types: [
        cs.GET_RECOMENT_EVENT_REQUEST,
        {
          type: cs.GET_RECOMENT_EVENT_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.GET_RECOMENT_EVENT_FAIL,
      ],
    },
  }, actionTypes);
}

export function setLike(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/events/like/?${qs.stringify(data)}`,
      method: 'GET',
      credentials: 'same-origin',
      types: [
        cs.SET_LIKE_REQUEST,
        {
          type: cs.SET_LIKE_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.SET_LIKE_FAIL,
      ],
    },
  }, actionTypes);
}

export function getEvent(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/event/get/?${qs.stringify(data)}`,
      method: 'GET',
      credentials: 'same-origin',
      types: [
        cs.GET_EVENT_REQUEST,
        {
          type: cs.GET_EVENT_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.GET_EVENT_FAIL,
      ],
    },
  }, actionTypes);
}

export function getEventAll(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/events/all/?${qs.stringify(data)}`,
      method: 'GET',
      credentials: 'same-origin',
      types: [
        cs.GET_EVENT_ALL_REQUEST,
        {
          type: cs.GET_EVENT_ALL_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.GET_EVENT_ALL_FAIL,
      ],
    },
  }, actionTypes);
}

export function getMembership(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/event/membership/?${qs.stringify(data)}`,
      method: 'GET',
      credentials: 'same-origin',
      types: [
        cs.GET_EVENT_MEMBERSHIP_REQUEST,
        {
          type: cs.GET_EVENT_MEMBERSHIP_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.GET_EVENT_MEMBERSHIP_FAIL,
      ],
    },
  }, actionTypes);
}

export function getCheck(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/event/check/?${qs.stringify(data)}`,
      method: 'GET',
      credentials: 'same-origin',
      types: [
        cs.GET_CHECK_REQUEST,
        {
          type: cs.GET_CHECK_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.GET_CHECK_FAIL,
      ],
    },
  }, actionTypes);
}

export function setCheck(data, actionTypes) {
  return wrapper({
    [CALL_API]: {
      endpoint: `/api/event/check/set/?${qs.stringify(data)}`,
      method: 'GET',
      credentials: 'same-origin',
      types: [
        cs.SET_CHECK_REQUEST,
        {
          type: cs.SET_CHECK_SUCCESS,
          payload: (action, state, res) => res.json(),
        },
        cs.SET_CHECK_FAIL,
      ],
    },
  }, actionTypes);
}