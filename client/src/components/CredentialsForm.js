import React from 'react';
import { Link } from 'react-router-dom';
import './LoginSignup.scss';

const CredentialsForm = (props) => (
  
  <form onSubmit={props.handleSubmit} id="login">
    <p className='errorMsg'>{props.errorMsg}</p>
    <h2>{props.title}</h2>
    <label htmlFor="username">User name </label>
    <input
      type="text"
      name="username"
      id="username"
      value={props.username}
      onChange={props.handleUsernameChange}
      placeholder="Type username here"
      autoFocus="true"
    />
    <label htmlFor="password">Password </label>
    <input
      type="password"
      name="password"
      value={props.password}
      onChange={props.handPasswordChange}
      id="password"
      placeholder="Type password here"
    />
    <button type="submit" >{props.buttonText}</button>

    <section className="reminder">
      <p>
        {props.text}
        {' '}
&nbsp;
      </p>
      <Link to={props.url} id="underline_text">
        {props.urlName}
      </Link>
    </section>
  </form>
);

export default CredentialsForm;
