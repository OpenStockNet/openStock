import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import RatingButtons from './RatingButtons';

it('renders without errors', () => {
  const { container } = render(
    <RatingButtons onSubmitRating={() => {}} />,
  );
  expect(container).toBeInTheDocument();
});

describe('rating buttons', () => {
  it('passes value 1 when button 1 is clicked', () => {
    const handleSubmitRating = jest.fn();
    render(<RatingButtons onSubmitRating={handleSubmitRating} />);

    const element = screen.getByText(/1 ✦/i);
    fireEvent.click(element);
    expect(handleSubmitRating).toHaveBeenCalledTimes(1);
    expect(element).toHaveAttribute('value', '1');
  });

  it('passes value 2 when button 2 is clicked', () => {
    const handleSubmitRating = jest.fn();
    render(<RatingButtons onSubmitRating={handleSubmitRating} />);

    const element = screen.getByText(/2 ✦/i);
    fireEvent.click(element);
    expect(handleSubmitRating).toHaveBeenCalledTimes(1);
    expect(element).toHaveAttribute('value', '2');
  });

  it('passes value 3 when button 3 is clicked', () => {
    const handleSubmitRating = jest.fn();
    render(<RatingButtons onSubmitRating={handleSubmitRating} />);

    const element = screen.getByText(/3 ✦/i);
    fireEvent.click(element);
    expect(handleSubmitRating).toHaveBeenCalledTimes(1);
    expect(element).toHaveAttribute('value', '3');
  });

  it('passes value 4 when button 4 is clicked', () => {
    const handleSubmitRating = jest.fn();
    render(<RatingButtons onSubmitRating={handleSubmitRating} />);

    const element = screen.getByText(/4 ✦/i);
    fireEvent.click(element);
    expect(handleSubmitRating).toHaveBeenCalledTimes(1);
    expect(element).toHaveAttribute('value', '4');
  });

  it('passes value 5 when button 5 is clicked', () => {
    const handleSubmitRating = jest.fn();
    render(<RatingButtons onSubmitRating={handleSubmitRating} />);

    const element = screen.getByText(/5 ✦/i);
    fireEvent.click(element);
    expect(handleSubmitRating).toHaveBeenCalledTimes(1);
    expect(element).toHaveAttribute('value', '5');
  });
});
