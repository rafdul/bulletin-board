import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

describe('Component Homepage', () => {
  it('should render without crashing', () => {

    const posts = [
      {
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
      },
      {
        id: '343434',
        title: 'Lorem ipsum 33',
        content: 'Nulla ac turpis rutrum pede sit amet sapien eu odio.',
        datePublication: '2021.03.23',
        dateLastUpdate: '2021.04.15',
        email: 'manuela@lorem.com',
        status: 'published',
        image: 'https://placeimg.com/640/480/tech/4',
        price: '11',
        phone: '411113654',
        location: 'london',
      },
    ];

    const fetchPublishedPosts = function(){};
    const user = {active: true};

    const component = shallow(<HomepageComponent fetchPublishedPosts={fetchPublishedPosts} user={user} postsAll={posts}/>);
    expect(component).toBeTruthy();
  });
});
