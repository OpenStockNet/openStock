import * as React from 'react';
import { render, screen } from '@testing-library/react';

import About from './About';

// mainly Jest DOM library assertions
it('renders without errors', () => {
  const { container } = render(<About />);

  expect(container).toBeInTheDocument();
});

it('displays correct subject titles', () => {
  render(<About />);

  const element = screen.getByRole('heading', { level: 1 }); // h1, h2, h3...
  expect(element).toHaveTextContent('Find apps that respect your privacy');
});

it('displays correct descriptions', () => {
  render(<About />);

  const elements = screen.getAllByRole('heading', { level: 2 });
  expect(elements[0]).toHaveTextContent('In software, free doesn\'t only mean \'free of charge\' but also means \'freedom\'. OpenStock is an opensource project, with a goal to help everyone find reliable apps that respect our privacy at ease.');
});

describe('contact info sections', () => {
  it('includes correct address', () => {
    render(<About />);

    // closest() traverses Element and its parents until finds a matching node
    const element = screen.getByText('Github').closest('a');
    expect(element).toHaveAttribute('href', 'https://github.com/OpenStockNet/openStock');
  });

  it('includes correct email', () => {
    render(<About />);

    const element = screen.getByText('Email').closest('a');
    expect(element).toHaveAttribute('href', 'mailto:hello@yung-ting-chang.eu');
  });
});
