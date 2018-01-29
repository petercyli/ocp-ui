/*
 *
 * ManageLocationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_LOCATION_ERROR, CREATE_LOCATION_SUCCESS, GET_LOCATION_SUCCESS,
} from './constants';

const initialState = fromJS({
  error: false,
  location: {},
});

function manageLocationPageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_LOCATION_SUCCESS:
      return state
        .set('error', false);
    case GET_LOCATION_SUCCESS:
      return state
        .setIn(['location'], fromJS((action.location) || {}));
    case CREATE_LOCATION_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default manageLocationPageReducer;