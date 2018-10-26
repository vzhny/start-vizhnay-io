import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Form from './Form';

const mockProps = {
  clicked() {
    return;
  },
  linksUpdated() {
    return;
  },
};

describe('The Form container', () => {
  it('should call componentDidMount', () => {
    sinon.spy(Form.prototype, 'componentDidMount');

    const wrapper = mount(<Form clicked={mockProps.clicked} linksUpdated={mockProps.linksUpdated} />);

    expect(Form.prototype.componentDidMount).toHaveProperty('callCount', 1);
  });
});
