import update from 'react-addons-update';
import moment from 'moment';
import {EditorState} from 'draft-js';
import * as Constants from '../constants';

const initialState = {
  event: {
    fields: {},
  },
  eventStatus: -1,
  eventFetch: false,
  liked: [],
  startDate: null,
  endDate: null,
  guest: [],
  sponsor: [],
  editorState: EditorState.createEmpty(),
  eventMsg: '',
  updateMsg: '',
  list: [],
  pages: 0,
  curPage: 1,
  pageSize: 9,
  pageTotal: 0,
  listFetch: false,
  recomentEvents: [],
  showModal: false,
  checkList: [],
  checkFetch: false,
  eventNav: 1,
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.RESET_EVENT: {
      const tmp = {fields: {}};
      return update(state, {event: {$set: tmp}, startDate: {$set: null}, endDate: {$set: null}, guest: {$set: []}, sponsor: {$set: []}, editorState: {$set: EditorState.createEmpty()}, eventNav: {$set: 1}, eventMsg: {$set: ''}, updateMsg: {$set: ''}});
    }
    case Constants.GET_USER_EVENT_SUCCESS: {
      const data = action.payload;
      if (data.code === 1) {
        return update(state, {list: {$set: JSON.parse(data.data)}, curPage: {$set: data.curPage}, pages: {$set: data.page}, pageTotal: {$set: data.total}, listFetch: {$set: true}});
      }
      return state;
    }
    case Constants.GET_EVENT_SUCCESS: {
      const data = action.payload;
      if (data.code === 1) {
        return update(state, {event: {$set: JSON.parse(data.data)[0]}});
      }
      return state;
    }
    case Constants.GET_RECOMENT_EVENT_SUCCESS: {
      const data = action.payload;
      if (data.code === 1) {
        return update(state, {recomentEvents: {$set: JSON.parse(data.data)}});
      }
      return state;
    }
    case Constants.GET_EVENT_MEMBERSHIP_SUCCESS: {
      const data = action.payload;
      if (data.code === 1) {
        return update(state, {eventStatus: {$set: data.status}});
      }
      return state;
    }
    case Constants.GET_CHECK_SUCCESS: {
      const data = action.payload;
      if (data.code === 1) {
        return update(state, {checkList: {$set: data.data}, checkFetch: {$set: true}});
      }
      return state;
    }
    default:
      return state;
  }
}

export const eventState = initialState;
