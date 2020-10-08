import React from 'react';
import { Link } from 'react-router-dom';
import './LoginSignup.scss';

const CredentialsForm = (props) => (
  <form onSubmit={props.handleSubmit} id="login">
    <h2>{props.title}</h2>
    <label htmlFor="username">User name </label>
    <input
      type="text"
      name="username"
      id="username"
      value={props.username}
      onChange={props.handleChange}
      placeholder="Type username here"
      autoFocus="true"
    />
    <label htmlFor="password">Password </label>
    <input
      type="password"
      name="password"
      value={props.password}
      onChange={props.handleChange}
      id="password"
      placeholder="Type password here"
    />
    <button type="submit">{props.buttonText}</button>

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
