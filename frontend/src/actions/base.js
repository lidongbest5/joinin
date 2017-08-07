import * as Constants from '../constants';

export function setUIElement(domain, key, value) {
  return {
    domain,
    type: Constants.SET_UI_ELEMENT,
    payload: {key, value},
  };
}

export function toggle(domain, key) {
  return (dispatch, getState) => {
    const oldValue = getState()[domain][key];
    return dispatch(setUIElement(domain, key, !oldValue));
  };
}

export function active(domain, key, value) {
  return dispatch => dispatch(setUIElement(domain, key, value));
}
