import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import PatientsPageStyledCell from '../PatientsPageStyledCell';

configure({ adapter: new Adapter() });

describe('<PatientsPageStyledCell />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<PatientsPageStyledCell>{children}</PatientsPageStyledCell>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<PatientsPageStyledCell>{children}</PatientsPageStyledCell>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should have styles', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<PatientsPageStyledCell>{children}</PatientsPageStyledCell>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('background-color', '#fff');
      expect(renderedComponent).toHaveStyleRule('color', 'rgb(51, 51, 51)');
      expect(renderedComponent).toHaveStyleRule('border-radius', '5px');
      expect(renderedComponent).toHaveStyleRule('padding', '3px');
      expect(renderedComponent).toHaveStyleRule('font-size', '100%');
    });
  });
});
