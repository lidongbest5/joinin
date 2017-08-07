import update from 'react-addons-update';
import * as Constants from '../constants';

const initialState = {
  type: 0,
  id: 0,
  user: {},
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.LOGIN_SUCCESS: {
      const data = action.payload;
      if (data.code === 1) {
        return update(state, {id: {$set: action.payload.id}, type: {$set: action.payload.type}, user: {$set: action.payload.user}});
      }
      return state;
    }
    case Constants.AUTH_SUCCESS: {
      const data = action.payload;
      if (data.code === 1) {
        return update(state, {id: {$set: action.payload.id}, type: {$set: action.payload.type}, user: {$set: action.payload.user}});
      }
      return state;
    }
    case Constants.LOGOUT_SUCCESS:
      return update(state, {type: {$set: 0}, id: {$set: 0}, user: {$set: {}}});
    default:
      return state;
  }
}

export const sessionState = initialState;
