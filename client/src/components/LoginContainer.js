import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { login } from '../services/auth';
import CredentialsForm from './CredentialsForm';

function LoginContainer({ setUser, history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handPasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    login(username, password)
      .then((user) => {
        setUser(user);
        history.push('/');
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }

  return (
    <main>
      <CredentialsForm
        errorMsg={errorMsg}
        title="Log in"
        handleSubmit={handleSubmit}
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handPasswordChange={handPasswordChange}
        buttonText="Log in"
        text={'Don\'t have an account?'}
        url="/signup"
        urlName="Sign up"
      />
    </main>
  );
}

LoginContainer.propTypes = {
  setUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default LoginContainer;
