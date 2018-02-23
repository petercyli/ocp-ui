/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import { teal500, white } from 'material-ui/styles/colors';

import TextField from '../TextField';
import messages from './messages';
import ocpLogo from '../../images/omnibus-care-plan-logo.png';
import styles from './styles.css';
import StyledDivider from '../StyledDivider';
import LoginStyledCard from './LoginStyledCard';
import CardHeader from '../CardHeader';
import CenterAlign from '../Align/CenterAlign';

function Login(props) {
  const { onLogin, auth: { isAuthenticating } } = props;

  return (
    <div>
      <div>
        <img className={styles.logo} src={ocpLogo} alt="ocp logo" />
      </div>
      <StyledDivider />
      <LoginStyledCard>
        <CenterAlign>
          <CardHeader title={<FormattedMessage {...messages.title} />} />
        </CenterAlign>
        <Formik
          onSubmit={(values, actions) => {
            onLogin(values, actions);
          }}
          validationSchema={yup.object().shape({
            username: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            password: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
          })}
          render={(loginFormProps) => {
            const { isSubmitting, dirty, isValid } = loginFormProps;
            return (
              <Form>
                <div className={styles.gridContainer}>
                  <div className={`${styles.gridItem} ${styles.username}`}>
                    <TextField
                      name="username"
                      hintText={<FormattedMessage {...messages.hintText.username} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.username} />}
                      fullWidth
                    />
                  </div>
                  <div className={`${styles.gridItem} ${styles.password}`}>
                    <TextField
                      name="password"
                      type="password"
                      hintText={<FormattedMessage {...messages.hintText.password} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.password} />}
                      fullWidth
                    />
                  </div>
                  <div className={`${styles.gridItem} ${styles.forgotLink}`}>
                    <FormattedMessage {...messages.forgotLink} />
                  </div>
                  <div className={`${styles.gridItem} ${styles.button}`}>
                    <RaisedButton
                      type="submit"
                      backgroundColor={teal500}
                      labelColor={white}
                      fullWidth
                      label={
                        isAuthenticating ?
                          <FormattedMessage {...messages.authenticatingButton} /> :
                          <FormattedMessage {...messages.loginButton} />
                      }
                      disabled={!dirty || isSubmitting || !isValid}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        >
        </Formik>
      </LoginStyledCard>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default Login;
