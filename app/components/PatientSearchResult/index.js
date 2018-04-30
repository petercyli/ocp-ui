/**
 *
 * PatientSearchResult
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import sizeMeHOC from 'utils/SizeMeUtils';
import { MANAGE_CARE_TEAM_URL, MANAGE_PATIENT_URL, MANAGE_TASK_URL } from 'containers/App/constants';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import messages from './messages';
import { EXPANDED_TABLE_COLUMNS, SUMMARIZED_TABLE_COLUMNS, SUMMARY_VIEW_WIDTH } from './constants';


function displayPatientSearchResult(patients, onPatientClick, onPatientViewDetailsClick, isExpanded, columns, mapToTelecoms, combineAddress) {
  return patients && patients.map((patient) => {
    const menuItems = [{
      primaryText: <FormattedMessage {...messages.edit} />,
      linkTo: `${MANAGE_PATIENT_URL}/${patient.id}`,
    }, {
      primaryText: <FormattedMessage {...messages.viewDetails} />,
      onClick: () => onPatientViewDetailsClick(patient),
    }, {
      primaryText: <FormattedMessage {...messages.addAdvisory} />,
      linkTo: `${MANAGE_PATIENT_URL}/${patient.id}`,
    }, {
      primaryText: <FormattedMessage {...messages.addTask} />,
      linkTo: {
        pathname: MANAGE_TASK_URL,
        search: `?patientId=${patient.id}&isMainTask=true`,
      },
    }, {
      primaryText: <FormattedMessage {...messages.addCareTeam} />,
      linkTo: {
        pathname: MANAGE_CARE_TEAM_URL,
        search: `?patientId=${patient.id}`,
      },
    }, {
      primaryText: <FormattedMessage {...messages.addRelatedPerson} />,
      linkTo: {
        pathname: '/ocp-ui/manage-related-person',
        search: `?patientId=${patient.id}`,
      },
    }, {
      primaryText: <FormattedMessage {...messages.remove} />,
      disabled: true,
    }];
    const { telecoms } = patient;
    const contact = telecoms && telecoms.length > 0 ? mapToTelecoms(telecoms.slice(0, 1)) : '';
    const address = patient && patient.addresses && patient.addresses.length > 0 ? combineAddress(patient.addresses[0]) : '';

    function getFullName(patientData) {
      const name = patientData && patientData.name && patientData.name.length > 0 ? patientData.name[0] : null;
      return name != null ? (name.firstName.concat(' ').concat(name.lastName)) : null;
    }
    return (
      <TableRow
        columns={columns}
        key={`patient_${patient.id}`}
        onClick={() => onPatientClick && onPatientClick(patient)}
        role="button"
        tabIndex="0"
      >
        <TableRowColumn>{getFullName(patient)}</TableRowColumn>
        <TableRowColumn>{ contact }</TableRowColumn>
        {isExpanded &&
        <TableRowColumn>{ address }</TableRowColumn>
        }
        { isExpanded &&
        <TableRowColumn>{patient.race}</TableRowColumn>
        }
        { isExpanded &&
        <TableRowColumn>{patient.ethnicity}</TableRowColumn>
        }
        { isExpanded &&
        <TableRowColumn>{patient.birthDate}</TableRowColumn>
        }
        {isExpanded &&
        <TableRowColumn>{patient.genderCode}</TableRowColumn>
        }
        {isExpanded &&
        <TableRowColumn>{getIdentifiers(patient.identifier)}</TableRowColumn>
        }
        <TableRowColumn>{patient.active ?
          <FormattedMessage {...messages.active} /> :
          <FormattedMessage {...messages.inactive} />}
        </TableRowColumn>
        <TableRowColumn>
          <NavigationIconMenu menuItems={menuItems} />
        </TableRowColumn>
      </TableRow>
    );
  });
}

function getIdentifiers(identifier) {
  return identifier.map(({ systemDisplay, value }) =>
    (
      <div key={`patient_id_${systemDisplay}_${value}`}>
        {systemDisplay}: {value}
        <br />
      </div>
    ),
  );
}

function PatientSearchResult({ loading, error, searchResult, onPatientClick, onPatientViewDetailsClick, relativeTop, size, mapToTelecoms, combineAddress }) {
  const isExpanded = size && size.width && (Math.floor(size.width) > SUMMARY_VIEW_WIDTH);
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;

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
        <TableHeader columns={columns} relativeTop={relativeTop}>
          <TableHeaderColumn><FormattedMessage {...messages.fullName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderTelecom} /></TableHeaderColumn>
          {isExpanded &&
          <TableHeaderColumn><FormattedMessage {...messages.address} /></TableHeaderColumn>
          }
          {isExpanded &&
          <TableHeaderColumn><FormattedMessage {...messages.race} /></TableHeaderColumn>
          }
          {isExpanded &&
            <TableHeaderColumn><FormattedMessage {...messages.ethnicity} /></TableHeaderColumn>
          }
          {isExpanded &&
          <TableHeaderColumn><FormattedMessage {...messages.dob} /></TableHeaderColumn>
          }
          {isExpanded &&
          <TableHeaderColumn><FormattedMessage {...messages.gender} /></TableHeaderColumn>
          }
          {isExpanded &&
          <TableHeaderColumn><FormattedMessage {...messages.identifier} /></TableHeaderColumn>
          }
          <TableHeaderColumn><FormattedMessage {...messages.status} /></TableHeaderColumn>
          <TableHeaderColumn />
        </TableHeader>
        {displayPatientSearchResult(searchResult, onPatientClick, onPatientViewDetailsClick, isExpanded, columns, mapToTelecoms, combineAddress)}
      </Table>
    );
  }
  return null;
}

PatientSearchResult.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  searchResult: PropTypes.any,
  onPatientClick: PropTypes.func,
  onPatientViewDetailsClick: PropTypes.func,
  mapToTelecoms: PropTypes.func.isRequired,
  combineAddress: PropTypes.func.isRequired,
  size: PropTypes.object.isRequired,
};

export default sizeMeHOC(PatientSearchResult);
