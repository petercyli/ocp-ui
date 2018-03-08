import request from 'utils/request';
import { BASE_LOCATIONS_API_URL, BASE_ORGANIZATION_API_URL, getEndpoint } from 'utils/endpointService';

export default function createLocation(location, organizationId) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATION_API_URL);
  const url = `${baseEndpoint}/${organizationId}/location`;
  return request(url, {
    method: 'POST',
    body: JSON.stringify(mapToBffLocation(location)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateLocation(location, organizationId) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATION_API_URL);
  const url = `${baseEndpoint}/${organizationId}/location/${location.logicalId}`;
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(mapToBffLocation(location)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function fetchLocation(locationId) {
  const baseEndpoint = getEndpoint(BASE_LOCATIONS_API_URL);
  const url = `${baseEndpoint}/${locationId}`;
  return request(url);
}

function mapToBffLocation(rawlocation) {
  const location = {};
  location.name = rawlocation.name;
  location.managingLocationLogicalId = rawlocation.managingLocationLogicalId;
  location.status = rawlocation.status;
  location.resourceURL = '';
  location.physicalType = rawlocation.physicalType;
  const { identifierSystem, identifierValue } = rawlocation;
  location.identifiers = [{
    system: identifierSystem,
    value: identifierValue,
    oid: '',
    priority: '',
    display: '',
  }];
  location.telecoms = rawlocation.telecoms;
  const { line1, line2, city, stateCode, postalCode, use } = rawlocation;
  location.address = { line1, line2, city, stateCode, postalCode, use, countryCode: 'US' };
  return location;
}
