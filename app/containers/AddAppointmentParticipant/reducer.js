/*
 *
 * AddAppointmentParticipant reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS,
  GET_LOCATION_REFERENCES_SUCCESS,
  GET_PRACTITIONER_REFERENCES_SUCCESS,
  SEARCH_PARTICIPANT_REFERENCES,
  SEARCH_PARTICIPANT_REFERENCES_ERROR,
  SEARCH_PARTICIPANT_REFERENCES_SUCCESS,
} from './constants';

const initialState = fromJS({
  healthcareServices: null,
  locations: null,
  practitioners: null,
  searchParticipants: {
    loading: false,
    data: [],
    currentPage: 0,
    totalNumberOfPages: 0,
    error: false,
  },
});

function addAppointmentParticipantReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS:
      return state
        .set('healthcareServices', action.healthcareServices);
    case GET_LOCATION_REFERENCES_SUCCESS:
      return state
        .set('locations', action.locations);
    case GET_PRACTITIONER_REFERENCES_SUCCESS:
      return state
        .set('practitioners', action.practitioners);
    case SEARCH_PARTICIPANT_REFERENCES:
      return state
        .setIn(['searchParticipants', 'loading'], true);
    case SEARCH_PARTICIPANT_REFERENCES_SUCCESS:
      return state
        .setIn(['searchParticipants', 'loading'], false)
        .setIn(['searchParticipants', 'data'], fromJS(action.participants.elements))
        .setIn(['searchParticipants', 'totalNumberOfPages'], action.participants.totalNumberOfPages)
        .setIn(['searchParticipants', 'currentPage'], action.participants.currentPage);
    case SEARCH_PARTICIPANT_REFERENCES_ERROR:
      return state
        .setIn(['searchParticipants', 'loading'], false)
        .setIn(['searchParticipants', 'data'], fromJS([]))
        .setIn(['searchParticipants', 'totalNumberOfPages'], 0)
        .setIn(['searchParticipants', 'currentPage'], 0)
        .setIn(['searchParticipants', 'error'], action.error);
    default:
      return state;
  }
}

export default addAppointmentParticipantReducer;