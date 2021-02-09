import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { signup } from '../services/auth';
import CredentialsForm from './CredentialsForm';

function SignupContainer({ onSignup, history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  function handleSubmit() {
    signup(username, password)
      .then((user) => {
        onSignup(user);
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
        title="Sign up"
        onSubmit={handleSubmit}
        username={username}
        password={password}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        buttonText="Sign up"
        text="Already have an account?"
        url="/login"
        urlName="Log in"
      />
    </main>
  );
}

SignupContainer.propTypes = {
  onSignup: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default SignupContainer;
