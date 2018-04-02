import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { MenuItem, RaisedButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { teal500, white } from 'material-ui/styles/colors';
import uniqueId from 'lodash/uniqueId';
import { Cell } from 'styled-css-grid';
import TextField from 'components/TextField';
import StyledFormikCheckbox from 'components/StyledFormikCheckbox';
import SelectField from 'components/SelectField';
import SearchSection from './SearchSection';
import SearchHeader from './SearchHeader';
import SearchContainerGrid from './SearchContainerGrid';
import SearchButtonContainerGrid from './SearchButtonContainerGrid';
import messages from './messages';

function SearchBarForm(props) {
  const { isSubmitting, dirty, isValid, searchField: { searchTypes, searchValueHintText }, showToDoSpecificFilters } = props;
  return (
    <Form>
      <SearchSection>
        <SearchHeader>
          <ActionSearch color={'#336666'} />
          <FormattedMessage {...messages.searchHeader} />
        </SearchHeader>
        <SearchContainerGrid gap="5px" columns="250px 300px">
          <SelectField
            fullWidth
            name="searchType"
          >
            {searchTypes && searchTypes.map((searchType) =>
              <MenuItem key={uniqueId()} value={searchType.value} primaryText={searchType.display} />,
            )}
          </SelectField>
          <TextField
            fullWidth
            name="searchValue"
            hintText={searchValueHintText}
          />
        </SearchContainerGrid>
        <SearchContainerGrid gap="5px" columns="60px 140px 140px 140px">
          {!showToDoSpecificFilters &&
          <div>
            <FormattedMessage {...messages.filterLabel} />
          </div>
          }
          {!showToDoSpecificFilters &&
          <StyledFormikCheckbox
            name="showInactive"
            label={<FormattedMessage {...messages.includeInactive} />}
          />
          }
          { showToDoSpecificFilters &&
          <Cell>
            <FormattedMessage {...messages.filterLabel} />
          </Cell>
          }
          {showToDoSpecificFilters &&
          <Cell>
            <StyledFormikCheckbox
              name="dueToday"
              label={<FormattedMessage {...messages.status.dueToday} />}
            />
          </Cell>
          }
          {showToDoSpecificFilters &&
          <Cell>
            <StyledFormikCheckbox
              name="upcoming"
              label={<FormattedMessage {...messages.status.upcoming} />}
            />
          </Cell>
          }
          {showToDoSpecificFilters &&
          <Cell>
            <StyledFormikCheckbox
              name="overDue"
              label={<FormattedMessage {...messages.status.overDue} />}
            />
          </Cell>
          }
        </SearchContainerGrid>

        <SearchButtonContainerGrid gap="5px" columns="120px 1fr">
          <RaisedButton
            fullWidth
            label="Search"
            backgroundColor={teal500}
            labelColor={white}
            type="submit"
            disabled={!dirty || isSubmitting || !isValid}
          />
        </SearchButtonContainerGrid>
      </SearchSection>
    </Form>
  );
}

SearchBarForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  showToDoSpecificFilters: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
  searchField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })).isRequired,
    searchValueHintText: PropTypes.node.isRequired,
  }).isRequired,
};

export default SearchBarForm;
