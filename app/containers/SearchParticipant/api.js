import * as queryString from 'query-string';
import { requestWithJWT } from '../../utils/request';
import getApiBaseUrl from '../../apiBaseUrlConfig';

const apiBaseUrl = getApiBaseUrl();

export function searchParticipant(value, member) {
  const queryParams = { value, member };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${apiBaseUrl}/participants/search?${stringifiedParams}&showInActive=true`;
  return requestWithJWT(url);
}
