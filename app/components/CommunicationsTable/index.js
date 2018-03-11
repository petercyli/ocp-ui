/**
*
* CommunicationsTable
*
*/

import React from 'react';
import { uniqueId } from 'lodash';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Link from 'react-router-dom/es/Link';
import { MANAGE_COMMUNICATION_URL } from 'containers/App/constants';
import styles from './styles.css';
import messages from './messages';
import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';

const iconStyles = {
  iconButton: {
    position: 'relative',
  },
  icon: {
    width: '100%',
    height: 26,
    position: 'absolute',
    top: '0',
    right: '0',
  },
};


function CommunicationsTable(props) {
  const { communications, selectedPatientId } = props;
  return (
    <div >
      <Table>
        <TableHeader>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCategory} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderContactMethod} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderRecipients} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderSender} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderSent} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {communications && communications.map((communication) => (
          <TableRow key={communication.logicalId}>
            <TableRowColumn>{communication.categoryValue}</TableRowColumn>
            <TableRowColumn>{communication.mediumVaule}</TableRowColumn>
            <TableRowColumn> { getRecipientsList(communication.recipient)}</TableRowColumn>
            <TableRowColumn>{communication.sender.display}</TableRowColumn>
            <TableRowColumn>{communication.sent}</TableRowColumn>
            <TableRowColumn>{communication.statusValue}</TableRowColumn>
            <TableRowColumn>
              <div className={styles.iconButtonGridContainer}>
                <div className={styles.iconButtonGridItem}>
                  <IconMenu
                    iconButtonElement={
                      (<IconButton
                        className={styles.iconButton}
                        iconStyle={iconStyles.icon}
                        style={iconStyles.iconButton}
                      >
                        <NavigationMenu />
                      </IconButton>)
                    }
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                  >
                    <MenuItem
                      className={styles.menuItem}
                      primaryText="Edit"
                      containerElement={<Link
                        to={{
                          pathname: `${MANAGE_COMMUNICATION_URL}/${communication.logicalId}`,
                          search: `?patientId=${selectedPatientId}`,
                        }}
                      />}
                    />
                  </IconMenu>
                </div>
              </div>
            </TableRowColumn>
          </TableRow>
        ))
        }
        {(communications.length === 0) && (
          <TableRow key={uniqueId()}>
            <TableRowColumn>
              <FormattedMessage {...messages.noCommunications} />
            </TableRowColumn>
          </TableRow>
        )
        }
      </Table>
    </div>
  );
}

CommunicationsTable.propTypes = {
  communications: PropTypes.array.isRequired,
  selectedPatientId: PropTypes.string.isRequired,
};

export default CommunicationsTable;

function getRecipientsList(recipients) {
  const names = [];
  if (recipients) {
    recipients.forEach((entry) => {
      if (entry.display) {
        names.push(entry.display);
      }
    });
  }
  return names.join(',');
}
