/**
 *
 * HealthcareServices
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import UltimatePagination from 'react-ultimate-pagination-material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectCurrentPage,
  makeSelectHealthcareServices,
  makeSelectIncludeInactive,
  makeSelectLocation,
  makeSelectOrganization,
  makeSelectQueryError,
  makeSelectQueryLoading,
  makeSelectTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import HealthcareServiceTable from '../../components/HealthcareServiceTable/index';
import {
  getHealthcareServicesByLocation,
  getHealthcareServicesByOrganization,
  initializeHealthcareServices,
} from './actions';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading/index';
import StatusCheckbox from '../../components/StatusCheckbox/index';
import { DEFAULT_START_PAGE_NUMBER } from '../App/constants';

export class HealthcareServices extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentWillMount() {
    this.props.initializeHealthcareServices();
  }

  handlePageClick(currentPage) {
    const { organization: { id: orgId, name: orgName }, location } = this.props;
    if (!isEmpty(location)) {
      const { id: locId, name: locName } = location;
      this.props.getHealthcareServicesByLocation(orgId, orgName, locId, locName, currentPage, this.props.includeInactive);
    } else {
      this.props.getHealthcareServicesByOrganization(orgId, orgName, currentPage, this.props.includeInactive);
    }
  }

  handleCheck(event, checked) {
    const { organization: { id: orgId, name: orgName }, location } = this.props;
    if (!isEmpty(location)) {
      const { id: locId, name: locName } = location;
      this.props.getHealthcareServicesByLocation(orgId, orgName, locId, locName, DEFAULT_START_PAGE_NUMBER, checked);
    } else {
      this.props.getHealthcareServicesByOrganization(orgId, orgName, DEFAULT_START_PAGE_NUMBER, checked);
    }
  }

  render() {
    const { loading, healthcareServices, organization, location } = this.props;
    return (
      <div className={styles.card}>
        {isEmpty(organization) &&
        <h4><FormattedMessage {...messages.organizationNotSelected} /></h4>}

        {!isEmpty(organization) &&
        <div><strong>Organization:</strong> {organization.name}</div>}
        {!isEmpty(location) &&
        <div><strong>Location:</strong> {location.name}</div>}

        {!loading && !isEmpty(organization) &&
        <div>
          <div className={styles.actionGridContainer}>
            <StatusCheckbox
              messages={messages.inactive}
              elementId="inactiveCheckBox"
              checked={this.props.includeInactive}
              handleCheck={this.handleCheck}
            >
            </StatusCheckbox>
          </div>
        </div>
        }

        {loading &&
        <RefreshIndicatorLoading />}

        {!loading && !isEmpty(organization) && isEmpty(healthcareServices) &&
        <h4><FormattedMessage {...messages.noHealthcareServicesFound} /></h4>
        }

        {!isEmpty(organization) && !isEmpty(healthcareServices) && healthcareServices.length > 0 &&
        <div className={styles.textCenter}>
          <HealthcareServiceTable elements={healthcareServices} />
          <UltimatePagination
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            boundaryPagesRange={1}
            siblingPagesRange={1}
            hidePreviousAndNextPageLinks={false}
            hideFirstAndLastPageLinks={false}
            hideEllipsis={false}
            onChange={this.handlePageClick}
          />
        </div>
        }
      </div>
    );
  }
}

HealthcareServices.propTypes = {
  loading: PropTypes.bool,
  includeInactive: PropTypes.bool,
  healthcareServices: PropTypes.array,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  initializeHealthcareServices: PropTypes.func,
  getHealthcareServicesByOrganization: PropTypes.func.isRequired,
  getHealthcareServicesByLocation: PropTypes.func.isRequired,
  organization: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
  location: makeSelectLocation(),
  loading: makeSelectQueryLoading(),
  error: makeSelectQueryError(),
  currentPage: makeSelectCurrentPage(),
  totalPages: makeSelectTotalNumberOfPages(),
  includeInactive: makeSelectIncludeInactive(),
  healthcareServices: makeSelectHealthcareServices(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeHealthcareServices: () => dispatch(initializeHealthcareServices()),
    getHealthcareServicesByOrganization: (organizationId, organizationName, currentPage, includeInactive) =>
      dispatch(getHealthcareServicesByOrganization(organizationId, organizationName, currentPage, includeInactive)),
    getHealthcareServicesByLocation: (organizationId, organizationName, locationId, locationName, currentPage, includeInactive) =>
      dispatch(getHealthcareServicesByLocation(organizationId, organizationName, locationId, locationName, currentPage, includeInactive)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'healthcareServices', reducer });
const withSaga = injectSaga({ key: 'healthcareServices', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HealthcareServices);
