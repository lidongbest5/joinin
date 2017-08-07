import update from 'react-addons-update';
import moment from 'moment';
import {EditorState} from 'draft-js';
import * as Constants from '../constants';

const initialState = {
  list: [],
  pages: 0,
  curPage: 1,
  pageSize: 9,
  pageTotal: 0,
  listFetch: false,
  startDate: '',
  endDate: '',
  category: 'all',
  q: '',
};

export default function eventallReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_EVENT_ALL_SUCCESS: {
      const data = action.payload;
      if (data.code === 1) {
        return update(state, {list: {$set: JSON.parse(data.data)}, curPage: {$set: data.curPage}, pages: {$set: data.page}, pageTotal: {$set: data.total}, listFetch: {$set: true}});
      }
      return state;
    }
    default:
      return state;
  }
}

export const eventallState = initialState;
