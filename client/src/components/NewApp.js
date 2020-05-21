import React, { Component } from 'react';
import { createApp } from '../services/app';
import { fetchAllCategories } from '../services/category'

class NewApp extends Component {
    state = {
        name:"",
        description: "",
        category:"",
        categories: [],
        device:[],
    }

    //we want to display the all categories as soon as component is rendered,
    //we pass categories from API call fetchAllCategorie, and set it into state.
    componentDidMount() {
      fetchAllCategories()
      .then ((categories) => {
        this.setState({
          category: categories[0]._id,
          categories: categories
        })
      })
      .catch((error) => {
        alert(error.message);
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

    handleCheckbox = (event) => {
      const name = event.target.name 
      const id = event.target.id
      const checked = event.target.checked

      const deviceCopy = this.state.device.map(device => device);

      if (checked) {
        deviceCopy.push(id);
      } else {
        const index = deviceCopy.indexOf(id);
        if (index > -1) {
          deviceCopy.splice(index, 1);
        }
      }

      this.setState({
        [name]: deviceCopy
      })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { name, description, category, device } = this.state;
        //responseData is data we got from services/app.js http requests
        createApp(name, description, category, device)
        .then(() => {
          this.props.history.push('/');
        })
        .catch((error) => {
          alert(error.message);
        });;
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
            <h2>Suggest an app</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor='name'>App name </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor='description'>Description </label>
                <input
                  type='description'
                  name='description'
                  value={this.state.description}
                  onChange={this.handleChange}
                  id='description'
                />
              </div>
              <div>
                <label htmlFor='category'>Category</label>
                <select 
                  value={this.state.category} 
                  name="category" 
                  onChange={this.handleChange}
                  id="category">
                  
                  {categoryOptions}
                  
                </select> 
              </div>
              <p>Available on</p>
              <div>
                <input
                  id="Desktop"    
                  name="device"            
                  type="checkbox"
                  checked={this.state.device.includes("Desktop")}
                  onChange={this.handleCheckbox} 
                />
                <label htmlFor='Desktop'>Desktop</label>
              </div>
              <div>
                <input
                  id="Android"    
                  name="device"            
                  type="checkbox"
                  checked={this.state.device.includes("Android")}
                  onChange={this.handleCheckbox} 
                />
                <label htmlFor='Android'>Android</label>
              </div>
              <div>
                <input
                  id="iOS"    
                  name="device"            
                  type="checkbox"
                  checked={this.state.device.includes("iOS")}
                  onChange={this.handleCheckbox} 
                />
                <label htmlFor='iOS'>iOS</label>
              </div>
              <div>
                <input
                  id="Browser"    
                  name="device"            
                  type="checkbox"
                  checked={this.state.device.includes("Browser")}
                  onChange={this.handleCheckbox} 
                />
                <label htmlFor='Browser'>Browser</label>
              </div>
              <button type='submit'>create</button>
            </form>
          </div>
        );
      }
}



export default NewApp;