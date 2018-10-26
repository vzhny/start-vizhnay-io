import React from 'react';
import { shallow, mount, render } from 'enzyme';

import FloatingActionButton from './FloatingActionButton';

const mockProps = {
  showModal() {
    return;
  },
};

const wrapper = shallow(<FloatingActionButton clicked={mockProps.showModal} />);

describe('The FloatingActionButton component', () => {
  it('should be the correct element type', () => {
    expect(wrapper.type()).toBe('button');
  });

  it('should receive the correct prop', () => {
    expect(wrapper.props().onClick).toEqual(mockProps.showModal);
  });
});
