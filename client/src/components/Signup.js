import React, { Component } from 'react';
//http request is written in ../services/auth
import { signup } from '../services/auth';

class Signup extends Component {
    state = {
        username:"",
        password: ""
    }

    handleChange = (event) => {
        //'name' and 'value' reference to attributes in <input field>
        const name = event.target.name // username or password
        const value = event.target.value // username/password we input: e.g. ananas
        
        //ES6 syntax: name can be username or password, value change accordingly
        this.setState({
            [name]: value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const { username, password } = this.state;
        //responseData is data we got from auth.js http requests
        signup(username, password).then(responseData => {
          if (responseData.message) {
            // this.setState({
            //   username: '',
            //   password: ''
          // });
            alert(responseData.message)
          } else {
            this.props.setUser(responseData);
            //redirect to the page '/'
            this.props.history.push('/');
          }
        });
      };

    render() {
        return (
          <div>
            <h2>Signup</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor='username'>User name: </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor='password'>Password: </label>
                <input
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                  id='password'
                />
              </div>
              <button type='submit'>Signup</button>
            </form>
          </div>
        );
      }
}



export default Signup;