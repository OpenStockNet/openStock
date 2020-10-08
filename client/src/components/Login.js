import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/auth';
import CredentialsForm from './CredentialsForm';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    login(username, password)
      .then((user) => {
        // successfully logged in
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
        <CredentialsForm
          title={'Log in'}
          handleSubmit={this.handleSubmit}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleChange}
          buttonText={'Log in'}
          text={`Don't have an account?`}
          url={'/signup'}
          urlName={'Sign up'}
        />
      </main>
    );
  }
}

export default Login;
