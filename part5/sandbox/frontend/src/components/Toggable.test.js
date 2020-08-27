import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Toggable from './Toggable';

describe('<Toggable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Toggable label="show">
        <div className="testDiv" />
      </Toggable>
    );
  });

  test('renders its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined();
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.content');

    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show');
    fireEvent.click(button);

    const div = component.container.querySelector('.content');
    expect(div).not.toHaveStyle('display: none');
  });

  test('can show and hide the content', () => {
    const button = component.getByText('show');
    fireEvent.click(button);

    const hide = component.getByText('cancel');
    fireEvent.click(hide);

    const div = component.container.querySelector('.content');
    expect(div).toHaveStyle('display: none');
  });
});
