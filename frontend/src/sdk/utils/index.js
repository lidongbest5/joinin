import {CALL_API} from 'redux-api-middleware';


export default function wrapper(callApiObj, actionTypes) {
  const _actionTypes = actionTypes || [];
  const [requestType, successType, failType] = _actionTypes;
  const originSuccess = callApiObj[CALL_API].types[1].type || callApiObj[CALL_API].types[1];
  const originFail = callApiObj[CALL_API].types[2].type || callApiObj[CALL_API].types[2];

  return async(dispatch, getState) => {
    if (requestType) {
      dispatch({
        type: requestType,
      });
    }

    const action = await dispatch(callApiObj);

    if (successType && action.type === originSuccess) {
      return dispatch({
        type: successType,
        payload: action.payload,
        code: action.payload.code,
      });
    }

    if (failType && action.type === originFail) {
      return dispatch({
        type: failType,
        payload: action.payload,
        error: true,
        code: action.payload.code,
      });
    }

    return action;
  };
}
