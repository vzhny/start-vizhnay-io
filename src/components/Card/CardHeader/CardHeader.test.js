import React from 'react';
import { shallow } from 'enzyme';

import CardHeader from './CardHeader';

const mockProps = {
  title: 'Test',
};

const wrapper = shallow(<CardHeader title={mockProps.title} />);

describe('The CardHeader component', () => {
  it('should be the correct element type', () => {
    expect(wrapper.type()).toBe('h1');
  });

  it('should display the correct h1 title text', () => {
    expect(wrapper.text()).toEqual(mockProps.title);
  });
});
