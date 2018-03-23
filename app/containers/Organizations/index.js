/**
 *
 * Organizations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { MANAGE_ORGANIZATION_URL } from 'containers/App/constants';
import { setOrganization } from 'containers/App/contextActions';
import OrganizationTable from 'components/OrganizationTable/Loadable';
import PanelToolbar from 'components/PanelToolbar';
import Card from 'components/Card';
import StickyDiv from 'components/StickyDiv';
import InfoSection from 'components/InfoSection';
import makeSelectOrganizations from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getOrganizations, initializeOrganizations, searchOrganizations } from './actions';
import { flattenOrganizationData } from './helpers';

export class Organizations extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowSearchResult: false,
      listOrganizations: {
        currentPage: 1,
      },
      searchOrganizations: {
        currentPage: 1,
        searchValue: '',
        showInactive: false,
        searchType: 'name',
      },
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleListPageClick = this.handleListPageClick.bind(this);
    this.handleSearchPageClick = this.handleSearchPageClick.bind(this);
  }

  componentDidMount() {
    this.props.initializeOrganizations();
    const initialCurrentPage = 1;
    this.props.getOrganizations(initialCurrentPage);
  }

  handleSearch(searchValue, showInactive, searchType) {
    this.setState({
      isShowSearchResult: true,
      searchOrganizations: { searchValue, showInactive, searchType },
    });
    this.props.searchOrganizations(searchValue, showInactive, searchType, this.state.searchOrganizations.currentPage);
  }

  handleRowClick(organization) {
    this.props.setOrganization(organization);
  }

  handleListPageClick(currentPage) {
    this.props.getOrganizations(currentPage);
  }

  handleSearchPageClick(currentPage) {
    this.props.searchOrganizations(this.state.searchOrganizations.searchValue, this.state.searchOrganizations.showInactive, this.state.searchOrganizations.searchType, currentPage);
  }

  render() {
    const { organizations } = this.props;
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_ORGANIZATION_URL,
    };
    // By initial to show listing organizations data
    let organizationData = {
      loading: organizations.listOrganizations.loading,
      data: organizations.listOrganizations.data,
      currentPage: organizations.listOrganizations.currentPage,
      totalNumberOfPages: organizations.listOrganizations.totalNumberOfPages,
      currentPageSize: organizations.listOrganizations.currentPageSize,
      totalElements: organizations.listOrganizations.totalElements,
      handlePageClick: this.handleListPageClick,
    };
    if (this.state.isShowSearchResult) {
      organizationData = {
        loading: organizations.searchOrganizations.loading,
        data: organizations.searchOrganizations.result,
        currentPage: organizations.searchOrganizations.currentPage,
        totalNumberOfPages: organizations.searchOrganizations.totalNumberOfPages,
        currentPageSize: organizations.searchOrganizations.currentPageSize,
        totalElements: organizations.searchOrganizations.totalElements,
        handlePageClick: this.handleSearchPageClick,
      };
    }
    return (
      <Card>
        <StickyDiv>
          <PanelToolbar addNewItem={addNewItem} onSearch={this.handleSearch} />
        </StickyDiv>
        <InfoSection margin="10px 0">
          <OrganizationTable
            organizationData={organizationData}
            onRowClick={this.handleRowClick}
            flattenOrganizationData={flattenOrganizationData}
          />
        </InfoSection>
      </Card>
    );
  }
}

Organizations.propTypes = {
  initializeOrganizations: PropTypes.func.isRequired,
  setOrganization: PropTypes.func.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  searchOrganizations: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    listOrganizations: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      currentPage: PropTypes.number.isRequired,
      totalNumberOfPages: PropTypes.number.isRequired,
      currentPageSize: PropTypes.number,
      totalElements: PropTypes.number,
      data: PropTypes.array,
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.bool,
      ]),
    }),
    searchOrganizations: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      currentPage: PropTypes.number.isRequired,
      totalNumberOfPages: PropTypes.number.isRequired,
      result: PropTypes.array,
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.bool,
      ]),
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizations(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeOrganizations: () => dispatch(initializeOrganizations()),
    getOrganizations: (currentPage) => dispatch(getOrganizations(currentPage)),
    searchOrganizations: (searchValue, showInactive, searchType, currentPage) => dispatch(searchOrganizations(searchValue, showInactive, searchType, currentPage)),
    setOrganization: (organization) => dispatch(setOrganization(organization)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'organizations', reducer });
const withSaga = injectSaga({ key: 'organizations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Organizations);
