/*
 * CareTeams Messages
 *
 * This contains all the text for the CareTeams component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.CareTeams.header',
    defaultMessage: 'Care Teams',
  },
  buttonLabelCreateNew: {
    id: 'ocpui.containers.CareTeams.buttonLabelCreateNew',
    defaultMessage: 'Create New',
  },
  careTeams: {
    id: 'ocpui.containers.CareTeams.header',
    defaultMessage: 'care teams',
  },
  patientNotSelected: {
    id: 'ocpui.containers.CareTeams.patientNotSelected',
    defaultMessage: 'No care teams loaded. Please select a patient to view his/her care teams.',
  },
  patientLabel: {
    id: 'ocpui.containers.CareTeams.patientLabel',
    defaultMessage: 'Patient:',
  },
  includeLabel: {
    id: 'ocpui.containers.CareTeams.includeLabel',
    defaultMessage: 'Include: ',
  },
  noCareTeamsFound: {
    id: 'ocpui.containers.CareTeams.noCareTeamsFound',
    defaultMessage: 'No care teams found.',
  },
});
