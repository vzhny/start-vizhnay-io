import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Link from './Link';

const mockProps = {
  name: 'Test',
  url: 'https://test.test',
  removeLink() {
    return;
  },
};

const wrapper = shallow(<Link name={mockProps.name} url={mockProps.url} removeLink={mockProps.removeLink} />);

describe('The Link component', () => {
  it('should receive the correct props', () => {
    const anchor = wrapper.childAt(0).props();
    expect(anchor.children).toEqual(mockProps.name);
    expect(anchor.href).toEqual(mockProps.url);

    const span = wrapper.childAt(1).props();
    expect(span.onClick).toEqual(mockProps.removeLink);
  });
});
