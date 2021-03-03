import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import CredentialsForm from './CredentialsForm';
import { login as mockLogin } from '../services/auth';

jest.mock('../services/auth');

mockLogin.mockResolvedValue([{
  _id: 'dummyUserId',
}]);

it('renders without errors', () => {
  const { container } = render(
    <BrowserRouter>
      <CredentialsForm
        onSubmit={() => {}}
        errorMsg="dummyErrorMsg"
        title="dummyTitle"
        username="dummyUserName"
        password="dummyPassWord"
        onUsernameChange={() => {}}
        onPasswordChange={() => {}}
        buttonText="dummyButtonText"
        text="dummyText"
        url="dummyUrl"
        urlName="dummyUrlName"
      />
      ,
    </BrowserRouter>,
  );

  expect(container).toBeInTheDocument();
});

describe('credentials input', () => {
  it('shows props user name and password in input fields', () => {
    render(
      <BrowserRouter>
        <CredentialsForm
          onSubmit={() => {}}
          errorMsg="dummyErrorMsg"
          title="dummyTitle"
          username="dummyUserName"
          password="dummyPassWord"
          onUsernameChange={() => {}}
          onPasswordChange={() => {}}
          buttonText="dummyButtonText"
          text="dummyText"
          url="dummyUrl"
          urlName="dummyUrlName"
        />
      </BrowserRouter>,
    );

    const lastNameInput = screen.getByPlaceholderText('Type username here'); // return <input/> object
    expect(lastNameInput.value).toBe('dummyUserName');

    const lastPasswordInput = screen.getByPlaceholderText('Type password here'); // return <input/> object
    expect(lastPasswordInput.value).toBe('dummyPassWord');
  });

  it('changes values when prop input value changes', () => {
    const handleUserNameChangeMock = jest.fn();
    const handlePasswordChangeMock = jest.fn();

    render(
      <BrowserRouter>
        <CredentialsForm
          onSubmit={() => {}}
          errorMsg="dummyErrorMsg"
          title="dummyTitle"
          username="dummyUserName"
          password="dummyPassWord"
          onUsernameChange={handleUserNameChangeMock}
          onPasswordChange={handlePasswordChangeMock}
          buttonText="dummyButtonText"
          text="dummyText"
          url="dummyUrl"
          urlName="dummyUrlName"
        />
      </BrowserRouter>,
    );

    const lastNameInput = screen.getByLabelText(/User name/i);
    fireEvent.change(lastNameInput, { target: { value: 'changeName' } });
    expect(handleUserNameChangeMock).toHaveBeenCalledWith('changeName');

    const lastPasswordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(lastPasswordInput, { target: { value: 'changePassword' } });
    expect(handlePasswordChangeMock).toHaveBeenCalledWith('changePassword');
  });

  it('calls onSubmit prop when clicked', () => {
    const onSubmitMock = jest.fn();
    render(
      <BrowserRouter>
        <CredentialsForm
          onSubmit={onSubmitMock}
          errorMsg="dummyErrorMsg"
          title="dummyTitle"
          username="dummyUserName"
          password="dummyPassWord"
          onUsernameChange={() => {}}
          onPasswordChange={() => {}}
          buttonText="dummyButtonText"
          text="dummyText"
          url="dummyUrl"
          urlName="dummyUrlName"
        />
      </BrowserRouter>,
    );

    fireEvent.submit(screen.getByRole('form'));
    // fireEvent.click(screen.getByRole('button'));

    expect(onSubmitMock).toHaveBeenCalled();
  });
});
