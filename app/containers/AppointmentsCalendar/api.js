import { BASE_APPOINTMENTS_API_URL, BASE_OUTLOOK_API_URL, getEndpoint } from 'utils/endpointService';
import queryString from 'utils/queryString';
import request from 'utils/request';

export default function getAppointmentsApi(query) {
  const params = queryString(query);
  const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${baseEndpoint}/search-with-no-pagination${params}`;
  return request(requestURL);
}

export function getOutlookAppointmentsApi() {
  const baseEndpoint = getEndpoint(BASE_OUTLOOK_API_URL);
  const requestURL = `${baseEndpoint}/calendar`;
  return request(requestURL);
}

export function loginToOWA(loginCredentials) {
  const baseEndpoint = getEndpoint(BASE_OUTLOOK_API_URL);
  const requestURL = `${baseEndpoint}/login`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBffCredential(loginCredentials)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBffCredential(loginCredentials) {
  const { username, password } = loginCredentials;
  return { username, password };
}
