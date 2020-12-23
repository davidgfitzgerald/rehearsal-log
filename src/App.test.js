import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';
import {MemoryRouter} from "react-router";

describe("App", () => {

  let appWrapper;
  beforeEach(() => {
    appWrapper = shallow(<App/>)
  })

  it('should render a div', function () {
    expect(appWrapper.find('div').length).toEqual(1)
  });

  it('should render the Nav', function () {
    expect(appWrapper.find('Nav').length).toEqual(1)
  });

  it('should only render the Exercises page by default', function () {
    appWrapper = mount(<MemoryRouter initialEntries={['/']}>
      <App/>
    </MemoryRouter>)
    expect(appWrapper.find('ExercisesPage').length).toEqual(1)
  });

  it('should render the Practices page', function () {
    expect(appWrapper.find('PracticesPage').length).toEqual(1)
  });

  it('should render the About page', function () {
    expect(appWrapper.find('AboutPage').length).toEqual(1)
  });

})

