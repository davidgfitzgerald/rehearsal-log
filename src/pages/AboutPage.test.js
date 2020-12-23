import React from 'react';
import { shallow } from 'enzyme';
import AboutPage from "./AboutPage";

describe("About", () => {
  it('should render a div', function () {
    const appWrapper = shallow(<AboutPage/>)
    expect(appWrapper.find('div').length).toEqual(1)
  });

})

