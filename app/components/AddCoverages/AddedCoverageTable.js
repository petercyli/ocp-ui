import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';
import find from 'lodash/find';

import Util from 'utils/Util';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import CustomErrorText from 'components/CustomErrorText';
import messages from './messages';

function addedCoveragesTable(props) {
  const tableColumns = 'repeat(6, 1fr) 80px';
  const {
    errors,
    flags,
    arrayHelpers,
    handleEditFlag,
    flagStatuses,
    flagCategories,
  } = props;
  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns}>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderCoverage} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.id} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderBeneficiary} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderStartDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderEndDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {errors && errors.flags &&
        <CustomErrorText>{errors.flags}</CustomErrorText>
        }
        {flags && flags.map((flag, index) => {
          const { logicalId, category, status, code, author, flagStart, flagEnd } = flag;
          const menuItems = [{
            primaryText: <FormattedMessage {...messages.addedCoveragesTable.tableActionEdit} />,
            onClick: () => handleEditFlag(index, flag),
          }, {
            primaryText: <FormattedMessage {...messages.addedCoveragesTable.tableActionRemove} />,
            disabled: logicalId !== undefined,
            onClick: () => arrayHelpers.remove(index),
          }];
          return (
            <TableRow key={uniqueId()} columns={tableColumns}>
              <TableRowColumn>{find(flagCategories, { code: category }) && (find(flagCategories, { code: category })).display}</TableRowColumn>
              <TableRowColumn>{find(flagStatuses, { code: status }) && (find(flagStatuses, { code: status })).display}</TableRowColumn>
              <TableRowColumn>{code}</TableRowColumn>
              <TableRowColumn>{author && author.display}</TableRowColumn>
              <TableRowColumn>{flagStart && Util.formatDate(flagStart)}</TableRowColumn>
              <TableRowColumn>{flagEnd && Util.formatDate(flagEnd)}</TableRowColumn>
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

addedCoveragesTable.propTypes = {
  errors: PropTypes.object,
  arrayHelpers: PropTypes.object,
  handleEditFlag: PropTypes.func,
  flags: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    code: PropTypes.string,
    status: PropTypes.string,
    author: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
  })),
  flagStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  flagCategories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
};

export default addedCoveragesTable;
