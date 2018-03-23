/**
 *
 * ManageLocation
 *
 */

import React from 'react';
import { isUndefined } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import yup from 'yup';

import Util from 'utils/Util';
import { POSTAL_CODE_PATTERN } from 'containers/App/constants';
import { TEXT_MIN_LENGTH } from './constants';
import messages from './messages';
import ManageLocationForm from './ManageLocationForm';

function ManageLocation(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const postalCodePattern = new RegExp(POSTAL_CODE_PATTERN);
  const { onSave, onCancel } = props;
  return (
    <div>
      <Formik
        initialValues={setFormData(props.location)}
        onSubmit={(values, actions) => {
          onSave(values);
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          name: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          managingLocationLogicalId: yup.string()
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          identifierSystem: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierValue: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          line1: yup.string()
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          city: yup.string()
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          postalCode: yup.string()
            .matches(postalCodePattern, (<FormattedMessage {...messages.validation.postalCode} />)),
        })}
        render={(formikProps) => <ManageLocationForm {...formikProps} {...props} onCancel={onCancel} />}
      />
    </div>
  );
}

ManageLocation.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default ManageLocation;


function setFormData(location) {
  let formData = null;
  if (!isEmpty(location)) {
    formData = merge(
      mapLocationToFiledObject(location, 'name'),
      mapLocationToFiledObject(location, 'status'),
      mapLocationToFiledObject(location, 'physicalType'),
      mapLocationToFiledObject(location, 'managingLocationLogicalId'),
      mapLocationToAddressFields(location),
      mapLocationToIdentifierFields(location),
      mapLocationToTelecomFields(location));
  }
  return Util.pickByIdentity(formData);
}

function mapLocationToFiledObject(location, fieldName) {
  const fieldObject = {};
  if (!isUndefined(location[fieldName])) {
    fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(location[fieldName]);
  }
  return fieldObject;
}

function mapLocationToAddressFields(location) {
  let fieldObject = {};
  if (!isUndefined(location.address)) {
    fieldObject = {
      line1: Util.setEmptyStringWhenUndefined(location.address.line1),
      line2: Util.setEmptyStringWhenUndefined(location.address.line2),
      city: Util.setEmptyStringWhenUndefined(location.address.city),
      stateCode: Util.setEmptyStringWhenUndefined(location.address.stateCode),
      postalCode: Util.setEmptyStringWhenUndefined(location.address.postalCode),
      countryCode: Util.setEmptyStringWhenUndefined(location.address.countryCode),
      use: Util.setEmptyStringWhenUndefined(location.address.use),
    };
  }
  return fieldObject;
}


function mapLocationToIdentifierFields(location) {
  let fieldObject = {};
  if (location.identifiers && location.identifiers.length > 0) {
    fieldObject = {
      identifierSystem: Util.setEmptyStringWhenUndefined(location.identifiers[0].system),
      identifierValue: Util.setEmptyStringWhenUndefined(location.identifiers[0].value),
    };
  }
  return fieldObject;
}

function mapLocationToTelecomFields(location) {
  return {
    telecoms: location.telecoms,
  };
}
