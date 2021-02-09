import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import IconButton from './IconButton';

const icon = 'dummyIcon';
const title = 'dummyTitle';

it('renders without errors', () => {
  const { container } = render(
    <IconButton
      icon={icon}
      onClick={() => {}}
      title={title}
    />,
  );
  expect(container).toBeInTheDocument();
});

describe('buttons', () => {
  it('displays correct title', () => {
    render(
      <IconButton
        icon={icon}
        onClick={() => {}}
        title={title}
      />,
    );

    const element = screen.getByRole('button');
    expect(element).toHaveAttribute('title', 'dummyTitle');
  });

  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(
      <IconButton
        onClick={handleClick}
        icon={icon}
        title={title}
      />,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});

it('displays correct images', () => {
  render(
    <IconButton
      icon={icon}
      onClick={() => {}}
      title={title}
    />,
  );

  const element = screen.getByRole('img');
  expect(element).toHaveAttribute('src', 'dummyIcon');
});
