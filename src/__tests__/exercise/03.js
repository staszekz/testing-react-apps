// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react';
// 🐨 add `screen` to the import here:
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Counter from '../../components/counter';

test('counter increments and decrements when the buttons are clicked', async () => {
  render(<Counter />);
  // 🐨 replace these with screen queries
  // 💰 you can use `getByText` for each of these (`getByRole` can work for the button too)
  // const [decrement, increment] = screen.getAllByRole('button');

  const increment = screen.getByRole('button', { name: /increment/i }); // regex to ignore Lower and Capital case
  const decrement = screen.getByRole('button', { name: /decrement/i });
  const message = screen.getByText(/current count/i);

  expect(message).toHaveTextContent('Current count: 0');
  await userEvent.click(increment);
  expect(message).toHaveTextContent('Current count: 1');
  await userEvent.click(decrement);
  expect(message).toHaveTextContent('Current count: 0');
});
