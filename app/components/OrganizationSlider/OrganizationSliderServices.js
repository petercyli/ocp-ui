import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui-next/ExpansionPanel';
import Divider from 'material-ui-next/Divider';
import teal from 'material-ui-next/colors/teal';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import HealthcareServices from 'containers/HealthcareServices';
import StyledIconButton from 'components/StyledIconButton';
import StyledTooltip from 'components/StyledTooltip';
import StyledText from 'components/StyledText';
import messages from './messages';


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
          <ExpansionPanelSummary
            expandIcon={
              <StyledTooltip title={<FormattedMessage {...messages.addNew} />}>
                <StyledIconButton component={Link} to={'/ocp-ui/manage-healthcare-service'} disableIconHover>
                  <AddCircleIcon color={teal['500']} />
                </StyledIconButton>
              </StyledTooltip>
            }
          >
            {this.state.expansionPanelOpen ?
              <ExpandLessIcon onClick={this.handlePanelOpen} /> :
              <ExpandMoreIcon onClick={this.handlePanelOpen} />
            }
            <StyledText whiteSpace>
              <FormattedMessage {...messages.servicesPanel.panelSummary} />
            </StyledText>
          </ExpansionPanelSummary>
          <Divider light />
          <ExpansionPanelDetails>
            <HealthcareServices />
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
