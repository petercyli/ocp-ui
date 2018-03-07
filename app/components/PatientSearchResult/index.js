/**
 *
 * PatientSearchResult
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';

import { MANAGE_CARE_TEAM_URL, MANAGE_PATIENT_URL, MANAGE_TASK_URL } from 'containers/App/constants';
import ConfirmPatientModal from 'components/ConfirmPatientModal';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import messages from './messages';

const columns = '1fr 1fr 1fr 1fr 30% 1fr 50px';

function displayPatientSearchResult(patients, onPatientClick) {
  // TODO: Will move ConfirmPatientModal to upcoming tasks component
  let confirmPatientModalReference = null;

  function onPatientModalOpen() {
    confirmPatientModalReference.handlePatientModalOpen();
  }

  return patients && patients.map((patient) => (
    <TableRow
      columns={columns}
      key={`patient-${uniqueId()}`}
      onClick={() => onPatientClick && onPatientClick(patient)}
      role="button"
      tabIndex="0"
    >
      <TableRowColumn>{patient.name[0] != null ? patient.name[0].firstName : null}</TableRowColumn>
      <TableRowColumn>{patient.name[0] != null ? patient.name[0].lastName : null}</TableRowColumn>
      <TableRowColumn>{patient.birthDate}</TableRowColumn>
      <TableRowColumn>{patient.genderCode}</TableRowColumn>
      <TableRowColumn>{getIdentifiers(patient.identifier)}</TableRowColumn>
      <TableRowColumn>{patient.active ?
        <FormattedMessage {...messages.active} /> :
        <FormattedMessage {...messages.inactive} />}
      </TableRowColumn>
      <TableRowColumn>
        <NavigationStyledIconMenu>
          <MenuItem
            primaryText={<FormattedMessage {...messages.edit} />}
            containerElement={<Link to={`${MANAGE_PATIENT_URL}/${patient.id}`} />}
          />
          <MenuItem
            primaryText={<FormattedMessage {...messages.viewDetails} />}
            onClick={onPatientModalOpen}
          />
          <MenuItem
            primaryText={<FormattedMessage {...messages.addTask} />}
            containerElement={<Link
              to={{
                pathname: MANAGE_TASK_URL,
                search: `?patientId=${patient.id}`,
              }}
            />}
          />
          <MenuItem
            primaryText={<FormattedMessage {...messages.addCareTeam} />}
            containerElement={<Link
              to={{
                pathname: MANAGE_CARE_TEAM_URL,
                search: `?patientId=${patient.id}`,
              }}
            />}
          />
          <MenuItem
            primaryText={<FormattedMessage {...messages.addRelatedPerson} />}
            containerElement={<Link
              to={{
                pathname: '/ocp-ui/manage-related-person',
                search: `?patientId=${patient.id}`,
              }}
            />}
          />

          <MenuItem primaryText={<FormattedMessage {...messages.remove} />} disabled />
        </NavigationStyledIconMenu>
        <ConfirmPatientModal
          onRef={(ref) => (confirmPatientModalReference = ref)}
          selectedPatient={patient}
        />
      </TableRowColumn>
    </TableRow>
  ));
}

function getIdentifiers(identifier) {
  return identifier.map((entry) =>
    (
      <div key={`patient-id-${uniqueId()}`}>
        {entry.system}: {entry.value}
        <br />
      </div>
    ),
  );
}

function PatientSearchResult({ loading, error, searchResult, onPatientClick }) {
  if (loading) {
    return <RefreshIndicatorLoading />;
  }

  if (error !== false) {
    return (<p>Error!</p>);
  }

  if (error !== false) {
    return (<p>No match search result.</p>);
  }

  if (searchResult !== false && searchResult !== null && searchResult.length === 0) {
    return (<p>No patients found.</p>);
  }

  if (searchResult !== false && searchResult !== null && searchResult.length !== 0) {
    return (
      <Table>
        <TableHeader columns={columns}>
          <TableHeaderColumn><FormattedMessage {...messages.firstName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.lastName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.dob} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.gender} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.identifier} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.status} /></TableHeaderColumn>
          <TableHeaderColumn />
        </TableHeader>
        {displayPatientSearchResult(searchResult, onPatientClick)}
      </Table>
    );
  }
  return null;
}

PatientSearchResult.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  searchResult: PropTypes.any,
  onPatientClick: PropTypes.func,
};

export default PatientSearchResult;
