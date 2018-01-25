import { createSelector } from 'reselect';
import {
  ADDRESSTYPE,
  ADDRESSUSE,
  LOCATIONIDENTIFIERSYSTEM,
  LOCATIONPHYSICALTYPE,
  LOCATIONSTATUS,
  ORGANIZATIONIDENTIFIERSYSTEM,
  ORGANIZATIONSTATUS,
  TELECOMSYSTEM,
  TELECOMUSE,
  USPSSTATES,
  PATIENTIDENTIFIERSYSTEM, ADMINISTRATIVEGENDER, LANGUAGE,
  USCOREBIRTHSEX, USCOREETHNICITY, USCORERACE,
} from './constants';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS(),
);

const makeSelectUspsStates = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(USPSSTATES).toJS(),
);

const makeSelectLocationPhysicalTypes = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(LOCATIONPHYSICALTYPE).toJS(),
);

const makeSelectLocationStatuses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(LOCATIONSTATUS).toJS(),
);

const makeSelectAddressTypes = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(ADDRESSTYPE).toJS(),
);

const makeSelectAddressUses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(ADDRESSUSE).toJS(),
);

const makeSelectLocationIdentifierSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(LOCATIONIDENTIFIERSYSTEM).toJS(),
);

const makeSelectOrganizationIdentifierSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(ORGANIZATIONIDENTIFIERSYSTEM).toJS(),
);

const makeSelectOrganizationStatuses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(ORGANIZATIONSTATUS).toJS(),
);

const makeSelectTelecomSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(TELECOMSYSTEM).toJS(),
);

const makeSelectTelecomUses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(TELECOMUSE).toJS(),
);

const makeSelectLookups = (name) => createSelector(
  selectGlobal,
  (globalState) => globalState.get(name).toJS(),
);

const makeSelectPatientIdentifierSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(PATIENTIDENTIFIERSYSTEM).toJS()
);

const makeSelectAdministrativeGenders = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(ADMINISTRATIVEGENDER).toJS()
);

const makeSelectUsCoreRaces = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(USCORERACE).toJS()
);

const makeSelectUsCoreEthnicities = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(USCOREETHNICITY).toJS()
);

const makeSelectUsCoreBirthSexes = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(USCOREBIRTHSEX).toJS()
);

const makeSelectLanguages = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(LANGUAGE).toJS()
);


export {
  makeSelectLocation,
  makeSelectUspsStates,
  makeSelectLocationPhysicalTypes,
  makeSelectLocationStatuses,
  makeSelectAddressTypes,
  makeSelectAddressUses,
  makeSelectLocationIdentifierSystems,
  makeSelectOrganizationIdentifierSystems,
  makeSelectOrganizationStatuses,
  makeSelectTelecomUses,
  makeSelectTelecomSystems,
  makeSelectLookups,
  makeSelectPatientIdentifierSystems,
  makeSelectAdministrativeGenders,
  makeSelectUsCoreRaces,
  makeSelectUsCoreEthnicities,
  makeSelectUsCoreBirthSexes,
  makeSelectLanguages,
};
