/**
 *
 * OrganizationTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import isEmpty from 'lodash/isEmpty';

import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import messages from './messages';


const tableColumns = 'repeat(5, 1fr) 50px';
const ENTER_KEY = 'Enter';

function OrganizationTable(props) {
  const { organizationData, onRowClick } = props;
  return (
    <div>
      {organizationData.loading && <RefreshIndicatorLoading />}
      {(!organizationData.loading && organizationData.data && organizationData.data.length > 0
          ? <div>
            <Table>
              <TableHeader columns={tableColumns}>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderOrganization} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAddress} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderTelecom} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderId} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
              </TableHeader>
              {!isEmpty(organizationData.data) && organizationData.data.map((organization) => {
                const { logicalId, name, addresses, telecoms, identifiers, active } = organization;
                return (
                  <TableRow
                    columns={tableColumns}
                    key={logicalId}
                    onClick={() => onRowClick && onRowClick(organization)}
                    onKeyPress={(e) => {
                      if (e.key === ENTER_KEY) {
                        if (onRowClick) {
                          onRowClick(organization);
                        }
                      }
                      e.preventDefault();
                    }}
                    role="button"
                    tabIndex="0"
                  >
                    <TableRowColumn>{name}</TableRowColumn>
                    <TableRowColumn>{addresses}</TableRowColumn>
                    <TableRowColumn>{telecoms}</TableRowColumn>
                    <TableRowColumn>{identifiers}</TableRowColumn>
                    <TableRowColumn>
                      {active ?
                        <FormattedMessage {...messages.active} /> :
                        <FormattedMessage {...messages.inactive} />
                      }
                    </TableRowColumn>
                    <TableRowColumn>
                      <NavigationStyledIconMenu>
                        <MenuItem
                          primaryText={<FormattedMessage {...messages.edit} />}
                          containerElement={<Link to={`/ocp-ui/manage-organization/${logicalId}`} />}
                        />
                        <MenuItem
                          primaryText={<FormattedMessage {...messages.addLocation} />}
                          containerElement={<Link to={'/ocp-ui/manage-location'} />}
                        />
                        <MenuItem
                          primaryText={<FormattedMessage {...messages.addHealthCareService} />}
                          containerElement={<Link to={'/ocp-ui/manage-healthcare-service'} />}
                        />
                        <MenuItem
                          primaryText={<FormattedMessage {...messages.addActivityDefinition} />}
                          containerElement={<Link to={'/ocp-ui/manage-activity-definition'} />}
                        />
                        <MenuItem
                          primaryText={<FormattedMessage {...messages.remove} />}
                        />
                      </NavigationStyledIconMenu>
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </Table>
            <CenterAlignedUltimatePagination
              currentPage={organizationData.currentPage}
              totalPages={organizationData.totalNumberOfPages}
              onChange={organizationData.handlePageClick}
            />
          </div> :
          (<CenterAlign>
            <NoResultsFoundText>No organizations found</NoResultsFoundText>
          </CenterAlign>)
      )}
    </div>
  );
}

OrganizationTable.propTypes = {
  organizationData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    handlePageClick: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      identifiers: PropTypes.string,
      active: PropTypes.bool,
      name: PropTypes.string,
      addresses: PropTypes.string,
      telecoms: PropTypes.string,
    })).isRequired,
  }),
  onRowClick: PropTypes.func,
};

export default OrganizationTable;
