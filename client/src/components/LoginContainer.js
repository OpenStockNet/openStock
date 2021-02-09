import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { login } from '../services/auth';
import CredentialsForm from './CredentialsForm';

function LoginContainer({ onLogin, history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  function handleSubmit() {
    login(username, password)
      .then((user) => {
        onLogin(user);
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
        onSubmit={handleSubmit}
        username={username}
        password={password}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        buttonText="Log in"
        text="Don't have an account?"
        url="/signup"
        urlName="Sign up"
      />
    </main>
  );
}

LoginContainer.propTypes = {
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default LoginContainer;
