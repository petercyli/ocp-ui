import queryString from 'utils/queryString';
import request from 'utils/request';
import { BASE_APPOINTMENTS_API_URL, getEndpoint } from 'utils/endpointService';

export function getHealthcareServiceReferences(resourceType, resourceValue) {
  const queryParams = queryString({ resourceType, resourceValue });
  const appointmentBaseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${appointmentBaseEndpoint}/healthcare-service-references${queryParams}`;
  return request(requestURL);
}

export function getLocationReferences(resourceType, resourceValue) {
  const queryParams = queryString({ resourceType, resourceValue });
  const appointmentBaseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${appointmentBaseEndpoint}/location-references${queryParams}`;
  return request(requestURL);
}

export function getPractitionerReferences(resourceType, resourceValue) {
  const queryParams = queryString({ resourceType, resourceValue });
  const appointmentBaseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${appointmentBaseEndpoint}/practitioner-references${queryParams}`;
  return request(requestURL);
}

export function searchParticipantReferences(searchType, searchValue, organization, page) {
  const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const params = queryString({
    participantType: searchType,
    searchTerms: searchValue,
    organization,
    page,
  });
  const requestURL = `${baseEndpoint}/participant-references/search${params}`;
  return request(requestURL);
}