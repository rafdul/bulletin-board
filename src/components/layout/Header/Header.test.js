import React from 'react';
import { shallow } from 'enzyme';
import { HeaderComponent } from './Header';

describe('Component Header', () => {
  it('should render without crashing', () => {
    const user = {active: true};

    const component = shallow(<HeaderComponent user={user}/>);
    expect(component).toBeTruthy();
  });
});
