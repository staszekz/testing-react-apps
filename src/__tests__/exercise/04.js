// form testing
// http://localhost:3000/login

import * as React from 'react';
import {
  getByLabelText,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../components/login';
import faker from 'faker';

function buildLoginForm({ overrides }) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  };
}
test('submitting the form calls onSubmit with username and password', async () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // let submittedData;
  const handleSubmit = jest.fn();
  // const handleSubmit = data => (submittedData = data);
  //
  const { username, password } = buildLoginForm({ password: 'abc' });
  // const usernameText = 'chacknorris';
  // const passwordText = 'I need no password';
  render(<Login onSubmit={handleSubmit} />);
  screen.debug();
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  //
  const usernameEl = screen.getByLabelText(/username/i);
  const passwordEl = screen.getByLabelText(/password/i);
  // 🐨 get the username and password fields via `getByLabelText`
  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  //
  await userEvent.type(usernameEl, username);
  await userEvent.type(passwordEl, password);
  // 🐨 click on the button with the text "Submit"
  //w
  const button = screen.getByRole('button', { name: /submit/i });
  await userEvent.click(button);
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
});

/*
eslint
  no-unused-vars: "off",
*/
