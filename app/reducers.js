/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { REHYDRATE } from 'redux-persist/constants';
import { asyncSessionStorage } from 'redux-persist/storages';

import globalReducer from 'containers/App/reducer';
import contextReducer from 'containers/App/contextReducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { LOGOUT } from 'containers/Logout/constants';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

function rehydrateReducer(state = false, action) {
  switch (action.type) {
    case REHYDRATE: {
      return true;
    }
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 * Will reset entirely the redux state when receives logout action
 */
// TODO: Might keep some unsecured cache data like lookup based on required
export default function createReducer(injectedReducers) {
  return (state, action) => {
    let proxyState = state;
    if (action.type === LOGOUT) {
      // on LOGOUT, set `rehydrated` to true, so the app knows this is not a full page load/refresh
      proxyState = fromJS({ rehydrated: true });
      Object.keys(state.toJS()).forEach((key) => {
        // clear reduxPersist:* from session storage
        asyncSessionStorage.removeItem(`reduxPersist:${key}`);
      });
    }
    const appReducer = combineReducers({
      global: globalReducer,
      context: contextReducer,
      route: routeReducer,
      language: languageProviderReducer,
      rehydrated: rehydrateReducer,
      ...injectedReducers,
    });
    return appReducer(proxyState, action);
  };
}
