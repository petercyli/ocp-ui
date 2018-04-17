import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui-next/ExpansionPanel';
import Typography from 'material-ui-next/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import messages from './messages';


const tableColumns = 'repeat(2, 1fr) 50px';

class OrganizationSliderServices extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expansionPanelOpen: false,
    };
    this.handlePanelOpen = this.handlePanelOpen.bind(this);
  }

  handlePanelOpen() {
    this.setState({ expansionPanelOpen: !this.state.expansionPanelOpen });
  }

  render() {
    return (
      <div>
        <ExpansionPanel expanded={this.state.expansionPanelOpen}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={this.handlePanelOpen} />}>
            <Typography><FormattedMessage {...messages.servicesPanel.panelSummary} /></Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table>
              <TableHeader columns={tableColumns}>
                <TableHeaderColumn><FormattedMessage {...messages.servicesPanel.tableHeaderColumnName} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.servicesPanel.tableHeaderColumnDescription} /></TableHeaderColumn>
              </TableHeader>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

OrganizationSliderServices.propTypes = {
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.string,
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.string,
    telecoms: PropTypes.string,
  }).isRequired,
};

export default OrganizationSliderServices;
