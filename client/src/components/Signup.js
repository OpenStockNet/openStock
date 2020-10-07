import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../services/auth';

import './LoginSignup.scss';

class Signup extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = (event) => {
    // the same as:
    // const name = event.target.name; 
    // const value = event.target.value; 
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    // prevent reload once submit
    event.preventDefault();

    const { username, password } = this.state;

    signup(username, password)
      .then((user) => {
        this.props.setUser(user);
        // redirect to the page '/'
        this.props.history.push('/');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    return (
      <main>
        <form onSubmit={this.handleSubmit} id="signup">
          <h2>Sign up</h2>
          <label htmlFor="username">User name </label>
          <input
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="Type username here"
          />
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            id="password"
            placeholder="Type password here"
          />
          <button type="submit">Sign up</button>

          <section className="reminder">
            <p>Alreayd have an account? &nbsp;</p>
            <Link to="/login" id="underline_text">
              Log in
            </Link>
          </section>
        </form>
      </main>
    );
  }
}

export default Signup;
