import React, { useState, useEffect } from 'react';
import { createApp } from '../services/app';
import { fetchAllCategories } from '../services/category';
import Loader from './Loader';

import './NewApp.scss';

function NewApp(props) {
  const [name, setName] = useState('');//
  const [website, setWebsite] = useState('');//
  const [description, setDescription] = useState('');//
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [device, setDevice] = useState([]);
  const [logo, setLogo] = useState('');//

  useEffect(() => {
    fetchAllCategories()
      .then((categories) => {
        setCategory(categories[0]._id);
        setCategories(categories);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [props]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleWebsiteChange(event) {
    setWebsite(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleLogoChange(event) {
    setLogo(event.target.value);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  function handleCheckbox(event) {
    const { id, checked } = event.target;
    const deviceCopy = device.map((device) => device);

    if (checked) {
      deviceCopy.push(id);
    } else {
      const index = deviceCopy.indexOf(id);
      if (index > -1) {
        deviceCopy.splice(index, 1);
      }
    }

    setDevice(deviceCopy);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const creator = props.user._id;

    createApp(name, description, category, device, website, logo, creator)
      .then((app) => {
        props.history.push(`/apps/${app._id}`);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  if (!categories) return <Loader />;
  const categoryOptions = categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>);

  return (
    <main>
      <form onSubmit={handleSubmit} id="addApp">
        <h2>Fill in the form with the app information</h2>
        <div>
          <label htmlFor="name">App name </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Type in the app name here"
          />
        </div>
        <div>
          <label htmlFor="website">Official website </label>
          <input
            type="text"
            name="website"
            id="website"
            value={website}
            onChange={handleWebsiteChange}
            placeholder="Type in the app wesite here"
          />
        </div>
        <div>
          <label htmlFor="logo">Logo </label>
          <input
            type="text"
            name="logo"
            id="logo"
            value={logo}
            onChange={handleLogoChange}
            placeholder="Type in the image url here"
          />
        </div>
        <div>
          <label htmlFor="description">Description </label>
          <textarea
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            id="description"
            placeholder="Type in the app description here"
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            value={category}
            name="category"
            onChange={handleCategoryChange}
            id="category"
          >
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
            checked={device.includes('Desktop')}
            onChange={handleCheckbox}
          />
          <label htmlFor="Android">Android</label>
          <input
            id="Android"
            name="device"
            type="checkbox"
            checked={device.includes('Android')}
            onChange={handleCheckbox}
          />
          <label htmlFor="iOS">iOS</label>
          <input
            id="iOS"
            name="device"
            type="checkbox"
            checked={device.includes('iOS')}
            onChange={handleCheckbox}
          />
          <label htmlFor="Browser">Browser</label>
          <input
            id="Browser"
            name="device"
            type="checkbox"
            checked={device.includes('Browser')}
            onChange={handleCheckbox}
          />
        </div>
        <button type="submit">+ Add app</button>
      </form>
    </main>
  );
}

export default NewApp;
