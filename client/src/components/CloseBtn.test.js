import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import CloseBtn from './CloseBtn';

it('renders without errors', () => {
  const { container } = render(
    <CloseBtn onClick={() => {}} />,
  );
  expect(container).toBeInTheDocument();
});

it('calls onClick prop when clicked', () => {
  const handleClick = jest.fn();
  render(<CloseBtn onClick={handleClick} />);

  fireEvent.click(screen.getByRole('presentation'));
  expect(handleClick).toHaveBeenCalled();
});
