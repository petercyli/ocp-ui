/**
*
* PermissionAssignmentTable
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import TableHeaderColumn from 'components/TableHeaderColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import messages from './messages';
import { PERMISSION_ASSIGNMENT_TABLE_COLUMNS } from './constants';

// import styled from 'styled-components';
const columns = PERMISSION_ASSIGNMENT_TABLE_COLUMNS;


function createTableHeaders() {
  return (
    <TableHeader columns={columns}>
      <TableHeaderColumn><FormattedMessage {...messages.providerName} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.role} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.permissionGroup} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.contact} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.action} /></TableHeaderColumn>
    </TableHeader>
  );
}

function createTableRows(users, handleEditAssignRoles) {
  return (
    <div>
      {users && users.map((user) => {
        const menuItems = [{
          primaryText: <FormattedMessage {...messages.assignRole} />,
          onClick: () => handleEditAssignRoles(user),
        },
        ];
        return (
          <TableRow key={user.id} columns={columns}>
            <TableRowColumn>
              {user.givenName}, {user.familyName}
            </TableRowColumn>
            <TableRowColumn>
              {user.role}
            </TableRowColumn>
            <TableRowColumn>
              {user.displayName}
            </TableRowColumn>
            <TableRowColumn>
              {user.contact}
            </TableRowColumn>
            <TableRowColumn>
              <NavigationIconMenu menuItems={menuItems} />
            </TableRowColumn>
          </TableRow>
        );
      })}
    </div>);
}

class PermissionAssignmentTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { users, handleEditAssignRoles } = this.props;
    return (
      <Table>
        {createTableHeaders()}
        {createTableRows(users, handleEditAssignRoles)}
      </Table>
    );
  }
}

PermissionAssignmentTable.propTypes = {
  users: PropTypes.array,
  handleEditAssignRoles: PropTypes.func,
};

export default PermissionAssignmentTable;
