// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import Counter from '../../components/counter';
const event = new MouseEvent('click', {
  bubbles: true,
  cancelable: true,
  button: 0,
});
// NOTE: this is a new requirement in React 18
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true;

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div');
  //
  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div);
  //
  // 🐨 use createRoot to render the <Counter /> to the div
  const root = createRoot(div);
  act(() => root.render(<Counter />));
  console.log(document.body.innerHTML);
  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  const buttons = document.querySelectorAll('button');
  const incrementBtn = buttons[1];
  const decrementBtn = buttons[0];
  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')

  // const messDiv2 = document.querySelector('div')
  const message = div.firstChild.querySelector('div');
  //
  // 🐨 expect the message.textContent toBe 'Current count: 0'

  expect(message.textContent).toBe('Current count: 0');
  // 🐨 click the increment button (💰 act(() => increment.click()))
  act(() => incrementBtn.dispatchEvent(event));
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 1');
  act(() => decrementBtn.dispatchEvent(event));
  expect(message.textContent).toBe('Current count: 0');

  // 🐨 click the decrement button (💰 act(() => decrement.click()))
  // 🐨 assert the message.textContent
  //
  div.remove();
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
});

/* eslint no-unused-vars:0 */
