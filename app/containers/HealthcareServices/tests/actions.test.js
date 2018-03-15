import {
  GET_HEALTHCARE_SERVICES_BY_LOCATION,
  GET_HEALTHCARE_SERVICES_BY_ORGANIZATION,
  GET_HEALTHCARE_SERVICES_ERROR,
  GET_HEALTHCARE_SERVICES_SUCCESS,
  INITIALIZE_HEALTHCARE_SERVICES,
} from '../constants';
import {
  getHealthcareServicesByLocation,
  getHealthcareServicesByOrganization,
  getHealthcareServicesError,
  getHealthcareServicesSuccess,
  initializeHealthcareServices,
} from '../actions';

describe('HealthcareServices actions', () => {
  describe('Initialize healthcare services Action', () => {
    it('has a type of INITIALIZE_HEALTHCARE_SERVICES', () => {
      const expected = {
        type: INITIALIZE_HEALTHCARE_SERVICES,
      };

      // Act
      const action = initializeHealthcareServices();

      // Assert
      expect(action).toEqual(expected);
    });
  });

  describe('Get Healthcare Services by Organization Action', () => {
    it('has a type of GET_HEALTHCARE_SERVICES_BY_ORGANIZATION', () => {
      // Arrange
      const currentPage = 1;
      const includeInactive = true;
      const expected = {
        type: GET_HEALTHCARE_SERVICES_BY_ORGANIZATION,
        currentPage,
        includeInactive,
      };

      // Act
      const action = getHealthcareServicesByOrganization(currentPage, includeInactive);

      // Assert
      expect(action).toEqual(expected);
    });
  });

  describe('Get Healthcare Services by Location Action', () => {
    it('has a type of GET_HEALTHCARE_SERVICES_BY_LOCATION', () => {
      // Arrange
      const locationId = 'locationId';
      const locationName = 'locationName';
      const currentPage = 1;
      const includeInactive = true;
      const expected = {
        type: GET_HEALTHCARE_SERVICES_BY_LOCATION,
        locationId,
        locationName,
        currentPage,
        includeInactive,
      };

      // Act
      const action = getHealthcareServicesByLocation(locationId, locationName, currentPage, includeInactive);

      // Assert
      expect(action).toEqual(expected);
    });
  });

  describe('Get Healthcare Services Success Action', () => {
    it('has a type of GET_HEALTHCARE_SERVICES_SUCCESS', () => {
      // Arrange
      const healthcareServices = {};
      const expected = {
        type: GET_HEALTHCARE_SERVICES_SUCCESS,
        healthcareServices,
      };

      // Act
      const action = getHealthcareServicesSuccess(healthcareServices);

      // Assert
      expect(action).toEqual(expected);
    });
  });

  describe('Get Healthcare Services Error Action', () => {
    it('has a type of GET_HEALTHCARE_SERVICES_ERROR', () => {
      // Arrange
      const error = new Error();
      const expected = {
        type: GET_HEALTHCARE_SERVICES_ERROR,
        error,
      };

      // Act
      const action = getHealthcareServicesError(error);

      // Assert
      expect(action).toEqual(expected);
    });
  });
});
