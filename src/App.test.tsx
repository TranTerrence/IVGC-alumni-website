import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Copyright', () => {
  const { getByText } = render(<App />);
  const copyrightText = getByText(/Copyright/i);
  expect(copyrightText).toBeInTheDocument();
});
