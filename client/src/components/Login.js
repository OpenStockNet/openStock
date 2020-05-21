import React, { Component } from 'react';
//http request is written in ../services/auth
import { login } from '../services/auth';

class Login extends Component {
    state = {
        username:"",
        password: ""
    }

    handleChange = (event) => {
        const name = event.target.name 
        const value = event.target.value 
        
        this.setState({
            [name]: value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const { username, password } = this.state;
        
        login(username, password)
        .then(user => {
          //successfully logged in
          //update the state for the parnet component
          this.props.setUser(user);
          //redirect to the page '/' 
          this.props.history.push('/');
        })
        .catch((error) => {
          alert(error.message);
        });
      };

    render() {
        return (
          <div>
            <h2>Log in</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor='username'>User name </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor='password'>Password </label>
                <input
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                  id='password'
                />
              </div>
              <button type='submit'>Log in</button>
            </form>
          </div>
        );
      }
}



export default Login;