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
import uniqueId from 'lodash/uniqueId';
import isEqual from 'lodash/isEqual';
import { Cell } from 'styled-css-grid';

import RecordsRange from 'components/RecordsRange';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { PanelToolbar } from 'components/PanelToolbar';
import HealthcareServiceTable from 'components/HealthcareServiceTable';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import StatusCheckbox from 'components/StatusCheckbox';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import FilterSection from 'components/FilterSection';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import { makeSelectLocation, makeSelectOrganization } from 'containers/App/contextSelectors';
import { DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import { getHealthcareServices, initializeHealthcareServices, searchHealthcareServices } from './actions';
import {
  makeSelectCurrentPage,
  makeSelectHealthcareServices,
  makeSelectIncludeInactive,
  makeSelectQueryError,
  makeSelectQueryLoading,
  makeSelectTotalNumberOfPages,
  makeSelectTotalElements,
  makeSelectCurrentPageSize,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class HealthcareServices extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchHealthcareServices: {
        searchType: 'name',
        searchValue: '',
        includeInactive: false,
        currentPage: 1,
      },
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeSearchPage = this.handleChangeSearchPage.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
    this.LOCATION_NAME_HTML_ID = uniqueId('location_name_');
  }

  componentDidMount() {
    this.props.initializeHealthcareServices();
    const { organization, location } = this.props;
    if (organization || (organization && location)) {
      this.props.getHealthcareServices(1);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { organization, location } = this.props;
    const { organization: newOrganization, location: newLocation } = nextProps;
    if (!isEqual(organization, newOrganization) || !isEqual(location, newLocation)) {
      this.props.getHealthcareServices(1);
    }
  }

  handleSearch(searchValue, includeInactive, searchType) {
    this.setState({
      isShowSearchResult: true,
      searchHealthcareServices: { searchValue, includeInactive, searchType },
    });
    this.props.searchHealthcareServices(searchType, searchValue, includeInactive, this.state.searchHealthcareServices.currentPage);
  }

  handleChangeSearchPage(currentPage) {
    this.props.searchHealthcareServices(this.state.searchHealthcareServices.searchType, this.state.searchHealthcareServices.searchValue, this.state.searchHealthcareServices.includeInactive, currentPage);
  }

  handlePageClick(currentPage) {
    this.props.getHealthcareServices(currentPage, this.props.includeInactive);
  }

  handleCheck(event, checked) {
    this.props.getHealthcareServices(DEFAULT_START_PAGE_NUMBER, checked);
  }

  render() {
    const { loading, healthcareServices, organization, location } = this.props;
    return (
      <div>
        <PanelToolbar
          onSearch={this.handleSearch}
          showFilter={false}
        />
        {isEmpty(organization) &&
        <h4><FormattedMessage {...messages.organizationNotSelected} /></h4>}

        {!isEmpty(organization) &&
        <InfoSection>
          The <FormattedMessage {...messages.healthCareService} /> for &nbsp;
          <InlineLabel htmlFor={this.ORGANIZATION_NAME_HTML_ID}>
            <span id={this.ORGANIZATION_NAME_HTML_ID}>{organization.name}</span>&nbsp;
          </InlineLabel>
          {!isEmpty(location) &&
          <span>
            at the&nbsp;
            <InlineLabel htmlFor={this.LOCATION_NAME_HTML_ID}>
              <span id={this.LOCATION_NAME_HTML_ID}>{location.name}</span>&nbsp;
            </InlineLabel>
          </span>}
          are :
        </InfoSection>}
        {!isEmpty(organization) && isEmpty(location) &&
        <div>
          <FilterSection>
            <CheckboxFilterGrid>
              <Cell>
                <FormattedMessage {...messages.filterLabel} />
              </Cell>
              <Cell>
                <StatusCheckbox
                  messages={messages.inactive}
                  elementId="inactiveCheckBox"
                  checked={this.props.includeInactive}
                  handleCheck={this.handleCheck}
                />
              </Cell>
            </CheckboxFilterGrid>
          </FilterSection>
        </div>
        }

        {loading &&
        <RefreshIndicatorLoading />}

        {!loading && !isEmpty(organization) && isEmpty(healthcareServices) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noHealthcareServicesFound} />
        </NoResultsFoundText>
        }

        {!isEmpty(organization) && !isEmpty(healthcareServices) && healthcareServices.length > 0 &&
        <div>
          <CenterAlign>
            <HealthcareServiceTable elements={healthcareServices} />
          </CenterAlign>
          <CenterAlignedUltimatePagination
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            onChange={this.handlePageClick}
          />
          <RecordsRange
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            totalElements={this.props.totalElements}
            currentPageSize={this.props.currentPageSize}
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
  totalElements: PropTypes.number,
  currentPageSize: PropTypes.number,
  initializeHealthcareServices: PropTypes.func,
  getHealthcareServices: PropTypes.func.isRequired,
  organization: PropTypes.object,
  location: PropTypes.object,
  searchHealthcareServices: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
  location: makeSelectLocation(),
  loading: makeSelectQueryLoading(),
  error: makeSelectQueryError(),
  currentPage: makeSelectCurrentPage(),
  totalPages: makeSelectTotalNumberOfPages(),
  totalElements: makeSelectTotalElements(),
  currentPageSize: makeSelectCurrentPageSize(),
  includeInactive: makeSelectIncludeInactive(),
  healthcareServices: makeSelectHealthcareServices(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeHealthcareServices: () => dispatch(initializeHealthcareServices()),
    getHealthcareServices: (currentPage, includeInactive) =>
      dispatch(getHealthcareServices(currentPage, includeInactive)),
    searchHealthcareServices: (searchType, searchValue, includeInactive, currentPage) =>
      dispatch(searchHealthcareServices(searchType, searchValue, includeInactive, currentPage)),
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
