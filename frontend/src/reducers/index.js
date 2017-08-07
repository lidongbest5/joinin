import { combineReducers } from 'redux';
import * as Constants from '../constants';
import layout, { layoutState } from './layout';
import session, { sessionState } from './session';
import student, { studentState } from './student';
import event, { eventState } from './event';
import eventall, { eventallState } from './eventall';

const compose = (f, g) => (a, b) => f(g(a, b), b);

// this is common reducer for all
const commonReducer = domain => (state, action) => {
  if (action.type === Constants.SET_UI_ELEMENT && action.domain === domain) {
    return Object.assign({}, state, {[action.payload.key]: action.payload.value});
  } else if (action.type === Constants.LOGOUT) {
    switch (domain) {
      default:
        return state;
    }
  }

  // Add more common reducer here
  return state;
};

const injectCommonReducer = reducers => {
  const newReducers = {};
  Object.keys(reducers).forEach(key => {
    newReducers[key] = compose(commonReducer(key), reducers[key]);
  });
  return newReducers;
};

const combineReducersPlus = compose(combineReducers, injectCommonReducer);

const rootReducer = combineReducersPlus({
  session,
  layout,
  student,
  event,
  eventall,
});

export default rootReducer;
