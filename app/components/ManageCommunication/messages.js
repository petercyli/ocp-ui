/*
 * ManageCommunication Messages
 *
 * This contains all the text for the ManageCommunication component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.ManageCommunication.header',
    defaultMessage: 'This is the ManageCommunication component !',
  },
  recipientTableHeaderName: {
    id: 'ocpui.components.ManageCommunication.recipientTableHeaderName',
    defaultMessage: 'Name',
  },
  recipientTableHeaderRole: {
    id: 'ocpui.components.ManageCommunication.recipientTableHeaderRole',
    defaultMessage: 'Role',
  },
  recipientTableHeaderAction: {
    id: 'ocpui.components.ManageCommunication.recipientTableHeaderAction',
    defaultMessage: 'Action',
  },
  form: {
    floatingLabelText: {
      sent: {
        id: 'ocpui.containers.ManageCommunication.form.sent',
        defaultMessage: 'Time Sent',
      },
      sender: {
        id: 'ocpui.containers.ManageCommunication.form.sender',
        defaultMessage: 'Sender',
      },
      recipient: {
        id: 'ocpui.containers.ManageCommunication.form.recipient',
        defaultMessage: 'Recipient',
      },
      status: {
        id: 'ocpui.containers.ManageCommunication.form.status',
        defaultMessage: 'Status',
      },
      context: {
        id: 'ocpui.containers.ManageCommunication.form.context',
        defaultMessage: 'Event Type',
      },
      notDone: {
        id: 'ocpui.containers.ManageCommunication.form.notDone',
        defaultMessage: 'Communications did not occur.',
      },
      topic: {
        id: 'ocpui.containers.ManageCommunication.form.topic',
        defaultMessage: 'Topic',
      },
      notDoneReason: {
        id: 'ocpui.containers.ManageCommunication.form.notDoneReason',
        defaultMessage: 'Reason',
      },
      category: {
        id: 'ocpui.containers.ManageCommunication.form.category',
        defaultMessage: 'Category',
      },
      medium: {
        id: 'ocpui.containers.ManageCommunication.form.medium',
        defaultMessage: 'Contact Method',
      },
      subject: {
        id: 'ocpui.containers.ManageCommunication.form.subject',
        defaultMessage: 'Subject',
      },
      payloadContent: {
        id: 'ocpui.containers.ManageCommunication.form.payloadContent',
        defaultMessage: 'Message Content',
      },
      note: {
        id: 'ocpui.containers.ManageCommunication.form.note',
        defaultMessage: 'Note',
      },
    },
    addRecipient: {
      id: 'ocpui.containers.ManageCommunication.form.addRecipient',
      defaultMessage: 'Add Recipient',
    },
    removeRecipient: {
      id: 'ocpui.containers.ManageCommunication.form.removeRecipient',
      defaultMessage: 'Remove',
    },
    saveButton: {
      id: 'ocpui.containers.ManageCommunication.form.saveButton',
      defaultMessage: 'Save',
    },
    savingButton: {
      id: 'ocpui.containers.ManageCommunication.form.savingButton',
      defaultMessage: 'Saving...',
    },
    cancelButton: {
      id: 'ocpui.containers.ManageCommunication.form.cancelButton',
      defaultMessage: 'Cancel',
    },
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManageCommunication.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    textAreaMaxLength: {
      id: 'ocpui.components.ManageCommunication.manageForm.validation.textAreaMaxLength',
      defaultMessage: 'Maximum {textAreaMaxLength} characters',
    },
    textAreaMinLength: {
      id: 'ocpui.components.ManageCommunication.manageForm.validation.textAreaMinLength',
      defaultMessage: 'Minimum {textAreaMinLength} characters',
    },
    required: {
      id: 'ocpui.components.ManageCommunication.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.ManageCommunication.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
  },
});
