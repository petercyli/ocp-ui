import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';

import { EMAIL_SYSTEM, PHONE_SYSTEM } from 'utils/constants';
import { EMPTY_STRING, PHONE_PATTERN } from 'containers/App/constants';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import messages from './messages';

function AddMultipleTelecomsForm(props) {
  const phonePattern = new RegExp(PHONE_PATTERN);
  const {
    telecomSystems,
    initialValues,
    onAddTelecom,
    onRemoveTelecom,
    handleCloseDialog,
  } = props;

  return (
    <div>
      <Formik
        onSubmit={(values) => {
          if (initialValues) {
            onRemoveTelecom(initialValues.index);
          }
          onAddTelecom(values);
          handleCloseDialog();
        }}
        initialValues={{ ...(initialValues || {}).telecom }}
        validationSchema={yup.object().shape({
          system: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          value: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .when('system', {
              is: EMAIL_SYSTEM,  // alternatively: (val) => val == true
              then: yup.string().email(),
              otherwise: null,
            })
            .when('system', {
              is: PHONE_SYSTEM,  // alternatively: (val) => val == true
              then: yup
                .string()
                .matches(phonePattern, (<FormattedMessage {...messages.validation.phone} />)),
              otherwise: null,
            }),
        })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Grid columns="1fr 2fr" gap={EMPTY_STRING}>
              <Cell>
                <SelectField
                  name="system"
                  hintText={<FormattedMessage {...messages.hintText.system} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.system} />}
                  fullWidth
                >
                  {telecomSystems && telecomSystems.map((telecomSystem) => (
                    <MenuItem
                      key={telecomSystem.code}
                      value={telecomSystem.code}
                      primaryText={telecomSystem.display}
                    />))}
                </SelectField>
              </Cell>
              <Cell>
                <TextField
                  name="value"
                  hintText={<FormattedMessage {...messages.hintText.value} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.value} />}
                  fullWidth
                />
              </Cell>
              <Cell>
                <StyledRaisedButton
                  type="submit"
                  label={<FormattedMessage {...messages.saveButton} />}
                  disabled={!dirty || isSubmitting || !isValid}
                />
                <StyledFlatButton
                  type="reset"
                  label={<FormattedMessage {...messages.cancelButton} />}
                  onClick={handleCloseDialog}
                />
              </Cell>
            </Grid>
          </Form>
        )}
      />
    </div>
  );
}

AddMultipleTelecomsForm.propTypes = {
  onAddTelecom: PropTypes.func.isRequired,
  onRemoveTelecom: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number.isRequired,
    telecom: PropTypes.object.isRequired,
  }),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
};

export default AddMultipleTelecomsForm;
