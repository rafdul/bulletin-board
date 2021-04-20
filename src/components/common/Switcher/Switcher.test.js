import React from 'react';
import { shallow } from 'enzyme';
import { Switcher } from './Switcher';

describe('Component Switcher', () => {
  it('should render without crashing', () => {
    const component = shallow(<Switcher />);
    expect(component).toBeTruthy();
  });
});
