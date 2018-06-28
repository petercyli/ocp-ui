/**
 *
 * PermissionAssignments
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { FieldArray } from 'formik';
import Dialog from 'material-ui/Dialog';
import PermissionAssignmentTable from 'components/PermissionAssignmentTable';
import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import teal from 'material-ui-next/colors/teal';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import AddAssignRolesForm from 'components/AddAssignRolesForm';
import { makeSelectUsers } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getUsers, initializePermissionAssignment } from './actions';

export class PermissionAssignments extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      editingAssignRoles: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditAssignRoles = this.handleEditAssignRoles.bind(this);
  }
  componentWillMount() {
    this.props.initializePermissionAssignment();
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleOpenDialog() {
    this.setState({ isDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isDialogOpen: false,
      editingAssignRoles: null,
    });
  }

  handleEditAssignRoles(index, permissionGroup) {
    this.setState((prevState) => ({
      isDialogOpen: !prevState.isDialogOpen,
      editingAssignRoles: { index, permissionGroup },
    }));
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <div>
          <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
            <StyledAddCircleIcon color={teal['500']} />
            <FormattedMessage {...messages.assignRoles} />
          </AddNewItemButton>
        </div>
        <FieldArray
          name="assignRoles"
          render={() => (
            <div>
              <Dialog
                modal={false}
                open={this.state.isDialogOpen}
                onRequestClose={this.handleCloseDialog}
                title="Assign Roles"
              >
                <AddAssignRolesForm
                  initialValues={this.state.editingAssignRoles}
                  handleCloseDialog={this.handleCloseDialog}
                  organization={{ identifiers: { name: 'test' } }}
                />
              </Dialog>
            </div>
          )}
        />
        <PermissionAssignmentTable users={users} />
      </div>
    );
  }
}

PermissionAssignments.propTypes = {
  getUsers: PropTypes.func.isRequired,
  initializePermissionAssignment: PropTypes.func.isRequired,
  users: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsers()),
    initializePermissionAssignment: () => dispatch(initializePermissionAssignment()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'permissionAssignments', reducer });
const withSaga = injectSaga({ key: 'permissionAssignments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PermissionAssignments);
