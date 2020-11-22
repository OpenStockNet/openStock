import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../services/auth';
import CredentialsForm from './CredentialsForm';

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
        <CredentialsForm
          title={'Sign up'}
          handleSubmit={this.handleSubmit}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleChange}
          buttonText={'Sign up'}
          text={'Already have an account?'}
          url={'/login'}
          urlName={'Log in'}
        />
      </main>
    );
  }
}

export default Signup;
