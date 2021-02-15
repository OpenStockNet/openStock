import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';

import LoginContainer from './LoginContainer';

import { login as mockLogin } from '../services/auth';

// mock api calls
jest.mock('../services/auth');

it('renders without errors', () => {
  const { container } = render(
    <BrowserRouter>
      <LoginContainer
        onLogin={() => {}}
        history={{}}
      />
      ,
    </BrowserRouter>,
  );

  expect(container).toBeInTheDocument();
});

// or, Mock Service Worker library to mock api
describe('allows user to login successfully', () => {
  it('submits user credentials when button is clicked', () => {
    // make login return promise which is immediately resolved
    mockLogin.mockResolvedValue();

    render(
      <BrowserRouter>
        <LoginContainer
          onLogin={() => {}}
          history={{ push: () => {} }}
        />
        ,
      </BrowserRouter>,
    );

    const element = screen.getByRole('form'); // access chiild component
    expect(element).toBeInTheDocument();

    // fill out the form
    fireEvent.change(screen.getByLabelText(/user name/i), {
      target: { value: 'dummyUsername' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'dummyPassword' },
    });

    // calls mockLogin function
    fireEvent.click(screen.getByRole('button'));

    expect(mockLogin).toHaveBeenCalled();
    expect(mockLogin).toHaveBeenCalledWith('dummyUsername', 'dummyPassword');
  });

  it('calls onLogin callback when user logs in successfully', async () => {
    // login api supposed to return a promise which gets resolved with a user object
    const dummyUser = {
      _id: 'dummyUserId',
    };
    mockLogin.mockResolvedValue(dummyUser);

    const mockOnLogin = jest.fn();

    render(
      <BrowserRouter>
        <LoginContainer
          onLogin={mockOnLogin}
          history={{ push: () => {} }}
        />
        ,
      </BrowserRouter>,
    );

    // click to call mockLogin function
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockOnLogin).toHaveBeenCalled());
    expect(mockOnLogin).toHaveBeenCalledWith(dummyUser);
  });
  it('shows error message when entering invalid credentials', async () => {
    // to not return promise
    mockLogin.mockRejectedValue({
      message: 'dummyErrorMessage',
    });

    render(
      <BrowserRouter>
        <LoginContainer
          onLogin={() => {}}
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

    // const element = await screen.findByRole("alert");
    const element = await waitFor(() => screen.getByRole('alert'));
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('dummyErrorMessage');
  });
});

it('displays content to redirect to signup page', async () => {
  render(
    <BrowserRouter>
      <LoginContainer
        onLogin={() => {}}
        history={{ push: () => {} }}
      />
      <Route path="/signup">Mock Signup</Route>
    </BrowserRouter>,
  );

  const signupText = screen.getByText("Don't have an account?");
  expect(signupText).toBeInTheDocument();

  // when clicking on 'Sign up', the linked signup page open
  const signupLink = screen.getByText('Sign up');
  fireEvent.click(signupLink);
  const element = await screen.findByText('Mock Signup');
  expect(element).toBeInTheDocument();
});
