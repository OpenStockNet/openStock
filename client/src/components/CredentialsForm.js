import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CredentialsForm.scss';

const CredentialsForm = ({
  handleSubmit, errorMsg, title, username, password, handleUsernameChange,
  handPasswordChange, buttonText, text, url, urlName,
}) => (

  <form onSubmit={handleSubmit} id="login">
    <p className="errorMsg">{errorMsg}</p>
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
      onChange={handPasswordChange}
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

CredentialsForm.propTypes = {
  errorMsg: PropTypes.string,
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handPasswordChange: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlName: PropTypes.string.isRequired,
};

CredentialsForm.defaultProps = {
  errorMsg: 'error',
};

export default CredentialsForm;
