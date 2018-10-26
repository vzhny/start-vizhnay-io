import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Modal from './Modal';
import Backdrop from './Backdrop/Backdrop';
import Card from '../Card/Card';

const mockProps = {
  clicked() {
    return;
  },
  linksUpdated() {
    return;
  },
};

const wrapper = shallow(<Modal clicked={mockProps.clicked} linksUpdated={mockProps.linksUpdated} />);

describe('The Modal component', () => {
  it('should be the correct element types', () => {
    const backdrop = wrapper.childAt(0);
    expect(backdrop.type()).toBe(Backdrop);

    const card = wrapper.childAt(1).children();
    expect(card.type()).toBe(Card);
  });

  it('should receive the correct props', () => {
    const backdrop = wrapper.childAt(0).props();
    expect(backdrop.clicked).toEqual(mockProps.clicked);

    const formInCard = wrapper
      .childAt(1)
      .children()
      .children()
      .props();
    expect(formInCard.clicked).toEqual(mockProps.clicked);
    expect(formInCard.linksUpdated).toEqual(mockProps.linksUpdated);
  });
});
