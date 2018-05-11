import React from 'react';
import PropTypes from 'prop-types';
import { CARE_COORDINATOR_ROLE_CODE, PATIENT_ROLE_CODE } from 'containers/App/constants';
import PanelToolbar from 'components/PanelToolbar';
import InfoSection from 'components/InfoSection';
import StyledText from 'components/StyledText';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';

class FromPractitionerActors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onSearch, flattenPractitionerData, practitionersData } = this.props;
    return (
      <div>
        <StyledText fontWeight="700">Practitioners</StyledText>
        <PanelToolbar
          showToDoSpecificFilters={false}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon={false}
          sticky={false}
          allowedAddNewItemRoles={[PATIENT_ROLE_CODE, CARE_COORDINATOR_ROLE_CODE]}
          onSearch={onSearch}
        />
        <InfoSection margin="0 0 10px 0">
          {practitionersData.data && practitionersData.data.map((practitioner) => {
            const flattenedPractitioner = flattenPractitionerData(practitioner);
            const { logicalId, name } = flattenedPractitioner;
            return (
              <div key={logicalId}>
                {name}
              </div>
            );
          })}
          <CenterAlignedUltimatePagination
            currentPage={practitionersData.currentPage}
            totalPages={practitionersData.totalNumberOfPages}
            onChange={practitionersData.handleChangePage}
          />
        </InfoSection>
      </div>
    );
  }
}

FromPractitionerActors.propTypes = {
  onSearch: PropTypes.func.isRequired,
  flattenPractitionerData: PropTypes.func.isRequired,
  practitionersData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handleChangePage: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      identifiers: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        oid: PropTypes.string,
        value: PropTypes.string,
        priority: PropTypes.number,
        display: PropTypes.string,
      })),
      active: PropTypes.bool,
      name: PropTypes.array,
      addresses: PropTypes.arrayOf(PropTypes.shape({
        line1: PropTypes.string,
        line2: PropTypes.string,
        city: PropTypes.string,
        stateCode: PropTypes.string,
        postalCode: PropTypes.string,
        countryCode: PropTypes.string,
        use: PropTypes.string,
      })),
      telecoms: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        value: PropTypes.string,
        use: PropTypes.string,
      })),
      practitionerRoles: PropTypes.array,
    })).isRequired,
  }),
};

export default FromPractitionerActors;
