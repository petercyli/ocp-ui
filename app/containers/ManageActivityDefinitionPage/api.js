import request from '../../utils/request';
import { BASE_ORGANIZATION_API_URL, getEndpoint } from '../../utils/endpointService';

export function createActivityDefinition(activityDefinitionFormData, organizationId) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATION_API_URL);
  const url = `${baseEndpoint}/${organizationId}/activity-definitions`;
  return request(url, {
    method: 'POST',
    body: JSON.stringify(mapToBffActivityDefinition(activityDefinitionFormData)),
    headers: {
      'Content-Type': 'application/json',
    },

  });
}

function mapToBffActivityDefinition(activityDefinitionFormData) {
  const {
    version, name, title, description, effectiveStart, effectiveEnd, duration, frequency, status, topic, kind, participantType, participantRole,
  } = activityDefinitionFormData;
  const effectivePeriod = {
    start: effectiveStart,
    end: effectiveEnd,
  };
  const timing = {
    durationMax: duration,
    frequency,
  };
  return {
    version,
    name,
    title,
    description,
    effectivePeriod,
    timing,
    status,
    topic,
    kind,
    actionParticipantType: participantType,
    actionParticipantRole: participantRole,
  };
}