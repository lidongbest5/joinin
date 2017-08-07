import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../constants';

const initialState = {
  accountPanel: false,
  regNav: 1,
  loginNav: 1,
  regMsg: "",
  loginMsg: "",
  fetching: false,
  uploadMsg: "",
};

export default function layoutReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const layoutState = initialState;
