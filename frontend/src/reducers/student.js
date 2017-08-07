import update from 'react-addons-update';
import * as Constants from '../constants';

const initialState = {
  universityValue: {},
  majorValue: {},
  updateMsg: '',
  nav: 1,
  eventsAll: [],
  list: [],
  listFetch: false,
};

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_STUDENT_EVENT_SUCCESS: {
      const data = action.payload;
      if (data.code === 1) {
        return update(state, {eventsAll: {$set: data.data}, listFetch: {$set: true}});
      }
      return state;
    }
    case Constants.STUDENT_UPDATE_SUCCESS: {
      const data = action.payload;
      if (data.code === 1) {
        return update(state, {updateMsg: {$set: data.msg}});
      }
      return state;
    }
    case Constants.SPONSOR_UPDATE_SUCCESS: {
      const data = action.payload;
      if (data.code === 1) {
        return update(state, {updateMsg: {$set: data.msg}});
      }
      return state;
    }
    default:
      return state;
  }
}

export const studentState = initialState;
