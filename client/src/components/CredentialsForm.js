import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CredentialsForm.scss';

const CredentialsForm = ({
  onSubmit, errorMsg, title, username, password, onUsernameChange,
  onPasswordChange, buttonText, text, url, urlName,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  const handleUsernameChange = (event) => {
    onUsernameChange(event.target.value);
  };

  const handlePasswordChange = (event) => {
    onPasswordChange(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} id="login" role="form">
      <p className="errorMsg" role="alert">{errorMsg}</p>
      <h2>{title}</h2>
      <label htmlFor="username">User name </label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Type username here"
        autoComplete="username"
      />
      <label htmlFor="password">Password </label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        id="password"
        placeholder="Type password here"
        autoComplete="current-password"
      />
      <button type="submit">{buttonText}</button>

      <section className="reminder">
        <p>
          {text}
          {' '}
&nbsp;
        </p>
        <Link to={url} id="underline_text">
          {urlName}
        </Link>
      </section>
    </form>
  );
};

CredentialsForm.propTypes = {
  errorMsg: PropTypes.string,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlName: PropTypes.string.isRequired,
};

CredentialsForm.defaultProps = {
  errorMsg: 'error',
};

export default CredentialsForm;
