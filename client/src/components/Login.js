import React, { useState } from 'react';
import { login } from '../services/auth';
import CredentialsForm from './CredentialsForm';

function Login(props) {
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
        // successfully logged in
        props.setUser(user);
        // redirect to the page '/'
        props.history.push('/');
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

export default Login;
