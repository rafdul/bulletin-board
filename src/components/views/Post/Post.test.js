import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';

describe('Component Post', () => {
  it('should render without crashing', () => {

    const fetchOnePost = function(){};

    const component = shallow(<PostComponent fetchOnePost={fetchOnePost}/>);
    expect(component).toBeTruthy();
  });
});
