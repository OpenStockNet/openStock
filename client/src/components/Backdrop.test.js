import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Backdrop from './Backdrop';

it('renders without errors', () => {
  const { container } = render(
    <Backdrop onClick={() => {}} />,
  );
  expect(container).toBeInTheDocument();
});

it('calls onClick prop when clicked', () => {
  const handleClick = jest.fn();
  render(<Backdrop onClick={handleClick} />);

  fireEvent.click(screen.getByRole('presentation'));
  expect(handleClick).toHaveBeenCalled();
});
