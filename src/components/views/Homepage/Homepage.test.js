import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

describe('Component Homepage', () => {
  it('should render without crashing', () => {

    const fetchPublishedPosts = function(){};

    const component = shallow(<HomepageComponent fetchPublishedPosts={fetchPublishedPosts}/>);
    expect(component).toBeTruthy();
  });
});
