/*
 * ConsentCard Messages
 *
 * This contains all the text for the ConsentCard component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.ConsentCard.header',
    defaultMessage: 'This is the ConsentCard component !',
  },
  consentStatus: {
    id: 'ocpui.components.ConsentCard.consentStatus',
    defaultMessage: 'Consent state:',
  },
  manageConsentButton: {
    id: 'ocpui.components.ConsentCard.manageConsentButton',
    defaultMessage: 'Manage Consent',
  },
  consentCardHeader: {
    authorizedLabel: {
      id: 'ocpui.components.ConsentCard.consentCardHeader.authorizedLabel',
      defaultMessage: 'Authorized to share:',
    },
    sharingLabel: {
      id: 'ocpui.components.ConsentCard.consentCardHeader.sharingLabel',
      defaultMessage: 'Sharing with:',
    },
    effectiveDatesLabel: {
      id: 'ocpui.components.ConsentCard.consentCardHeader.effectiveDatesLabel',
      defaultMessage: 'Effective dates:',
    },
    medicalInfoLabel: {
      id: 'ocpui.components.ConsentCard.consentCardHeader.medicalInfoLabel',
      defaultMessage: 'Medical information disclosed:',
    },
    purposeLabel: {
      id: 'ocpui.components.ConsentCard.consentCardHeader.purposeLabel',
      defaultMessage: 'Share the following purposes:',
    },
  },
  consentDialog: {
    title: {
      id: 'ocpui.components.ConsentCard.consentDialog.title',
      defaultMessage: 'Consent Options',
    },
    editConsentOption: {
      id: 'ocpui.components.ConsentCard.consentDialog.editConsentOption',
      defaultMessage: 'Edit This Consent',
    },
    attestConsentOption: {
      id: 'ocpui.components.ConsentCard.consentDialog.attestConsentOption',
      defaultMessage: 'Provide Signature',
    },
    previewConsentOption: {
      id: 'ocpui.components.ConsentCard.consentDialog.previewConsentOption',
      defaultMessage: 'Preview This Consent',
    },
    closeButton: {
      id: 'ocpui.components.ConsentCard.consentDialog.closeButton',
      defaultMessage: 'Close',
    },
  },
});
