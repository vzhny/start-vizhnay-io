import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Backdrop from './Backdrop';

const mockProps = {
  hideModal() {
    return;
  },
};

const wrapper = shallow(<Backdrop clicked={mockProps.hideModal} />);

describe('The Backdrop component', () => {
  it('should be the correct element type', () => {
    expect(wrapper.type()).toBe('div');
  });

  it('should receive the correct prop', () => {
    expect(wrapper.props().onClick).toEqual(mockProps.hideModal);
  });
});
