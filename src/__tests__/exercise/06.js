// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react';
import { render, screen, act } from '@testing-library/react';
import Location from '../../examples/location';
import { useCurrentPosition } from 'react-use-geolocation';

jest.mock('react-use-geolocation');
// 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function
// beforeAll(() => {
//   window.navigator.geolocation = {
//     getCurrentPosition: jest.fn(),
//   };
// });

// 💰 I'm going to give you this handy utility function
// it allows you to create a promise that you can resolve/reject on demand.
function deferred() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  };
  let setReturnValue;
  function useMockCurrentPosition() {
    const [state, setState] = React.useState([]);
    setReturnValue = setState;
    return state;
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition);
  render(<Location />);
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  act(() => {
    setReturnValue([fakePosition]);
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  );
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  );
});

// test('displays the users current location', async () => {
//   const fakePosition = {
//     coords: {
//       latitude: 35,
//       longitude: 139,
//     },
//   };
//   const { promise, resolve } = deferred();
//   window.navigator.geolocation.getCurrentPosition.mockImplementation(
//     callback => {
//       promise.then(() => callback(fakePosition));
//     },
//   );
//   render(<Location />);
//   expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

//   await act(async () => {
//     resolve();
//     await promise;
//   });
//   expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
//   expect(screen.getByText(/latitude/i)).toHaveTextContent(
//     `Latitude: ${fakePosition.coords.latitude}`,
//   );
//   expect(screen.getByText(/longitude/i)).toHaveTextContent(
//     `Longitude: ${fakePosition.coords.longitude}`,
//   );
// });
/*
eslint
  no-unused-vars: "off",
*/
