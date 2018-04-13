/**
 *
 * AppointmentTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import find from 'lodash/find';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import messages from './messages';

function AppointmentTable({ elements, appointmentStatuses, appointmentTypes, cancelAppointment, patientId, communicationBaseUrl, relativeTop, cancelledStatus, enableEditAppointment, manageAppointmentUrl }) { // eslint-disable-line react/prefer-stateless-function
  return (
    <div>
      <Table>
        <TableHeader relativeTop={relativeTop}>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderPatientName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAppointmentType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTime} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderDescription} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {elements && elements.map((appointment) => {
          const addCommunicationMenuItem = patientId && {
            primaryText: <FormattedMessage {...messages.addCommunication} />,
            linkTo: {
              pathname: `${communicationBaseUrl}`,
              search: `?patientId=${patientId}&appointmentId=${appointment.logicalId}`,
            },
          };
          const editAppointmentMenuItem = enableEditAppointment && {
            primaryText: <FormattedMessage {...messages.editAppointment} />,
            linkTo: `${manageAppointmentUrl}/${appointment.logicalId}`,
          };
          const menuItems = [
            addCommunicationMenuItem,
            editAppointmentMenuItem, {
              primaryText: <FormattedMessage {...messages.cancelAppointment} />,
              disabled: appointment.statusCode === cancelledStatus,
              onClick: () => cancelAppointment(appointment.logicalId),
            }];
          return (
            <TableRow key={uniqueId()}>
              <TableRowColumn>{appointment.patientName}</TableRowColumn>
              <TableRowColumn>{mapDisplayFromCode(appointmentTypes, appointment.typeCode)}</TableRowColumn>
              <TableRowColumn>{mapDisplayFromCode(appointmentStatuses, appointment.statusCode)}</TableRowColumn>
              <TableRowColumn>{appointment.appointmentDate}</TableRowColumn>
              <TableRowColumn>{appointment.appointmentDuration}</TableRowColumn>
              <TableRowColumn>{appointment.description}</TableRowColumn>
              <TableRowColumn>
                <NavigationIconMenu menuItems={menuItems} />
              </TableRowColumn>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}

function mapDisplayFromCode(appointmentLookup, key) {
  if (key) {
    return find(appointmentLookup, { code: key }).display;
  }
  return key;
}

AppointmentTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  elements: PropTypes.array.isRequired,
  appointmentStatuses: PropTypes.array,
  appointmentTypes: PropTypes.array,
  cancelAppointment: PropTypes.func,
  communicationBaseUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string,
  cancelledStatus: PropTypes.string,
  enableEditAppointment: PropTypes.bool,
  manageAppointmentUrl: PropTypes.string,
};

export default AppointmentTable;
