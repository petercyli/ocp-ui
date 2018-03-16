/**
 *
 * UpcomingAppointments
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectAppointmentTypes, makeSelectAppointmentStatuses } from 'containers/App/lookupSelectors';
import isEmpty from 'lodash/isEmpty';
import { FormattedMessage } from 'react-intl';
import Card from 'components/Card/index';
import CardHeader from 'components/CardHeader';
import NoUpcomingAppointmentsMessage from 'containers/UpcomingAppointments/NoUpcomingAppointmentsMessage';
import CareCoordinatorUpcomingAppointmentTable from 'components/CareCoordinatorUpcomingAppointmentTable/index';
import { cancelAppointment, getUpcomingAppointments } from 'containers/UpcomingAppointments/actions';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading/index';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination/index';
import CenterAlign from 'components/Align/CenterAlign';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { APPOINTMENT_STATUS, APPOINTMENT_TYPE, DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import makeSelectUpcomingAppointments from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class UpcomingAppointments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
  }
  componentDidMount() {
    this.props.getUpcomingAppointments({ pageNumber: DEFAULT_START_PAGE_NUMBER });
    this.props.getLookupData();
  }
  handlePageClick(page) {
    this.props.getUpcomingAppointments({ pageNumber: page });
  }
  cancelAppointment(logicalId) {
    this.props.cancelAppointment(logicalId);
  }
  render() {
    const { upcomingAppointments: { loading, data }, appointmentTypes, appointmentStatuses } = this.props;
    return (
      <div>
        <Card>
          <CardHeader title={<FormattedMessage {...messages.header} />} />
          {loading &&
          <RefreshIndicatorLoading />}
          {!loading && isEmpty(data) &&
          <NoUpcomingAppointmentsMessage>{<FormattedMessage {...messages.noUpcomingAppointments} />}</NoUpcomingAppointmentsMessage>}
          { !isEmpty(data) && !isEmpty(data.elements) &&
          <CenterAlign>
            <CareCoordinatorUpcomingAppointmentTable elements={data.elements} appointmentStatuses={appointmentStatuses} appointmentTypes={appointmentTypes} cancelAppointment={this.cancelAppointment} />
            <CenterAlignedUltimatePagination
              currentPage={data.currentPage}
              totalPages={data.totalNumberOfPages}
              onChange={this.handlePageClick}
            />
          </CenterAlign>
          }
        </Card>
      </div>
    );
  }
}

UpcomingAppointments.propTypes = {
  getUpcomingAppointments: PropTypes.func.isRequired,
  getLookupData: PropTypes.func.isRequired,
  appointmentTypes: PropTypes.array,
  appointmentStatuses: PropTypes.array,
  upcomingAppointments: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      elements: PropTypes.array,
    }),
  }).isRequired,
  cancelAppointment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  upcomingAppointments: makeSelectUpcomingAppointments(),
  appointmentTypes: makeSelectAppointmentTypes(),
  appointmentStatuses: makeSelectAppointmentStatuses(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUpcomingAppointments: (query) => dispatch(getUpcomingAppointments(query)),
    getLookupData: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE])),
    cancelAppointment: (id) => dispatch(cancelAppointment(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'upcomingAppointments', reducer });
const withSaga = injectSaga({ key: 'upcomingAppointments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UpcomingAppointments);