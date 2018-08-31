/**
 *
 * SearchAppointmentParticipant
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getLookupsAction } from 'containers/App/actions';
import { APPOINTMENT_PARTICIPANT_REQUIRED } from 'containers/App/constants';
import { makeSelectAppointmentParticipationRequired } from 'containers/App/lookupSelectors';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import { getLogicalIdFromReference } from 'containers/App/helpers';
import AddAppointmentParticipantModal from 'components/AddAppointmentParticipantModal';
import { getHealthcareServiceReferences, getLocationReferences, getPractitionerReferences } from './actions';
import {
  makeSelectHealthcareServiceReferences,
  makeSelectLocationReferences,
  makeSelectPractitionerReferences,
} from './selectors';
import reducer from './reducer';
import saga from './saga';


export class SearchAppointmentParticipant extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleGetAvailableLocations = this.handleGetAvailableLocations.bind(this);
    this.handleGetAvailablePractitioners = this.handleGetAvailablePractitioners.bind(this);
  }

  componentDidMount() {
    const { organization } = this.props;

    this.props.getLookups();
    if (organization) {
      this.props.getHealthcareServiceReferences(organization.logicalId);
    }
  }

  handleGetAvailableLocations(healthcareServiceReference) {
    const healthcareServiceId = getLogicalIdFromReference(healthcareServiceReference);
    if (healthcareServiceId) {
      this.props.getLocationReferences(healthcareServiceId);
    }
  }

  handleGetAvailablePractitioners(locationReference) {
    const locationId = getLogicalIdFromReference(locationReference);
    if (locationId) {
      this.props.getPractitionerReferences(this.props.organization.logicalId, locationId);
    }
  }

  render() {
    const {
      formErrors,
      participants,
      healthcareServices,
      locations,
      practitioners,
      appointmentParticipantRequired,
    } = this.props;

    return (
      !isEmpty(healthcareServices) &&
      <AddAppointmentParticipantModal
        errors={formErrors}
        participants={participants}
        healthcareServices={healthcareServices}
        locations={locations}
        practitioners={practitioners}
        participantAttendance={appointmentParticipantRequired}
        onGetAvailableLocations={this.handleGetAvailableLocations}
        onGetAvailablePractitioners={this.handleGetAvailablePractitioners}
      />
    );
  }
}

SearchAppointmentParticipant.propTypes = {
  getLookups: PropTypes.func.isRequired,
  healthcareServices: PropTypes.array,
  locations: PropTypes.array,
  appointmentParticipantRequired: PropTypes.array,
  practitioners: PropTypes.array,
  getHealthcareServiceReferences: PropTypes.func.isRequired,
  getPractitionerReferences: PropTypes.func.isRequired,
  getLocationReferences: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  formErrors: PropTypes.object,
  participants: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string,
    participantRequiredCode: PropTypes.string,
    participantStatusCode: PropTypes.string,
    participationTypeCode: PropTypes.string,
    reference: PropTypes.string,
  })),
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
  healthcareServices: makeSelectHealthcareServiceReferences(),
  locations: makeSelectLocationReferences(),
  practitioners: makeSelectPractitionerReferences(),
  appointmentParticipantRequired: makeSelectAppointmentParticipationRequired(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([APPOINTMENT_PARTICIPANT_REQUIRED])),
    getHealthcareServiceReferences: (organizationId) => dispatch(getHealthcareServiceReferences(organizationId)),
    getLocationReferences: (healthcareServiceId) => dispatch(getLocationReferences(healthcareServiceId)),
    getPractitionerReferences: (organizationId, locationId) => dispatch(getPractitionerReferences(organizationId, locationId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchAppointmentParticipant', reducer });
const withSaga = injectSaga({ key: 'searchAppointmentParticipant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchAppointmentParticipant);
