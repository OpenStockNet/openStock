import React, { Component } from 'react';
import { createApp } from '../services/app';
import { fetchAllCategories } from '../services/category'

class NewApp extends Component {
    state = {
        name:"",
        description: "",
        category:"",
        categories: [],
    }

    //we want to display the all categories as soon as component is rendered,
    //we pass categories from API call fetchAllCategorie, and set it into state.
    componentDidMount() {
      fetchAllCategories()
      .then ((categories) => {
        this.setState({ 
          categories: categories
        })
      });
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

        const { name, description, category } = this.state;
        //responseData is data we got from services/app.js http requests
        createApp(name, description, category).then(responseData => {
          if (responseData.message) {
            alert(responseData.message)
          } else {
            this.props.history.push('/');
          }
        });
      };
    
    //everytime we setState, react renders this component, so categorylist is updated
    render() {
        const categoryOptions = this.state.categories.map((category) => {
          return (
           <option value={category._id}>{category.name}</option>
          )
        })
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
              <div>
                <label>Choose a category:</label>
                <select 
                  value={this.state.category} 
                  name="category" 
                  onChange={this.handleChange}
                  id="category">
                  
                  {categoryOptions}
                  
                </select> 
              </div>
              <button type='submit'>create</button>
            </form>
          </div>
        );
      }
}



export default NewApp;