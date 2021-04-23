import React from 'react';
import { shallow } from 'enzyme';
import { PostAddComponent } from './PostAdd';

describe('Component PostAdd', () => {
  it('should render without crashing', () => {
    const user = {active: true};

    const component = shallow(<PostAddComponent user={user}/>);
    expect(component).toBeTruthy();
  });
});
