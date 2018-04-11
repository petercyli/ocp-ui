import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell } from 'styled-css-grid';
import { Link } from 'react-router-dom';
import uniqueId from 'lodash/uniqueId';
import capitalize from 'lodash/capitalize';

import MenuItem from 'material-ui/MenuItem';
import Chevron from '@material-ui/icons/ChevronRight';
import Expand from '@material-ui/icons/ExpandMore';
import CheckCircle from '@material-ui/icons/CheckCircle';

import ShowHideWrapper from 'containers/ShowHideWrapper';
import Util from 'utils/Util';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import StyledChip from 'components/StyledChip';
import StyledIconButton from 'components/StyledIconButton';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import ConsentPurposeList from './ConsentPurposeList';
import messages from './messages';
import ConsentDetailsGrid from './ConsentDetailsGrid';

const CONSENT_STATUS_DRAFT = 'DRAFT';

class ConsentExpandableTableRow extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isShowAccordion: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const show = this.state.isShowAccordion;
    this.setState({
      isShowAccordion: !show,
    });
  }

  render() {
    const { consent, tableColumns, allowedAttestConsentRoles } = this.props;
    const { logicalId, fromActor, toActor, status, period, fromGeneralDesignation, toGeneralDesignation, purpose } = consent;
    return (
      <div>
        <TableRow
          columns={tableColumns}
          role="button"
          tabIndex="0"
        >
          <TableRowColumn>
            {!this.state.isShowAccordion &&
            <StyledIconButton onClick={() => this.handleClick()}><Chevron /></StyledIconButton>}
            {this.state.isShowAccordion &&
            <StyledIconButton onClick={() => this.handleClick()}><Expand /></StyledIconButton>}
          </TableRowColumn>
          <TableRowColumn>{fromGeneralDesignation || fromActor.map(({ display }) =>
            (
              <div key={uniqueId()}>
                {display}
              </div>
            ),
          )}</TableRowColumn>
          <TableRowColumn>{toGeneralDesignation || toActor.map(({ display }) =>
            (
              <div key={uniqueId()}>
                {display}
              </div>
            ),
          )}</TableRowColumn>
          <TableRowColumn>{period && period.start}-{period && period.end} </TableRowColumn>
          <TableRowColumn>{capitalize(status)}</TableRowColumn>
          <TableRowColumn>
            <NavigationStyledIconMenu>
              <MenuItem
                primaryText={<FormattedMessage {...messages.edit} />}
                containerElement={<Link to={`/ocp-ui/manage-consent/${logicalId}`} />}
                disabled
              />
              {Util.equalsIgnoreCase(status, CONSENT_STATUS_DRAFT) && <ShowHideWrapper allowedRoles={allowedAttestConsentRoles} >
                <MenuItem
                  primaryText={<FormattedMessage {...messages.attest} />}
                  containerElement={<Link to={`/ocp-ui/sign-consent/${logicalId}`} />}
                />
              </ShowHideWrapper>}
              <MenuItem
                primaryText={<FormattedMessage {...messages.remove} />}
                disabled
              />
            </NavigationStyledIconMenu>
          </TableRowColumn>
        </TableRow>
        {this.state.isShowAccordion && <ConsentDetailsGrid columns={1}>
          <Cell>
            <FormattedMessage {...messages.purpose} />
          </Cell>
          <Cell>
            <ConsentPurposeList>
              {purpose.map(({ display }) =>
                (<StyledChip key={uniqueId()}>
                  <CheckCircle color="white" />
                  {display}
                </StyledChip>),
              )}
            </ConsentPurposeList>
          </Cell>
        </ConsentDetailsGrid>}
      </div>);
  }
}

ConsentExpandableTableRow.propTypes = {
  consent: PropTypes.object,
  tableColumns: PropTypes.string,
  allowedAttestConsentRoles: PropTypes.string,
};

export default ConsentExpandableTableRow;
