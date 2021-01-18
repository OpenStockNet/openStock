import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { signup } from '../services/auth';
import CredentialsForm from './CredentialsForm';

function SignupContainer({ setUser, history }) {
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

    signup(username, password)
      .then((user) => {
        // successfully logged in
        setUser(user);
        // redirect to the page '/'
        history.push('/');
      })
      .catch((error) => {
        // alert(error.message);
        setErrorMsg(error.message);
      });
  }

  return (
    <main>
      <CredentialsForm
        errorMsg={errorMsg}
        title="Sign up"
        handleSubmit={handleSubmit}
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handPasswordChange={handPasswordChange}
        buttonText="Sign up"
        text="Already have an account?"
        url="/login"
        urlName="Log in"
      />
    </main>
  );
}

SignupContainer.propTypes = {
  setUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default SignupContainer;
