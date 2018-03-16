/**
 *
 * WorkspaceSelection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Step, StepLabel, Stepper } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import { CARE_COORDINATOR, CARE_MANAGER, OCP_ADMIN, ORGANIZATION_ADMIN, PATIENT, PCP } from 'containers/App/constants';
import { getLinkUrlByRole } from 'components/PrivateNavigation';
import StepperSection from './StepperSection';
import StepContent from './StepContent';
import RoleSelectField from './RoleSelectField';


// Todo: will get data from backend
const organizations = [
  {
    logicalId: '1',
    name: 'Organization A',
  },
  {
    logicalId: '2',
    name: 'Organization B',
  },
  {
    logicalId: '3',
    name: 'Organization C',
  },
];
const patients = [
  {
    id: '1',
    name: 'Patient A',
  },
  {
    id: '2',
    name: 'Patient B',
  },
  {
    id: '3',
    name: 'Patient C',
  },
];
const careCoordinators = [
  {
    logicalId: '1',
    name: 'Care Coordinators A',
  },
  {
    logicalId: '2',
    name: 'Care Coordinators B',
  },
  {
    logicalId: '3',
    name: 'Care Coordinators C',
  },
];
const careManagers = [
  {
    logicalId: '1',
    name: 'Care Manager A',
  },
  {
    logicalId: '2',
    name: 'Care Manager B',
  },
  {
    logicalId: '3',
    name: 'Care Manager C',
  },
];

class WorkspaceSelection extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      roleValue: CARE_MANAGER,
      adminValue: null,
      organizationValue: null,
      careManagerValue: null,
      careCoordinatorValue: null,
      patientValue: null,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleAdminChange = this.handleAdminChange.bind(this);
    this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
    this.handleCareManagerChange = this.handleCareManagerChange.bind(this);
    this.handleCareCoordinatorChange = this.handleCareCoordinatorChange.bind(this);
    this.handlePatientChange = this.handlePatientChange.bind(this);
    this.handleNavigateTo = this.handleNavigateTo.bind(this);
  }

  getStepContentBasedOnRole(finished, stepIndex) {
    switch (this.state.roleValue) {
      case OCP_ADMIN:
        return this.configureOcpAdminStepContent(finished, stepIndex);
      case CARE_MANAGER:
        return this.configureCareManagerStepContent(finished, stepIndex);
      case CARE_COORDINATOR:
        return this.configureCareCoordinatorStepContent(finished, stepIndex);
      case PATIENT:
        return this.configurePatientStepContent(finished, stepIndex);
      default:
        return null;
    }
  }

  getAdminStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.buildSelectRoleContent();
      default:
        return null;
    }
  }

  getManagerStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.buildSelectRoleContent();
      case 1:
        return this.buildSelectOrganizationContent();
      case 2:
        return (
          <div>
            <SelectField
              floatingLabelText="Select Care Manager"
              value={this.state.careManagerValue}
              onChange={this.handleCareManagerChange}
            >
              {careManagers && careManagers.map((careManager) =>
                <MenuItem key={careManager.logicalId} value={careManager.logicalId} primaryText={careManager.name} />,
              )}
            </SelectField>
          </div>
        );
      default:
        return null;
    }
  }

  getCoordinatorStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.buildSelectRoleContent();
      case 1:
        return this.buildSelectOrganizationContent();
      case 2:
        return (
          <div>
            <SelectField
              floatingLabelText="Select Coordinator"
              value={this.state.careCoordinatorValue}
              onChange={this.handleCareCoordinatorChange}
            >
              {careCoordinators && careCoordinators.map((careCoordinator) =>
                (<MenuItem
                  key={careCoordinator.logicalId}
                  value={careCoordinator.logicalId}
                  primaryText={careCoordinator.name}
                />),
              )}
            </SelectField>
          </div>
        );
      default:
        return null;
    }
  }

  getPatientStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.buildSelectRoleContent();
      case 1:
        return (
          <div>
            <SelectField
              floatingLabelText="Select Patient"
              value={this.state.patientValue}
              onChange={this.handlePatientChange}
            >
              {patients && patients.map((patient) =>
                <MenuItem key={patient.id} value={patient.id} primaryText={patient.name} />,
              )}
            </SelectField>
          </div>
        );
      default:
        return null;
    }
  }

  buildSelectRoleContent() {
    return (
      <div>
        <RoleSelectField
          floatingLabelText="Select Role"
          value={this.state.roleValue}
          onChange={this.handleRoleChange}
        >
          <MenuItem value={OCP_ADMIN} primaryText={OCP_ADMIN} />
          <MenuItem value={CARE_MANAGER} primaryText={`${CARE_MANAGER}/${ORGANIZATION_ADMIN}`} />
          <MenuItem value={CARE_COORDINATOR} primaryText={`${CARE_COORDINATOR}/${PCP}`} />
          <MenuItem value={PATIENT} primaryText={PATIENT} />
        </RoleSelectField>
      </div>
    );
  }

  buildSelectOrganizationContent() {
    return (
      <div>
        <SelectField
          floatingLabelText="Select Organization"
          value={this.state.organizationValue}
          onChange={this.handleOrganizationChange}
        >
          {organizations && organizations.map((organization) =>
            <MenuItem key={organization.logicalId} value={organization.logicalId} primaryText={organization.name} />,
          )}
        </SelectField>
      </div>
    );
  }

  configureOcpAdminStepContent(finished, stepIndex) {
    return (
      <div>
        <StepperSection>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Role</StepLabel>
            </Step>
          </Stepper>
          <StepContent>
            <div>
              {this.getAdminStepContent(stepIndex)}
              <p><strong>Role:</strong> {this.state.roleValue}</p>
              <RaisedButton
                label="Continue"
                primary
                onClick={this.handleNavigateTo}
              />
            </div>
          </StepContent>
        </StepperSection>
      </div>
    );
  }

  configureCareManagerStepContent(finished, stepIndex) {
    return (
      <div>
        <StepperSection>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Role</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Organization</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Care Manager</StepLabel>
            </Step>
          </Stepper>
          <StepContent>
            {finished ? (
              <div>
                <p><strong>Role:</strong> {this.state.roleValue}</p>
                <p><strong>Organization:</strong> {this.state.organizationValue}</p>
                <p><strong>Care Manager:</strong> {this.state.careManagerValue}</p>
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Reset"
                      secondary
                      onClick={(event) => {
                        event.preventDefault();
                        this.setState({ stepIndex: 0, finished: false });
                      }}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label="Continue"
                      primary
                      onClick={this.handleNavigateTo}
                    />
                  </Cell>
                </Grid>
              </div>
            ) : (
              <div>
                {this.getManagerStepContent(stepIndex)}
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label={stepIndex === 2 ? 'Finish' : 'Next'}
                      primary
                      onClick={this.handleNext}
                    />
                  </Cell>
                </Grid>
              </div>
            )}
          </StepContent>
        </StepperSection>
      </div>
    );
  }

  configureCareCoordinatorStepContent(finished, stepIndex) {
    return (
      <div>
        <StepperSection>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Role</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Organization</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Coordinator</StepLabel>
            </Step>
          </Stepper>
          <StepContent>
            {finished ? (
              <div>
                <p><strong>Role:</strong> {this.state.roleValue}</p>
                <p><strong>Organization:</strong> {this.state.organizationValue}</p>
                <p><strong>Coordinator:</strong> {this.state.careCoordinatorValue}</p>
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Reset"
                      secondary
                      onClick={(event) => {
                        event.preventDefault();
                        this.setState({ stepIndex: 0, finished: false });
                      }}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label="Continue"
                      primary
                      onClick={this.handleNavigateTo}
                    />
                  </Cell>
                </Grid>
              </div>
            ) : (
              <div>
                {this.getCoordinatorStepContent(stepIndex)}
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label={stepIndex === 2 ? 'Finish' : 'Next'}
                      primary
                      onClick={this.handleNext}
                    />
                  </Cell>
                </Grid>
              </div>
            )}
          </StepContent>
        </StepperSection>
      </div>
    );
  }

  configurePatientStepContent(finished, stepIndex) {
    return (
      <div>
        <StepperSection>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Role</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Patient</StepLabel>
            </Step>
          </Stepper>
          <StepContent>
            {finished ? (
              <div>
                <p><strong>Role:</strong> {this.state.roleValue}</p>
                <p><strong>Patient:</strong> {this.state.patientValue}</p>
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Reset"
                      secondary
                      onClick={(event) => {
                        event.preventDefault();
                        this.setState({ stepIndex: 0, finished: false });
                      }}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label="Continue"
                      primary
                      onClick={this.handleNavigateTo}
                    />
                  </Cell>
                </Grid>
              </div>
            ) : (
              <div>
                {this.getPatientStepContent(stepIndex)}
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label={stepIndex === 1 ? 'Finish' : 'Next'}
                      primary
                      onClick={() => {
                        this.setState({
                          stepIndex: stepIndex + 1,
                          finished: stepIndex >= 1,
                        });
                      }}
                    />
                  </Cell>
                </Grid>
              </div>
            )}
          </StepContent>
        </StepperSection>
      </div>
    );
  }

  handleNext() {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  handleRoleChange(event, index, value) {
    this.setState({ roleValue: value });
  }

  handleAdminChange(event, index, value) {
    this.setState({ adminValue: value });
  }

  handleOrganizationChange(event, index, value) {
    this.setState({ organizationValue: value });
  }

  handleCareManagerChange(event, index, value) {
    this.setState({ careManagerValue: value });
  }

  handleCareCoordinatorChange(event, index, value) {
    this.setState({ careCoordinatorValue: value });
  }

  handlePatientChange(event, index, value) {
    this.setState({ patientValue: value });
  }

  handleNavigateTo() {
    const linkTo = getLinkUrlByRole(this.state.roleValue);
    this.props.history.push(linkTo);
  }

  render() {
    const { finished, stepIndex } = this.state;
    return (
      <div>
        {this.getStepContentBasedOnRole(finished, stepIndex)}
      </div>
    );
  }
}

WorkspaceSelection.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default WorkspaceSelection;
