import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import StyledIconMenu from '../index';
import StyledMenuItem from '../../StyledMenuItem';
import StyledIconButton from '../../StyledIconButton';

configure({ adapter: new Adapter() });

describe('<StyledIconMenu />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const primaryText = 'primaryText';

      // Act
      const renderedComponent = shallow((
        <StyledIconMenu iconButtonElement={<StyledIconButton><NavigationMenu /></StyledIconButton>}>
          <StyledMenuItem primaryText={primaryText} />
        </StyledIconMenu>));

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('style tests', () => {
    it('should have material-ui props for styling', () => {
      // Arrange
      const expectedProps = {
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        targetOrigin: { horizontal: 'right', vertical: 'top' },
      };
      const primaryText = 'primaryText';

      // Act
      const renderedComponent = shallow((
        <StyledIconMenu iconButtonElement={<StyledIconButton><NavigationMenu /></StyledIconButton>}>
          <StyledMenuItem primaryText={primaryText} />
        </StyledIconMenu>));

      // Assert
      expect(renderedComponent.props().anchorOrigin).toEqual(expectedProps.anchorOrigin);
      expect(renderedComponent.props().targetOrigin).toEqual(expectedProps.targetOrigin);
    });
  });
});