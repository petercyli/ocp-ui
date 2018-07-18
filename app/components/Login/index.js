/**
 *
 * Login
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import CardHeader from 'components/CardHeader';
import TextField from 'components/TextField';
import PublicHeader from 'components/PublicHeader';
import StyledRaisedButton from 'components/StyledRaisedButton';
import LoginStyledCard from './LoginStyledCard';
import LoginFieldGrid from './LoginFieldGrid';
import LoginButtonCell from './LoginButtonCell';
import messages from './messages';

function Login(props) {
  const { onLogin } = props;

  return (
    <div>
      <Grid
        columns={3}
        rows={'120px 1fr 120px'}
        areas={[
          'header header header',
          'leftSide content rightSide',
          'footer footer footer',
        ]}
      >
        <Cell area="header">
          <PublicHeader />
        </Cell>
        <Cell area="leftSide" />
        <Cell area="rightSide" />
        <Cell area="content" center>
          <LoginStyledCard>
            <CardHeader title={<FormattedMessage {...messages.title} />} />
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
                    <LoginFieldGrid
                      columns={1}
                      rows="120px 120px 45px 100px"
                      areas={[
                        'username',
                        'password',
                        'forgotLink',
                        'loginButton',
                      ]}
                    >
                      <Cell>
                        <TextField
                          name="username"
                          hintText={<FormattedMessage {...messages.hintText.username} />}
                          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.username} />}
                          fullWidth
                        />
                      </Cell>
                      <Cell>
                        <TextField
                          name="password"
                          type="password"
                          hintText={<FormattedMessage {...messages.hintText.password} />}
                          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.password} />}
                          fullWidth
                        />
                      </Cell>
                      <Cell>
                        <Link to="/ocp-ui/user-accounts" target="_blank">
                          <FormattedMessage {...messages.viewUserAccounts} />
                        </Link>
                      </Cell>
                      <LoginButtonCell>
                        <StyledRaisedButton
                          type="submit"
                          fullWidth
                          disabled={!dirty || isSubmitting || !isValid}
                        >{isSubmitting ?
                          <FormattedMessage {...messages.authenticatingButton} /> :
                          <FormattedMessage {...messages.loginButton} />}
                        </StyledRaisedButton>
                      </LoginButtonCell>
                    </LoginFieldGrid>
                  </Form>
                );
              }}
            />
          </LoginStyledCard>
        </Cell>
        <Cell area="footer" />
      </Grid>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
