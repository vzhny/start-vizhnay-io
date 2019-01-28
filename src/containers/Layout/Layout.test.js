import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Layout from './Layout';

const mockProps = {
  clicked() {
    return;
  },
  linksUpdated() {
    return;
  },
};

describe('The Layout container', () => {
  it('should call componentDidMount', () => {
    sinon.spy(Layout.prototype, 'componentDidMount');

    const wrapper = mount(<Layout />);

    expect(Layout.prototype.componentDidMount).toHaveProperty('callCount', 1);
  });
});
