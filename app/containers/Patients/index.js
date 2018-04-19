/**
 *
 * Patients
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEqual from 'lodash/isEqual';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import RecordsRange from 'components/RecordsRange';
import PatientSearchResult from 'components/PatientSearchResult';
import Card from 'components/Card';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import ConfirmPatientModal from 'components/ConfirmPatientModal';
import PanelToolbar from 'components/PanelToolbar';
import {
  CARE_MANAGER_ROLE_CODE,
  FRONT_OFFICE_ROLE_CODE,
  MANAGE_PATIENT_URL,
  OCP_ADMIN_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
} from 'containers/App/constants';
import { setPatient } from 'containers/App/contextActions';
import { makeSelectOrganization, makeSelectPatient } from 'containers/App/contextSelectors';
import {
  makeSelectCurrentPage,
  makeSelectCurrentPageSize,
  makeSelectPatientSearchResult,
  makeSelectPatientTotalElements,
  makeSelectQueryIncludeInactive,
  makeSelectQuerySearchTerms,
  makeSelectQuerySearchType,
  makeSelectSearchError,
  makeSelectSearchLoading,
  makeSelectTotalPages,
} from './selectors';
import { initializePatients, loadPatientSearchResult } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { SUMMARY_PANEL_WIDTH } from './constants';

export class Patients extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      relativeTop: 0,
      currentPage: 1,
      patient: null,
      isPatientModalOpen: false,
      isExpanded: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handlePatientClick = this.handlePatientClick.bind(this);
    this.handlePatientViewDetailsClick = this.handlePatientViewDetailsClick.bind(this);
    this.handlePatientModalClose = this.handlePatientModalClose.bind(this);
    this.onSize = this.onSize.bind(this);
  }

  componentDidMount() {
    if (this.props.patient) {
      this.props.initializePatients([this.props.patient]);
    } else {
      this.props.initializePatients();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { patient } = this.props;
    const { patient: newPatient } = nextProps;
    if (!isEqual(patient, newPatient) && !this.props.currentPage) {
      this.props.initializePatients([newPatient]);
    }
  }

  onSize(size) {
    const isExpanded = size && size.width && (Math.floor(size.width) > SUMMARY_PANEL_WIDTH);
    this.setState({
      relativeTop: size.height,
      isExpanded,
    });
  }

  handlePatientClick(patient) {
    this.props.setPatient(patient);
  }

  handlePatientViewDetailsClick(patient) {
    this.setState({
      patient,
      isPatientModalOpen: true,
    });
  }

  handlePatientModalClose() {
    this.setState({ isPatientModalOpen: false });
  }

  handleSearch(searchTerms, includeInactive, searchType) {
    const { organization } = this.props;
    if (organization) {
      this.props.onSubmitForm(searchTerms, searchType, includeInactive, organization.logicalId, this.state.currentPage);
    } else {
      this.props.onSubmitForm(searchTerms, searchType, includeInactive, this.state.currentPage);
    }
  }

  handleChangePage(newPage) {
    this.setState({ currentPage: newPage });
    const { organization } = this.props;
    if (organization) {
      this.props.onChangePage(this.props.searchTerms, this.props.searchType, this.props.includeInactive, newPage, organization.logicalId);
    } else {
      this.props.onChangePage(this.props.searchTerms, this.props.searchType, this.props.includeInactive, newPage);
    }
  }

  render() {
    const { loading, error, searchResult, organization } = this.props;
    const searchResultProps = {
      loading,
      error,
      searchResult,
      organization,
    };
    const addNewItem = {
      addNewItem: {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        linkUrl: MANAGE_PATIENT_URL,
      },
    };
    return (
      <Card>
        <PanelToolbar
          {...addNewItem}
          allowedAddNewItemRoles={[OCP_ADMIN_ROLE_CODE, ORGANIZATION_ADMIN_ROLE_CODE, CARE_MANAGER_ROLE_CODE, FRONT_OFFICE_ROLE_CODE]}
          onSearch={this.handleSearch}
          onSize={this.onSize}
        />
        <PatientSearchResult
          {...searchResultProps}
          relativeTop={this.state.relativeTop}
          onPatientClick={this.handlePatientClick}
          onPatientViewDetailsClick={this.handlePatientViewDetailsClick}
          isExpanded={this.state.isExpanded}
          onSize={this.onSize}
        />
        {!!this.props.searchResult && !!this.props.currentPage &&
        <div>
          <CenterAlignedUltimatePagination
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            onChange={this.handleChangePage}
          />
          <RecordsRange
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            totalElements={this.props.totalElements}
            currentPageSize={this.props.searchResult.length}
          />
        </div>
        }
        {/* TODO: Will move ConfirmPatientModal to upcoming tasks component*/}
        {this.state.patient &&
        <ConfirmPatientModal
          patient={this.state.patient}
          isPatientModalOpen={this.state.isPatientModalOpen}
          onPatientModalClose={this.handlePatientModalClose}
        />}
      </Card>
    );
  }
}

Patients.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  searchResult: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalElements: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  searchTerms: PropTypes.string,
  searchType: PropTypes.string,
  includeInactive: PropTypes.bool,
  initializePatients: PropTypes.func.isRequired,
  setPatient: PropTypes.func.isRequired,
  patient: PropTypes.object,
  organization: PropTypes.object,
};


const mapStateToProps = createStructuredSelector({
  searchResult: makeSelectPatientSearchResult(),
  totalElements: makeSelectPatientTotalElements(),
  loading: makeSelectSearchLoading(),
  error: makeSelectSearchError(),
  currentPage: makeSelectCurrentPage(),
  currentPageSize: makeSelectCurrentPageSize(),
  totalPages: makeSelectTotalPages(),
  searchTerms: makeSelectQuerySearchTerms(),
  searchType: makeSelectQuerySearchType(),
  includeInactive: makeSelectQueryIncludeInactive(),
  patient: makeSelectPatient(),
  organization: makeSelectOrganization(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (searchTerms, searchType, includeInactive, organization) => {
      const currentPage = 1;
      dispatch(loadPatientSearchResult(searchTerms, searchType, includeInactive, currentPage, organization));
    },
    onChangePage: (searchTerms, searchType, includeInactive, currentPage, organization) => dispatch(loadPatientSearchResult(searchTerms, searchType, includeInactive, currentPage, organization)),
    initializePatients: (patients) => dispatch(initializePatients(patients)),

    setPatient: (patient) => dispatch(setPatient(patient)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'patients', reducer });
const withSaga = injectSaga({ key: 'patients', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Patients);
