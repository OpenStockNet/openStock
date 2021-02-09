import * as React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from './Footer';

// mainly Jest DOM library assertions
it('renders without errors', () => {
  const { container } = render(
    <Footer />,
  );
  expect(container).toBeInTheDocument();
});

describe('all references', () => {
  it('displays correct copyright time', () => {
    render(<Footer />);

    const element = screen.getByText(/© 2020 - 2021/i); // texts broken to elements
    expect(element).toBeInTheDocument();
  });

  it('includes correct url under name', () => {
    render(<Footer />);

    const element = screen.getByText('Yung-Ting').closest('a');
    expect(element).toHaveAttribute('href', 'https://github.com/yung-ting');
  });

  it('includes correct url under icons', () => {
    render(<Footer />);

    const element = screen.getByText('Pixel perfect').closest('a');
    expect(element).toHaveAttribute('href', 'https://www.flaticon.com/authors/pixel-perfect');
  });
});
