/**
 *
 * PractitionerWorkspacePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPractitionerWorkspacePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class PractitionerWorkspacePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>PractitionerWorkspacePage</title>
          <meta name="description" content="Practitioner workspace page of Omnibus Care Plan application" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

PractitionerWorkspacePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  practitionerworkspacepage: makeSelectPractitionerWorkspacePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitionerWorkspacePage', reducer });
const withSaga = injectSaga({ key: 'practitionerWorkspacePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PractitionerWorkspacePage);
