/**
 *
 * SmartAppLauncher
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectConfig } from 'containers/App/selectors';
import makeSelectContext from 'containers/App/contextSelectors';
import { CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE } from 'containers/App/constants';
import SmartApps from 'components/SmartApps';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import { makeSelectSmartApps, makeSelectSmartAppShortcuts } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { createLaunch, getAppShortcuts, getClients } from './actions';


export class SmartAppLauncher extends React.Component {
  componentDidMount() {
    this.props.getClients();
    this.props.getAppShortcuts();
  }

  render() {
    const { appShortcuts, config, smartApps } = this.props;
    return (
      <ShowHideWrapper allowedRoles={[CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE]}>
        <SmartApps
          smartApps={smartApps}
          config={config}
          appShortcuts={appShortcuts}
          onCreateLaunch={this.props.createLaunch}
        />
      </ShowHideWrapper>
    );
  }
}

SmartAppLauncher.propTypes = {
  getClients: PropTypes.func.isRequired,
  getAppShortcuts: PropTypes.func.isRequired,
  createLaunch: PropTypes.func.isRequired,
  smartApps: PropTypes.arrayOf(PropTypes.shape({
    clientId: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    appIcon: PropTypes.string,
  })),
  config: PropTypes.shape({
    oauth2: PropTypes.shape({
      authorizationServerEndpoint: PropTypes.string.isRequired,
    }).isRequired,
  }),
  appShortcuts: PropTypes.shape({
    clientIds: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  smartApps: makeSelectSmartApps(),
  appShortcuts: makeSelectSmartAppShortcuts(),
  context: makeSelectContext(),
  config: makeSelectConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    getClients: () => dispatch(getClients()),
    getAppShortcuts: () => dispatch(getAppShortcuts()),
    createLaunch: (clientId) => dispatch(createLaunch(clientId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'smartAppLauncher', reducer });
const withSaga = injectSaga({ key: 'smartAppLauncher', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SmartAppLauncher);
