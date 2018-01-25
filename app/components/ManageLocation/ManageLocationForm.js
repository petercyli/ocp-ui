import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import { MenuItem, RaisedButton } from 'material-ui';
import uniqueId from 'lodash/uniqueId';
import styles from './styles.css';
import messages from './messages';

import TextField from '../TextField';
import SelectField from '../SelectField';


// Material UI Styles
const locationNameTextFieldStyle = { width: '150px' };
const floatingLabelStyle = { fontFamily: 'Roboto, sans-serif' };

export const SEARCH_BY_NAME = 'name';
export const SEARCH_BY_ID = 'logicalId';

function ManageLocationForm(props) {
  const {
    uspsStates,
    locationPhysicalTypes,
    addressUses,
    locationStatuses,
    addressTypes,
    identifierSystems,
    telecomSystems,
    telecomUses,
    isSubmitting,
    dirty,
    isValid,
  } = props;
  return (
    <Form>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <TextField
            name="name"
            style={locationNameTextFieldStyle}
            floatingLabelStyle={floatingLabelStyle}
            hintText={<FormattedMessage {...messages.locationNameHintText} />}
            floatingLabelText={<FormattedMessage {...messages.locationNameFloatingLabelText} />}
          />
        </div>
        <div className={styles.gridItem}>
          <SelectField
            name="status"
            floatingLabelText={<FormattedMessage {...messages.statusFloatingLabelText} />}
          >
            {locationStatuses && locationStatuses.map((locationStatuse) => (
              <MenuItem key={uniqueId()} value={locationStatuse.code} primaryText={locationStatuse.display} />
            ))}
          </SelectField>
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <SelectField
            name="physicalType"
            floatingLabelText={<FormattedMessage {...messages.locationPhysicalType} />}
          >
            {locationPhysicalTypes && locationPhysicalTypes.map((locationType) => (
              <MenuItem key={uniqueId()} value={locationType.display} primaryText={locationType.display} />
            ))}
          </SelectField>
        </div>
        <div className={styles.gridItem}>
          <TextField
            name="LocationPartOf"
            style={locationNameTextFieldStyle}
            floatingLabelStyle={floatingLabelStyle}
            hintText={<FormattedMessage {...messages.locationPartOfHintText} />}
            floatingLabelText={<FormattedMessage {...messages.locationPartOfFloatingLabelText} />}
          />
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <SelectField
            name="identifierSystem"
            floatingLabelText={<FormattedMessage {...messages.identifierSystemTypeFloatingLabelText} />}
          >
            {identifierSystems && identifierSystems.map((identifierSystem) => (
              <MenuItem key={uniqueId()} value={identifierSystem.display} primaryText={identifierSystem.display} />
            ))}
          </SelectField>
        </div>
        <div className={styles.gridItem}>
          <TextField
            name="identifierValue"
            style={locationNameTextFieldStyle}
            floatingLabelStyle={floatingLabelStyle}
            hintText={<FormattedMessage {...messages.identifierValueHintText} />}
            floatingLabelText={<FormattedMessage {...messages.identifierVlueFloatingLabelText} />}
          />
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <SelectField
            name="telecomSystem"
            autoWidth
            floatingLabelText={<FormattedMessage {...messages.telecomSystemTypeFloatingLabelText} />}
          >
            {telecomSystems && telecomSystems.map((telecomSystem) => (
              <MenuItem value={telecomSystem.code} primaryText={telecomSystem.display} key={uniqueId()} />
            ))}
          </SelectField>
        </div>
        <div className={styles.gridItem}>
          <SelectField
            name="telecomUse"
            autoWidth
            floatingLabelText={<FormattedMessage {...messages.telecomUseFloatingLabelText} />}
          >
            {telecomUses && telecomUses.map((telecomUse) => (
              <MenuItem value={telecomUse.code} primaryText={telecomUse.display} key={uniqueId()} />
            ))}
          </SelectField>
        </div>
        <div className={styles.gridItem}>
          <TextField
            name="telecomSystemValue"
            style={locationNameTextFieldStyle}
            floatingLabelStyle={floatingLabelStyle}
            hintText={<FormattedMessage {...messages.telecomSystemValueHintText} />}
            floatingLabelText={<FormattedMessage {...messages.telecomSystemValueFloatingLabelText} />}
          />
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <SelectField
            name="addressType"
            floatingLabelText={<FormattedMessage {...messages.addressTypesFloatingLabelText} />}
          >
            {addressTypes && addressTypes.map((addressType) => (
              <MenuItem key={uniqueId()} value={addressType.code} primaryText={addressType.display} />
            ))}
          </SelectField>
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <TextField
            name="line1"
            style={locationNameTextFieldStyle}
            floatingLabelStyle={floatingLabelStyle}
            hintText={<FormattedMessage {...messages.address1HintText} />}
            floatingLabelText={<FormattedMessage {...messages.address1FloatingLabelText} />}
          />
        </div>
        <div className={styles.gridItem}>
          <TextField
            name="line2"
            style={locationNameTextFieldStyle}
            floatingLabelStyle={floatingLabelStyle}
            hintText={<FormattedMessage {...messages.address2HintText} />}
            floatingLabelText={<FormattedMessage {...messages.address2FloatingLabelText} />}
          />
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <TextField
            name="city"
            style={locationNameTextFieldStyle}
            floatingLabelStyle={floatingLabelStyle}
            hintText={<FormattedMessage {...messages.cityHintText} />}
            floatingLabelText={<FormattedMessage {...messages.cityFloatingLabelText} />}
          />
        </div>
        <div className={styles.gridItem}>
          <SelectField
            name="stateCode"
            floatingLabelText={<FormattedMessage {...messages.statesFloatingLabelText} />}
          >
            {uspsStates && uspsStates.map((uspsState) => (
              <MenuItem key={uniqueId()} value={uspsState.code} primaryText={uspsState.display} />
            ))}
          </SelectField>
        </div>
        <div className={styles.gridItem}>
          <TextField
            name="postalCode"
            style={locationNameTextFieldStyle}
            floatingLabelStyle={floatingLabelStyle}
            hintText={<FormattedMessage {...messages.postalCodeHintText} />}
            floatingLabelText={<FormattedMessage {...messages.postalCodeFloatingLabelText} />}
          />
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <SelectField
            name="use"
            floatingLabelText={<FormattedMessage {...messages.addressUseFloatingLabelText} />}
          >
            {addressUses && addressUses.map((addressUse) => (
              <MenuItem key={uniqueId()} value={addressUse.code} primaryText={addressUse.display} />
            ))}
          </SelectField>
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <RaisedButton
            label="Save"
            type="submit"
            primary
            disabled={!dirty || isSubmitting || !isValid}
          ></RaisedButton>
        </div>
      </div>
    </Form>
  );
}

ManageLocationForm.propTypes = {
  uspsStates: PropTypes.array.isRequired,
  locationPhysicalTypes: PropTypes.array.isRequired,
  locationStatuses: PropTypes.array.isRequired,
  addressTypes: PropTypes.array.isRequired,
  telecomUses: PropTypes.array.isRequired,
  telecomSystems: PropTypes.array.isRequired,
  addressUses: PropTypes.array.isRequired,
  identifierSystems: PropTypes.array.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default ManageLocationForm;
