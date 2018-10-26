import React from 'react';
import { shallow } from 'enzyme';

import CardBody from './CardBody';

const mockChildren = <p>Hello!</p>;

const wrapper = shallow(<CardBody>{mockChildren}</CardBody>);

describe('The CardBody component', () => {
  it('should be the correct element type', () => {
    expect(wrapper.type()).toBe('div');
  });

  it('should display the correct props.children', () => {
    expect(wrapper.props().children).toEqual(mockChildren);
  });
});
