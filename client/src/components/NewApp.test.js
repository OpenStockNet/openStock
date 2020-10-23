import * as React from 'react';
import { render } from '@testing-library/react';
import NewApp from './NewApp';

// test if value is passed
// test if onChange event is fired

it('renders without errors', () => {
  const { container } = render(
    <NewApp />,
  );
  expect(container).toBeInTheDocument();
});
