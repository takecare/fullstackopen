import React from 'react';
import Login from './Login';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Login onLogin={() => {}} />).toJSON();

  expect(tree).toMatchSnapshot();
});
