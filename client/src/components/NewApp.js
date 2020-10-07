import React, { Component } from 'react';
import { createApp } from '../services/app';
import { fetchAllCategories } from '../services/category';
import Loader from './Loader'

import './NewApp.scss';

class NewApp extends Component {
  state = {
    name: '',
    website: '',
    description: '',
    category: '',
    categories: [],
    device: [],
  };

  componentDidMount() {
    fetchAllCategories()
      .then((categories) => {
        this.setState({
          category: categories[0]._id,
          categories,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  handleChange = (event) => {
    // before ES6:
    // const name = event.target.name; 
    // const value = event.target.value; 
    const { name } = event.target;
    const { value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleCheckbox = (event) => {
    // before ES6:
    // const name = event.target.name;
    // const id = event.target.id;
    // const checked = event.target.checked;
    const { name } = event.target;
    const { id } = event.target;
    const { checked } = event.target;

    const deviceCopy = this.state.device.map((device) => device);

    if (checked) {
      deviceCopy.push(id);
    } else {
      const index = deviceCopy.indexOf(id);
      if (index > -1) {
        deviceCopy.splice(index, 1);
      }
    }

    this.setState({
      [name]: deviceCopy,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const creator = this.props.user._id;
    const {
      name, description, category, device, website, logo,
    } = this.state;

    createApp(name, description, category, device, website, logo, creator)
      .then((app) => {
        this.props.history.push(`/apps/${app._id}`);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    if (!this.state.categories) return <Loader />
    const categoryOptions = this.state.categories.map((category) => <option value={category._id}>{category.name}</option>);
    return (
      <main>
        <form onSubmit={this.handleSubmit} id="addApp">
          <h2>Fill in the form with the app information</h2>
          <div>
            <label htmlFor="name">App name </label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Type in the app name here"
            />
          </div>
          <div>
            <label htmlFor="website">Official website </label>
            <input
              type="text"
              name="website"
              id="website"
              value={this.state.website}
              onChange={this.handleChange}
              placeholder="Type in the app wesite here"
            />
          </div>
          <div>
            <label htmlFor="logo">Logo </label>
            <input
              type="text"
              name="logo"
              id="logo"
              value={this.state.logo}
              onChange={this.handleChange}
              placeholder="Type in the image url here"
            />
          </div>
          <div>
            <label htmlFor="description">Description </label>
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              id="description"
              placeholder="Type in the app description here"
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select value={this.state.category} name="category" onChange={this.handleChange} id="category">
              {categoryOptions}
            </select>
          </div>
          <p>Select available devices</p>
          <div className="checkboxes">
            <label htmlFor="Desktop">Desktop</label>
            <input
              id="Desktop"
              name="device"
              type="checkbox"
              checked={this.state.device.includes('Desktop')}
              onChange={this.handleCheckbox}
            />
            <label htmlFor="Android">Android</label>
            <input
              id="Android"
              name="device"
              type="checkbox"
              checked={this.state.device.includes('Android')}
              onChange={this.handleCheckbox}
            />
            <label htmlFor="iOS">iOS</label>
            <input
              id="iOS"
              name="device"
              type="checkbox"
              checked={this.state.device.includes('iOS')}
              onChange={this.handleCheckbox}
            />
            <label htmlFor="Browser">Browser</label>
            <input
              id="Browser"
              name="device"
              type="checkbox"
              checked={this.state.device.includes('Browser')}
              onChange={this.handleCheckbox}
            />
          </div>
          <button type="submit">+ Add new app</button>
        </form>
      </main>
    );
  }
}

export default NewApp;
