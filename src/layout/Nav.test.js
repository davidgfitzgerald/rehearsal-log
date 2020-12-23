import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';

describe("Nav", () => {
  it('should render a nav', function () {
    const appWrapper = shallow(<Nav/>)
    expect(appWrapper.find('nav').length).toEqual(1)
  });

})

