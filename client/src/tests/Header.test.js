import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from './testUtils';



const setup = () => {
  return shallow(<Header />);
}

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'header-component');

  expect(component.length).toBe(1);
});