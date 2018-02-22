/*
 *
 * Organizations actions
 *
 */

import {
  INITIALIZE_ORGANIZATIONS,
  GET_ORGANIZATIONS,
  GET_ORGANIZATIONS_ERROR,
  GET_ORGANIZATIONS_SUCCESS,
} from './constants';

export function initializeOrganizations() {
  return {
    type: INITIALIZE_ORGANIZATIONS,
  };
}

export function getOrganizations(searchValue, showInactive, searchType, currentPage) {
  return {
    type: GET_ORGANIZATIONS,
    searchValue,
    showInactive,
    searchType,
    currentPage,
  };
}

export function getOrganizationsSuccess(organizations) {
  return {
    type: GET_ORGANIZATIONS_SUCCESS,
    organizations,
  };
}

export function getOrganizationsError(err) {
  return {
    type: GET_ORGANIZATIONS_ERROR,
    err,
  };
}
