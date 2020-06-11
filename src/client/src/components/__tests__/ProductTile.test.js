import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ProductTile from '../ProductTile';

it('ProductTile renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductTile />, div);
});
 
it('renders without crashing', () => {
  shallow(<ProductTile />);
});

it('renders welcome message', () => {
  const wrapper = shallow(<ProductTile />);
  // console.log('wrapper', wrapper.debug())
  const visitorShortcutsWrapper = wrapper.find('.productCard');
  expect(visitorShortcutsWrapper.length).toEqual(1);
});
