import React, { Component } from 'react';
import { createApp } from '../services/app';

class NewApp extends Component {
    state = {
        name:"",
        description: "",
        //category:""
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

    handleSubmit = (event) => {
        event.preventDefault();
    
        const { name, description } = this.state;
        //responseData is data we got from services/app.js http requests
        createApp(name, description).then(responseData => {
          if (responseData.message) {
            alert(responseData.message)
          } else {
            this.props.history.push('/');
          }
        });
      };

    render() {
        return (
          <div>
            <h2>create an app</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor='name'>App name: </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor='description'>Description: </label>
                <input
                  type='description'
                  name='description'
                  value={this.state.description}
                  onChange={this.handleChange}
                  id='description'
                />
              </div>
              <button type='submit'>create</button>
            </form>
          </div>
        );
      }
}



export default NewApp;