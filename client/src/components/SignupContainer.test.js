import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';

import SignupContainer from './SignupContainer';

import { signup as mockSignup } from '../services/auth';

jest.mock('../services/auth');

it('renders without errors', () => {
  const { container } = render(
    <BrowserRouter>
      <SignupContainer
        onSignup={() => {}}
        history={{}}
      />
      ,
    </BrowserRouter>,
  );

  expect(container).toBeInTheDocument();
});

describe('allows user to sign up successfully', () => {
  it('submits user credentials when button is clicked', () => {
    mockSignup.mockResolvedValue(); // resolve promise from signup func

    render(
      <BrowserRouter>
        <SignupContainer
          onSignup={() => {}}
          history={{ push: () => {} }}
        />
        ,
      </BrowserRouter>,
    );

    const element = screen.getByRole('form');
    expect(element).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/user name/i), {
      target: { value: 'dummyUsername' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'dummyPassword' },
    });

    fireEvent.click(screen.getByRole('button'));
    expect(mockSignup).toHaveBeenCalled();
    expect(mockSignup).toHaveBeenCalledWith('dummyUsername', 'dummyPassword');
  });

  it('calls onSignup callback when user signs up', async () => {
    const dummyUser = {
      _id: 'dummyUserId',
    };
    mockSignup.mockResolvedValue(dummyUser);

    const mockOnSignup = jest.fn();

    render(
      <BrowserRouter>
        <SignupContainer
          onSignup={mockOnSignup}
          history={{ push: () => {} }}
        />
        ,
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockOnSignup).toHaveBeenCalled());
    expect(mockOnSignup).toHaveBeenCalledWith(dummyUser);
  });

  it('shows error message when entering invalid credentials', async () => {
    mockSignup.mockRejectedValue({
      message: 'dummyErrorMessage',
    });

    render(
      <BrowserRouter>
        <SignupContainer
          onSignup={() => {}}
          history={{ push: () => {} }}
        />
        ,
      </BrowserRouter>,
    );

    // fill out the invalid credentials
    fireEvent.change(screen.getByLabelText(/user name/i), {
      target: { value: null },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: null },
    });

    fireEvent.click(screen.getByRole('button'));

    const element = await waitFor(() => screen.getByRole('alert'));
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('dummyErrorMessage');
  });
});

it('displays content to redirect to login page', async () => {
  render(
    <BrowserRouter>
      <SignupContainer
        onSignup={() => {}}
        history={{ push: () => {} }}
      />
      <Route path="/login">Mock Login</Route>
    </BrowserRouter>,
  );

  const LoginText = screen.getByText('Already have an account?');
  expect(LoginText).toBeInTheDocument();

  // when clicking on login, the linked login page open.
  const LoginLink = screen.getByText('Log in');
  fireEvent.click(LoginLink);
  const element = await screen.findByText('Mock Login');
  expect(element).toBeInTheDocument();
});
