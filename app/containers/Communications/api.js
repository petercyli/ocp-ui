import * as queryString from 'query-string';
import request from '../../utils/request';
import { PAGE_SIZE } from './constants';
import { BASE_COMMUNICATIONS_API_URL, getEndpoint } from '../../utils/endpointService';

const baseEndpoint = getEndpoint(BASE_COMMUNICATIONS_API_URL);

export function getCommunications(patientId, pageNumber) {
  const pageSize = PAGE_SIZE;
  const queryParams = { searchKey: 'patientId', searchValue: patientId, pageNumber, pageSize };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/search?${stringifiedParams}`;
  return request(url);
}