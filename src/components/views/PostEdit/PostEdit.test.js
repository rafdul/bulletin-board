import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const posts = {
      id: '4fj',
      title: 'Lorem ipsum 4',
      content: 'Nulla ac turpis rutrum pede sit amet sapien eu odio.',
      datePublication: '2021.01.23',
      dateLastUpdate: '2021.04.15',
      email: 'manuela@lorem.com',
      status: 'published',
      image: 'https://placeimg.com/640/480/tech/4',
      price: '88',
      phone: '432543654',
      location: 'Paris',
    };

    const component = shallow(<PostEditComponent postById={posts}/>);
    expect(component).toBeTruthy();
  });
});
