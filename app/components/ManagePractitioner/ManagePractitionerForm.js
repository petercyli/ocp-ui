import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { FieldArray, Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import AddPractitionerRoleForOrganization from 'components/AddPractitionerRoleForOrganization';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import FormSubtitle from 'components/FormSubtitle';
import FieldGroupGrid from 'components/FieldGroupGrid';
import PrefixCell from 'components/FieldGroupGrid/PrefixCell';
import MainCell from 'components/FieldGroupGrid/MainCell';
import ErrorText from 'components/ErrorText';
import WideDialog from 'components/WideDialog';
import AddMultipleTelecoms from 'components/AddMultipleTelecoms';
import AddMultipleAddresses from 'components/AddMultipleAddresses';
import { HOME_URL } from 'containers/App/constants';
import messages from './messages';
import ManagePractitionerFormGrid from './ManagePractitionerFormGrid';

class ManagePractitionerForm extends React.PureComponent {

  static initialState = {
    searchOrganizationDialogOpen: false,
  };

  constructor(props) {
    super(props);
    this.state = { ...ManagePractitionerForm.initialState };
    this.handleDialogCallback = this.handleDialogCallback.bind(this);
    this.handleAddOrganizations = this.handleAddOrganizations.bind(this);
  }

  handleDialogCallback() {
    this.setState({ ...ManagePractitionerForm.initialState });
    this.props.initialSearchOrganizationResult();
  }

  handleAddOrganizations() {
    this.setState({ searchOrganizationDialogOpen: true });
  }

  render() {
    const {
      isSubmitting, dirty, isValid, values, errors,
      uspsStates, identifierSystems, telecomSystems, telecomUses, providerRoles, providerSpecialties,
      organizations, currentPage, totalNumberOfPages, onSearch, onPageClick,
    } = this.props;

    const addAddressesProps = {
      uspsStates,
      errors,
      addresses: values.addresses,
    };
    const addTelecomsProps = {
      telecomSystems,
      telecomUses,
      errors,
      telecoms: values.telecoms,
    };
    return (
      <div>
        <Form>
          <ManagePractitionerFormGrid>
            <Cell area="generalInformationSubtitle">
              <FormSubtitle margin="1vh 0 0 0">
                <FormattedMessage {...messages.title} />
              </FormSubtitle>
            </Cell>
            <Cell area="firstName">
              <TextField
                fullWidth
                name="firstName"
                hintText={<FormattedMessage {...messages.hintText.firstName} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.firstName} />}
              />
            </Cell>
            <Cell area="middleName">
              <TextField
                fullWidth
                name="middleName"
                hintText={<FormattedMessage {...messages.hintText.middleName} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.middleName} />}
              />
            </Cell>
            <Cell area="lastName">
              <TextField
                fullWidth
                name="lastName"
                hintText={<FormattedMessage {...messages.hintText.lastName} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastName} />}
              />
            </Cell>
            <Cell area="identifierGroup">
              <FieldGroupGrid>
                <PrefixCell>
                  <SelectField
                    fullWidth
                    name="identifierType"
                    hintText={<FormattedMessage {...messages.hintText.identifierType} />}
                    floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierType} />}
                  >
                    {identifierSystems && identifierSystems.map((identifierType) => (
                      <MenuItem
                        key={identifierType.uri}
                        value={identifierType.uri}
                        primaryText={identifierType.display}
                      />),
                    )}
                  </SelectField>
                </PrefixCell>
                <MainCell>
                  <TextField
                    fullWidth
                    name="identifierValue"
                    hintText={<FormattedMessage {...messages.hintText.identifierValue} />}
                    floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierValue} />}
                  />
                </MainCell>
              </FieldGroupGrid>
            </Cell>
            <Cell area="addresses">
              <AddMultipleAddresses{...addAddressesProps} />
            </Cell>
            <Cell area="contacts">
              <AddMultipleTelecoms {...addTelecomsProps} />
            </Cell>
            <Cell area="associateOrganizationSection">
              <Grid columns={1}>
                <Cell>
                  <FormSubtitle margin="1vh 0 0 0">
                    <FormattedMessage {...messages.associateOrganizations.subtitle} />
                  </FormSubtitle>
                </Cell>
                <Cell>
                  <StyledRaisedButton
                    onClick={this.handleAddOrganizations}
                    label={<FormattedMessage {...messages.associateOrganizations.addButtonLabel} />}
                  />
                </Cell>
                <Cell>
                  <FieldArray
                    name="practitionerRoles"
                    render={(arrayHelpers) => (
                      <div>
                        <WideDialog
                          open={this.state.searchOrganizationDialogOpen}
                          autoScrollBodyContent
                        >
                          <AddPractitionerRoleForOrganization
                            arrayHelpers={arrayHelpers}
                            onAddAssociateOrganization={arrayHelpers.push}
                            callback={this.handleDialogCallback}
                            roleType={providerRoles}
                            specialtyType={providerSpecialties}
                            existingOrganizations={values.practitionerRoles}
                            onSearch={onSearch}
                            onPageClick={onPageClick}
                            organizations={organizations}
                            currentPage={currentPage}
                            totalNumberOfPages={totalNumberOfPages}
                          />
                        </WideDialog>
                        <Table>
                          <TableHeader>
                            <TableHeaderColumn><FormattedMessage {...messages.associateOrganizations.tableColumnName} /></TableHeaderColumn>
                            <TableHeaderColumn><FormattedMessage {...messages.associateOrganizations.tableColumnCode} /></TableHeaderColumn>
                            <TableHeaderColumn><FormattedMessage {...messages.associateOrganizations.tableColumnSpecialty} /></TableHeaderColumn>
                            <TableHeaderColumn><FormattedMessage {...messages.associateOrganizations.tableColumnActive} /></TableHeaderColumn>
                            <TableHeaderColumn><FormattedMessage {...messages.associateOrganizations.tableColumnRemove} /></TableHeaderColumn>
                          </TableHeader>
                          {errors && errors.practitionerRoles &&
                          <ErrorText>{errors.practitionerRoles}</ErrorText>}
                          {values.practitionerRoles && values.practitionerRoles.map((pr, index) => {
                            const { organization, logicalId } = pr;
                            return (
                              <TableRow key={organization && organization.reference}>
                                <TableRowColumn>{organization.display}</TableRowColumn>
                                <TableRowColumn>
                                  <SelectField
                                    fullWidth
                                    name={`practitionerRoles.${index}.code`}
                                    hintText={<FormattedMessage {...messages.hintText.roleType} />}
                                  >
                                    {providerRoles && providerRoles.map((roleType) =>
                                      (<MenuItem
                                        key={roleType.code}
                                        value={roleType.code}
                                        primaryText={roleType.display}
                                      />),
                                    )}
                                  </SelectField>
                                </TableRowColumn>
                                <TableRowColumn>
                                  <SelectField
                                    fullWidth
                                    name={`practitionerRoles.${index}.specialty`}
                                    hintText={<FormattedMessage {...messages.hintText.specialty} />}
                                  >
                                    {providerSpecialties && providerSpecialties.map((roleType) =>
                                      (<MenuItem
                                        key={roleType.code}
                                        value={roleType.code}
                                        primaryText={roleType.display}
                                      />),
                                    )}
                                  </SelectField>
                                </TableRowColumn>
                                <TableRowColumn>
                                  <SelectField
                                    fullWidth
                                    name={`practitionerRoles.${index}.active`}
                                    hintText={<FormattedMessage {...messages.hintText.active} />}
                                  >
                                    <MenuItem
                                      value
                                      primaryText="Active"
                                    />
                                    <MenuItem
                                      value={false}
                                      primaryText="Inactive"
                                    />
                                  </SelectField>
                                </TableRowColumn>
                                <TableRowColumn>
                                  <StyledRaisedButton
                                    label="Remove"
                                    disabled={logicalId !== undefined}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                  </StyledRaisedButton>
                                </TableRowColumn>
                              </TableRow>
                            );
                          })}
                        </Table>
                      </div>)}
                  />
                </Cell>
              </Grid>
            </Cell>
            <Cell area="buttonGroup">
              <Grid columns={2}>
                <Cell>
                  <StyledRaisedButton
                    fullWidth
                    type="submit"
                    label="Save"
                    disabled={!dirty || isSubmitting || !isValid}
                  />
                </Cell>
                <Cell>
                  <StyledFlatButton
                    fullWidth
                    label="Cancel"
                    default
                    disabled={isSubmitting}
                    containerElement={<Link to={HOME_URL} />}
                  />
                </Cell>
              </Grid>
            </Cell>
          </ManagePractitionerFormGrid>
        </Form>
      </div>
    );
  }
}

ManagePractitionerForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  identifierSystems: PropTypes.arrayOf(PropTypes.shape({
    uri: PropTypes.string.isRequired,
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  telecomUses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })).isRequired,
  providerRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  providerSpecialties: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  onPageClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  initialSearchOrganizationResult: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
  values: PropTypes.object,
  errors: PropTypes.object,
};

export default ManagePractitionerForm;
