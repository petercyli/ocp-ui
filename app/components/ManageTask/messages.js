/*
 * ManageHealthcareService Messages
 *
 * This contains all the text for the ManageHealthcareService component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManageTask.title',
    defaultMessage: 'General Information',
  },
  taskPeriod: {
    id: 'ocpui.components.ManageTask.taskPeriod',
    defaultMessage: 'Task Period',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManageTask.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.ManageTask.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.ManageTask.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.ManageTask.manageForm.validation.minStartDate',
      defaultMessage: 'Effective Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.ManageTask.manageForm.validation.minEndDate',
      defaultMessage: 'Effective End date field must be later than Effective Start date field',
    },
  },
  hintText: {
    patientName: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.patientName',
      defaultMessage: 'Patient',
    },
    organization: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.organization',
      defaultMessage: 'Organization',
    },
    activityDefinitions: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.activityDefinitions',
      defaultMessage: 'Activity Type',
    },
    requester: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.requester',
      defaultMessage: 'Created By',
    },
    createdOn: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.createdOn',
      defaultMessage: 'Created On',
    },
    status: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.status',
      defaultMessage: 'Status',
    },
    priority: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.priority',
      defaultMessage: 'Priority',
    },
    intent: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.intent',
      defaultMessage: 'Purpose',
    },
    performerType: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.performerType',
      defaultMessage: 'Participation',
    },
    eventType: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.eventType',
      defaultMessage: 'Event Type',
    },
    taskOwner: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.taskOwner',
      defaultMessage: 'Task Owner',
    },
    partOf: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.partOf',
      defaultMessage: 'Associated Task',
    },
    taskStart: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.taskStart',
      defaultMessage: 'Task Start Date',
    },
    taskEnd: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.taskEnd',
      defaultMessage: 'Task End Date',
    },
    lastModifiedDate: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.lastModifiedDate',
      defaultMessage: 'Last Modified Date',
    },
    description: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.description',
      defaultMessage: 'Description',
    },
    comments: {
      id: 'ocpui.components.ManageTask.manageForm.hintText.comments',
      defaultMessage: 'Comments',
    },
  },
  floatingLabelText: {
    organization: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.organization',
      defaultMessage: 'Organization',
    },
    patientName: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.patientName',
      defaultMessage: 'Patient',
    },
    requester: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.requester',
      defaultMessage: 'Created By',
    },
    activityDefinitions: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.activityDefinitions',
      defaultMessage: 'Activity Type',
    },
    createdOn: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.createdOn',
      defaultMessage: 'Created On',
    },
    status: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.status',
      defaultMessage: 'Status',
    },
    priority: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.priority',
      defaultMessage: 'Priority',
    },
    intent: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.intent',
      defaultMessage: 'Purpose',
    },
    performerType: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.performerType',
      defaultMessage: 'Participation',
    },
    eventType: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.eventType',
      defaultMessage: 'Event Type',
    },
    taskOwner: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.taskOwner',
      defaultMessage: 'Task Owner',
    },
    partOf: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.partOf',
      defaultMessage: 'Associated Task',
    },
    taskStart: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.taskStart',
      defaultMessage: 'Task Start Date',
    },
    taskEnd: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.taskEnd',
      defaultMessage: 'Task End Date',
    },
    lastModifiedDate: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.lastModifiedDate',
      defaultMessage: 'Last Modified Date',
    },
    description: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.description',
      defaultMessage: 'Description',
    },
    comments: {
      id: 'ocpui.components.ManageTask.manageForm.floatingLabelText.comments',
      defaultMessage: 'Comments',
    },
  },
});
