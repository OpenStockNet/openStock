import * as React from 'react';
import { render, screen } from '@testing-library/react';

import Loader from './Loader';
import { LoaderIcon } from '../images';

jest.mock('../images');

it('renders without errors', () => {
  const { container } = render(
    <Loader />,
  );
  expect(container).toBeInTheDocument();
});

it('has Backdrop component', () => {
  render(<Loader />);

  const element = screen.getByTestId('backdrop'); // access original backdrop component
  expect(element).toBeInTheDocument();
});

it('displays loader icon', () => {
  render(<Loader />);

  const element = screen.getByRole('img');
  expect(element.getAttribute('src')).toEqual(LoaderIcon);
});
