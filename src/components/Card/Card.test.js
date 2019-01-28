import React from 'react';
import { shallow } from 'enzyme';

import Card from './Card';
import CardHeader from './CardHeader/CardHeader';
import CardBody from './CardBody/CardBody';

const mockProps = {
  title: 'Test!',
};

const mockChildren = <p>Hello World!</p>;

const wrapper = shallow(<Card title={mockProps.title}>{mockChildren}</Card>);

describe('The Card component', () => {
  it('should be the correct component types', () => {
    const header = wrapper.childAt(0);
    expect(header.type()).toBe(CardHeader);

    const body = wrapper.childAt(1);
    expect(body.type()).toBe(CardBody);
  });

  it('should receive the correct props', () => {
    const header = wrapper.childAt(0).props();
    expect(header.title).toEqual(mockProps.title);

    const body = wrapper.childAt(1).props();
    expect(body.children).toBe(mockChildren);
  });

  it('should display the correct header title and body content', () => {
    const header = wrapper.childAt(0);
    expect(header.html()).toBe('<h1 class="CardHeader">Test!</h1>');

    const body = wrapper.childAt(1);
    expect(body.html()).toBe('<div class="CardBody"><p>Hello World!</p></div>');
  });
});
